import { Link } from 'react-router';

function NoEncontrada() {
  return (
    <section>
      <h1>404 - Página no encontrada</h1>
      <p>No encontramos esa página.</p>
      <Link to="/" className="boton">Volver al inicio</Link>
    </section>
  );
}

export default NoEncontrada;
