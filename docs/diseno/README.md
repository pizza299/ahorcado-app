# Diseño de Ahorcado Móvil

Material de diseño de la app, listo para importar en **Figma**.

| Archivo | Contenido |
| --- | --- |
| `wireframes/*.svg` | Wireframes de baja fidelidad de las 8 pantallas (360 × 800). Al importarlos en Figma quedan como capas editables. |
| `mockups/claro/*.png` | Mockups de alta fidelidad: capturas de la app en tema claro (720 × 1600, el doble de 360 × 800). |
| `mockups/oscuro/*.png` | Las mismas pantallas en tema oscuro. |
| `guia-de-estilos.svg` | Guía de estilos en una lámina: paleta clara y oscura, tipografía, botones, estados de las teclas, ícono, splash y medidas. |
| `flujo-navegacion.svg` | Diagrama del recorrido entre pantallas. |
| `guia-de-estilos.html` | La misma guía en formato web, con los wireframes y el flujo. Se abre con doble clic. |

Las pantallas son: 01 Splash, 02 Inicio, 03 Instrucciones, 04 Categoría y nivel, 05 Juego, 06 Resultado (victoria y derrota), 07 Estadísticas y 08 Configuración.

## Cómo armar el archivo en Figma

1. Crea un archivo de diseño nuevo en [figma.com](https://www.figma.com) y llámalo «Ahorcado Móvil».
2. Crea cuatro páginas en el panel izquierdo: **Wireframes**, **Mockups**, **Guía de estilos** y **Prototipo**.
3. **Wireframes:** arrastra los 8 archivos de `wireframes/` al lienzo. Cada uno queda como un marco de 360 × 800 con sus capas (botones, textos y tarjetas) que puedes editar.
4. **Mockups:** con la herramienta *Frame* (tecla F) crea 8 marcos de 360 × 800, nómbralos como las pantallas y arrastra dentro cada PNG de `mockups/claro/`. Ajusta la imagen al tamaño del marco (360 × 800). Repite con `mockups/oscuro/` para la versión oscura.
5. **Guía de estilos:** arrastra `guia-de-estilos.svg` y `flujo-navegacion.svg`. Opcional: en el panel derecho, guarda los colores como estilos (*Color styles*) con sus nombres.
6. **Prototipo:** copia los mockups claros a la página Prototipo, ve a la pestaña *Prototype* (panel derecho) y arrastra el círculo azul desde cada botón hasta su pantalla de destino:

   | Desde | Elemento | Hacia |
   | --- | --- | --- |
   | Splash | marco completo, *After delay* 1500 ms | Inicio |
   | Inicio | Jugar | Categoría y nivel |
   | Inicio | Instrucciones | Instrucciones |
   | Inicio | Estadísticas | Estadísticas |
   | Inicio | Configuración | Configuración |
   | Categoría y nivel | Comenzar | Juego |
   | Juego | teclado o una letra | Resultado (victoria) |
   | Resultado | Jugar de nuevo | Juego |
   | Resultado | Menú | Inicio |
   | Instrucciones, Estadísticas, Configuración | flecha ← | *Back* |

   Para conectar una zona de una imagen, dibuja encima un rectángulo transparente (sin relleno) del tamaño del botón y conéctalo a él.
7. Marca **Splash** como punto de inicio (*Flow starting point*) y presiona *Play* (▶ arriba a la derecha) para probar el recorrido.
8. **Compartir:** botón *Share* → «Anyone with the link» → *can view* → copiar enlace. Ese enlace va en el README del proyecto.
9. **Exportar:** selecciona los marcos de los mockups → panel derecho *Export* → PNG o PDF. Guárdalos en esta carpeta (por ejemplo `docs/diseno/exportado/`).
