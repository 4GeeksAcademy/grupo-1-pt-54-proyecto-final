import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const LibroIndividual = () => {
  const { store } = useGlobalReducer()
  const { theId } = useParams()

  const singleLibro = store.libros.find(libro => libro.id === parseInt(theId));

  if (!singleLibro) {
    return <p>Book not found...</p>;
  }
  return (
    <div className="container row align-items-center" style={{ justifySelf: "center" }}>
      <div className="col-4 col-lg-5" style={{ /*padding: "82px 0 0 50px",*/ textAlign: "center" }}>
        <img src={singleLibro?.image} alt="portada de libro" className="img-fluid" style={{ borderRadius: "8px" }} />
      </div>
      <div className="col-7" style={{ justifyItems: "center", fontFamily: "'M PLUS 2', sans-serif", color: "darkolivegreen" }}>
        <h1 className="mb-3 fw-medium" style={{ marginBottom: "14px" }}>{singleLibro?.title}</h1>
        <h6 className="mb-3 fw-medium" style={{ fontSize: "xx-large", marginBottom: "14px" }}>{singleLibro?.author}</h6>
        {/* <span className="display-4">{singleLibro?.progreso}</span> */}
        <h4 className="display-4 blockquote" style={{ textAlign: "justify" }}>{singleLibro?.sinopsis}</h4>
      </div>
    </div>
  );
};