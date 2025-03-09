import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Lock, Mail, Loader2, MapPin } from "lucide-react";

const ContactUsPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); 
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          paddingBottom: "50px",
          // backgroundColor: "#0d1117",
          // paddingLeft: "20px",
          marginLeft: "25px",
          marginTop: "60px"
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
              padding: "30px",
              background: "linear-gradient(135deg,rgb(20, 95, 209),rgb(3, 56, 121))",
              color: "white",
            }}
          >
            <h2 style={{ fontSize: "28px", marginBottom: "10px", color: "yellow" }}>Connect with us</h2>
            <p style={{ fontSize: "14px", opacity: "0.9", marginBottom: "20px" }}>
              We're here to help and answer any question you might have. We look forward to hearing from you!
            </p>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", marginTop: "200px" }}>
              <Phone size={18} style={{ marginRight: "10px", color: "yellow" }} />
              <span>+91 98765 43210</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <Mail size={18} style={{ marginRight: "10px", color: "yellow" }} />
              <span>contactus@bidon.com</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <MapPin size={18} style={{ marginRight: "10px", color: "yellow" }} />
              <span>Unit 502, Skyline Business Center, Pune</span>
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
              Let's get in touch
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
                <label style={{ fontWeight: "bold", fontSize: "14px" }}>Message</label>
                <div style={{ position: "relative" }}>
                  <textarea
                    type="text"
                    placeholder="your message here"
                    style={{
                      width: "90%",
                      height: "80px",
                      padding: "10px 10px 10px 35px",
                      border: "none",
                      borderRadius: "5px",
                      backgroundColor: "#c9d1d9",
                      color: "#0d1117",
                      fontSize: "14px",
                      rowGap: 4
                    }}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
                    <Loader2 size={18} className="animate-spin" style={{ marginRight: "10px" }} />
                    Loading...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>


      {/* FAQ Section */}
      <div style={{ marginTop: "5px", padding: "20px", background: "linear-gradient(135deg,rgb(20, 95, 209),rgb(3, 56, 121))", borderRadius: "8px", maxWidth: "750px", margin: "40px auto", marginLeft: "250px", paddingLeft: "10px" }}>
        <h2 style={{ color: "yellow" }}>Frequently Asked Questions</h2>
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ color: "#F7D95C" }}>How do I place a bid?</h3>
          <p style={{ color: "white" }}>To place a bid, navigate to the auction page of the item you're interested in and enter your bid amount. Make sure you're logged in to your account before bidding.</p>
        </div>
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ color: "#F7D95C" }}>What payment methods do you accept?</h3>
          <p style={{ color: "white" }}>We accept major credit cards, PayPal, and bank transfers. Specific payment options may vary depending on the auction.</p>
        </div>
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ color: "#F7D95C" }}>How do I know if I've won an auction?</h3>
          <p style={{ color: "white" }}>If you're the highest bidder when an auction ends, you'll receive an email notification confirming your win. You can also check your account dashboard for updates on your bids and wins.</p>
        </div>
      </div>
    </>
  );
};

export default ContactUsPage
