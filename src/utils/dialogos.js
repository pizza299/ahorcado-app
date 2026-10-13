// Diálogos nativos (Alert). En la versión web, Alert no muestra botones,
// así que se usan window.confirm y window.alert.
import { Alert, Platform } from 'react-native';

export function confirmar({
  titulo,
  mensaje,
  textoAceptar = 'Aceptar',
  textoCancelar = 'Cancelar',
  destructivo = false,
  onAceptar,
  onCancelar,
}) {
  if (Platform.OS === 'web') {
    if (window.confirm(`${titulo}\n\n${mensaje}`)) onAceptar?.();
    else onCancelar?.();
    return;
  }
  Alert.alert(
    titulo,
    mensaje,
    [
      { text: textoCancelar, style: 'cancel', onPress: onCancelar },
      { text: textoAceptar, style: destructivo ? 'destructive' : 'default', onPress: onAceptar },
    ],
    { cancelable: true, onDismiss: onCancelar },
  );
}

export function avisar(titulo, mensaje) {
  if (Platform.OS === 'web') {
    window.alert(`${titulo}\n\n${mensaje}`);
    return;
  }
  Alert.alert(titulo, mensaje);
}
