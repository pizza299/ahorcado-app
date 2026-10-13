// Banco de palabras del juego con temática colombiana.
// El nivel no se guarda en cada palabra: se deduce de su número de letras
// (sin contar espacios) según los rangos definidos en NIVELES.

export const NIVELES = {
  facil: {
    id: 'facil',
    nombre: 'Fácil',
    min: 4,
    max: 6,
    pistas: 2,
    tiempo: null,
    multiplicador: 1,
  },
  medio: {
    id: 'medio',
    nombre: 'Medio',
    min: 7,
    max: 9,
    pistas: 1,
    tiempo: null,
    multiplicador: 2,
  },
  dificil: {
    id: 'dificil',
    nombre: 'Difícil',
    min: 10,
    max: Infinity,
    pistas: 0,
    tiempo: 90,
    multiplicador: 3,
  },
};

export const CATEGORIAS = [
  { id: 'capitales', nombre: 'Capitales de Colombia', icono: 'city-variant-outline' },
  { id: 'animales', nombre: 'Animales de Colombia', icono: 'paw' },
  { id: 'frutas', nombre: 'Frutas', icono: 'fruit-pineapple' },
  { id: 'comidas', nombre: 'Comidas típicas', icono: 'pot-steam-outline' },
];

export const ALEATORIA = { id: 'aleatoria', nombre: 'Aleatoria', icono: 'dice-multiple-outline' };

export function nombreCategoria(id) {
  if (id === ALEATORIA.id) return ALEATORIA.nombre;
  return CATEGORIAS.find((c) => c.id === id)?.nombre ?? id;
}

