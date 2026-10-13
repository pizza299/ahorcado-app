// Pantalla de carga con el logo y el nombre de la app. Se muestra
// mientras se leen la configuración y las estadísticas de AsyncStorage.
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Ahorcado from './Ahorcado';
import { PALETA } from '../theme/colores';

export default function Splash({ onLayout }) {
  return (
    <View style={styles.contenedor} onLayout={onLayout}>
      <View style={styles.logo}>
        <Ahorcado errores={6} color="#FFFFFF" />
      </View>
      <Text style={styles.titulo}>El Ahorcado Móvil</Text>
      <Text style={styles.subtitulo}>Palabras de Colombia</Text>
      <ActivityIndicator color={PALETA.amarillo} size="large" style={styles.cargando} />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: PALETA.azulOscuro,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 16,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
  },
  subtitulo: {
    color: '#C9D6EA',
    fontSize: 16,
    marginTop: 4,
  },
  cargando: {
    marginTop: 32,
  },
});
