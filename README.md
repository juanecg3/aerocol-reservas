# AeroCol

Aplicación de práctica para buscar vuelos por origen y destino y reservar un vuelo seleccionado.

## Proyecto Final

### Qué hace la app

AeroCol es una aplicación hecha con React que permite buscar vuelos entre seis ciudades, elegir uno y reservarlo. El usuario escoge un origen y un destino, y la app muestra los vuelos de esa ruta, que se pueden ordenar de distintas formas. El destino nunca deja escoger la misma ciudad del origen y, si una ruta no tiene vuelos, aparece un aviso. Al seleccionar un vuelo se abre un formulario para poner el nombre, los pasajeros y la clase, y cada reserva queda guardada en la lista de Mis reservas, que sigue ahí aunque se recargue la página.

Este es el árbol de componentes, con el estado que maneja cada uno entre paréntesis.

```
App  (origen, destino, orden, seleccionado, reservas)
├── Header
├── SelectorRuta
│   ├── SelectCiudad  (origen)
│   └── SelectCiudad  (destino)
├── Selector "Ordenar por"
├── ListaVuelos
│   └── TarjetaVuelo  × N
├── FormularioReserva  (nombre, pasajeros, clase)
├── MisReservas
└── Footer
```

Los componentes Header, Footer, SelectorRuta y SelectCiudad son los mismos de la semana 14 y no se tocaron, solo se agregó lo nuevo encima. `FormularioReserva` aparece únicamente cuando hay un vuelo seleccionado.

## Proyecto Final — F1: Formulario de reserva

Al seleccionar una tarjeta, ya sea con un clic o presionando Enter, aparece un formulario controlado para ingresar el nombre del pasajero, elegir la cantidad de pasajeros con los botones de menos y más, que tienen un mínimo de 1, y seleccionar la clase con radios. Las clases son Económica con factor 1, Ejecutiva con factor 1.6 y Primera con factor 2.4. El total se actualiza al cambiar pasajeros o clase, y el botón de reserva permanece deshabilitado mientras el nombre esté vacío.

### Respuestas de F1

**¿Dónde vive el estado del formulario y por qué?** `nombre`, `pasajeros` y `clase` viven dentro de `FormularioReserva`, cada uno con su `useState`. Son estados de un formulario controlado, es decir que cada campo muestra el valor guardado en el estado y avisa con `onChange` cuando el usuario cambia algo, así que el componente es el dueño del dato. La razón es que el estado debe vivir en el componente que lo necesita, y mientras el usuario escribe nadie más ocupa esos datos, ni la lista, ni las tarjetas, ni Mis reservas. Solo cuando se presiona Reservar los datos se juntan en una reserva y se le entregan a `App`. Por otro lado, la selección del vuelo sí vive en `App`, porque la necesitan dos partes distintas, la lista para resaltar la tarjeta y el formulario para saber cuál vuelo se está reservando. Por eso ese estado se sube hasta el componente padre, que es lo que se conoce como levantar el estado.

**¿Por qué el total no es otro estado?** Porque el total se puede calcular con datos que ya existen, y cuando algo se puede calcular no hace falta guardarlo. La fórmula es `vuelo.precio × pasajeros × factor de clase`, por ejemplo un vuelo de 260.000 con 2 pasajeros en Ejecutiva da 260.000 × 2 × 1.6 = 832.000. Si el total fuera un `useState`, cada vez que cambien los pasajeros, la clase o el vuelo habría que acordarse de actualizarlo también, y si se olvida alguno el valor que se ve queda desincronizado de lo que el usuario eligió. Al calcularlo en cada render siempre coincide con los datos actuales y se actualiza solo. En resumen, menos estado significa menos errores.

**¿Qué prop se agregó a `TarjetaVuelo`?** Se agregó `onSeleccionar`, una función que la tarjeta llama al hacer clic o presionar Enter para avisar a `App` cuál vuelo se eligió. La idea es que los datos suben y las funciones bajan. La tarjeta no puede guardar la selección porque no es la dueña de ese estado, entonces lo único que puede hacer es avisar, y `App` es quien la recibe y la guarda.

**¿Qué pasa si no hay vuelo seleccionado?** `App` no renderiza `FormularioReserva`, ya que se usa un renderizado condicional según el valor de `seleccionado`. El formulario aparece solo después de elegir una tarjeta, y de esa manera no se puede reservar sin tener un vuelo.

## Proyecto Final — F2: Mis reservas

Las reservas aparecen en una lista debajo del formulario. Cada reserva es un objeto con un id único, el nombre, el vuelo, la cantidad de pasajeros, la clase, el total y la fecha, y todos esos datos se muestran en pantalla, menos el id que se usa internamente. Cada una tiene un botón para eliminarla, y cuando no hay ninguna se muestra el mensaje "Aún no tienes reservas 👀". La lista se conserva al recargar la página gracias a `localStorage`.

### Respuestas de F2

