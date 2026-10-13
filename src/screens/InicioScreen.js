// Pantalla de inicio: nombre del jugador (obligatorio) y menú principal.
import { useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ahorcado from '../components/Ahorcado';
import Boton from '../components/Boton';
import { useApp } from '../hooks/useApp';

export default function InicioScreen({ navigation }) {
  const { colores, jugador, setJugador } = useApp();
  const insets = useSafeAreaInsets();
  const [nombre, setNombre] = useState(jugador);
  const [error, setError] = useState('');

  const jugar = () => {
    const limpio = nombre.trim();
    if (!limpio) {
      setError('Escribe tu nombre para poder jugar.');
      return;
    }
    setError('');
    setJugador(limpio);
    Keyboard.dismiss();
    navigation.navigate('Categoria');
  };

  return (
    <ScrollView
      style={{ backgroundColor: colores.fondo }}
      contentContainerStyle={[styles.contenido, { paddingBottom: insets.bottom + 16 }]}
      keyboardShouldPersistTaps="handled"
    >
      <View
        style={[
          styles.encabezado,
          { backgroundColor: colores.encabezado, paddingTop: insets.top + 24 },
        ]}
      >
        <View style={styles.logo}>
          <Ahorcado errores={6} color="#FFFFFF" />
        </View>
        <Text style={styles.titulo} accessibilityRole="header">
          El Ahorcado Móvil
        </Text>
        <Text style={styles.subtitulo}>Adivina palabras de Colombia</Text>
      </View>

      <View style={styles.cuerpo}>
        <Text style={[styles.etiqueta, { color: colores.texto }]} nativeID="etiquetaNombre">
          ¿Cómo te llamas?
        </Text>
        <TextInput
          value={nombre}
          onChangeText={(texto) => {
            setNombre(texto);
            if (error) setError('');
          }}
          onSubmitEditing={jugar}
          placeholder="Escribe tu nombre"
          placeholderTextColor={colores.textoSecundario}
          autoCapitalize="words"
          autoCorrect={false}
          maxLength={20}
          returnKeyType="go"
          accessibilityLabelledBy="etiquetaNombre"
          accessibilityLabel="Nombre del jugador"
          style={[
            styles.campo,
            {
              color: colores.texto,
              backgroundColor: colores.superficie,
              borderColor: error ? colores.fallo : colores.borde,
            },
          ]}
        />
        {error ? (
          <Text style={[styles.error, { color: colores.fallo }]} accessibilityLiveRegion="polite">
            {error}
          </Text>
        ) : null}

        <Boton
          titulo="Jugar"
          icono="play-circle-outline"
          onPress={jugar}
          colores={colores}
          estilo={styles.jugar}
        />

        <Boton
          titulo="Instrucciones"
          icono="book-open-variant"
          variante="secundario"
          onPress={() => navigation.navigate('Instrucciones')}
          colores={colores}
        />
        <Boton
          titulo="Estadísticas"
          icono="chart-bar"
          variante="secundario"
          onPress={() => navigation.navigate('Estadisticas')}
          colores={colores}
        />
        <Boton
          titulo="Configuración"
          icono="cog-outline"
          variante="secundario"
          onPress={() => navigation.navigate('Configuracion')}
          colores={colores}
        />
      </View>

      <Text style={[styles.creditos, { color: colores.textoSecundario }]}>
        Andres Parada · Uniciencia
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenido: {
    flexGrow: 1,
  },
  encabezado: {
    alignItems: 'center',
    paddingBottom: 28,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 8,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  subtitulo: {
    color: '#C9D6EA',
    fontSize: 16,
    marginTop: 4,
  },
  cuerpo: {
    padding: 24,
    gap: 12,
  },
  etiqueta: {
    fontSize: 16,
    fontWeight: '700',
  },
  campo: {
    minHeight: 52,
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  error: {
    fontSize: 14,
    fontWeight: '600',
  },
  jugar: {
    marginTop: 8,
    marginBottom: 8,
  },
  creditos: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 'auto',
  },
});
