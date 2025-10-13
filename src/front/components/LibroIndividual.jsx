import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const LibroIndividual = () => {
  const { id } = useParams();
  const [libro, setLibro] = useState(null);
  const [progreso, setProgreso] = useState(0);
  const [status, setStatus] = useState("No leído");

  const fetchLibro = async () => {
    try {
      const response = await fetch(`api/books/${id}`);
      const data = await response.json();
      setLibro(data);
 
      if (data.progreso) {
        setProgreso(data.progreso);
        actualizarEstado(data.progreso);
      }
    } catch (error) {
      console.error("Error fetching book details:", error);
      setLibro(null);
    }
  };

  const actualizarEstado = (valor) => {
    if (valor === 0) setStatus("No leído");
    else if (valor > 0 && valor < 100) setStatus("En progreso");
    else setStatus("Leído");
  };

  const handleProgressChange = (e) => {
    const valor = Number(e.target.value);
    setProgreso(valor);
    actualizarEstado(valor);
  };

  useEffect(() => {
    fetchLibro();
  }, [id]);

  if (!libro) return <p>Cargando libro...</p>;

  return (
    <div className="libro-container">
      <div className="libro-imagen">
        <img src={libro.image} alt="portada de libro" className="portada" />
      </div>

      <div className="libro-detalles">
        <h1 className="titulo">{libro.title}</h1>
        <h2 className="autor">{libro.author}</h2>

        {/* Aquí adaptamos el progreso */}
        <div className="progreso-section">
          <label htmlFor="barra-progreso" className="status-label">
            Estado: <span className={`estado ${status.replace(" ", "").toLowerCase()}`}>{status}</span>
          </label>

          <input
            type="range"
            id="barra-progreso"
            min="0"
            max="100"
            value={progreso}
            onChange={handleProgressChange}
            className="barra-progreso"
          />
          <span className="progreso-texto">{progreso}%</span>
        </div>

        <p className="sinopsis">{libro.sinopsis || "Sin sinopsis disponible."}</p>
      </div>
    </div>
  );
};