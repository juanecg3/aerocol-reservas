# AeroCol

Aplicación de práctica para buscar vuelos por origen y destino y reservar un vuelo seleccionado.

## Proyecto Final — F1: Formulario de reserva

Al seleccionar una tarjeta aparece un formulario controlado para ingresar el nombre, elegir la cantidad de pasajeros y seleccionar la clase. El total se actualiza al cambiar pasajeros o clase, y el botón de reserva permanece deshabilitado mientras el nombre esté vacío.

### Respuestas de F1

1. **¿Dónde vive el estado del formulario y por qué?** `nombre`, `pasajeros` y `clase` viven dentro de `FormularioReserva`, porque solo ese componente los necesita para mostrar y calcular la reserva. La selección del vuelo vive en `App`, que recibe el aviso de la tarjeta y decide cuándo mostrar el formulario.
2. **¿Por qué el total no es otro estado?** Se deriva de `vuelo.precio × pasajeros × factor de clase`. Al calcularlo en cada render, queda actualizado automáticamente cuando cambian sus datos y no puede desincronizarse de ellos.
3. **¿Qué prop se agregó a `TarjetaVuelo`?** `onSeleccionar`, una función que la tarjeta llama al hacer clic o presionar Enter para avisar a `App` cuál vuelo se eligió.
4. **¿Qué pasa si no hay vuelo seleccionado?** `App` no renderiza `FormularioReserva`; el formulario aparece solo después de elegir una tarjeta.

### Ejecutar la aplicación

```bash
npm install
npm run dev
```
