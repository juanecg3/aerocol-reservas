// Importamos una herramienta de React para recordar datos que cambian en la pantalla.
import { useState } from 'react'
// Importamos la lista de clases de vuelo disponibles, como económica o ejecutiva.
import { CLASES } from '../data/vuelos.js'

// Esta función crea el formulario para reservar un vuelo.
function FormularioReserva({ vuelo, onReservar }) {
  // Guardamos el nombre que escribe la persona; empieza vacío.
  const [nombre, setNombre] = useState('')
  // Guardamos la cantidad de pasajeros; comienza en uno.
  const [pasajeros, setPasajeros] = useState(1)
  // Guardamos la clase seleccionada; comienza en económica.
  const [clase, setClase] = useState('economica')
  // Buscamos los datos completos de la clase elegida dentro de la lista.
  const claseElegida = CLASES.find((opcion) => opcion.id === clase)
  // Calculamos el precio total: precio del vuelo × pasajeros × factor de clase.
  const total = vuelo.precio * pasajeros * claseElegida.factor

  // Convertimos un número en un precio con el formato usado en Colombia.
  const formatoPrecio = (valor) => `$ ${valor.toLocaleString('es-CO')}`

  // Esta función se ejecuta cuando se envía el formulario.
  const manejarEnvio = (evento) => {
    // Evitamos que la página se recargue al enviar la reserva.
    evento.preventDefault()
    // Enviamos al encargado de reservas el nombre, pasajeros, clase y precio final.
    onReservar({ nombre: nombre.trim(), pasajeros, clase: claseElegida.nombre, total, vuelo })
  }

  // Aquí se describe el aspecto y el contenido que verá la persona.
  return (
    // Creamos el formulario y le indicamos qué función ejecuta al enviarlo.
    <form className="reserva" onSubmit={manejarEnvio}>
      {/* Mostramos el avión y la hora de salida del vuelo reservado. */}
      <h2>🎟️ Reservar {vuelo.avion} · {vuelo.hora}</h2>
      {/* Mostramos el número del vuelo y el precio de una persona. */}
      <p>Vuelo {vuelo.id} · {formatoPrecio(vuelo.precio)} por pasajero</p>
      {/* Creamos un campo con su texto de identificación. */}
      <label className="campo" htmlFor="nombre-pasajero">
        Nombre del pasajero
        <input
          // Identificamos este campo para relacionarlo con su etiqueta.
          id="nombre-pasajero"
          // Indicamos que aquí se puede escribir texto.
          type="text"
          // El contenido mostrado es el nombre guardado en el estado.
          value={nombre}
          // Cada vez que se escribe, guardamos el nuevo texto.
          onChange={(evento) => setNombre(evento.target.value)}
        />
      </label>
      {/* Agrupamos los controles para aumentar o disminuir pasajeros. */}
      <div className="contador">
        <span>👥 Pasajeros</span>
        {/* Quitamos un pasajero si ya hay más de uno. */}
        <button type="button" onClick={() => setPasajeros(pasajeros - 1)} disabled={pasajeros <= 1} aria-label="Quitar un pasajero">−</button>
        {/* Mostramos la cantidad actual y notificamos cambios a lectores de pantalla. */}
        <strong aria-live="polite">{pasajeros}</strong>
        {/* Agregamos un pasajero al número actual. */}
        <button type="button" onClick={() => setPasajeros(pasajeros + 1)} aria-label="Agregar un pasajero">+</button>
      </div>
      {/* Agrupamos las opciones de clase del vuelo. */}
      <fieldset>
        <legend>Clase</legend>
        {/* Recorremos cada clase disponible para crear una opción. */}
        {CLASES.map((opcion) => (
          // Usamos el identificador de la clase como clave interna única.
          <label key={opcion.id}>
            <input
              // Esta opción permite seleccionar solo una clase.
              type="radio"
              // Todas las opciones pertenecen al mismo grupo llamado clase.
              name="clase"
              // Guardamos el identificador de esta opción.
              value={opcion.id}
              // Marcamos la opción solo si coincide con la clase elegida.
              checked={clase === opcion.id}
              // Al seleccionarla, guardamos su identificador como clase actual.
              onChange={() => setClase(opcion.id)}
            />
            {/* Mostramos el nombre de la clase y cuánto aumenta su precio. */}
            {' '}{opcion.nombre} ×{opcion.factor}
          </label>
        ))}
      </fieldset>
      {/* Calculamos y mostramos el total actualizado en tiempo real. */}
      <p className="total" aria-live="polite">💰 Total: {formatoPrecio(total)}</p>
      {/* El botón se desactiva hasta que la persona escriba un nombre. */}
      <button type="submit" disabled={!nombre.trim()}>✅ Reservar</button>
    </form>
  )
}

// Permitimos que otros archivos usen este componente.
export default FormularioReserva
