import TarjetaVuelo from './TarjetaVuelo.jsx'

function ListaVuelos({ vuelos, nombreOrigen, nombreDestino, orden, onOrden, seleccionado, onSeleccionar }) {
  return (
    <section className="lista">
      <h2>
        🛫 {vuelos.length} vuelo{vuelos.length !== 1 ? 's' : ''} · {nombreOrigen} →{' '}
        {nombreDestino}
      </h2>
      <label className="orden">Ordenar por
        <select value={orden} onChange={(e) => onOrden(e.target.value)}>
          <option value="precio-asc">Precio: menor a mayor</option>
          <option value="precio-desc">Precio: mayor a menor</option>
          <option value="hora">Hora de salida</option>
          <option value="avion">Avión (A–Z)</option>
        </select>
      </label>
      <ul>
        {vuelos.map((v) => (
          <TarjetaVuelo key={v.id} vuelo={v} onSeleccionar={onSeleccionar} seleccionada={seleccionado?.id === v.id} />
        ))}
      </ul>
    </section>
  )
}

export default ListaVuelos
