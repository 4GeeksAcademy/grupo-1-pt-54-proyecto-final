import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const LibroIndividual = () => {
  const { id } = useParams();
  const [libro, setLibro] = useState(null);
  const [progreso, setProgreso] = useState(0);
  const [estado, setEstado] = useState("No leído");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || id.trim().length < 1) return;

    const fetchLibro = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/books/${id}`);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json"))
          throw new Error("Respuesta no es JSON");

        const data = await response.json();
        setLibro(data);

        const progresoNum = Number(data.progreso ?? 0);
        setProgreso(progresoNum);
        actualizarEstado(progresoNum);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLibro(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLibro();
  }, [id]);

  const actualizarEstado = (valor) => {
    if (valor === 0) setEstado("No leído");
    else if (valor > 0 && valor < 100) setEstado("En progreso");
    else setEstado("Leído");
  };

  const actualizarProgreso = async (nuevoValor) => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/books/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ progreso: nuevoValor }),
      });
      setLibro({ ...libro, progreso: nuevoValor }); // Update local state
    } catch (error) {
      console.error("Error al actualizar el progreso:", error);
    }
  };

  const handleProgresoChange = (e) => {
    const nuevoValor = Number(e.target.value);
    setProgreso(nuevoValor);
    actualizarEstado(nuevoValor);
    actualizarProgreso(nuevoValor);
  };

  if (loading) return <p>Cargando libro...</p>;
  if (!libro) return <p>No se encuentra el libro...</p>;

  const coverUrl = libro.cover_i
    ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-L.jpg`
    : "/placeholder-book.png";

  return (
    <div className="container row align-items-center" style={{ justifySelf: "center" }}>
      <div className="col-4 col-lg-5" style={{ textAlign: "center" }}>
        <img
          src={coverUrl}
          alt="portada de libro"
          className="img-fluid"
          style={{ borderRadius: "8px" }}
        />
      </div>

      <div
        className="col-7"
        style={{
          justifyItems: "center",
          fontFamily: "'M PLUS 2', sans-serif",
          color: "darkolivegreen",
        }}
      >
        <h1 className="mb-3 fw-medium">{libro.title}</h1>
        <h6 className="mb-3 fw-medium" style={{ fontSize: "xx-large" }}>
          {libro.author}
        </h6>

        <div style={{ marginBottom: "25px" }}>
          <label htmlFor="progreso" style={{ fontSize: "large", color: "darkslategray" }}>
            Progreso:
          </label>
          <input
            type="range"
            id="progreso"
            min="0"
            max="100"
            value={progreso}
            onChange={handleProgresoChange}
            style={{
              width: "100%",
              marginTop: "10px",
              accentColor: "green",
              cursor: "pointer",
            }}
          />
          <p style={{ textAlign: "right", fontSize: "small", color: "#555" }}>
            {progreso}% - {estado}
          </p>
        </div>

        <h4 className="display-4 blockquote" style={{ textAlign: "justify" }}>
          {libro.sinopsis || "Sin sinopsis disponible."}
        </h4>
      </div>
    </div>
  );
};