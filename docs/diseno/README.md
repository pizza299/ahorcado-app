# Diseño de Ahorcado Móvil

Material de diseño de la app, listo para importar en **Figma**.

| Archivo | Contenido |
| --- | --- |
| `wireframes/*.svg` | Wireframes de baja fidelidad de las 8 pantallas (360 × 800). Al importarlos en Figma quedan como capas editables. |
| `mockups/claro/*.png` | Mockups de alta fidelidad: capturas de la app en tema claro (720 × 1600, el doble de 360 × 800). |
| `mockups/oscuro/*.png` | Las mismas pantallas en tema oscuro. |
| `prototipo/*.svg` | Mockups claros listos para el prototipo: cada uno trae la captura y, encima, zonas de clic invisibles con nombre sobre cada botón. |
| `prototipo.html` | Prototipo clicable para probar el recorrido en el navegador (doble clic para abrirlo). Es una referencia: el prototipo de la entrega debe estar en Figma. |
| `guia-de-estilos.svg` | Guía de estilos en una lámina: paleta clara y oscura, tipografía, botones, estados de las teclas, ícono, splash y medidas. |
| `flujo-navegacion.svg` | Diagrama del recorrido entre pantallas. |
| `guia-de-estilos.html` | La misma guía en formato web, con los wireframes y el flujo. |

Las pantallas son: 01 Splash, 02 Inicio, 03 Instrucciones, 04 Categoría y nivel, 05 Juego, 06 Resultado (victoria y derrota), 07 Estadísticas y 08 Configuración.

## Cómo armar el archivo en Figma

1. Crea un archivo de diseño nuevo en [figma.com](https://www.figma.com) y llámalo «Ahorcado Móvil».
2. Crea cuatro páginas en el panel izquierdo: **Wireframes**, **Mockups**, **Guía de estilos** y **Prototipo**.
3. **Wireframes:** arrastra los 8 archivos de `wireframes/` al lienzo. Cada uno queda como un marco de 360 × 800 con sus capas (botones, textos y tarjetas) que puedes editar.
4. **Mockups:** arrastra los PNG de `mockups/claro/` y `mockups/oscuro/`. Si quieres marcos con nombre, crea marcos de 360 × 800 (tecla F) y mete cada imagen dentro, ajustada al tamaño del marco.
5. **Guía de estilos:** arrastra `guia-de-estilos.svg` y `flujo-navegacion.svg`. Opcional: guarda los colores como estilos (*Color styles*) con sus nombres.
6. **Prototipo:** en la página Prototipo, arrastra los 9 archivos de `prototipo/`. Cada marco trae la captura y sus zonas de clic en el panel de capas. Ve a la pestaña *Prototype* (panel derecho), selecciona cada zona y arrastra su círculo azul hasta el marco de destino:

   | Marco | Capa (zona) | Destino |
   | --- | --- | --- |
   | 01-splash | el marco completo, con *After delay* de 1500 ms | 02-inicio |
   | 02-inicio | `zona-jugar` | 04-categoria |
   | 02-inicio | `zona-instrucciones` | 03-instrucciones |
   | 02-inicio | `zona-estadisticas` | 07-estadisticas |
   | 02-inicio | `zona-configuracion` | 08-configuracion |
   | 03-instrucciones | `zona-atras` | *Back* |
   | 04-categoria | `zona-atras` | *Back* |
   | 04-categoria | `zona-comenzar` | 05-juego |
   | 05-juego | `zona-atras` | *Back* |
   | 05-juego | `zona-teclado` | 06-resultado-victoria |
   | 06-resultado-victoria y 06-resultado-derrota | `zona-jugar-de-nuevo` | 05-juego |
   | 06-resultado-victoria y 06-resultado-derrota | `zona-menu` | 02-inicio |
   | 07-estadisticas | `zona-atras` | *Back* |
   | 08-configuracion | `zona-atras` | *Back* |

   Las zonas son invisibles (relleno al 0 %). Si no las ves en el lienzo, selecciónalas desde el panel de capas.
7. Selecciona el marco **01-splash** y márcalo como punto de inicio (*Flow starting point*). Presiona *Play* (▶ arriba a la derecha) y recorre el prototipo. Debe comportarse igual que `prototipo.html`.
8. **Compartir:** botón *Share* → «Anyone with the link» → *can view* → copiar enlace. Ese enlace va en el README del proyecto.
9. **Exportar:** selecciona los marcos de los mockups → panel derecho *Export* → PNG o PDF. Guárdalos en esta carpeta (por ejemplo `docs/diseno/exportado/`).
