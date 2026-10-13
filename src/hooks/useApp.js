// Estado global de la app: jugador actual, configuración, tema,
// estadísticas y ranking. Cada cambio se guarda en AsyncStorage.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { obtenerTema } from '../theme/colores';
import {
  CONFIG_INICIAL,
  STATS_INICIALES,
  actualizarEstadisticas,
  actualizarRanking,
  guardarConfig,
  guardarEstadisticas,
} from '../storage/almacenamiento';

const AppContext = createContext(null);

export function AppProvider({ datosIniciales, children }) {
  const [jugador, setJugador] = useState('');
  const [config, setConfig] = useState(datosIniciales?.config ?? CONFIG_INICIAL);
  const [estadisticas, setEstadisticas] = useState(datosIniciales?.estadisticas ?? STATS_INICIALES);
  const [ranking, setRanking] = useState(datosIniciales?.ranking ?? []);

  useEffect(() => {
    guardarConfig(config);
  }, [config]);

  useEffect(() => {
    guardarEstadisticas(estadisticas, ranking);
  }, [estadisticas, ranking]);

  const actualizarConfig = useCallback((cambios) => {
    setConfig((actual) => ({ ...actual, ...cambios }));
  }, []);

  // Se llama una vez al terminar cada partida.
  const registrarPartida = useCallback(({ nombre, categoria, nivel, puntaje, gano }) => {
    setEstadisticas((actual) => actualizarEstadisticas(actual, { nombre, categoria, puntaje, gano }));
    setRanking((actual) =>
      actualizarRanking(actual, {
        nombre,
        puntaje,
        categoria,
        nivel,
        fecha: new Date().toISOString(),
      }),
    );
  }, []);

  const borrarEstadisticas = useCallback(() => {
    setEstadisticas(STATS_INICIALES);
    setRanking([]);
  }, []);

  const valor = useMemo(
    () => ({
      jugador,
      setJugador,
      config,
      actualizarConfig,
      colores: obtenerTema(config.tema),
      estadisticas,
      ranking,
      registrarPartida,
      borrarEstadisticas,
    }),
    [jugador, config, actualizarConfig, estadisticas, ranking, registrarPartida, borrarEstadisticas],
  );

  return <AppContext.Provider value={valor}>{children}</AppContext.Provider>;
}

export function useApp() {
  const contexto = useContext(AppContext);
  if (!contexto) throw new Error('useApp debe usarse dentro de <AppProvider>');
  return contexto;
}
