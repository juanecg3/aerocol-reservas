// Traemos el componente que muestra una lista para escoger una ciudad.
import SelectCiudad from './SelectCiudad.jsx'

// Este componente organiza la selección del origen y del destino del viaje.
function SelectorRuta({ origen, destino, ciudades, ciudadesDestino, onOrigen, onDestino }) {
  return (
    // Aquí se dibuja en pantalla el grupo completo de origen y destino.
    <div className="ruta">
      {/* Mostramos el origen elegido y la lista de ciudades disponibles para seleccionarlo. */}
      <SelectCiudad label="Origen" value={origen} ciudades={ciudades} onCambio={onOrigen} />
      {/* Ponemos una flecha para indicar que el viaje va desde el origen al destino. */}
      <span className="flecha">→</span>
      {/* Mostramos el destino elegido y las opciones de ciudades disponibles para seleccionarlo. */}
      <SelectCiudad
        label="Destino"
        value={destino}
        ciudades={ciudadesDestino}
        onCambio={onDestino}
      />
    </div>
  )
}

// Permitimos que el resto de la aplicación use este componente.
export default SelectorRuta
