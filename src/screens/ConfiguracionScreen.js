// Opciones de sonido, vibración y tema, y borrado de estadísticas.
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import Boton from '../components/Boton';
import { useApp } from '../hooks/useApp';
import { avisar, confirmar } from '../utils/dialogos';

export default function ConfiguracionScreen() {
  const { colores, config, actualizarConfig, borrarEstadisticas } = useApp();
  const insets = useSafeAreaInsets();

  const pedirBorrado = () => {
    confirmar({
      titulo: '¿Borrar estadísticas?',
      mensaje:
        'Se eliminarán las partidas jugadas, las rachas y el top 10. Esta acción no se puede deshacer.',
      textoAceptar: 'Borrar',
      destructivo: true,
      onAceptar: () => {
        borrarEstadisticas();
        avisar('Listo', 'Las estadísticas se borraron.');
      },
    });
  };

  return (
    <ScrollView
      style={{ backgroundColor: colores.fondo }}
      contentContainerStyle={[styles.contenido, { paddingBottom: insets.bottom + 24 }]}
    >
      <Text style={[styles.seccion, { color: colores.textoSecundario }]}>PREFERENCIAS</Text>
      <View style={[styles.grupo, { backgroundColor: colores.superficie }]}>
        <Opcion
          icono="volume-high"
          titulo="Sonido"
          descripcion="Efectos al acertar, fallar, ganar o perder"
          valor={config.sonido}
          onCambio={(sonido) => actualizarConfig({ sonido })}
          colores={colores}
        />
        <View style={[styles.separador, { backgroundColor: colores.borde }]} />
        <Opcion
          icono="vibrate"
          titulo="Vibración"
          descripcion="Vibra al tocar letras y al terminar"
          valor={config.vibracion}
          onCambio={(vibracion) => actualizarConfig({ vibracion })}
          colores={colores}
        />
        <View style={[styles.separador, { backgroundColor: colores.borde }]} />
        <Opcion
          icono="theme-light-dark"
          titulo="Tema oscuro"
          descripcion="Colores oscuros para jugar de noche"
          valor={config.tema === 'oscuro'}
          onCambio={(oscuro) => actualizarConfig({ tema: oscuro ? 'oscuro' : 'claro' })}
          colores={colores}
        />
      </View>

      <Text style={[styles.seccion, { color: colores.textoSecundario }]}>DATOS</Text>
      <Boton
        titulo="Borrar estadísticas"
        icono="delete-outline"
        variante="peligro"
        onPress={pedirBorrado}
        colores={colores}
      />

      <Text style={[styles.seccion, { color: colores.textoSecundario }]}>ACERCA DE</Text>
      <View style={[styles.grupo, styles.acerca, { backgroundColor: colores.superficie }]}>
        <Text style={[styles.titulo, { color: colores.texto }]}>El Ahorcado Móvil</Text>
        <Text style={[styles.descripcion, { color: colores.textoSecundario }]}>
          Versión {Constants.expoConfig?.version ?? '1.0.0'}
        </Text>
        <Text style={[styles.descripcion, { color: colores.textoSecundario }]}>
          Desarrollado por Andres Parada
        </Text>
        <Text style={[styles.descripcion, { color: colores.textoSecundario }]}>
          Programación Móvil · Uniciencia · Docente Carlos Carrascal
        </Text>
      </View>
    </ScrollView>
  );
}

function Opcion({ icono, titulo, descripcion, valor, onCambio, colores }) {
  return (
    <View style={styles.opcion}>
      <MaterialCommunityIcons name={icono} size={26} color={colores.primario} />
      <View style={styles.textos}>
        <Text style={[styles.titulo, { color: colores.texto }]}>{titulo}</Text>
        <Text style={[styles.descripcion, { color: colores.textoSecundario }]}>{descripcion}</Text>
      </View>
      <Switch
        value={valor}
        onValueChange={onCambio}
        accessibilityLabel={titulo}
        trackColor={{ false: colores.deshabilitado, true: colores.acierto }}
        thumbColor="#FFFFFF"
        ios_backgroundColor={colores.deshabilitado}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenido: {
    padding: 16,
    gap: 10,
  },
  seccion: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 12,
    marginLeft: 4,
  },
  grupo: {
    borderRadius: 16,
    paddingHorizontal: 14,
  },
  opcion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    minHeight: 64,
    paddingVertical: 10,
  },
  textos: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
  },
  descripcion: {
    fontSize: 14,
  },
  separador: {
    height: 1,
    marginLeft: 40,
  },
  acerca: {
    paddingVertical: 14,
    gap: 4,
  },
});
