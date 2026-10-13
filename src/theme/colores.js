// Paleta de la guía de estilos (sección 7.3) y sus variantes clara y oscura.

export const PALETA = {
  azulOscuro: '#1F3864', // fondos y encabezados
  azul: '#2E74B5', // botones
  verde: '#2E9E5B', // letras acertadas
  rojo: '#D64545', // letras falladas
  grisClaro: '#F2F2F2', // superficies
  amarillo: '#FCD116', // acento (bandera de Colombia)
};

export const temaClaro = {
  oscuro: false,
  fondo: '#FFFFFF',
  superficie: PALETA.grisClaro,
  encabezado: PALETA.azulOscuro,
  textoEncabezado: '#FFFFFF',
  texto: '#1A1A1A',
  textoSecundario: '#5B6573',
  primario: PALETA.azul,
  textoPrimario: '#FFFFFF',
  acierto: PALETA.verde,
  fallo: PALETA.rojo,
  acento: PALETA.amarillo,
  borde: '#D5DAE1',
  teclaFondo: '#FFFFFF',
  teclaTexto: PALETA.azulOscuro,
  deshabilitado: '#C9CED6',
  dibujo: PALETA.azulOscuro,
  overlay: 'rgba(0, 0, 0, 0.55)',
};

export const temaOscuro = {
  oscuro: true,
  fondo: '#0F1A2E',
  superficie: '#1A2944',
  encabezado: PALETA.azulOscuro,
  textoEncabezado: '#FFFFFF',
  texto: '#F2F2F2',
  textoSecundario: '#A9B4C4',
  primario: '#3D86C6',
  textoPrimario: '#FFFFFF',
  acierto: '#34B36A',
  fallo: '#E05A5A',
  acento: PALETA.amarillo,
  borde: '#2C3E5C',
  teclaFondo: '#22355A',
  teclaTexto: '#F2F2F2',
  deshabilitado: '#3A4A66',
  dibujo: '#F2F2F2',
  overlay: 'rgba(0, 0, 0, 0.7)',
};

export function obtenerTema(nombre) {
  return nombre === 'oscuro' ? temaOscuro : temaClaro;
}
