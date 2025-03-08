import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { CheckCircle, Lock, Loader2, Zap, Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        // backgroundColor: "#0d1117",
        // paddingLeft: "250px",
        marginLeft: "30px"
      }}
    >
      <div
        style={{
          display: "flex",
          width: "750px",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Left Section */}
        <div
          style={{
            flex: "1",
            padding: "40px",
            background: "linear-gradient(135deg,rgb(20, 95, 209),rgb(3, 56, 121))",
            color: "white",
          }}
        >
          <h2 style={{ fontSize: "28px", marginBottom: "10px", color: "yellow" }}>Welcome Back</h2>
          <p style={{ fontSize: "14px", opacity: "0.9", marginBottom: "100px" }}>
            Sign in to access your account and continue bidding on exclusive items.
          </p>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <CheckCircle size={18} style={{ marginRight: "10px", color: "yellow" }} />
            <span>Access to premium auctions</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <Zap size={18} style={{ marginRight: "10px", color: "yellow" }} />
            <span>Real-time bidding</span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Lock size={18} style={{ marginRight: "10px", color: "yellow" }} />
            <span>Secure transactions</span>
          </div>
        </div>

        {/* Right Section */}
        <div
          style={{
            flex: "1",
            padding: "40px",
            backgroundColor: "rgba(11, 36, 79, 0.87)",
            color: "#c9d1d9",
          }}
        >
          <h2 style={{ fontSize: "22px", marginBottom: "20px", color: "yellow" }}>
            Sign in to your account
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontWeight: "bold", fontSize: "14px" }}>Email Address</label>
              <div style={{ position: "relative" }}>

                <input
                  type="email"
                  placeholder="you@example.com"
                  style={{
                    width: "90%",
                    padding: "10px 10px 10px 35px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#c9d1d9",
                    color: "#0d1117",
                    fontSize: "14px",
                  }}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontWeight: "bold", fontSize: "14px" }}>Password</label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  style={{
                    width: "90%",
                    padding: "10px 10px 10px 35px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#c9d1d9",
                    color: "#0d1117",
                    fontSize: "14px",
                  }}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  {showPassword ?
                    <EyeOff size={18} style={{ marginRight: "10px", color: "gray" }} /> :
                    <Eye size={18} style={{ marginRight: "10px", color: "black" }} />
                  }
                </button>
              </div>
            </div>



            <button
              type="submit"
              style={{
                width: "105%",
                padding: "12px",
                backgroundColor: "#F7D95C",
                color: "white",
                border: "none",
                borderRadius: "5px",
                fontSize: "16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "50px"
              }}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 size={18} className="animate-spin" style={{ marginRight: "10px" }} />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p style={{ fontSize: "14px", marginTop: "15px", textAlign: "center", opacity: "0.8" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#F7D95C", textDecoration: "none" }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
