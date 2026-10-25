import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import Navegacion from './components/Navegacion';
import Inicio from './paginas/Inicio';
import Catalogo from './paginas/Catalogo';
import Detalle from './paginas/Detalle';
import Favoritos from './paginas/Favoritos';
import NuevaReceta from './paginas/NuevaReceta';
import NoEncontrada from './paginas/NoEncontrada';

function leerFavoritos() {
  try {
    const raw = localStorage.getItem('favoritos');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function leerPropias() {
  try {
    const raw = localStorage.getItem('recetas_propias');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function App() {
  const [favoritos, setFavoritos] = useState(leerFavoritos);
  const [propias, setPropias] = useState(leerPropias);

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  useEffect(() => {
    localStorage.setItem('recetas_propias', JSON.stringify(propias));
  }, [propias]);

  function toggleFavorito(id) {
    const numId = Number(id);
    if (favoritos.includes(numId)) {
      setFavoritos(favoritos.filter((f) => f !== numId));
    } else {
      setFavoritos([...favoritos, numId]);
    }
  }

  function agregarReceta(receta) {
    setPropias((prev) => [...prev, receta]);
  }

  return (
    <div className="app">
      <Navegacion totalFavoritos={favoritos.length} />
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/recetas" element={<Catalogo propias={propias} />} />
          <Route
            path="/recetas/:id"
            element={
              <Detalle propias={propias} favoritos={favoritos} onToggleFavorito={toggleFavorito} />
            }
          />
          <Route
            path="/favoritos"
            element={<Favoritos favoritos={favoritos} onQuitar={toggleFavorito} />}
          />
          <Route path="/nueva" element={<NuevaReceta onAgregar={agregarReceta} />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