**¿Por qué no mutar el array directamente con `push`?** Porque `push` modifica el mismo array que ya existe, y para React sigue siendo el mismo, entonces no se entera de que algo cambió. React decide si debe volver a dibujar la pantalla comparando si el estado cambió de referencia. Cuando se crea un array nuevo con `[...reservas, nueva]` la referencia es distinta y la pantalla se actualiza. Para eliminar pasa lo mismo, se usa `filter` que devuelve un array nuevo con las reservas que no tienen el id que se borra. Sin esto, la lista no aparecería al reservar y el usuario pensaría que no pasó nada.

**¿Qué les pasa a las reservas si recargas la página sin `localStorage`?** Se pierden, porque el estado de React vuelve a comenzar vacío cada vez que se carga la aplicación. Para evitarlo se guardan en `localStorage`, que solo entiende texto, así que el array se convierte con `JSON.stringify` al guardar y se vuelve a transformar con `JSON.parse` al leer. Si no se hiciera esa conversión se guardaría algo como `[object Object]` y al leer saldría un error. Al iniciar la app el estado se carga una sola vez con una función inicializadora en `useState`, y se deja un array vacío como respaldo para la primera vez, cuando todavía no hay nada guardado, y para el caso de que el texto guardado esté dañado.

**¿Dónde pones la lógica de guardar y por qué?** En `App`, dentro de las funciones que agregan y eliminan reservas. Allí vive el estado `reservas`, que es el que comparte toda la pantalla, entonces es el lugar lógico para actualizarlo y guardar ese mismo arreglo en `localStorage` justo en el momento en que cambia, ya sea al reservar o al eliminar. Así lo que se ve y lo que está guardado siempre son lo mismo. No se guarda en cada render porque sería escribir muchas veces sin necesidad. Además `MisReservas` solo recibe por props los datos y la función de eliminar, y no tiene por qué saber cómo ni dónde se guardan.

## Proyecto Final — F3: Catálogo inteligente

Cada ruta entre las seis ciudades tiene cinco vuelos. El selector de "Ordenar por" permite ordenarlos por precio de menor a mayor, precio de mayor a menor, hora de salida o avión de la A a la Z, y la lista se reordena al instante. Al seleccionar una tarjeta, queda resaltada con una clase de CSS condicional y sus datos, que son el avión, la hora y el precio, aparecen en el formulario de reserva como detalle del vuelo.

### Respuestas de F3

**¿Por qué hay que ordenar una copia del array y no el original?** Porque `.sort()` cambia el array que recibe, no devuelve uno nuevo. Si se ordenara el original, el catálogo quedaría modificado y se perdería el orden con el que venía, además de que se estaría mutando un dato que no le pertenece al componente. Con `[...vuelosEncontrados]` se crea una copia, se ordena esa copia y el catálogo original se mantiene intacto. La lista ordenada tampoco se guarda en un estado, lo que se guarda es solo el criterio, es decir `orden`, y la lista se calcula en cada render a partir de la ruta y de ese criterio, igual que pasa con el total en F1. Para ordenar por precio se restan los valores y para el avión se usa `localeCompare`, que sirve para comparar texto y respeta las tildes.

**¿Qué pasó con el orden al cambiar de ruta? ¿Se mantiene?** Sí. El estado `orden` vive en `App`, junto a `origen` y `destino`, y cambiar la ruta solo modifica esos dos estados, entonces `orden` no se reinicia y el criterio elegido se conserva. La lista simplemente se vuelve a calcular con el mismo criterio sobre los vuelos de la nueva ruta. Se puso allí porque es el dato que necesita la lista, y no la tarjeta, que solo muestra un vuelo.

**¿Cómo le avisa la tarjeta a `App` que fue seleccionada?** La tarjeta llama a la función `onSeleccionar` con el vuelo. `ListaVuelos` recibe esa función y se la pasa a cada tarjeta, y `App` guarda el vuelo en el estado `seleccionado`. Después `App` compara ese vuelo con cada tarjeta para saber cuál debe llevar la clase `seleccionada`, que es la que la resalta, y también le entrega el vuelo al formulario. Esto es lo mismo que en F1, los datos suben con la función y bajan como props.

## Decisión de diseño

La decisión más importante fue dejar el estado del formulario, o sea `nombre`, `pasajeros` y `clase`, dentro de `FormularioReserva` y no en `App`, y dejar en `App` solamente lo que se comparte, que es la ruta, el orden, el vuelo seleccionado y las reservas. La alternativa que descarté fue poner todos los estados en `App` y pasarlos hacia abajo por props, que habría funcionado igual pero habría dejado a `App` con muchos estados que nadie más necesita y con más props que pasar. La desventaja de mi decisión es que `App` no sabe lo que el usuario va escribiendo hasta que presiona Reservar, y por eso el formulario necesita una función por props para entregarle la reserva ya armada. Aun así me pareció mejor, porque `FormularioReserva` queda como un componente independiente y es más fácil saber dónde está cada dato.

## Ejecutar la aplicación

Solo la primera vez hay que instalar las dependencias, y después alcanza con iniciar el servidor de desarrollo.

```bash
npm install
npm run dev
```