export const PALABRAS = [
  // ---------- Capitales de Colombia ----------
  { palabra: 'TUNJA', categoria: 'capitales', pista: 'Capital de Boyacá' },
  { palabra: 'CALI', categoria: 'capitales', pista: 'Capital del Valle del Cauca, la «capital mundial de la salsa»' },
  { palabra: 'BOGOTÁ', categoria: 'capitales', pista: 'Capital del país' },
  { palabra: 'PASTO', categoria: 'capitales', pista: 'Capital de Nariño, famosa por el Carnaval de Negros y Blancos' },
  { palabra: 'NEIVA', categoria: 'capitales', pista: 'Capital del Huila' },
  { palabra: 'CÚCUTA', categoria: 'capitales', pista: 'Capital de Norte de Santander, en la frontera con Venezuela' },
  { palabra: 'CARTAGENA', categoria: 'capitales', pista: 'Capital de Bolívar, la «Ciudad Amurallada»' },
  { palabra: 'MEDELLÍN', categoria: 'capitales', pista: 'Capital de Antioquia, la «Ciudad de la Eterna Primavera»' },
  { palabra: 'MANIZALES', categoria: 'capitales', pista: 'Capital de Caldas, en el Eje Cafetero' },
  { palabra: 'POPAYÁN', categoria: 'capitales', pista: 'Capital del Cauca, la «Ciudad Blanca»' },
  { palabra: 'RIOHACHA', categoria: 'capitales', pista: 'Capital de La Guajira' },
  { palabra: 'LETICIA', categoria: 'capitales', pista: 'Capital del Amazonas, a orillas del río Amazonas' },
  { palabra: 'BUCARAMANGA', categoria: 'capitales', pista: 'Capital de Santander, la «Ciudad Bonita»' },
  { palabra: 'BARRANQUILLA', categoria: 'capitales', pista: 'Capital del Atlántico, la «Puerta de Oro de Colombia»' },
  { palabra: 'VILLAVICENCIO', categoria: 'capitales', pista: 'Capital del Meta, la «Puerta del Llano»' },
  { palabra: 'VALLEDUPAR', categoria: 'capitales', pista: 'Capital del Cesar y cuna del vallenato' },
  { palabra: 'SANTA MARTA', categoria: 'capitales', pista: 'Capital del Magdalena y la ciudad más antigua de Colombia' },
  { palabra: 'PUERTO CARREÑO', categoria: 'capitales', pista: 'Capital del Vichada, a orillas del río Orinoco' },

  // ---------- Animales de Colombia ----------
  { palabra: 'PUMA', categoria: 'animales', pista: 'Felino americano también llamado león de montaña' },
  { palabra: 'DANTA', categoria: 'animales', pista: 'Mamífero de trompa corta también llamado tapir' },
  { palabra: 'CÓNDOR', categoria: 'animales', pista: 'Ave que aparece en el escudo de Colombia' },
  { palabra: 'JAGUAR', categoria: 'animales', pista: 'El felino más grande de América' },
  { palabra: 'TUCÁN', categoria: 'animales', pista: 'Ave de pico enorme y colorido' },
  { palabra: 'TITÍ', categoria: 'animales', pista: 'Pequeño primate; el cabeciblanco solo vive en Colombia' },
  { palabra: 'CHIGÜIRO', categoria: 'animales', pista: 'El roedor más grande del mundo' },
  { palabra: 'PEREZOSO', categoria: 'animales', pista: 'Mamífero muy lento que vive colgado de los árboles' },
  { palabra: 'GUACAMAYA', categoria: 'animales', pista: 'Loro grande de plumas rojas, azules y amarillas' },
  { palabra: 'ARMADILLO', categoria: 'animales', pista: 'Mamífero con caparazón de placas, también llamado gurre' },
  { palabra: 'OSO ANDINO', categoria: 'animales', pista: 'Única especie de oso de Sudamérica, también llamado de anteojos' },
  { palabra: 'COLIBRÍ', categoria: 'animales', pista: 'Ave diminuta que puede volar hacia atrás' },
  { palabra: 'HORMIGA CULONA', categoria: 'animales', pista: 'Insecto que se come tostado en Santander' },
  { palabra: 'DELFÍN ROSADO', categoria: 'animales', pista: 'Mamífero de color rosa que vive en el río Amazonas' },
  { palabra: 'OSO HORMIGUERO', categoria: 'animales', pista: 'Mamífero de lengua larga que se alimenta de hormigas y termitas' },
  { palabra: 'CAIMÁN LLANERO', categoria: 'animales', pista: 'Gran reptil del río Orinoco en peligro de extinción' },
  { palabra: 'BALLENA JOROBADA', categoria: 'animales', pista: 'Llega al Pacífico colombiano entre julio y octubre para tener sus crías' },
  { palabra: 'RANA DORADA', categoria: 'animales', pista: 'Anfibio del Pacífico, uno de los animales más venenosos del planeta' },

  // ---------- Frutas ----------
  { palabra: 'LULO', categoria: 'frutas', pista: 'Fruta ácida muy usada en jugos' },
  { palabra: 'PIÑA', categoria: 'frutas', pista: 'Fruta con corona de hojas y cáscara espinosa' },
  { palabra: 'PAPAYA', categoria: 'frutas', pista: 'Fruta grande de pulpa naranja, buena para la digestión' },
  { palabra: 'UCHUVA', categoria: 'frutas', pista: 'Fruta pequeña y naranja envuelta en un capuchón de hojas secas' },
  { palabra: 'CURUBA', categoria: 'frutas', pista: 'Fruta alargada y amarilla de la familia de la pasiflora' },
  { palabra: 'BOROJÓ', categoria: 'frutas', pista: 'Fruta del Chocó con fama de dar energía' },
  { palabra: 'GUANÁBANA', categoria: 'frutas', pista: 'Fruta verde con espinas blandas y pulpa blanca' },
  { palabra: 'GUAYABA', categoria: 'frutas', pista: 'Con ella se prepara el bocadillo veleño' },
  { palabra: 'MARACUYÁ', categoria: 'frutas', pista: 'Fruta amarilla de pulpa ácida con muchas semillas negras' },
  { palabra: 'PITAHAYA', categoria: 'frutas', pista: 'Fruta amarilla con escamas y pulpa blanca con semillas' },
  { palabra: 'AGUACATE', categoria: 'frutas', pista: 'Fruto verde con el que se prepara el guacamole' },
  { palabra: 'TAMARINDO', categoria: 'frutas', pista: 'Fruta en vaina de sabor agridulce, usada en dulces y jugos' },
  { palabra: 'CHONTADURO', categoria: 'frutas', pista: 'Fruto de palma que se come con sal y miel' },
  { palabra: 'GRANADILLA', categoria: 'frutas', pista: 'Fruta de cáscara dura y naranja con pulpa gelatinosa' },
  { palabra: 'MAMONCILLO', categoria: 'frutas', pista: 'Fruta pequeña y verde que se chupa, típica de la costa' },
  { palabra: 'TOMATE DE ÁRBOL', categoria: 'frutas', pista: 'Fruta roja y alargada muy usada en jugos' },
  { palabra: 'MANGO BICHE', categoria: 'frutas', pista: 'Mango verde que se come con sal, limón y pimienta' },
  { palabra: 'MORA DE CASTILLA', categoria: 'frutas', pista: 'Variedad de mora más cultivada en los Andes colombianos' },

  // ---------- Comidas típicas ----------
  { palabra: 'AREPA', categoria: 'comidas', pista: 'Masa redonda de maíz que se come a diario en todo el país' },
  { palabra: 'TAMAL', categoria: 'comidas', pista: 'Masa de maíz con carnes envuelta en hojas de plátano' },
  { palabra: 'AJIACO', categoria: 'comidas', pista: 'Sopa bogotana de tres papas, pollo y guascas' },
  { palabra: 'OBLEA', categoria: 'comidas', pista: 'Dos galletas delgadas unidas con arequipe' },
  { palabra: 'BOLLO', categoria: 'comidas', pista: 'Masa de maíz o yuca envuelta en hojas, típica de la costa' },
  { palabra: 'PICADA', categoria: 'comidas', pista: 'Plato para compartir con carnes, chorizo, papa y plátano' },
  { palabra: 'SANCOCHO', categoria: 'comidas', pista: 'Sopa de plátano, yuca y carne que se cocina en olla grande' },
  { palabra: 'LECHONA', categoria: 'comidas', pista: 'Cerdo relleno de arroz y arveja, típico del Tolima' },
  { palabra: 'PANDEBONO', categoria: 'comidas', pista: 'Pan de queso y almidón de yuca típico del Valle' },
  { palabra: 'BUÑUELO', categoria: 'comidas', pista: 'Bolita frita de queso que no falta en Navidad' },
  { palabra: 'EMPANADA', categoria: 'comidas', pista: 'Masa de maíz frita rellena de papa y carne' },
  { palabra: 'CHANGUA', categoria: 'comidas', pista: 'Caldo de leche con huevo para el desayuno bogotano' },
  { palabra: 'BANDEJA PAISA', categoria: 'comidas', pista: 'Plato típico de Antioquia' },
  { palabra: 'POSTA NEGRA', categoria: 'comidas', pista: 'Carne en salsa oscura y dulce, típica de Cartagena' },
  { palabra: 'CHICHARRÓN', categoria: 'comidas', pista: 'Tocino de cerdo frito y crocante' },
  { palabra: 'ARROZ CON COCO', categoria: 'comidas', pista: 'Acompañamiento costeño dulce y de color tostado' },
  { palabra: 'SOBREBARRIGA', categoria: 'comidas', pista: 'Corte de res sudado o al horno, típico de Bogotá' },
  { palabra: 'MOTE DE QUESO', categoria: 'comidas', pista: 'Sopa espesa de ñame con queso de la costa Caribe' },
];
