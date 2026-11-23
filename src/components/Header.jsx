// Este componente crea la parte superior de la página con el nombre y el eslogan de la aerolínea.
function Header({ aerolinea, eslogan }) {
  // Las llaves permiten recibir los datos aerolinea y eslogan para mostrarlos aquí.
  return (
    // Esta etiqueta agrupa todo el contenido del encabezado y le asigna una clase para darle estilo.
    <header className="header">
      {/* La etiqueta h1 muestra el nombre principal de la aerolínea junto con un avión. */}
      <h1>✈️ {aerolinea}</h1>
      {/* La etiqueta p muestra el eslogan debajo del nombre principal. */}
      <p>{eslogan}</p>
    </header>
  )
}

// Esta línea permite usar el componente Header en otras partes de la aplicación.
export default Header
