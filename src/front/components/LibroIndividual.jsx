import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const LibroIndividual = () => {
  const { id } = useParams()
  const [libro, setLibro] = useState(null);

  const fetchLibro = async () => {
    try {
       const response = await fetch(`api/books/${id}`);
      const data = await response.json();
      setLibro(data);
    } catch (error) {
      console.error("Error fetching book details:", error);
      setLibro(null);
    }
  };

  useEffect(() => fetchLibro(), [id])
  return (
    <div className="container row align-items-center" style={{ justifySelf: "center" }}>
      <div className="col-4 col-lg-5" style={{ /*padding: "82px 0 0 50px",*/ textAlign: "center" }}>
        <img src={libro.image} alt="portada de libro" className="img-fluid" style={{ borderRadius: "8px" }} />
      </div>
      <div className="col-7" style={{ justifyItems: "center", fontFamily: "'M PLUS 2', sans-serif", color: "darkolivegreen" }}>
        <h1 className="mb-3 fw-medium" style={{ marginBottom: "14px" }}>{libro.title}</h1>
        <h6 className="mb-3 fw-medium" style={{ fontSize: "xx-large", marginBottom: "14px" }}>{libro.author}</h6>
        {/* <span className="display-4">{libro?.progreso}</span> */}
        <h4 className="display-4 blockquote" style={{ textAlign: "justify" }}>{libro.sinopsis || "Sin sinopsis disponible."}</h4>
      </div>
    </div>
  );
};