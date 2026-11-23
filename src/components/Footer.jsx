// Esta función crea el contenido del pie de página del sitio.
function Footer({ anio }) {
  // La información "anio" llega desde otra parte y permite mostrar el año actual.

  // Aquí se devuelve el diseño que se verá en la página.
  return (
    // El elemento "footer" representa el pie de página y usa la clase "footer" para darle estilos.
    <footer className="footer">
      {/* El párrafo muestra el símbolo de copyright, el año recibido y el nombre de la aerolínea. */}
      <p>© {anio} AeroCol — vuelos de práctica</p>
    </footer>
  )
}

// Se exporta este componente para poder utilizarlo en otras partes del proyecto.
export default Footer
