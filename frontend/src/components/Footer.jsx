import React from 'react'
import { Link } from 'react-router-dom';
import { Gavel } from 'lucide-react';

function Footer() {
    return (
        <footer style={{
            color: "white",
            padding: "40px 60px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap"
        }}>
            {/* Left Section */}
            <div style={{ maxWidth: "300px" }}>
                <h2 style={{ display: "flex", alignItems: "center" }}>
                    <span style={{
                        backgroundColor: "#007bff",
                        color: "#0A0F1D",
                        padding: "8px 12px",
                        borderRadius: "50%",
                        marginRight: "10px",
                        fontWeight: "bold"
                    }}>
                        <Gavel style={{ color: "white" }} size={30} />
                    </span>
                    Bid On
                </h2>
                <p>Discover unique treasures and bid with confidence.</p>
            </div>

            {/* Middle Sections */}
            <div>
                <h3 style={{ color: "yellow" }}>Quick Links</h3>
                <p><Link to = "/" style={{ color: "white", textDecoration: "none" }}>Home</Link></p>
                <p><Link to = "#" style={{ color: "white", textDecoration: "none" }}>Auctions</Link></p>
                <p><Link to = "#" style={{ color: "white", textDecoration: "none" }}>About Us</Link></p>
                <p><Link to = "/contactus" style={{ color: "white", textDecoration: "none" }}>Contact</Link></p>
            </div>
            <div>
                <h3 style={{ color: "yellow" }}>Customer Service</h3>
                <p>FAQ</p>
                <p>Terms of Service</p>
                <p>Privacy Policy</p>
                <p>Shipping Information</p>
            </div>

            {/* Right Section */}
            <div>
                <h3 style={{ color: "yellow" }}>Newsletter</h3>
                <p>Stay updated with our latest auctions and news.</p>
                <input type="text" placeholder="Enter your email"
                    style={{
                        width: "200px",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "none",
                        marginBottom: "10px",
                        backgroundColor: "#c9d1d9",
                        color: "black"
                    }}
                />
                <button style={{
                    display: "block",
                    width: "100%",
                    padding: "10px",
                    color: "white",
                    backgroundColor: "#F7D95C",
                    border: "none",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    cursor: "pointer"
                }}>
                    Subscribe
                </button>
            </div>

            {/* Copyright Section */}
            <div style={{
                width: "100%",
                textAlign: "center",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                paddingTop: "20px",
                marginTop: "20px"
            }}>
                © 2025 Bid On. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer
