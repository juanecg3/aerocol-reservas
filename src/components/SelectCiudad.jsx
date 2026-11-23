// Esta función crea un menú donde la persona puede elegir una ciudad.
function SelectCiudad({ label, value, ciudades, onCambio }) {
  // El texto que aparece en el menú y su información llegan desde otras partes del programa.
  // Aquí se prepara el contenido que se mostrará en la pantalla.
  return (
    // Esta etiqueta agrupa el nombre y el menú para que sean parte del mismo campo.
    <label className="campo">
      {/* Muestra el texto que identifica qué ciudad se debe elegir. */}
      {label}
      {/* El valor seleccionado queda controlado por el programa y avisa cuando cambia. */}
      <select value={value} onChange={(e) => onCambio(e.target.value)}>
        {/* Esta es la opción inicial que invita a elegir una opción. */}
        <option value="">— Elige {label.toLowerCase()} —</option>
        {/* Por cada ciudad disponible se crea una opción dentro del menú. */}
        {ciudades.map((c) => (
          // La clave ayuda a React a identificar cada ciudad sin confundirlas.
          // El valor guardado es el código y el texto muestra el nombre y el código.
          <option key={c.codigo} value={c.codigo}>
            {c.nombre} ({c.codigo})
          </option>
        ))}
      </select>
    </label>
  )
}

// Esta línea permite usar este menú en otros archivos del proyecto.
export default SelectCiudad
