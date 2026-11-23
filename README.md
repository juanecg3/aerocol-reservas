# AeroCol

Aplicación de práctica para buscar vuelos por origen y destino y reservar un vuelo seleccionado.

## Proyecto Final — F1: Formulario de reserva

Al seleccionar una tarjeta aparece un formulario controlado para ingresar el nombre, elegir la cantidad de pasajeros y seleccionar la clase. El total se actualiza al cambiar pasajeros o clase, y el botón de reserva permanece deshabilitado mientras el nombre esté vacío.

### Respuestas de F1

1. **¿Dónde vive el estado del formulario y por qué?** `nombre`, `pasajeros` y `clase` viven dentro de `FormularioReserva`, porque solo ese componente los necesita para mostrar y calcular la reserva. La selección del vuelo vive en `App`, que recibe el aviso de la tarjeta y decide cuándo mostrar el formulario.
2. **¿Por qué el total no es otro estado?** Se deriva de `vuelo.precio × pasajeros × factor de clase`. Al calcularlo en cada render, queda actualizado automáticamente cuando cambian sus datos y no puede desincronizarse de ellos.
3. **¿Qué prop se agregó a `TarjetaVuelo`?** `onSeleccionar`, una función que la tarjeta llama al hacer clic o presionar Enter para avisar a `App` cuál vuelo se eligió.
4. **¿Qué pasa si no hay vuelo seleccionado?** `App` no renderiza `FormularioReserva`; el formulario aparece solo después de elegir una tarjeta.

## Proyecto Final — F2: Mis reservas

Las reservas aparecen en una lista debajo del formulario. Cada una muestra el nombre, el vuelo, la cantidad de pasajeros, la clase, el total y la fecha. Se puede eliminar una reserva y la lista se conserva al recargar la página mediante `localStorage`.

### Respuestas de F2

1. **¿Por qué no mutar el array directamente con `push`?** Porque `push` modifica el array existente y React puede no detectar el cambio. Al crear un array nuevo con `[...reservas, nueva]`, React puede actualizar la pantalla.
2. **¿Qué les pasa a las reservas si recargas la página sin `localStorage`?** Se pierden, porque el estado de React vuelve a comenzar vacío al cargar la aplicación.
3. **¿Dónde pones la lógica de guardar y por qué?** En `App`, dentro de las funciones que agregan y eliminan reservas. Allí se actualiza el estado que comparte la pantalla y se guarda ese mismo arreglo en `localStorage`.

## Proyecto Final — F3: Catálogo inteligente

Cada ruta entre las seis ciudades tiene cinco vuelos. El selector permite ordenarlos por precio de menor a mayor, precio de mayor a menor, hora de salida o avión de la A a la Z. Al seleccionar una tarjeta, queda resaltada y sus datos aparecen en el formulario de reserva.

### Respuestas de F3

1. **¿Por qué hay que ordenar una copia del array y no el original?** Porque `.sort()` cambia el array que recibe. Con `[...vuelosEncontrados]` se ordena una copia y el catálogo original se mantiene intacto.
2. **¿Qué pasó con el orden al cambiar de ruta? ¿Se mantiene?** Sí. El estado `orden` vive en `App` y cambiar la ruta no lo reinicia, así que el criterio elegido se conserva.
3. **¿Cómo le avisa la tarjeta a `App` que fue seleccionada?** La tarjeta llama a la función `onSeleccionar` con el vuelo. `ListaVuelos` pasa esa función y `App` guarda el vuelo en `seleccionado`.

### Ejecutar la aplicación

```bash
npm install
npm run dev
```
