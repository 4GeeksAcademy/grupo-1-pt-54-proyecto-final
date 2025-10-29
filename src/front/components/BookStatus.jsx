import { useState, useEffect } from "react";

const statusBgColor = {
  "Por leer": "#cff4fc",
  "En progreso": "#fff3cd",
  "Leído": "#ace8cdff",
};

const getStatusFromProgress = (progress) => {
    if (progress === 0) return "Por leer";
    if (progress > 0 && progress < 100) return "En progreso";
    return "Leído";
  };

export const BookStatus = ({ id, progreso, onEstadoChange }) => {
  const [bookState, setBookState] = useState(getStatusFromProgress(progreso));
  

  useEffect(() => {
    const savedState = localStorage.getItem(`bookState_${id}`);
    if (savedState) {
      setBookState(savedState);
    } else {
      const initialState = getStatusFromProgress(progreso);
      setBookState(initialState);
      localStorage.setItem(`bookState_${id}`, initialState);
    }
    const nuevoEstado = getStatusFromProgress(progreso);
  if (nuevoEstado !== savedState) {
    setBookState(nuevoEstado);
    localStorage.setItem(`bookState_${id}`, nuevoEstado);
  }
  if (onEstadoChange) onEstadoChange(getStatusFromProgress(progreso));
  }, [id, progreso]);

  const handleChangeState = (e) => {
    setBookState(e.target.value);
    localStorage.setItem(`bookState_${id}`, e.target.value);
  };

  return (
    <div className="relative" style={{ marginBottom: "15px" }}>
      <select
        value={bookState}
        onChange={handleChangeState}
        className={`text-sm px-3 rounded shadow-md`}
        style={{ backgroundColor: statusBgColor[bookState], fontFamily: "Libre Baskerville, serif" }}
      >
        <option value="Por leer">📘 Por leer</option>
        <option value="En progreso">📖 En progreso</option>
        <option value="Leído">✅ Leído</option>
      </select>
    </div>
  );
};

