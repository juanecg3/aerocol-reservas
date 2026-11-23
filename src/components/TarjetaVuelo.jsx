// Esta función recibe un precio y lo convierte al formato colombiano.
// Por ejemplo, el número 150000 se muestra como $ 150.000.
function formatoPrecio(precio) {
  // Agrega el símbolo de peso y usa puntos para separar los miles.
  return `$ ${precio.toLocaleString('es-CO')}`
}

// Este componente muestra la información de un vuelo en forma de tarjeta.
// Recibe los datos del vuelo, la acción al seleccionarlo y si está seleccionada.
function TarjetaVuelo({ vuelo, onSeleccionar, seleccionada }) {
  return (
    // Cada <li> representa una sola opción de vuelo en una lista.
    <li
      // Si la tarjeta está seleccionada, agrega una clase visual especial.
      className={seleccionada ? 'tarjeta seleccionada' : 'tarjeta'}
      // Cuando una persona hace clic, envía este vuelo para seleccionarlo.
      onClick={() => onSeleccionar(vuelo)}
      // Permite seleccionar el vuelo también con la tecla Enter.
      onKeyDown={(e) => e.key === 'Enter' && onSeleccionar(vuelo)}
      // Indica que la tarjeta funciona como si fuera un botón.
      role="button"
      // Permite llegar a la tarjeta usando la tecla Tab del teclado.
      tabIndex={0}
    >
      {/* Muestra el nombre del avión con un ícono de avión. */}
      <strong>🛩️ {vuelo.avion}</strong>
      {/* Muestra la hora de salida del vuelo con un ícono de reloj. */}
      <span>🕐 {vuelo.hora}</span>
      {/* Muestra el precio usando el formato definido en formatoPrecio. */}
      <b>{formatoPrecio(vuelo.precio)}</b>
    </li>
  )
}

// Permite que otros archivos utilicen este componente.
export default TarjetaVuelo
