import { useState, useEffect } from "react";

const statusBgColor = {
  "Por leer": "#cff4fc",
  "En progreso": "#fff3cd",
  "Leído": "#ace8cdff",
};

export const BookStatus = () => {
  const [bookState, setBookState] = useState(() => {
    return localStorage.getItem("bookState") || "Por leer";
  });
  useEffect(() => {
    localStorage.setItem("bookState", bookState);
  }, [bookState]);

  const handleChangeState = (e) => {
    setBookState(e.target.value);
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

