// Importa la herramienta de React que permite recordar datos mientras se usa la página.
import { useState } from 'react'
// Importa los estilos visuales de esta pantalla.
import './App.css'
// Obtiene la lista de ciudades y de vuelos disponibles.
import { CIUDADES, VUELOS } from './data/vuelos.js'
// Importa cada parte que se mostrará en la página.
import Header from './components/Header.jsx'
import SelectorRuta from './components/SelectorRuta.jsx'
import ListaVuelos from './components/ListaVuelos.jsx'
import Footer from './components/Footer.jsx'
import FormularioReserva from './components/FormularioReserva.jsx'
import MisReservas from './components/MisReservas.jsx'

// Esta función recupera las reservas guardadas antes en el navegador.
function cargarReservas() {
  try {
    // Busca las reservas almacenadas con una clave conocida.
    const guardadas = localStorage.getItem('aerocol-reservas')
    // Convierte el texto guardado en una lista, o crea una lista vacía si no existe.
    return guardadas ? JSON.parse(guardadas) : []
  } catch {
    // Si los datos están dañados o no se pueden leer, empieza sin reservas.
    return []
  }
}

// Convierte un código de ciudad, como "BOG", en su nombre completo.
function nombreCiudad(codigo) {
  return CIUDADES.find((c) => c.codigo === codigo)?.nombre ?? codigo
}

