// Totales de partidas, porcentaje de victorias, rachas y top 10 de puntajes.
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../hooks/useApp';
import { NIVELES, nombreCategoria } from '../data/palabras';

const COLORES_MEDALLA = ['#E0A800', '#9AA4B1', '#B87333'];

function formatearFecha(iso) {
  const f = new Date(iso);
  const dd = String(f.getDate()).padStart(2, '0');
  const mm = String(f.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${f.getFullYear()}`;
}

export default function EstadisticasScreen() {
  const { colores, estadisticas, ranking } = useApp();
  const insets = useSafeAreaInsets();
  const { jugadas, ganadas, perdidas, rachaActual, mejorRacha } = estadisticas;
  const porcentaje = jugadas > 0 ? Math.round((ganadas / jugadas) * 100) : 0;

  const resumen = [
    { icono: 'gamepad-variant-outline', valor: jugadas, etiqueta: 'Jugadas' },
    { icono: 'check-circle-outline', valor: ganadas, etiqueta: 'Ganadas' },
    { icono: 'close-circle-outline', valor: perdidas, etiqueta: 'Perdidas' },
    { icono: 'percent', valor: `${porcentaje}%`, etiqueta: 'Victorias' },
    { icono: 'fire', valor: rachaActual, etiqueta: 'Racha actual' },
    { icono: 'medal-outline', valor: mejorRacha, etiqueta: 'Mejor racha' },
  ];

  return (
    <FlatList
      style={{ backgroundColor: colores.fondo }}
      contentContainerStyle={[styles.contenido, { paddingBottom: insets.bottom + 24 }]}
      data={ranking}
      keyExtractor={(item, i) => `${item.fecha}-${i}`}
      ListHeaderComponent={
        <View style={styles.encabezado}>
          <View style={styles.cuadricula}>
            {resumen.map((r) => (
              <View
                key={r.etiqueta}
                style={[styles.tarjeta, { backgroundColor: colores.superficie }]}
                accessible
                accessibilityLabel={`${r.etiqueta}: ${r.valor}`}
              >
                <MaterialCommunityIcons name={r.icono} size={24} color={colores.primario} />
                <Text style={[styles.valor, { color: colores.texto }]}>{r.valor}</Text>
                <Text style={[styles.etiqueta, { color: colores.textoSecundario }]}>
                  {r.etiqueta}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.tituloRanking}>
            <MaterialCommunityIcons name="trophy-outline" size={24} color={colores.primario} />
            <Text style={[styles.titulo, { color: colores.texto }]} accessibilityRole="header">
              Top 10 de puntajes
            </Text>
          </View>
        </View>
      }
      ListEmptyComponent={
        <Text style={[styles.vacio, { color: colores.textoSecundario }]}>
          Aún no hay puntajes guardados. ¡Juega una partida!
        </Text>
      }
      ItemSeparatorComponent={() => (
        <View style={[styles.separador, { backgroundColor: colores.borde }]} />
      )}
      renderItem={({ item, index }) => (
        <View
          style={styles.fila}
          accessible
          accessibilityLabel={`Puesto ${index + 1}: ${item.nombre}, ${item.puntaje} puntos`}
        >
          <View
            style={[
              styles.puesto,
              { backgroundColor: COLORES_MEDALLA[index] ?? colores.superficie },
            ]}
          >
            <Text style={[styles.textoPuesto, { color: index < 3 ? '#FFFFFF' : colores.texto }]}>
              {index + 1}
            </Text>
          </View>
          <View style={styles.datos}>
            <Text style={[styles.nombre, { color: colores.texto }]} numberOfLines={1}>
              {item.nombre}
            </Text>
            <Text style={[styles.detalle, { color: colores.textoSecundario }]} numberOfLines={1}>
              {nombreCategoria(item.categoria)} · {NIVELES[item.nivel]?.nombre} ·{' '}
              {formatearFecha(item.fecha)}
            </Text>
          </View>
          <Text style={[styles.puntaje, { color: colores.primario }]}>{item.puntaje}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  contenido: {
    padding: 16,
  },
  encabezado: {
    gap: 20,
    marginBottom: 8,
  },
  cuadricula: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tarjeta: {
    flexBasis: '30%',
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 2,
  },
  valor: {
    fontSize: 24,
    fontWeight: '800',
  },
  etiqueta: {
    fontSize: 14,
  },
  tituloRanking: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titulo: {
    fontSize: 20,
    fontWeight: '800',
  },
  vacio: {
    textAlign: 'center',
    fontSize: 15,
    paddingVertical: 24,
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    minHeight: 56,
  },
  puesto: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoPuesto: {
    fontSize: 16,
    fontWeight: '800',
  },
  datos: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: '700',
  },
  detalle: {
    fontSize: 14,
  },
  puntaje: {
    fontSize: 20,
    fontWeight: '800',
  },
  separador: {
    height: 1,
  },
});
