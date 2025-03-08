import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Gavel, MessageSquare, User } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
    const { logout, authUser } = useAuthStore();
    const [active, setActive] = useState();
    return (
        <nav style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
            position: "fixed",
            width: "99%",
            top: 0,
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "black" }}>
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


            <div style={{ display: "flex", alignItems: "center" }}>
                <Link to="/contactus" style={{
                    padding: "6px 12px",
                    color: active === "contact" ? "white" : "#007bff",
                    // color: "#007bff",
                    textDecoration: "none",
                    marginRight: "8px",
                    transition: "0.3s ease-in-out"
                }}
                    onMouseEnter={(e) => (e.target.style.color = "#ffff")}
                    onMouseLeave={(e) => (e.target.style.color = active === "contact" ? "#ffff" : "#007bff")}
                    onClick={() => setActive("contact")}
                >
                    <MessageSquare size={20} style={{ marginRight: "5px", alignItems: "center" }} />
                    <span>Contact Us</span>
                </Link>
                <Link to="/login" style={{
                    padding: "6px 12px",
                    color: active === "login" ? "white" : "#007bff",
                    // backgroundColor: active === "login" ? "#007bff" : "transparent",
                    textDecoration: "none",
                    transition: "0.3s ease-in-out",
                    marginRight: "8px"
                }}
                    onMouseEnter={(e) => (e.target.style.color = "#ffff")}
                    onMouseLeave={(e) => (e.target.style.color = active === "login" ? "#ffff" : "#007bff")}
                    onClick={() => setActive("login")}
                >
                    <User size={20} style={{ marginRight: "5px", alignItems: "center" }} />
                    <span>Sign In</span>
                </Link>

                {authUser && (
                    <>
                    <Link to="/add-auction" style={{
                        padding: "6px 12px",
                        color: active === "contact" ? "white" : "#007bff",
                        // color: "#007bff",
                        textDecoration: "none",
                        marginRight: "8px",
                        transition: "0.3s ease-in-out"
                    }}
                        onMouseEnter={(e) => (e.target.style.color = "#ffff")}
                        onMouseLeave={(e) => (e.target.style.color = active === "auction" ? "#ffff" : "#007bff")}
                        onClick={() => setActive("contact")}
                    >
                        <MessageSquare size={20} style={{ marginRight: "5px", alignItems: "center" }} />
                        <span>Create Auction</span>
                    </Link>


                    <Link to="/" style={{
                        padding: "6px 12px",
                        color: active === "logout" ? "white" : "#007bff",
                        // backgroundColor: active === "logout" ? "#dc3545" : "transparent",
                        textDecoration: "none",
                        transition: "0.3s ease-in-out",
                        marginRight: "8px"
                    }}
                        onMouseEnter={(e) => (e.target.style.color = "#ffff")}
                        onMouseLeave={(e) => (e.target.style.color = active === "logout" ? "#ffff" : "#dc3545")}
                        onClick={() => {
                            localStorage.removeItem("token");
                            sessionStorage.removeItem("token");
                            setActive("logout");
                            window.location.href = "/";
                        }}
                    >
                        <LogOut size={20} style={{ marginRight: "5px", alignItems: "center" }} />
                        <span>Logout</span>
                    </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
