function formatoPrecio(precio) {
  return `$ ${precio.toLocaleString('es-CO')}`
}

function TarjetaVuelo({ vuelo, onSeleccionar, seleccionada }) {
  return (
    <li
      className={seleccionada ? 'tarjeta seleccionada' : 'tarjeta'}
      onClick={() => onSeleccionar(vuelo)}
      onKeyDown={(e) => e.key === 'Enter' && onSeleccionar(vuelo)}
      role="button"
      tabIndex={0}
    >
      <strong>🛩️ {vuelo.avion}</strong>
      <span>🕐 {vuelo.hora}</span>
      <b>{formatoPrecio(vuelo.precio)}</b>
    </li>
  )
}

export default TarjetaVuelo
