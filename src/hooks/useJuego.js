// Lógica y estado de una partida del ahorcado.
// El estado vive en un reducer puro; el hook expone acciones
// (procesarLetra, usarPista, nuevaPartida) y maneja el cronómetro.
import { useCallback, useEffect, useReducer, useState } from 'react';
import { AppState } from 'react-native';
import { ALEATORIA, NIVELES, PALABRAS } from '../data/palabras';

export const MAX_ERRORES = 6;

export const PUNTOS = {
  acierto: 10, // por cada aparición de la letra
  fallo: -5,
  pista: -15,
  victoria: 50,
  porVida: 10, // por cada vida restante al ganar
};

export const estadoInicial = {
  palabra: '',
  categoria: '',
  pista: '',
  letrasAcertadas: [],
  letrasFalladas: [],
  errores: 0,
  pistasDisponibles: 1,
  pistaVisible: false,
  puntaje: 0,
  bono: 0,
  multiplicador: 1,
  puntajeFinal: 0,
  tiempoRestante: null,
  estado: 'jugando', // 'jugando' | 'ganado' | 'perdido'
  motivo: null, // 'errores' | 'tiempo' cuando se pierde
  partida: 0, // identificador de la partida actual
};

// Pasa a mayúsculas y quita tildes y diéresis, pero conserva la Ñ.
export function normalizar(texto) {
  return texto
    .normalize('NFC')
    .toUpperCase()
    .replace(/Ñ/g, '\u0001')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\u0001/g, 'Ñ');
}

export function contarLetras(palabra) {
  return palabra.replace(/\s/g, '').length;
}

// Letras distintas (normalizadas) que hay que adivinar.
export function letrasDe(palabra) {
  return [...new Set(normalizar(palabra).replace(/[^A-ZÑ]/g, ''))];
}

// Filtra por categoría y longitud del nivel y devuelve una palabra al azar.
export function elegirPalabra(categoria, nivel, excluir) {
  const { min, max } = NIVELES[nivel];
  const deLaCategoria = PALABRAS.filter(
    (p) => categoria === ALEATORIA.id || p.categoria === categoria,
  );
  let candidatas = deLaCategoria.filter((p) => {
    const n = contarLetras(p.palabra);
    return n >= min && n <= max;
  });
  if (candidatas.length === 0) candidatas = deLaCategoria;
  if (candidatas.length > 1 && excluir) {
    candidatas = candidatas.filter((p) => p.palabra !== excluir);
  }
  return candidatas[Math.floor(Math.random() * candidatas.length)];
}

function crearPartida(categoria, nivel, anterior) {
  const entrada = elegirPalabra(categoria, nivel, anterior?.palabra);
  const config = NIVELES[nivel];
  return {
    ...estadoInicial,
    palabra: entrada.palabra,
    categoria: entrada.categoria,
    pista: entrada.pista,
    pistasDisponibles: config.pistas,
    multiplicador: config.multiplicador,
    tiempoRestante: config.tiempo,
    partida: (anterior?.partida ?? 0) + 1,
  };
}

function terminar(estado, gano, motivo = null) {
  const vidas = MAX_ERRORES - estado.errores;
  const bono = gano ? PUNTOS.victoria + vidas * PUNTOS.porVida : 0;
  const subtotal = estado.puntaje + bono;
  return {
    ...estado,
    estado: gano ? 'ganado' : 'perdido',
    motivo,
    bono,
    puntaje: subtotal,
    // El subtotal puede ser negativo durante la partida; el final nunca baja de 0
    puntajeFinal: Math.max(0, subtotal * estado.multiplicador),
  };
}

function verificarVictoria(estado) {
  const completa = letrasDe(estado.palabra).every((l) => estado.letrasAcertadas.includes(l));
  return completa ? terminar(estado, true) : estado;
}

