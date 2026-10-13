// Botón reutilizable con variantes primario, secundario y peligro.
// Altura mínima de 48 dp para cumplir con el área táctil recomendada.
import { Pressable, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Boton({
  titulo,
  onPress,
  icono,
  variante = 'primario',
  deshabilitado = false,
  colores,
  estilo,
  accessibilityHint,
}) {
  const paleta = {
    primario: { fondo: colores.primario, texto: colores.textoPrimario, borde: colores.primario },
    secundario: { fondo: colores.fondo, texto: colores.primario, borde: colores.primario },
    peligro: { fondo: colores.fallo, texto: '#FFFFFF', borde: colores.fallo },
    exito: { fondo: colores.acierto, texto: '#FFFFFF', borde: colores.acierto },
  }[variante];

  return (
    <Pressable
      onPress={onPress}
      disabled={deshabilitado}
      accessibilityRole="button"
      accessibilityLabel={titulo}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: deshabilitado }}
      style={({ pressed }) => [
        styles.boton,
        {
          backgroundColor: deshabilitado ? colores.deshabilitado : paleta.fondo,
          borderColor: deshabilitado ? colores.deshabilitado : paleta.borde,
          opacity: pressed ? 0.85 : 1,
        },
        estilo,
      ]}
    >
      {icono && (
        <MaterialCommunityIcons
          name={icono}
          size={22}
          color={deshabilitado ? colores.textoSecundario : paleta.texto}
        />
      )}
      <Text
        style={[styles.texto, { color: deshabilitado ? colores.textoSecundario : paleta.texto }]}
      >
        {titulo}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    minHeight: 52,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  texto: {
    fontSize: 17,
    fontWeight: '700',
  },
});
