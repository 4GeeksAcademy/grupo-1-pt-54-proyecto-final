import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const LibroIndividual = () => {
  const { id } = useParams();
  const [libro, setLibro] = useState(null);
  const [progreso, setProgreso] = useState(0);
  const [estado, setEstado] = useState("No leído");

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
    if (valor === 0) setEstado("No leído");
    else if (valor > 0 && valor < 100) setEstado("En progreso");
    else setEstado("Leído");
  };

  const handleProgresoChange = (e) => {
    const nuevoValor = Number(e.target.value);
    setProgreso(nuevoValor);
    actualizarEstado(nuevoValor);
  };

  useEffect(() => {
    fetchLibro();
  }, [id]);

  if (!libro) return <p>Cargando libro...</p>;

  return (
    <div className="container row align-items-center" style={{ justifySelf: "center" }}>
      <div
        className="col-4 col-lg-5"
        style={{ textAlign: "center" }}
      >
        <img
          src={libro.image}
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
        <h1 className="mb-3 fw-medium" style={{ marginBottom: "14px" }}>
          {libro.title}
        </h1>
        <h6
          className="mb-3 fw-medium"
          style={{ fontSize: "xx-large", marginBottom: "14px" }}
        >
          {libro.author}
        </h6>

        <div style={{ marginBottom: "25px" }}>
          <label htmlFor="progreso" style={{ fontSize: "large", color: "darkslategray" }}>
            Estado:{" "}
            <strong
              style={{
                color:
                  estado === "Leído"
                    ? "green"
                    : estado === "En progreso"
                    ? "orange"
                    : "gray",
              }}
            >
              {estado}
            </strong>
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
              accentColor: "darkolivegreen",
              cursor: "pointer",
            }}
          />
          <p style={{ textAlign: "right", fontSize: "small", color: "#555" }}>
            {progreso}%
          </p>
        </div>

        <h4
          className="display-4 blockquote"
          style={{ textAlign: "justify" }}
        >
          {libro.sinopsis || "Sin sinopsis disponible."}
        </h4>
      </div>
    </div>
  );
};