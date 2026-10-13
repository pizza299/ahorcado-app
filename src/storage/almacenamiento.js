// Persistencia local con AsyncStorage. Todos los valores se guardan como JSON
// y cada lectura/escritura está protegida con try/catch para que un error
// de almacenamiento nunca detenga el juego.
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CLAVES = {
  stats: '@ahorcado_stats',
  ranking: '@ahorcado_ranking',
  config: '@ahorcado_config',
};

export const STATS_INICIALES = {
  jugadas: 0,
  ganadas: 0,
  perdidas: 0,
  rachaActual: 0,
  mejorRacha: 0,
  // Mejor puntaje de cada jugador por categoría: { [jugador]: { [categoria]: puntaje } }
  mejores: {},
};

export const CONFIG_INICIAL = {
  sonido: true,
  vibracion: true,
  tema: 'claro', // 'claro' | 'oscuro'
};

export const TAMANO_RANKING = 10;

export async function guardarDatos(clave, valor) {
  try {
    await AsyncStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch (error) {
    console.warn(`No se pudo guardar ${clave}`, error);
    return false;
  }
}

export async function leerDatos(clave, valorPorDefecto) {
  try {
    const texto = await AsyncStorage.getItem(clave);
    return texto != null ? JSON.parse(texto) : valorPorDefecto;
  } catch (error) {
    console.warn(`No se pudo leer ${clave}`, error);
    return valorPorDefecto;
  }
}

// Carga la configuración, las estadísticas y el ranking al abrir la app.
export async function cargarTodo() {
  const [config, estadisticas, ranking] = await Promise.all([
    leerDatos(CLAVES.config, CONFIG_INICIAL),
    leerDatos(CLAVES.stats, STATS_INICIALES),
    leerDatos(CLAVES.ranking, []),
  ]);
  return {
    config: { ...CONFIG_INICIAL, ...config },
    estadisticas: { ...STATS_INICIALES, ...estadisticas },
    ranking: Array.isArray(ranking) ? ranking : [],
  };
}

// Las claves de jugador ignoran mayúsculas y espacios extra.
export function claveJugador(nombre) {
  return nombre.trim().toLowerCase();
}

export function mejorPuntaje(estadisticas, nombre, categoria) {
  return estadisticas.mejores?.[claveJugador(nombre)]?.[categoria] ?? 0;
}

// Devuelve las estadísticas actualizadas con el resultado de una partida.
export function actualizarEstadisticas(stats, { nombre, categoria, puntaje, gano }) {
  const rachaActual = gano ? stats.rachaActual + 1 : 0;
  const jugador = claveJugador(nombre);
  const mejoresJugador = stats.mejores?.[jugador] ?? {};
  const mejorAnterior = mejoresJugador[categoria] ?? 0;

  return {
    ...stats,
    jugadas: stats.jugadas + 1,
    ganadas: stats.ganadas + (gano ? 1 : 0),
    perdidas: stats.perdidas + (gano ? 0 : 1),
    rachaActual,
    mejorRacha: Math.max(stats.mejorRacha, rachaActual),
    mejores: {
      ...stats.mejores,
      [jugador]: { ...mejoresJugador, [categoria]: Math.max(mejorAnterior, puntaje) },
    },
  };
}

// Inserta el puntaje en el ranking y conserva solo los 10 mejores.
export function actualizarRanking(ranking, entrada) {
  if (entrada.puntaje <= 0) return ranking;
  return [...ranking, entrada]
    .sort((a, b) => b.puntaje - a.puntaje || a.fecha.localeCompare(b.fecha))
    .slice(0, TAMANO_RANKING);
}

export function guardarConfig(config) {
  return guardarDatos(CLAVES.config, config);
}

export function guardarEstadisticas(estadisticas, ranking) {
  return Promise.all([
    guardarDatos(CLAVES.stats, estadisticas),
    guardarDatos(CLAVES.ranking, ranking),
  ]);
}

export async function borrarEstadisticas() {
  try {
    await AsyncStorage.multiRemove([CLAVES.stats, CLAVES.ranking]);
    return true;
  } catch (error) {
    console.warn('No se pudieron borrar las estadísticas', error);
    return false;
  }
}