// Esta función contiene toda la página y coordina sus acciones.
function App() {
  // Recuerda qué ciudad escribió o eligió el usuario como origen.
  const [origen, setOrigen] = useState('')
  // Recuerda qué ciudad eligió como destino.
  const [destino, setDestino] = useState('')
  // Recuerda qué vuelo eligió el usuario para reservar.
  const [seleccionado, setSeleccionado] = useState(null)
  // Guarda el mensaje que confirma que una reserva fue creada.
  const [mensajeReserva, setMensajeReserva] = useState('')
  // Guarda todas las reservas y las carga desde el navegador al iniciar.
  const [reservas, setReservas] = useState(cargarReservas)
  // Recuerda cómo deben aparecer ordenados los vuelos.
  const [orden, setOrden] = useState('precio-asc')
  // Excluye el origen de las opciones de destino para evitar elegir la misma ciudad.
  const ciudadesDestino = CIUDADES.filter((c) => c.codigo !== origen)
  // Busca vuelos únicamente cuando ya existe una ciudad de origen y otra de destino.
  const vuelosEncontrados =
    origen !== '' && destino !== ''
      ? VUELOS.filter((v) => v.origen === origen && v.destino === destino)
      : []
  // Copia los vuelos encontrados y los organiza según la opción elegida.
  const vuelosOrdenados = [...vuelosEncontrados].sort((a, b) => {
    // Ordena de mayor a menor precio cuando esa opción está seleccionada.
    if (orden === 'precio-desc') return b.precio - a.precio
    // Ordena los vuelos por la hora de salida.
    if (orden === 'hora') return a.hora.localeCompare(b.hora)
    // Ordena los vuelos según el nombre del avión.
    if (orden === 'avion') return a.avion.localeCompare(b.avion)
    // Por defecto, ordena los vuelos del precio más bajo al más alto.
    return a.precio - b.precio
  })

  // Se ejecuta cuando el usuario cambia la ciudad de origen.
  const manejarOrigen = (codigo) => {
    // Guarda la nueva ciudad de origen.
    setOrigen(codigo)
    // Si el destino coincide con el nuevo origen, borra el destino para evitar una ruta inválida.
    if (codigo === destino) setDestino('')
    // Quita cualquier vuelo seleccionado al cambiar la ruta.
    setSeleccionado(null)
    // Limpia el mensaje anterior de reserva.
    setMensajeReserva('')
  }

  // Se ejecuta cuando el usuario cambia la ciudad de destino.
  const manejarDestino = (codigo) => {
    // Guarda la nueva ciudad de destino.
    setDestino(codigo)
    // Quita cualquier vuelo seleccionado al cambiar la ruta.
    setSeleccionado(null)
    // Limpia el mensaje anterior de reserva.
    setMensajeReserva('')
  }

  // Invierte las ciudades de origen y destino.
  const intercambiar = () => {
    // El destino pasa a ser el nuevo origen.
    setOrigen(destino)
    // El origen pasa a ser el nuevo destino.
    setDestino(origen)
    // Cancela la selección de vuelo que se estaba realizando.
    setSeleccionado(null)
    // Limpia el mensaje anterior de reserva.
    setMensajeReserva('')
  }

  // Guarda el vuelo que el usuario decide reservar.
  const manejarSeleccion = (vuelo) => {
    setSeleccionado(vuelo)
    // Limpia un mensaje anterior para no mostrar una confirmación pasada.
    setMensajeReserva('')
  }

  // Se ejecuta cuando el usuario completa y confirma el formulario de reserva.
  const manejarReserva = ({ nombre, pasajeros, clase, total, vuelo }) => {
    // Crea un objeto con toda la información de la nueva reserva.
    const nueva = {
      // Genera un identificador único para distinguir esta reserva.
      id: crypto.randomUUID(),
      // Guarda el nombre de quien reserva.
      nombre,
      // Guarda el número o código del vuelo reservado.
      vueloId: vuelo.id,
      // Guarda la cantidad de pasajeros.
      pasajeros,
      // Guarda la clase elegida.
      clase,
      // Guarda el valor total pagado.
      total,
      // Guarda la fecha actual con formato colombiano.
      fecha: new Date().toLocaleDateString('es-CO'),
    }
    // Forma una nueva lista que conserva las reservas anteriores y agrega la actual.
    const nuevasReservas = [...reservas, nueva]
    // Actualiza la lista visible en la página.
    setReservas(nuevasReservas)
    // Convierte la lista a texto y la guarda permanentemente en el navegador.
    localStorage.setItem('aerocol-reservas', JSON.stringify(nuevasReservas))
    // Construye y muestra un mensaje sencillo con los datos de la reserva.
    setMensajeReserva(`¡Reserva realizada para ${nombre}! ${pasajeros} pasajero${pasajeros === 1 ? '' : 's'}, clase ${clase}, vuelo ${vuelo.id}. Total: $ ${total.toLocaleString('es-CO')}.`)
    // Oculta el formulario porque el vuelo ya fue reservado.
    setSeleccionado(null)
  }

  // Elimina una reserva usando el identificador único de esa reserva.
  const manejarEliminarReserva = (idEliminar) => {
    // Conserva todas las reservas cuyo identificador sea diferente al elegido.
    const nuevasReservas = reservas.filter((reserva) => reserva.id !== idEliminar)
    // Actualiza la lista que se muestra en la página.
    setReservas(nuevasReservas)
    // Guarda la nueva lista sin la reserva eliminada.
    localStorage.setItem('aerocol-reservas', JSON.stringify(nuevasReservas))
  }

  // Define el contenido visual que React debe mostrar.
  return (
    <main>
      {/* Muestra el encabezado con el nombre y el eslogan de la aerolínea. */}
      <Header aerolinea="AeroCol" eslogan="Tu vuelo en un clic" />
      <section className="selector">
        {/* Título del buscador de vuelos. */}
        <h2>✈️ Busca tu vuelo</h2>
        {/* Muestra los campos para elegir origen y destino. */}
        <SelectorRuta
          origen={origen}
          destino={destino}
          ciudades={CIUDADES}
          ciudadesDestino={ciudadesDestino}
          onOrigen={manejarOrigen}
          onDestino={manejarDestino}
        />
        {/* Permite cambiar origen por destino; se desactiva hasta elegir ambas ciudades. */}
        <button type="button" onClick={intercambiar} disabled={!origen || !destino}>
          🔄 Intercambiar
        </button>
      </section>
      {/* Si falta una ciudad, pide al usuario elegir la ruta completa. */}
      {!origen || !destino ? (
        <p className="mensaje">Elige origen y destino para buscar vuelos 🛫</p>
      // Si ambas ciudades existen pero no hay vuelos, muestra un aviso.
      ) : vuelosEncontrados.length === 0 ? (
        <p className="mensaje">No hay vuelos para esa ruta 🙃</p>
      // Si hay vuelos, los muestra en una lista ordenada.
      ) : (
        <ListaVuelos
          vuelos={vuelosOrdenados}
          nombreOrigen={nombreCiudad(origen)}
          nombreDestino={nombreCiudad(destino)}
          orden={orden}
          onOrden={setOrden}
          seleccionado={seleccionado}
          onSeleccionar={manejarSeleccion}
        />
      )}
      {/* Abre el formulario únicamente mientras hay un vuelo seleccionado. */}
      {seleccionado && <FormularioReserva key={seleccionado.id} vuelo={seleccionado} onReservar={manejarReserva} />}
      {/* Muestra la confirmación solo después de realizar una reserva. */}
      {mensajeReserva && <p className="mensaje-confirmacion" role="status">{mensajeReserva}</p>}
      {/* Muestra todas las reservas y permite eliminarlas. */}
      <MisReservas reservas={reservas} onEliminar={manejarEliminarReserva} />
      {/* Muestra el pie de página con el año indicado. */}
      <Footer anio={2026} />
    </main>
  )
}

// Hace disponible esta función para que React pueda mostrar la aplicación completa.
export default App
