# El Ahorcado Móvil

App del clásico juego del ahorcado hecha con **React Native y Expo**, con palabras de Colombia: capitales, animales, frutas y comidas típicas. Funciona sin internet, no tiene publicidad y guarda las estadísticas en el celular.

Parcial basado en proyecto · **Programación Móvil** · Uniciencia
Estudiante: **Andres Parada** · Docente: Carlos Carrascal

## Enlaces de entrega

| Entregable | Enlace |
| --- | --- |
| Diseño (Figma o MockFlow) | _pendiente_ |
| APK para Android | _pendiente_ |
| Video explicativo | _pendiente_ |

## Capturas

| Inicio | Categoría y nivel | Juego | Resultado | Estadísticas |
| --- | --- | --- | --- | --- |
| _captura_ | _captura_ | _captura_ | _captura_ | _captura_ |

> Las capturas deben tomarse en el celular con la app instalada desde el APK.

## Funcionalidades

- Nombre del jugador obligatorio en la pantalla de inicio.
- 4 categorías más la opción **Aleatoria**, y 3 niveles de dificultad.
- Banco de **72 palabras** (18 por categoría, 6 por nivel) en `src/data/palabras.js`.
- Palabra oculta con un guion por letra; en palabras compuestas (SANTA MARTA) el espacio se ve desde el inicio.
- Teclado en pantalla de la A a la Z con **Ñ**. Las tildes no cuentan: la «O» revela también la «Ó» y la «U» revela la «Ü».
- Dibujo progresivo del ahorcado en seis partes con `react-native-svg`.
- Pistas, puntaje en tiempo real y cronómetro de 90 s en nivel difícil (se pausa si la app pasa a segundo plano).
- Vibración con `expo-haptics` y sonidos con `expo-audio` al acertar, fallar, ganar o perder.
- Estadísticas (jugadas, ganadas, % de victorias, rachas) y **top 10** guardados con AsyncStorage.
- Tema claro y oscuro, opción para apagar sonido y vibración y borrado de estadísticas con confirmación.
- Confirmación antes de salir si se presiona «atrás» en medio de una partida.

### Niveles

| Nivel | Letras | Pistas | Tiempo | Multiplicador |
| --- | --- | --- | --- | --- |
| Fácil | 4 a 6 | 2 | Sin límite | x1 |
| Medio | 7 a 9 | 1 | Sin límite | x2 |
| Difícil | 10 o más | Sin pistas | 90 segundos | x3 |

La primera pista muestra una descripción de la palabra y la segunda revela una letra al azar.

### Puntuación

| Acción | Puntos |
| --- | --- |
| Letra correcta (por cada aparición) | +10 |
| Letra incorrecta | −5 |
| Usar una pista | −15 |
| Ganar la partida | +50 + (vidas restantes × 10) |
| Puntaje final | Subtotal × multiplicador del nivel (nunca menor que 0) |

## Tecnologías

| Tecnología | Uso |
| --- | --- |
| Expo SDK 57 · React Native 0.86 · React 19 | Base de la app |
| JavaScript (ES6+) | Lógica, hooks, arreglos y objetos |
| React Navigation 7 (native stack) | Navegación entre pantallas |
| react-native-svg | Dibujo del ahorcado |
| AsyncStorage | Estadísticas, ranking y configuración |
| expo-haptics · expo-audio | Vibración y sonidos |
| expo-splash-screen | Pantalla de carga |
| EAS Build | Generación del APK |
| ESLint · Prettier | Calidad y formato del código |

## Estructura

