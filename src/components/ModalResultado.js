// Ventana modal de victoria o derrota con la palabra, el desglose
// del puntaje y los botones «Jugar de nuevo» y «Menú».
import { Modal, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Boton from './Boton';

export default function ModalResultado({
  visible,
  gano,
  motivo,
  palabra,
  puntaje,
  bono,
  multiplicador,
  puntajeFinal,
  onJugarDeNuevo,
  onMenu,
  colores,
}) {
  const color = gano ? colores.acierto : colores.fallo;
  const subtitulo = gano
    ? '¡Adivinaste la palabra!'
    : motivo === 'tiempo'
      ? 'Se agotó el tiempo'
      : 'Te quedaste sin vidas';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={onMenu}
    >
      <View style={[styles.fondo, { backgroundColor: colores.overlay }]}>
        <View style={[styles.tarjeta, { backgroundColor: colores.fondo }]} accessibilityViewIsModal>
          <View style={[styles.icono, { backgroundColor: color }]}>
            <MaterialCommunityIcons
              name={gano ? 'trophy-outline' : 'emoticon-sad-outline'}
              size={44}
              color="#FFFFFF"
            />
          </View>
          <Text style={[styles.titulo, { color }]} accessibilityRole="header">
            {gano ? '¡Victoria!' : 'Derrota'}
          </Text>
          <Text style={[styles.subtitulo, { color: colores.textoSecundario }]}>{subtitulo}</Text>

          <Text style={[styles.etiqueta, { color: colores.textoSecundario }]}>La palabra era</Text>
          <Text style={[styles.palabra, { color: colores.texto }]}>{palabra}</Text>

          <View style={[styles.desglose, { backgroundColor: colores.superficie }]}>
            <Fila texto="Letras y pistas" valor={puntaje - bono} colores={colores} />
            {gano && <Fila texto="Bono de victoria" valor={`+${bono}`} colores={colores} />}
            <Fila texto="Multiplicador" valor={`x${multiplicador}`} colores={colores} />
            <View style={[styles.separador, { backgroundColor: colores.borde }]} />
            <Fila texto="Puntaje final" valor={puntajeFinal} colores={colores} destacado />
          </View>

          <View style={styles.botones}>
            <Boton
              titulo="Jugar de nuevo"
              icono="replay"
              onPress={onJugarDeNuevo}
              colores={colores}
            />
            <Boton
              titulo="Menú"
              icono="home-outline"
              variante="secundario"
              onPress={onMenu}
              colores={colores}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

function Fila({ texto, valor, colores, destacado = false }) {
  return (
    <View style={styles.fila}>
      <Text style={[destacado ? styles.textoDestacado : styles.texto, { color: colores.texto }]}>
        {texto}
      </Text>
      <Text style={[destacado ? styles.textoDestacado : styles.texto, { color: colores.texto }]}>
        {valor}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  tarjeta: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  icono: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -62,
    marginBottom: 8,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
  },
  subtitulo: {
    fontSize: 16,
    marginBottom: 16,
  },
  etiqueta: {
    fontSize: 14,
  },
  palabra: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 16,
  },
  desglose: {
    alignSelf: 'stretch',
    borderRadius: 14,
    padding: 14,
    gap: 6,
    marginBottom: 20,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  texto: {
    fontSize: 16,
  },
  textoDestacado: {
    fontSize: 18,
    fontWeight: '800',
  },
  separador: {
    height: 1,
    marginVertical: 4,
  },
  botones: {
    alignSelf: 'stretch',
    gap: 10,
  },
});
