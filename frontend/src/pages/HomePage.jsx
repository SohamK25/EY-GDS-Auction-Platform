import { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
        marginTop: "70px"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('src/assets/welcome_bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: isHovered ? "blur(8px)" : "none",
          transition: "filter 0.3s ease-in-out",
        }}
      ></div>

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(15, 45, 100, 0.5)",
        }}
      ></div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, color: "white", padding: "20px" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", margin: "0" }}>Welcome to Bid On</h1>
        <p style={{ fontSize: "1.2rem", marginTop: "10px" }}>
          An Online Auction Platform where you can Discover Unique Treasures and Bid with Confidence
        </p>
        <Link to={'/auctions'}>
        <button
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            backgroundColor: "#F7D95C",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#16a34a")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#F7D95C")}
        >
          Explore Auctions
        </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
