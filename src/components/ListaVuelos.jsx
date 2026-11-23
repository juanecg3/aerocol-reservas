// Importa el componente que dibuja la tarjeta visual de un vuelo.
import TarjetaVuelo from './TarjetaVuelo.jsx'

// Recibe los datos necesarios para mostrar la lista y controlar el orden y la selección.
function ListaVuelos({ vuelos, nombreOrigen, nombreDestino, orden, onOrden, seleccionado, onSeleccionar }) {
  return (
    // Agrupa visualmente todos los elementos de esta lista de vuelos.
    <section className="lista">
      {/* Muestra el avión, la cantidad de vuelos y la ruta desde el origen hasta el destino. */}
      <h2>
        🛫 {vuelos.length} vuelo{vuelos.length !== 1 ? 's' : ''} · {nombreOrigen} →{' '}
        {nombreDestino}
      </h2>
      {/* Solo muestra el selector de orden si se recibió una función para cambiar el orden. */}
      {onOrden && (
        // Etiqueta que indica que el siguiente menú sirve para ordenar los vuelos.
        <label className="orden">Ordenar por
          {/* Mantiene seleccionado el orden actual y ejecuta el cambio elegido por la persona. */}
          <select value={orden} onChange={(e) => onOrden(e.target.value)}>
            {/* Cada opción define una forma diferente de organizar los vuelos. */}
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="hora">Hora de salida</option>
            <option value="avion">Avión (A–Z)</option>
          </select>
        </label>
      )}
      {/* Crea una lista en la que se colocarán las tarjetas de los vuelos. */}
      <ul>
        {/* Recorre cada vuelo recibido y prepara una tarjeta independiente para él. */}
        {vuelos.map((v) => (
          // Usa el identificador del vuelo para diferenciarlo y pasa la información necesaria a su tarjeta.
          <TarjetaVuelo key={v.id} vuelo={v} onSeleccionar={onSeleccionar} seleccionada={seleccionado?.id === v.id} />
        ))}
      </ul>
    </section>
  )
}

// Permite que otros componentes importen y utilicen esta lista de vuelos.
export default ListaVuelos