```
ahorcado-app/
├── App.js                      → Punto de entrada, splash y proveedor de navegación
├── app.json                    → Nombre, ícono, splash y configuración
├── eas.json                    → Perfil "preview" que genera el APK
├── assets/
│   ├── icon.png, splash-icon.png, android-icon-*.png
│   └── sonidos/                → acierto, error, victoria, derrota
├── src/
│   ├── navigation/AppNavigator.js   → Stack de pantallas
│   ├── screens/                     → Inicio, Instrucciones, Categoria, Juego, Estadisticas, Configuracion
│   ├── components/
│   │   ├── Ahorcado.js              → Dibujo con react-native-svg
│   │   ├── PalabraOculta.js
│   │   ├── Teclado.js
│   │   ├── Marcador.js              → Vidas, puntaje y cronómetro
│   │   ├── ModalResultado.js
│   │   ├── Boton.js · Splash.js
│   ├── hooks/
│   │   ├── useJuego.js              → Lógica y estado de la partida (useReducer)
│   │   ├── useApp.js                → Contexto: jugador, configuración, tema, estadísticas
│   │   └── useEfectos.js            → Sonidos y vibración
│   ├── data/palabras.js             → Banco de palabras, categorías y niveles
│   ├── storage/almacenamiento.js    → Funciones con AsyncStorage
│   ├── theme/colores.js             → Paleta clara y oscura
│   └── utils/dialogos.js            → Confirmaciones (Alert)
└── docs/diseno/                → Wireframes SVG, mockups PNG y guía de estilos para Figma
```

### Datos guardados en AsyncStorage

| Clave | Contenido |
| --- | --- |
| `@ahorcado_stats` | `{ jugadas, ganadas, perdidas, rachaActual, mejorRacha, mejores }` (`mejores` guarda el mejor puntaje de cada jugador por categoría) |
| `@ahorcado_ranking` | Arreglo de `{ nombre, puntaje, categoria, nivel, fecha }` con los 10 mejores |
| `@ahorcado_config` | `{ sonido, vibracion, tema }` |

## Cómo ejecutar el proyecto

Requisitos: Node.js 20 o superior y la app **Expo Go** en el celular.

```bash
npm install
npx expo start
```

Escanea el código QR con Expo Go (el celular y el computador deben estar en la misma red Wi-Fi). En Expo Go se ve el ícono en lugar del splash nativo; el splash completo aparece en el APK.

También se puede abrir en el navegador con `npm run web` para revisar el diseño (la vibración no funciona en web).

Para revisar el código:

```bash
npx expo lint
```

## Generar el APK con EAS Build

```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

La primera vez EAS pide crear el proyecto en expo.dev y generar la llave de firma de Android: acepta ambas opciones. Al terminar, EAS entrega un enlace para descargar el APK; ese enlace va en la tabla de entrega de arriba.

## Plan de pruebas

| ID | Caso | Resultado esperado |
| --- | --- | --- |
| CP-01 | Tocar «Jugar» sin escribir el nombre | Aparece un mensaje y no se avanza |
| CP-02 | Partida en Frutas, nivel fácil | La palabra tiene entre 4 y 6 letras y es una fruta |
| CP-03 | Tocar una letra que existe | Se revela en todas sus posiciones, la tecla se pone verde y el celular vibra |
| CP-04 | Tocar una letra que no existe | Se dibuja una parte, la tecla se pone roja y se pierde una vida |
| CP-05 | Tocar una letra usada | No pasa nada: la tecla está deshabilitada |
| CP-06 | Tocar la «U» con CHIGÜIRO | Se revela la «Ü» |
| CP-07 | Jugar con BANDEJA PAISA | El espacio aparece desde el inicio |
| CP-08 | Cometer 6 errores | Modal de derrota con la palabra completa |
| CP-09 | Agotar el tiempo en nivel difícil | La partida termina como derrota |
| CP-10 | Presionar «atrás» durante la partida | Aparece una confirmación antes de salir |
| CP-11 | Cerrar y volver a abrir la app | Estadísticas, ranking y configuración se conservan |
| CP-12 | Desactivar sonido y vibración | El juego deja de sonar y vibrar |
| CP-13 | Instalar el APK | La app se instala con su nombre, ícono y splash y funciona sin internet |
| CP-14 | Comparar con el diseño | Pantallas, colores y componentes coinciden con Figma |

## Mejoras futuras

- Modo de dos jugadores en el mismo celular.
- Animaciones con Reanimated al revelar letras y dibujar el ahorcado.
- Ranking en línea con un backend.
- Notificaciones locales para un reto diario.
- Publicación en Google Play.
