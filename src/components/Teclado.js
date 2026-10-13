// Teclado en pantalla de la A a la Z con Ñ. Cada tecla tiene cuatro
// estados: disponible, acertada (verde), fallada (roja) y deshabilitada.
// El número de columnas se ajusta al ancho para que las teclas midan
// al menos 48 x 48 dp y el teclado quepa sin desplazarse.
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

export const LETRAS = [...'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'];

const TAMANO_MINIMO = 48;
const TAMANO_MAXIMO = 56;
const SEPARACION = 4;
const MARGEN = 8;

// Reparte las letras en filas lo más parejas posible (p. ej. 7-7-7-6 o 6-6-5-5-5).
function repartirEnFilas(letras, columnas) {
  const numFilas = Math.ceil(letras.length / columnas);
  const base = Math.floor(letras.length / numFilas);
  const sobrantes = letras.length % numFilas;
  const filas = [];
  let inicio = 0;
  for (let i = 0; i < numFilas; i++) {
    const tamano = base + (i < sobrantes ? 1 : 0);
    filas.push(letras.slice(inicio, inicio + tamano));
    inicio += tamano;
  }
  return filas;
}

function Teclado({ letrasAcertadas, letrasFalladas, onLetra, deshabilitado = false, colores }) {
  const { width } = useWindowDimensions();
  const disponible = width - MARGEN * 2;
  const columnas = disponible >= 7 * TAMANO_MINIMO + 6 * SEPARACION ? 7 : 6;
  const ancho = Math.min(
    TAMANO_MAXIMO,
    Math.floor((disponible - (columnas - 1) * SEPARACION) / columnas),
  );
  const filas = repartirEnFilas(LETRAS, columnas);

  return (
    <View style={styles.teclado}>
      {filas.map((fila, i) => (
        <View key={i} style={[styles.fila, { gap: SEPARACION }]}>
          {fila.map((letra) => {
            const acertada = letrasAcertadas.includes(letra);
            const fallada = letrasFalladas.includes(letra);
            const usada = acertada || fallada;
            const inactiva = usada || deshabilitado;

            let fondo = colores.teclaFondo;
            let texto = colores.teclaTexto;
            if (acertada) {
              fondo = colores.acierto;
              texto = '#FFFFFF';
            } else if (fallada) {
              fondo = colores.fallo;
              texto = '#FFFFFF';
            }

            return (
              <Pressable
                key={letra}
                onPress={() => onLetra(letra)}
                disabled={inactiva}
                accessibilityRole="button"
                accessibilityLabel={`Letra ${letra}`}
                accessibilityState={{ disabled: inactiva, selected: usada }}
                android_ripple={{ color: colores.borde, borderless: false }}
                style={({ pressed }) => [
                  styles.tecla,
                  {
                    width: ancho,
                    height: TAMANO_MINIMO,
                    backgroundColor: fondo,
                    borderColor: usada ? fondo : colores.borde,
                    opacity: deshabilitado && !usada ? 0.45 : 1,
                    transform: [{ scale: pressed ? 0.94 : 1 }],
                  },
                ]}
              >
                <Text style={[styles.letra, { color: texto }]}>{letra}</Text>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  teclado: {
    paddingHorizontal: MARGEN,
    paddingVertical: 6,
    gap: SEPARACION,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tecla: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    overflow: 'hidden',
  },
  letra: {
    fontSize: 20,
    fontWeight: '700',
  },
});

export default memo(Teclado);
