// Selección de categoría (con el mejor puntaje del jugador en cada una)
// y del nivel de dificultad antes de empezar la partida.
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Boton from '../components/Boton';
import { useApp } from '../hooks/useApp';
import { ALEATORIA, CATEGORIAS, NIVELES, describirNivel } from '../data/palabras';
import { mejorPuntaje } from '../storage/almacenamiento';

export default function CategoriaScreen({ navigation }) {
  const { colores, jugador, estadisticas } = useApp();
  const insets = useSafeAreaInsets();
  const [categoria, setCategoria] = useState(CATEGORIAS[0].id);
  const [nivel, setNivel] = useState('facil');

  const mejorDe = (id) =>
    id === ALEATORIA.id
      ? Math.max(0, ...CATEGORIAS.map((c) => mejorPuntaje(estadisticas, jugador, c.id)))
      : mejorPuntaje(estadisticas, jugador, id);

  const renderCategoria = (item, ancho) => (
    <TarjetaCategoria
      categoria={item}
      mejor={mejorDe(item.id)}
      seleccionada={categoria === item.id}
      onPress={() => setCategoria(item.id)}
      colores={colores}
      ancho={ancho}
    />
  );

  return (
    <View style={[styles.pantalla, { backgroundColor: colores.fondo }]}>
      <FlatList
        data={CATEGORIAS}
        keyExtractor={(c) => c.id}
        numColumns={2}
        columnWrapperStyle={styles.columnas}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => renderCategoria(item)}
        ListHeaderComponent={
          <View style={styles.encabezado}>
            <Text style={[styles.saludo, { color: colores.texto }]}>¡Hola, {jugador}!</Text>
            <Text style={[styles.seccion, { color: colores.texto }]} accessibilityRole="header">
              Elige una categoría
            </Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.pie}>
            {renderCategoria(ALEATORIA, 'completo')}

            <Text style={[styles.seccion, { color: colores.texto }]} accessibilityRole="header">
              Nivel de dificultad
            </Text>
            {Object.values(NIVELES).map((n) => (
              <OpcionNivel
                key={n.id}
                nivel={n}
                seleccionado={nivel === n.id}
                onPress={() => setNivel(n.id)}
                colores={colores}
              />
            ))}
          </View>
        }
      />

      <View
        style={[
          styles.barra,
          {
            paddingBottom: insets.bottom + 12,
            backgroundColor: colores.fondo,
            borderTopColor: colores.borde,
          },
        ]}
      >
        <Boton
          titulo="Comenzar"
          icono="gamepad-variant-outline"
          onPress={() => navigation.navigate('Juego', { categoria, nivel })}
          colores={colores}
        />
      </View>
    </View>
  );
}

function TarjetaCategoria({ categoria, mejor, seleccionada, onPress, colores, ancho }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ checked: seleccionada }}
      accessibilityLabel={`${categoria.nombre}. Mejor puntaje ${mejor}`}
      style={[
        styles.tarjeta,
        ancho === 'completo' ? styles.tarjetaCompleta : styles.tarjetaMitad,
        {
          backgroundColor: seleccionada ? colores.primario : colores.superficie,
          borderColor: seleccionada ? colores.primario : colores.borde,
        },
      ]}
    >
      <View
        style={[
          styles.icono,
          { backgroundColor: seleccionada ? 'rgba(255,255,255,0.2)' : colores.fondo },
        ]}
      >
        <MaterialCommunityIcons
          name={categoria.icono}
          size={30}
          color={seleccionada ? '#FFFFFF' : colores.primario}
        />
      </View>
      <View style={ancho === 'completo' ? styles.textoCompleto : null}>
        <Text
          style={[
            styles.nombre,
            ancho !== 'completo' && styles.centrado,
            { color: seleccionada ? '#FFFFFF' : colores.texto },
          ]}
        >
          {categoria.nombre}
        </Text>
        <Text
          style={[
            styles.mejor,
            ancho !== 'completo' && styles.centrado,
            { color: seleccionada ? '#E3ECF7' : colores.textoSecundario },
          ]}
        >
          {mejor > 0 ? `Tu mejor: ${mejor} pts` : 'Sin puntaje aún'}
        </Text>
      </View>
    </Pressable>
  );
}

function OpcionNivel({ nivel, seleccionado, onPress, colores }) {
  const { letras, pistas, tiempo } = describirNivel(nivel);
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ checked: seleccionado }}
      accessibilityLabel={`Nivel ${nivel.nombre}: ${letras}, ${pistas}, tiempo ${tiempo}, multiplicador ${nivel.multiplicador}`}
      style={[
        styles.nivel,
        {
          backgroundColor: seleccionado ? colores.superficie : colores.fondo,
          borderColor: seleccionado ? colores.primario : colores.borde,
        },
      ]}
    >
      <MaterialCommunityIcons
        name={seleccionado ? 'radiobox-marked' : 'radiobox-blank'}
        size={24}
        color={seleccionado ? colores.primario : colores.textoSecundario}
      />
      <View style={styles.textoNivel}>
        <Text style={[styles.nombreNivel, { color: colores.texto }]}>{nivel.nombre}</Text>
        <Text style={[styles.detalleNivel, { color: colores.textoSecundario }]}>
          {letras} · {pistas} · {tiempo}
        </Text>
      </View>
      <Text style={[styles.multiplicador, { color: colores.primario }]}>
        x{nivel.multiplicador}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
  },
  lista: {
    padding: 16,
    gap: 12,
  },
  columnas: {
    gap: 12,
  },
  encabezado: {
    gap: 4,
  },
  saludo: {
    fontSize: 16,
  },
  seccion: {
    fontSize: 20,
    fontWeight: '800',
    marginTop: 4,
  },
  pie: {
    gap: 12,
  },
  tarjeta: {
    borderRadius: 16,
    borderWidth: 2,
    padding: 14,
    gap: 8,
  },
  tarjetaMitad: {
    flex: 1,
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'center',
  },
  tarjetaCompleta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  textoCompleto: {
    flex: 1,
  },
  icono: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nombre: {
    fontSize: 16,
    fontWeight: '700',
  },
  centrado: {
    textAlign: 'center',
  },
  mejor: {
    fontSize: 14,
    marginTop: 2,
  },
  nivel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 56,
  },
  textoNivel: {
    flex: 1,
  },
  nombreNivel: {
    fontSize: 17,
    fontWeight: '700',
  },
  detalleNivel: {
    fontSize: 14,
  },
  multiplicador: {
    fontSize: 18,
    fontWeight: '800',
  },
  barra: {
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
  },
});
