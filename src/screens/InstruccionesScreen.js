// Reglas del juego, niveles de dificultad y sistema de puntuación.
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../hooks/useApp';
import { NIVELES, describirNivel } from '../data/palabras';
import { MAX_ERRORES, PUNTOS } from '../hooks/useJuego';

const REGLAS = [
  'Escribe tu nombre en la pantalla de inicio.',
  'Elige una categoría (o «Aleatoria») y un nivel de dificultad.',
  'La palabra aparece oculta con un guion por letra. En palabras compuestas, como SANTA MARTA, los espacios se ven desde el inicio.',
  'Toca una letra del teclado. Cada letra se usa una sola vez: después se deshabilita y cambia de color.',
  'Si la letra está en la palabra, se revela en todas sus posiciones, sumas puntos y el celular vibra.',
  'Si no está, se dibuja una parte del ahorcado: cabeza, cuerpo, brazos y piernas.',
  'Las tildes no cuentan como letras distintas: la «O» revela también la «Ó». La Ñ sí es una letra propia.',
  `Ganas si descubres la palabra antes de cometer ${MAX_ERRORES} errores. En nivel difícil también pierdes si se agota el tiempo.`,
];

export default function InstruccionesScreen() {
  const { colores } = useApp();
  const insets = useSafeAreaInsets();

  const puntuacion = [
    ['Letra correcta (por cada aparición)', `+${PUNTOS.acierto}`],
    ['Letra incorrecta', `${PUNTOS.fallo}`],
    ['Usar una pista', `${PUNTOS.pista}`],
    ['Ganar la partida', `+${PUNTOS.victoria} + (vidas × ${PUNTOS.porVida})`],
    ['Puntaje final', 'Subtotal × multiplicador'],
  ];

  return (
    <ScrollView
      style={{ backgroundColor: colores.fondo }}
      contentContainerStyle={[styles.contenido, { paddingBottom: insets.bottom + 24 }]}
    >
      <Seccion titulo="Cómo se juega" icono="gamepad-variant-outline" colores={colores}>
        {REGLAS.map((regla, i) => (
          <View key={i} style={styles.regla}>
            <View style={[styles.numero, { backgroundColor: colores.primario }]}>
              <Text style={styles.textoNumero}>{i + 1}</Text>
            </View>
            <Text style={[styles.texto, { color: colores.texto }]}>{regla}</Text>
          </View>
        ))}
      </Seccion>

      <Seccion titulo="Niveles de dificultad" icono="speedometer" colores={colores}>
        {Object.values(NIVELES).map((nivel) => {
          const t = describirNivel(nivel);
          return (
            <View key={nivel.id} style={[styles.tarjeta, { backgroundColor: colores.superficie }]}>
              <View style={styles.filaTitulo}>
                <Text style={[styles.subtitulo, { color: colores.texto }]}>{nivel.nombre}</Text>
                <Text style={[styles.multiplicador, { color: colores.primario }]}>
                  x{nivel.multiplicador}
                </Text>
              </View>
              <Text style={[styles.texto, { color: colores.textoSecundario }]}>
                {t.letras} · {t.pistas} · {t.tiempo}
              </Text>
            </View>
          );
        })}
        <Text style={[styles.nota, { color: colores.textoSecundario }]}>
          La primera pista muestra una descripción de la palabra y la segunda revela una letra al
          azar.
        </Text>
      </Seccion>

      <Seccion titulo="Puntuación" icono="star-four-points-outline" colores={colores}>
        <View style={[styles.tabla, { borderColor: colores.borde }]}>
          {puntuacion.map(([accion, puntos], i) => (
            <View
              key={accion}
              style={[
                styles.filaTabla,
                { backgroundColor: i % 2 ? colores.fondo : colores.superficie },
              ]}
            >
              <Text style={[styles.texto, styles.celdaAccion, { color: colores.texto }]}>
                {accion}
              </Text>
              <Text style={[styles.texto, styles.celdaPuntos, { color: colores.texto }]}>
                {puntos}
              </Text>
            </View>
          ))}
        </View>
        <Text style={[styles.nota, { color: colores.textoSecundario }]}>
          El puntaje final nunca es negativo. Tus estadísticas y el top 10 se guardan en el celular.
        </Text>
      </Seccion>
    </ScrollView>
  );
}

function Seccion({ titulo, icono, colores, children }) {
  return (
    <View style={styles.seccion}>
      <View style={styles.encabezadoSeccion}>
        <MaterialCommunityIcons name={icono} size={24} color={colores.primario} />
        <Text style={[styles.titulo, { color: colores.texto }]} accessibilityRole="header">
          {titulo}
        </Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  contenido: {
    padding: 20,
    gap: 28,
  },
  seccion: {
    gap: 12,
  },
  encabezadoSeccion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titulo: {
    fontSize: 20,
    fontWeight: '800',
  },
  regla: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  numero: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  textoNumero: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  texto: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  tarjeta: {
    borderRadius: 14,
    padding: 14,
    gap: 4,
  },
  filaTitulo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subtitulo: {
    fontSize: 17,
    fontWeight: '700',
  },
  multiplicador: {
    fontSize: 17,
    fontWeight: '800',
  },
  nota: {
    fontSize: 14,
    lineHeight: 20,
  },
  tabla: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  filaTabla: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 12,
  },
  celdaAccion: {
    flex: 3,
  },
  celdaPuntos: {
    flex: 2,
    textAlign: 'right',
    fontWeight: '700',
  },
});
