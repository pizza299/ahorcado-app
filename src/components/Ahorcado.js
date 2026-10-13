// Dibujo del ahorcado con react-native-svg. La horca siempre se ve y
// cada error agrega una parte: cabeza, cuerpo, brazos y piernas.
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Line, Rect } from 'react-native-svg';
import { PALETA } from '../theme/colores';

const GROSOR = 6;

const PARTES = [
  { nombre: 'cabeza', dibujo: <Circle cx="140" cy="62" r="16" fill="none" /> },
  { nombre: 'cuerpo', dibujo: <Line x1="140" y1="78" x2="140" y2="130" /> },
  { nombre: 'brazo izquierdo', dibujo: <Line x1="140" y1="92" x2="118" y2="116" /> },
  { nombre: 'brazo derecho', dibujo: <Line x1="140" y1="92" x2="162" y2="116" /> },
  { nombre: 'pierna izquierda', dibujo: <Line x1="140" y1="130" x2="121" y2="166" /> },
  { nombre: 'pierna derecha', dibujo: <Line x1="140" y1="130" x2="159" y2="166" /> },
];

function Ahorcado({ errores, color, colorCuerda = PALETA.amarillo, perdido = false }) {
  const visibles = Math.min(errores, PARTES.length);

  return (
    <View
      style={styles.contenedor}
      accessible
      accessibilityRole="image"
      accessibilityLabel={`Ahorcado: ${visibles} de ${PARTES.length} partes dibujadas`}
    >
      <Svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
        {/* Base con los colores de la bandera */}
        <Rect x="28" y="184" width="46" height="9" rx="2" fill={PALETA.amarillo} />
        <Rect x="74" y="184" width="23" height="9" fill={PALETA.azul} />
        <Rect x="97" y="184" width="23" height="9" rx="2" fill={PALETA.rojo} />

        {/* Horca */}
        <G stroke={color} strokeWidth={GROSOR + 2} strokeLinecap="round">
          <Line x1="52" y1="186" x2="52" y2="20" />
          <Line x1="52" y1="20" x2="140" y2="20" />
          <Line x1="52" y1="46" x2="78" y2="20" />
        </G>
        <Line
          x1="140"
          y1="20"
          x2="140"
          y2="46"
          stroke={colorCuerda}
          strokeWidth={GROSOR - 2}
          strokeLinecap="round"
        />

        {/* Partes del cuerpo según los errores */}
        <G stroke={color} strokeWidth={GROSOR} strokeLinecap="round">
          {PARTES.slice(0, visibles).map((parte) => (
            <G key={parte.nombre}>{parte.dibujo}</G>
          ))}
        </G>

        {/* Ojos en X al perder */}
        {perdido && visibles > 0 && (
          <G stroke={color} strokeWidth="2.5" strokeLinecap="round">
            <Line x1="132" y1="56" x2="138" y2="62" />
            <Line x1="138" y1="56" x2="132" y2="62" />
            <Line x1="142" y1="56" x2="148" y2="62" />
            <Line x1="148" y1="56" x2="142" y2="62" />
          </G>
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    width: '100%',
    height: '100%',
  },
});

export default memo(Ahorcado);
