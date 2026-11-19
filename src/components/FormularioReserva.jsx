import { useState } from 'react'
import { CLASES } from '../data/vuelos.js'

function FormularioReserva({ vuelo, onReservar }) {
  const [nombre, setNombre] = useState('')
  const [pasajeros, setPasajeros] = useState(1)
  const [clase, setClase] = useState('economica')
  const claseElegida = CLASES.find((opcion) => opcion.id === clase)
  const total = vuelo.precio * pasajeros * claseElegida.factor

  const formatoPrecio = (valor) => `$ ${valor.toLocaleString('es-CO')}`

  const manejarEnvio = (evento) => {
    evento.preventDefault()
    onReservar({ nombre: nombre.trim(), pasajeros, clase: claseElegida.nombre, total, vuelo })
  }

  return (
    <form className="reserva" onSubmit={manejarEnvio}>
      <h2>🎟️ Reservar {vuelo.avion} · {vuelo.hora}</h2>
      <p>Vuelo {vuelo.id} · {formatoPrecio(vuelo.precio)} por pasajero</p>
      <label className="campo" htmlFor="nombre-pasajero">
        Nombre del pasajero
        <input
          id="nombre-pasajero"
          type="text"
          value={nombre}
          onChange={(evento) => setNombre(evento.target.value)}
          placeholder="Ej. Ana García"
        />
      </label>
      <div className="contador">
        <span>👥 Pasajeros</span>
        <button type="button" onClick={() => setPasajeros(pasajeros - 1)} disabled={pasajeros <= 1} aria-label="Quitar un pasajero">−</button>
        <strong aria-live="polite">{pasajeros}</strong>
        <button type="button" onClick={() => setPasajeros(pasajeros + 1)} aria-label="Agregar un pasajero">+</button>
      </div>
      <fieldset>
        <legend>Clase</legend>
        {CLASES.map((opcion) => (
          <label key={opcion.id}>
            <input
              type="radio"
              name="clase"
              value={opcion.id}
              checked={clase === opcion.id}
              onChange={() => setClase(opcion.id)}
            />
            {' '}{opcion.nombre} ×{opcion.factor}
          </label>
        ))}
      </fieldset>
      <p className="total" aria-live="polite">💰 Total: {formatoPrecio(total)}</p>
      <button type="submit" disabled={!nombre.trim()}>✅ Reservar</button>
    </form>
  )
}

export default FormularioReserva
