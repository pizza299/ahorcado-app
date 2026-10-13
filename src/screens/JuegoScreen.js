// Pantalla de la partida: encabezado con categoría y pista, marcador,
// dibujo, palabra oculta y teclado. Usa un encabezado propio y compacto
// para que todo quepa sin desplazarse en pantallas de 5 pulgadas.
// Pide confirmación si el jugador intenta salir en medio de la partida.
import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePreventRemove } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ahorcado from '../components/Ahorcado';
import Marcador from '../components/Marcador';
import ModalResultado from '../components/ModalResultado';
import PalabraOculta from '../components/PalabraOculta';
import Teclado from '../components/Teclado';
import { useApp } from '../hooks/useApp';
import useEfectos from '../hooks/useEfectos';
import useJuego, { PUNTOS } from '../hooks/useJuego';
import { NIVELES, nombreCategoria } from '../data/palabras';
import { confirmar } from '../utils/dialogos';

const RETRASO_MODAL = 700; // ms para ver el dibujo final antes del resultado

export default function JuegoScreen({ navigation, route }) {
  const { categoria, nivel } = route.params;
  const { colores, jugador, registrarPartida } = useApp();
  const insets = useSafeAreaInsets();
  const efectos = useEfectos();
  const [confirmandoSalida, setConfirmandoSalida] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const juego = useJuego(categoria, nivel, { pausado: confirmandoSalida || mostrarModal });

  const terminada = juego.estado !== 'jugando';
  const configNivel = NIVELES[nivel];

  // Botón «atrás» de Android (y la flecha del encabezado) durante la partida
  usePreventRemove(!terminada, ({ data }) => {
    setConfirmandoSalida(true);
    confirmar({
      titulo: '¿Abandonar la partida?',
      mensaje: 'Si sales ahora perderás el progreso de esta palabra.',
      textoAceptar: 'Salir',
      textoCancelar: 'Seguir jugando',
      destructivo: true,
      onAceptar: () => navigation.dispatch(data.action),
      onCancelar: () => setConfirmandoSalida(false),
    });
  });

  // Al terminar: efectos, copia del resultado para el modal y guardado
  // de estadísticas (una sola vez por partida)
  const [resultado, setResultado] = useState(null);
  const ultimaRegistrada = useRef(0);
  useEffect(() => {
    if (!terminada || ultimaRegistrada.current === juego.partida) return;
    ultimaRegistrada.current = juego.partida;
    const gano = juego.estado === 'ganado';
    if (gano) efectos.victoria();
    else efectos.derrota();
    // El modal usa esta copia para no mostrar la partida nueva mientras se cierra
    setResultado({
      gano,
      motivo: juego.motivo,
      palabra: juego.palabra,
      puntaje: juego.puntaje,
      bono: juego.bono,
      multiplicador: juego.multiplicador,
      puntajeFinal: juego.puntajeFinal,
    });
    registrarPartida({
      nombre: jugador || 'Jugador',
      categoria: juego.categoria,
      nivel,
      puntaje: juego.puntajeFinal,
      gano,
    });
  }, [terminada, juego, jugador, nivel, efectos, registrarPartida]);

  useEffect(() => {
    if (!terminada) return undefined;
    const id = setTimeout(() => setMostrarModal(true), RETRASO_MODAL);
    return () => clearTimeout(id);
  }, [terminada, juego.partida]);

  const { procesarLetra, usarPista, nuevaPartida } = juego;

  const tocarLetra = useCallback(
    (letra) => {
      const resultado = procesarLetra(letra);
      if (resultado === 'acierto') efectos.acierto();
      else if (resultado === 'fallo') efectos.error();
    },
    [procesarLetra, efectos],
  );

  const pedirPista = () => {
    if (usarPista()) efectos.pista();
  };

  const jugarDeNuevo = () => {
    setMostrarModal(false);
    nuevaPartida();
  };

  const irAlMenu = () => {
    setMostrarModal(false);
    navigation.popToTop();
  };

  const sinPistas = configNivel.pistas === 0;
  const pistaDeshabilitada = terminada || juego.pistasDisponibles === 0;

  return (
    <SafeAreaView edges={['bottom']} style={[styles.pantalla, { backgroundColor: colores.fondo }]}>
      <View
        style={[
          styles.encabezado,
          { backgroundColor: colores.encabezado, paddingTop: insets.top + 4 },
        ]}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Volver"
          style={styles.botonAtras}
        >
          <MaterialCommunityIcons name="arrow-left" size={26} color={colores.textoEncabezado} />
        </Pressable>

        <View style={styles.titulos}>
          <Text
            style={[styles.titulo, { color: colores.textoEncabezado }]}
            numberOfLines={1}
            accessibilityRole="header"
          >
            {nombreCategoria(juego.categoria)}
          </Text>
          <Text style={styles.subtitulo}>Nivel {configNivel.nombre}</Text>
        </View>

        {sinPistas ? (
          <Text style={styles.sinPistas}>Sin pistas</Text>
        ) : (
          <Pressable
            onPress={pedirPista}
            disabled={pistaDeshabilitada}
            accessibilityRole="button"
            accessibilityLabel={`Pedir pista, quedan ${juego.pistasDisponibles}`}
            accessibilityHint={`Cuesta ${Math.abs(PUNTOS.pista)} puntos`}
            accessibilityState={{ disabled: pistaDeshabilitada }}
            style={({ pressed }) => [
              styles.botonPista,
              {
                backgroundColor: pistaDeshabilitada ? colores.deshabilitado : colores.acento,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <MaterialCommunityIcons name="lightbulb-on-outline" size={20} color="#1A1A1A" />
            <Text style={styles.textoPista}>
              {juego.pistasDisponibles} · {PUNTOS.pista}
            </Text>
          </Pressable>
        )}
      </View>

      <Marcador
        vidas={juego.vidas}
        puntaje={juego.puntaje}
        multiplicador={juego.multiplicador}
        tiempoRestante={juego.tiempoRestante}
        colores={colores}
      />

      {juego.pistaVisible && (
        <View
          style={[
            styles.burbuja,
            { backgroundColor: colores.superficie, borderColor: colores.acento },
          ]}
          accessibilityLiveRegion="polite"
        >
          <MaterialCommunityIcons
            name="lightbulb-on-outline"
            size={18}
            color={colores.textoSecundario}
          />
          <Text style={[styles.textoBurbuja, { color: colores.texto }]}>{juego.pista}</Text>
        </View>
      )}

      <View style={styles.dibujo}>
        <Ahorcado
          errores={juego.errores}
          color={colores.dibujo}
          perdido={juego.estado === 'perdido'}
        />
      </View>

      <PalabraOculta
        palabra={juego.palabra}
        letrasAcertadas={juego.letrasAcertadas}
        revelar={terminada}
        colores={colores}
      />

      <Teclado
        letrasAcertadas={juego.letrasAcertadas}
        letrasFalladas={juego.letrasFalladas}
        onLetra={tocarLetra}
        deshabilitado={terminada}
        colores={colores}
      />

      <ModalResultado
        visible={mostrarModal && resultado !== null}
        {...resultado}
        onJugarDeNuevo={jugarDeNuevo}
        onMenu={irAlMenu}
        colores={colores}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingBottom: 4,
    gap: 4,
  },
  botonAtras: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulos: {
    flex: 1,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtitulo: {
    color: '#C9D6EA',
    fontSize: 14,
  },
  sinPistas: {
    color: '#C9D6EA',
    fontSize: 14,
    fontStyle: 'italic',
    marginRight: 12,
  },
  botonPista: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minHeight: 48,
    paddingHorizontal: 14,
    marginRight: 8,
    borderRadius: 24,
  },
  textoPista: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  burbuja: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 12,
    marginTop: 8,
    padding: 10,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  textoBurbuja: {
    flex: 1,
    fontSize: 15,
  },
  dibujo: {
    flex: 1,
    minHeight: 90,
    paddingVertical: 6,
  },
});