export function reducer(estado, accion) {
  switch (accion.type) {
    case 'INICIAR':
      return accion.partida;

    case 'LETRA': {
      const { letra } = accion;
      if (estado.estado !== 'jugando') return estado;
      if (estado.letrasAcertadas.includes(letra) || estado.letrasFalladas.includes(letra)) {
        return estado;
      }
      const apariciones = [...normalizar(estado.palabra)].filter((c) => c === letra).length;
      if (apariciones > 0) {
        return verificarVictoria({
          ...estado,
          letrasAcertadas: [...estado.letrasAcertadas, letra],
          puntaje: estado.puntaje + apariciones * PUNTOS.acierto,
        });
      }
      const fallo = {
        ...estado,
        letrasFalladas: [...estado.letrasFalladas, letra],
        errores: estado.errores + 1,
        puntaje: estado.puntaje + PUNTOS.fallo,
      };
      return fallo.errores >= MAX_ERRORES ? terminar(fallo, false, 'errores') : fallo;
    }

    case 'PISTA': {
      if (estado.estado !== 'jugando' || estado.pistasDisponibles <= 0) return estado;
      const conCosto = {
        ...estado,
        pistasDisponibles: estado.pistasDisponibles - 1,
        puntaje: estado.puntaje + PUNTOS.pista,
      };
      // Primera pista: la descripción. Segunda pista: una letra al azar.
      if (!estado.pistaVisible) return { ...conCosto, pistaVisible: true };
      if (!accion.letra) return estado;
      return verificarVictoria({
        ...conCosto,
        letrasAcertadas: [...estado.letrasAcertadas, accion.letra],
      });
    }

    case 'TICK': {
      if (estado.estado !== 'jugando' || estado.tiempoRestante === null) return estado;
      const tiempoRestante = estado.tiempoRestante - 1;
      if (tiempoRestante <= 0) return terminar({ ...estado, tiempoRestante: 0 }, false, 'tiempo');
      return { ...estado, tiempoRestante };
    }

    default:
      return estado;
  }
}

export default function useJuego(categoria, nivel, { pausado = false } = {}) {
  const [estado, dispatch] = useReducer(reducer, undefined, () => crearPartida(categoria, nivel));
  const [appActiva, setAppActiva] = useState(AppState.currentState !== 'background');

  // El cronómetro se detiene si la app pasa a segundo plano.
  useEffect(() => {
    const sub = AppState.addEventListener('change', (s) => setAppActiva(s === 'active'));
    return () => sub.remove();
  }, []);

  const enJuego = estado.estado === 'jugando';
  const conTiempo = estado.tiempoRestante !== null;

  useEffect(() => {
    if (!enJuego || !conTiempo || pausado || !appActiva) return undefined;
    const id = setInterval(() => dispatch({ type: 'TICK' }), 1000);
    return () => clearInterval(id);
  }, [enJuego, conTiempo, pausado, appActiva, estado.partida]);

  // Devuelve 'acierto', 'fallo', 'ganado', 'perdido' o null si la letra no cuenta.
  const procesarLetra = useCallback(
    (letra) => {
      const accion = { type: 'LETRA', letra };
      const siguiente = reducer(estado, accion);
      if (siguiente === estado) return null;
      dispatch(accion);
      if (siguiente.estado !== 'jugando') return siguiente.estado;
      return siguiente.errores > estado.errores ? 'fallo' : 'acierto';
    },
    [estado],
  );

  // Devuelve 'descripcion', 'letra' o null si no quedan pistas.
  const usarPista = useCallback(() => {
    if (estado.estado !== 'jugando' || estado.pistasDisponibles <= 0) return null;
    let letra = null;
    if (estado.pistaVisible) {
      const faltantes = letrasDe(estado.palabra).filter((l) => !estado.letrasAcertadas.includes(l));
      letra = faltantes[Math.floor(Math.random() * faltantes.length)];
    }
    dispatch({ type: 'PISTA', letra });
    return letra ? 'letra' : 'descripcion';
  }, [estado]);

  const nuevaPartida = useCallback(() => {
    dispatch({ type: 'INICIAR', partida: crearPartida(categoria, nivel, estado) });
  }, [categoria, nivel, estado]);

  return {
    ...estado,
    vidas: MAX_ERRORES - estado.errores,
    procesarLetra,
    usarPista,
    nuevaPartida,
  };
}
