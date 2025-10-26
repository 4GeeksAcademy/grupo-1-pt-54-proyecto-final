import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div style={{ position: "relative", width: "100%", height: "90vh", overflow: "hidden" }}>
      <img
        src="https://onlineketab.com/wp-content/uploads/2024/02/BANNERA5-1.jpg"
        alt="background image"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div style={{ position: "absolute", top: "45%", left: "30%", transform: "translate(-50%, -50%)", color: "black", textAlign: "center", padding: "30px 40px 0 40px", borderRadius: "10px", maxWidth: "90%", fontFamily: "Libre Baskerville, serif" }}>
        <h1 style={{ fontSize: "xxxLarge" }}>Chapter & Chill</h1>
        <p style={{ fontSize: "Large", marginLeft: "70px", padding: "30px" }}>Read without fear of losing the books you want to read and how many stories you've lived!</p>
      </div>
      <div style={{ position: "absolute", top: "6%", left: "85%", transform: "translate(-50%, -50%)" }}>
        <Link to="/login" style={{ margin: "10px", padding: "5px 14px", backgroundColor: "#bb4a4a", color: "white", textDecoration: "none", borderRadius: "20px" }}>
          Login
        </Link>
        <Link to="/registro-usuario" style={{ margin: "10px", padding: "5px 14px", backgroundColor: "#bb4a4a", color: "white", textDecoration: "none", borderRadius: "20px" }}>
          Register
        </Link>
      </div>
    </div>
  );
};
