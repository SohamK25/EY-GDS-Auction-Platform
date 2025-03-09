import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Gavel, MessageSquare, User, Scale } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
    const { authUser } = useAuthStore();
    const [active, setActive] = useState();

    return (
        <nav style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
            position: "fixed",
            width: "99%",
            height: "60px",
            top: 0,
            left: 0,
            backgroundColor: "#042343",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            zIndex: 1000,
        }}>
            {/* Left Side: Logo */}
            <div style={{ display: "flex", alignItems: "center" }}>
                <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "white" }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        backgroundColor: "#007bff",
                        padding: "8px",
                        marginRight: "10px"
                    }}>
                        <Gavel style={{ color: "white" }} size={30} />
                    </div>
                    <h1 style={{ margin: 0, fontSize: "18px", color: "white" }}>Bid On</h1>
                </Link>
            </div>

            {/* Right Side: Navigation Links */}
            <div style={{ display: "flex", alignItems: "center" }}>
                {/*Sign in*/}
                {!authUser && (
                    <Link to="/login" style={{
                        padding: "6px 12px",
                        color: active === "login" ? "white" : "#007bff",
                        textDecoration: "none",
                        transition: "0.3s ease-in-out",
                        marginRight: "8px"
                    }}
                        onMouseEnter={(e) => (e.target.style.color = "#ffff")}
                        onMouseLeave={(e) => (e.target.style.color = active === "contact" ? "#ffff" : "#007bff")}
                        onClick={() => setActive("login")}
                    >
                        <User size={20} style={{ marginRight: "5px" }} />
                        <span>Sign In</span>
                    </Link>
                )}

                {authUser && (
                    <>
                        {/* All Auctions */}
                        <Link to="/auctions" style={{
                            padding: "6px 12px",
                            color: active === "auction" ? "white" : "#007bff",
                            textDecoration: "none",
                            marginRight: "8px",
                            transition: "0.3s ease-in-out"
                        }}
                            onMouseEnter={(e) => (e.target.style.color = "#ffff")}
                            onMouseLeave={(e) => (e.target.style.color = active === "contact" ? "#ffff" : "#007bff")}
                            onClick={() => setActive("auction")}
                        >
                            <Scale size={20} style={{ marginRight: "5px" }} />
                            <span>All Auctions</span>
                        </Link>

                        {/* Create Auction */}
                        <Link to="/add-auction" style={{
                            padding: "6px 12px",
                            color: active === "auction" ? "white" : "#007bff",
                            textDecoration: "none",
                            marginRight: "8px",
                            transition: "0.3s ease-in-out"
                        }}
                            onMouseEnter={(e) => (e.target.style.color = "#ffff")}
                            onMouseLeave={(e) => (e.target.style.color = active === "contact" ? "#ffff" : "#007bff")}
                            onClick={() => setActive("auction")}
                        >
                            <Gavel size={20} style={{ marginRight: "5px" }} />
                            <span>Create Auction</span>
                        </Link>


                        {/* Profile*/}
                        <Link to="/profile" style={{
                            padding: "6px 12px",
                            color: active === "auction" ? "white" : "#007bff",
                            textDecoration: "none",
                            marginRight: "8px",
                            transition: "0.3s ease-in-out"
                        }}
                            onMouseEnter={(e) => (e.target.style.color = "#ffff")}
                            onMouseLeave={(e) => (e.target.style.color = active === "contact" ? "#ffff" : "#007bff")}
                            onClick={() => setActive("auction")}
                        >
                            <User size={20} style={{ marginRight: "5px" }} />
                            <span>Profile</span>
                        </Link>

                        
                    </>
                )}
                {/* Contact Us */}
                <Link to="/contactus" style={{
                    padding: "6px 12px",
                    color: active === "contact" ? "white" : "#007bff",
                    textDecoration: "none",
                    marginRight: "8px",
                    transition: "0.3s ease-in-out"
                }}
                    onMouseEnter={(e) => (e.target.style.color = "#ffff")}
                    onMouseLeave={(e) => (e.target.style.color = active === "contact" ? "#ffff" : "#007bff")}
                    onClick={() => setActive("contact")}
                >
                    <MessageSquare size={20} style={{ marginRight: "5px" }} />
                    <span>Contact Us</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
