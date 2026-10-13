// Muestra la palabra con un guion por letra. Los espacios de las palabras
// compuestas se ven desde el inicio y las letras se comparan sin tildes.
import { memo } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { normalizar } from '../hooks/useJuego';

const MARGEN = 32;
const SEPARACION = 4;

function PalabraOculta({ palabra, letrasAcertadas, revelar = false, colores }) {
  const { width } = useWindowDimensions();
  const palabras = palabra.split(' ');
  const masLarga = Math.max(...palabras.map((p) => p.length));

  // La casilla se encoge para que la palabra más larga quepa en una línea
  const casilla = Math.min(34, Math.floor((width - MARGEN) / masLarga) - SEPARACION);
  const fuente = Math.round(casilla * 0.75);

  const descubiertas = [...palabra].filter(
    (c) => c !== ' ' && letrasAcertadas.includes(normalizar(c)),
  ).length;

  return (
    <View
      style={styles.contenedor}
      accessible
      accessibilityLabel={`Palabra de ${palabra.replace(/\s/g, '').length} letras, ${descubiertas} descubiertas`}
    >
      {palabras.map((parte, i) => (
        <View key={`${parte}-${i}`} style={[styles.palabra, { gap: SEPARACION }]}>
          {[...parte].map((letra, j) => {
            const acertada = letrasAcertadas.includes(normalizar(letra));
            const visible = acertada || revelar;
            return (
              <View
                key={j}
                style={[styles.casilla, { width: casilla, borderBottomColor: colores.texto }]}
              >
                <Text
                  style={[
                    styles.letra,
                    { fontSize: fuente, color: acertada ? colores.texto : colores.fallo },
                  ]}
                >
                  {visible ? letra : ' '}
                </Text>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap: 18,
    rowGap: 6,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  palabra: {
    flexDirection: 'row',
  },
  casilla: {
    alignItems: 'center',
    borderBottomWidth: 3,
    paddingBottom: 2,
  },
  letra: {
    fontWeight: '700',
  },
});

export default memo(PalabraOculta);
