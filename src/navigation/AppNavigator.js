// Stack de pantallas de la app con React Navigation (native stack).
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InicioScreen from '../screens/InicioScreen';
import InstruccionesScreen from '../screens/InstruccionesScreen';
import CategoriaScreen from '../screens/CategoriaScreen';
import JuegoScreen from '../screens/JuegoScreen';
import EstadisticasScreen from '../screens/EstadisticasScreen';
import ConfiguracionScreen from '../screens/ConfiguracionScreen';
import { useApp } from '../hooks/useApp';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { colores } = useApp();

  return (
    <Stack.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerStyle: { backgroundColor: colores.encabezado },
        headerTintColor: colores.textoEncabezado,
        headerTitleStyle: { fontWeight: '700' },
        headerBackButtonDisplayMode: 'minimal',
        contentStyle: { backgroundColor: colores.fondo },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Inicio" component={InicioScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Instrucciones" component={InstruccionesScreen} />
      <Stack.Screen
        name="Categoria"
        component={CategoriaScreen}
        options={{ title: 'Categoría y nivel' }}
      />
      <Stack.Screen
        name="Juego"
        component={JuegoScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Estadisticas"
        component={EstadisticasScreen}
        options={{ title: 'Estadísticas' }}
      />
      <Stack.Screen
        name="Configuracion"
        component={ConfiguracionScreen}
        options={{ title: 'Configuración' }}
      />
    </Stack.Navigator>
  );
}
