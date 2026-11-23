// Da formato al precio para mostrarlo de forma clara con el estilo de Colombia.
function formatoPrecio(valor) {
  return `$ ${valor.toLocaleString('es-CO')}`
}

// Construye la sección que muestra las reservas de la persona.
function MisReservas({ reservas, onEliminar }) {
  return (
    // Esta sección contiene el título y la lista de reservas.
    <section className="mis-reservas">
      {/* Título de la sección. */}
      <h2>🎫 Mis reservas</h2>
      {/* Comprueba si hay reservas para decidir qué mostrar. */}
      {reservas.length === 0 ? (
        // Si no hay reservas, informa a la persona.
        <p className="mensaje">Aún no tienes reservas 👀</p>
      ) : (
        // Si hay reservas, crea una lista con una fila para cada una.
        <ul>
          {reservas.map((reserva) => (
            // Muestra los datos de una reserva; su id la distingue de las demás.
            <li className="reserva-guardada" key={reserva.id}>
              <div>
                {/* Nombre de quien hizo la reserva. */}
                <strong>{reserva.nombre}</strong>
                {/* Vuelo y cantidad de personas que viajarán. */}
                <p>Vuelo {reserva.vueloId} · {reserva.pasajeros} pasajero{reserva.pasajeros !== 1 ? 's' : ''}</p>
                {/* Clase elegida y fecha del vuelo. */}
                <p>{reserva.clase} · {reserva.fecha}</p>
                {/* Total a pagar, presentado con formato de precio. */}
                <b>{formatoPrecio(reserva.total)}</b>
              </div>
              {/* Al pulsarlo, pide eliminar esta reserva usando su id. */}
              <button type="button" onClick={() => onEliminar(reserva.id)} aria-label={`Eliminar reserva de ${reserva.nombre}`}>
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

// Hace que este componente pueda utilizarse en otros archivos.
export default MisReservas
