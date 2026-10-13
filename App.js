// Punto de entrada: carga los datos guardados mientras se ve el splash
// y luego monta el proveedor de estado y la navegación.
import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import Splash from './src/components/Splash';
import { AppProvider, useApp } from './src/hooks/useApp';
import { cargarTodo } from './src/storage/almacenamiento';

// Mantiene el splash nativo hasta que se dibuje el splash de la app
SplashScreen.preventAutoHideAsync();

const DURACION_MINIMA_SPLASH = 1500;
const esperar = (ms) => new Promise((resolver) => setTimeout(resolver, ms));

export default function App() {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    Promise.all([cargarTodo(), esperar(DURACION_MINIMA_SPLASH)]).then(([cargados]) =>
      setDatos(cargados),
    );
  }, []);

  const ocultarSplashNativo = useCallback(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  if (!datos) {
    return (
      <>
        <StatusBar style="light" />
        <Splash onLayout={ocultarSplashNativo} />
      </>
    );
  }

  return (
    <SafeAreaProvider>
      <AppProvider datosIniciales={datos}>
        <Navegacion />
      </AppProvider>
    </SafeAreaProvider>
  );
}

function Navegacion() {
  const { colores } = useApp();
  const base = colores.oscuro ? DarkTheme : DefaultTheme;
  const tema = {
    ...base,
    colors: {
      ...base.colors,
      primary: colores.primario,
      background: colores.fondo,
      card: colores.encabezado,
      text: colores.textoEncabezado,
      border: colores.borde,
    },
  };

  return (
    <NavigationContainer theme={tema}>
      <StatusBar style="light" />
      <AppNavigator />
    </NavigationContainer>
  );
}
