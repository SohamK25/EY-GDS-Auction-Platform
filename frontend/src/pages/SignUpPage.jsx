import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Lock, Loader2, Zap } from "lucide-react";

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // Simulating API request
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
          <h2 style={{ fontSize: "28px", marginBottom: "10px", color: "yellow" }}>Register Now</h2>
          <p style={{ fontSize: "14px", opacity: "0.9", marginBottom: "20px" }}>
            Sign Up to join our exclusive bidding platform and discover unique treasures.
          </p>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", marginTop: "200px"}}>
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
            Sign Up to create your account
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontWeight: "bold", fontSize: "14px" }}>Full Name</label>
              <div style={{ position: "relative" }}>
              
                <input
                  type="text"
                  placeholder="John Doe"
                  style={{
                    width: "90%",
                    padding: "10px 10px 10px 35px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#c9d1d9",
                    color: "#0d1117",
                    fontSize: "14px",
                  }}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>


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
              <div style={{ position: "relative" }}>
                
                <input
                  type="password"
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
                marginTop: "30px"
              }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" style={{ marginRight: "10px"}} />
                  Loading...
                </>
              ) : (
                "Sign up"
              )}
            </button>
          </form>

          <p style={{ fontSize: "14px", marginTop: "15px", textAlign: "center", opacity: "0.8" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#F7D95C", textDecoration: "none" }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage
