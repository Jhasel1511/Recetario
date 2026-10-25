import { useState } from 'react';
import { useNavigate } from 'react-router';

const VACIO = { nombre: '', categoria: 'almuerzo', tiempo: '' };

function NuevaReceta({ onAgregar }) {
  const [form, setForm] = useState(VACIO);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const nombreLimpio = form.nombre ? form.nombre.trim() : '';
    if (nombreLimpio === '') {
      setError('La receta necesita un nombre.');
      return;
    }

    const tiempoNum = Number(form.tiempo);
    if (!form.tiempo || isNaN(tiempoNum) || tiempoNum <= 0) {
      setError('El tiempo debe ser un número mayor que cero.');
      return;
    }

    const nuevaReceta = {
      id: Date.now(),
      nombre: nombreLimpio,
      categoria: form.categoria || 'almuerzo',
      tiempo: tiempoNum,
      ingredientes: [],
      pasos: [],
      relacionadas: [],
    };

    onAgregar(nuevaReceta);
    setExito('¡Receta guardada con éxito!');
    setForm(VACIO);

    setTimeout(() => {
      navigate('/recetas');
    }, 1000);
  }

  return (
    <section>
      <h1>Nueva receta</h1>

      <form className="formulario" onSubmit={handleSubmit} noValidate>
        <label>
          Nombre
          <input
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            placeholder="Ej. Sopa de verduras"
          />
        </label>

        <label>
          Categoría
          <select
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
          >
            <option value="desayuno">desayuno</option>
            <option value="almuerzo">almuerzo</option>
            <option value="acompañamiento">acompañamiento</option>
            <option value="postre">postre</option>
          </select>
        </label>

        <label>
          Tiempo (minutos)
          <input
            type="number"
            value={form.tiempo}
            onChange={(e) => setForm({ ...form, tiempo: e.target.value })}
            placeholder="Ej. 30"
          />
        </label>

        {error && <p className="error" role="alert">{error}</p>}
        {exito && <p className="exito" role="status" style={{ color: '#2e7d32', fontWeight: 600 }}>{exito}</p>}

        <button type="submit">Guardar receta</button>
      </form>
    </section>
  );
}

export default NuevaReceta;
