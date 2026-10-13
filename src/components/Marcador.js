// Barra superior de la partida: vidas, puntaje y cronómetro (nivel difícil).
import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MAX_ERRORES } from '../hooks/useJuego';

function formatearTiempo(segundos) {
  const m = Math.floor(segundos / 60);
  const s = segundos % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function Marcador({ vidas, puntaje, multiplicador, tiempoRestante, colores }) {
  const urgente = tiempoRestante !== null && tiempoRestante <= 10;

  return (
    <View style={[styles.contenedor, { backgroundColor: colores.superficie }]}>
      <View
        style={styles.bloque}
        accessible
        accessibilityLabel={`${vidas} de ${MAX_ERRORES} vidas`}
      >
        <View style={styles.vidas}>
          {Array.from({ length: MAX_ERRORES }, (_, i) => (
            <MaterialCommunityIcons
              key={i}
              name={i < vidas ? 'heart' : 'heart-outline'}
              size={18}
              color={i < vidas ? colores.fallo : colores.deshabilitado}
            />
          ))}
        </View>
        <Text style={[styles.etiqueta, { color: colores.textoSecundario }]}>Vidas</Text>
      </View>

      <View style={styles.bloque} accessible accessibilityLabel={`Puntaje ${puntaje}`}>
        <Text style={[styles.valor, { color: colores.texto }]}>{puntaje}</Text>
        <Text style={[styles.etiqueta, { color: colores.textoSecundario }]}>
          Puntos · x{multiplicador}
        </Text>
      </View>

      {tiempoRestante !== null && (
        <View
          style={styles.bloque}
          accessible
          accessibilityLabel={`Quedan ${tiempoRestante} segundos`}
        >
          <View style={styles.fila}>
            <MaterialCommunityIcons
              name="timer-outline"
              size={20}
              color={urgente ? colores.fallo : colores.texto}
            />
            <Text style={[styles.valor, { color: urgente ? colores.fallo : colores.texto }]}>
              {formatearTiempo(tiempoRestante)}
            </Text>
          </View>
          <Text style={[styles.etiqueta, { color: colores.textoSecundario }]}>Tiempo</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 8,
    paddingVertical: 6,
    borderRadius: 14,
  },
  bloque: {
    alignItems: 'center',
    gap: 2,
  },
  vidas: {
    flexDirection: 'row',
    gap: 2,
    height: 26,
    alignItems: 'center',
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  valor: {
    fontSize: 20,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  etiqueta: {
    fontSize: 14,
  },
});

export default memo(Marcador);
