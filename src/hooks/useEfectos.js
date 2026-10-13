// Sonidos (expo-audio) y vibraciones (expo-haptics) del juego.
// Respeta las opciones de sonido y vibración de la configuración.
import { useCallback, useMemo } from 'react';
import { useAudioPlayer } from 'expo-audio';
import * as Haptics from 'expo-haptics';
import { useApp } from './useApp';

const SONIDOS = {
  acierto: require('../../assets/sonidos/acierto.wav'),
  error: require('../../assets/sonidos/error.wav'),
  victoria: require('../../assets/sonidos/victoria.wav'),
  derrota: require('../../assets/sonidos/derrota.wav'),
};

export default function useEfectos() {
  const { config } = useApp();
  const acierto = useAudioPlayer(SONIDOS.acierto);
  const error = useAudioPlayer(SONIDOS.error);
  const victoria = useAudioPlayer(SONIDOS.victoria);
  const derrota = useAudioPlayer(SONIDOS.derrota);

  const sonar = useCallback(
    (player) => {
      if (!config.sonido) return;
      try {
        // expo-audio no vuelve al inicio al terminar: hay que rebobinar antes de reproducir
        player.seekTo(0);
        player.play();
      } catch (e) {
        console.warn('No se pudo reproducir el sonido', e);
      }
    },
    [config.sonido],
  );

  const vibrar = useCallback(
    (accion) => {
      if (!config.vibracion) return;
      accion().catch(() => {});
    },
    [config.vibracion],
  );

  return useMemo(
    () => ({
      acierto: () => {
        sonar(acierto);
        vibrar(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light));
      },
      error: () => {
        sonar(error);
        vibrar(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error));
      },
      pista: () => {
        vibrar(() => Haptics.selectionAsync());
      },
      victoria: () => {
        sonar(victoria);
        vibrar(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success));
      },
      derrota: () => {
        sonar(derrota);
        vibrar(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning));
      },
    }),
    [sonar, vibrar, acierto, error, victoria, derrota],
  );
}
