import { useState } from 'react'
import './App.css'
import { CIUDADES, VUELOS } from './data/vuelos.js'
import Header from './components/Header.jsx'
import SelectorRuta from './components/SelectorRuta.jsx'
import ListaVuelos from './components/ListaVuelos.jsx'
import Footer from './components/Footer.jsx'
import FormularioReserva from './components/FormularioReserva.jsx'

function nombreCiudad(codigo) {
  return CIUDADES.find((c) => c.codigo === codigo)?.nombre ?? codigo
}

function App() {
  const [origen, setOrigen] = useState('')
  const [destino, setDestino] = useState('')
  const [seleccionado, setSeleccionado] = useState(null)
  const [mensajeReserva, setMensajeReserva] = useState('')
  const ciudadesDestino = CIUDADES.filter((c) => c.codigo !== origen)
  const vuelosEncontrados =
    origen !== '' && destino !== ''
      ? VUELOS.filter((v) => v.origen === origen && v.destino === destino)
      : []

  const manejarOrigen = (codigo) => {
    setOrigen(codigo)
    if (codigo === destino) setDestino('')
    setSeleccionado(null)
    setMensajeReserva('')
  }

  const manejarDestino = (codigo) => {
    setDestino(codigo)
    setSeleccionado(null)
    setMensajeReserva('')
  }

  const intercambiar = () => {
    setOrigen(destino)
    setDestino(origen)
    setSeleccionado(null)
    setMensajeReserva('')
  }

  const manejarSeleccion = (vuelo) => {
    setSeleccionado(vuelo)
    setMensajeReserva('')
  }

  const manejarReserva = ({ nombre, pasajeros, clase, total, vuelo }) => {
    setMensajeReserva(`¡Reserva realizada para ${nombre}! ${pasajeros} pasajero${pasajeros === 1 ? '' : 's'}, clase ${clase}, vuelo ${vuelo.id}. Total: $ ${total.toLocaleString('es-CO')}.`)
    setSeleccionado(null)
  }

  return (
    <main>
      <Header aerolinea="AeroCol" eslogan="Tu vuelo en un clic" />
      <section className="selector">
        <h2>✈️ Busca tu vuelo</h2>
        <SelectorRuta
          origen={origen}
          destino={destino}
          ciudades={CIUDADES}
          ciudadesDestino={ciudadesDestino}
          onOrigen={manejarOrigen}
          onDestino={manejarDestino}
        />
        <button type="button" onClick={intercambiar} disabled={!origen || !destino}>
          🔄 Intercambiar
        </button>
      </section>
      {!origen || !destino ? (
        <p className="mensaje">Elige origen y destino para buscar vuelos 🛫</p>
      ) : vuelosEncontrados.length === 0 ? (
        <p className="mensaje">No hay vuelos para esa ruta 🙃</p>
      ) : (
        <ListaVuelos
          vuelos={vuelosEncontrados}
          nombreOrigen={nombreCiudad(origen)}
          nombreDestino={nombreCiudad(destino)}
          seleccionado={seleccionado}
          onSeleccionar={manejarSeleccion}
        />
      )}
      {seleccionado && <FormularioReserva key={seleccionado.id} vuelo={seleccionado} onReservar={manejarReserva} />}
      {mensajeReserva && <p className="mensaje-confirmacion" role="status">{mensajeReserva}</p>}
      <Footer anio={2026} />
    </main>
  )
}

export default App
