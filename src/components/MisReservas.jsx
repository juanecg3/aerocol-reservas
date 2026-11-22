function formatoPrecio(valor) {
  return `$ ${valor.toLocaleString('es-CO')}`
}

function MisReservas({ reservas, onEliminar }) {
  return (
    <section className="mis-reservas">
      <h2>🎫 Mis reservas</h2>
      {reservas.length === 0 ? (
        <p className="mensaje">Aún no tienes reservas 👀</p>
      ) : (
        <ul>
          {reservas.map((reserva) => (
            <li className="reserva-guardada" key={reserva.id}>
              <div>
                <strong>{reserva.nombre}</strong>
                <p>Vuelo {reserva.vueloId} · {reserva.pasajeros} pasajero{reserva.pasajeros !== 1 ? 's' : ''}</p>
                <p>{reserva.clase} · {reserva.fecha}</p>
                <b>{formatoPrecio(reserva.total)}</b>
              </div>
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

export default MisReservas
