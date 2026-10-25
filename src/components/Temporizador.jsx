import { useEffect, useState } from 'react';

function formatear(segundos) {
  const m = Math.floor(segundos / 60);
  const s = segundos % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function Temporizador({ minutos }) {
  const duracionTotal = Math.max(0, Number(minutos) || 0) * 60;
  const [segundos, setSegundos] = useState(duracionTotal);
  const [corriendo, setCorriendo] = useState(false);

  useEffect(() => {
    setSegundos(duracionTotal);
    setCorriendo(false);
  }, [duracionTotal]);

  useEffect(() => {
    if (!corriendo) return;

    const intervalId = setInterval(() => {
      setSegundos((s) => {
        if (s <= 1) {
          setCorriendo(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [corriendo]);

  function alternar() {
    if (segundos <= 0) {
      setSegundos(duracionTotal);
      setCorriendo(true);
      return;
    }
    setCorriendo(!corriendo);
  }

  function reiniciar() {
    setCorriendo(false);
    setSegundos(duracionTotal);
  }

  return (
    <section className="temporizador">
      <h2>Temporizador</h2>
      <p className="tiempo" aria-label="Tiempo restante">{formatear(segundos)}</p>
      <button onClick={alternar}>
        {corriendo ? 'Pausar' : 'Iniciar'}
      </button>
      <button onClick={reiniciar}>
        Reiniciar
      </button>
    </section>
  );
}

export default Temporizador;
