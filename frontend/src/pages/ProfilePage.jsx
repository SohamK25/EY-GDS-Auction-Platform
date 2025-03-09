import { useAuthStore } from "../store/useAuthStore";
import { useAuctionStore } from "../store/useAuctionStore";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const { authUser, logout } = useAuthStore();


  return (
    <div style={{ padding: "16px", paddingTop: "80px", textAlign: "center", color: "white" }}>
      <h2 style={{ fontSize: "30px", fontWeight: "bold" }}>My Profile</h2>
      <div style={{ backgroundColor: "#0F3554", padding: "20px", borderRadius: "8px", display: "inline-block", marginTop: "20px", height: "200px", width: "250px" }}>
        <h3 style={{ fontSize: "25px", color: "yellow" }}>{authUser.username}</h3>
        <h4 style={{ fontSize: "15px", color: "yellow" }}>{authUser.email}</h4>
       
        <button
          onClick={logout}
          style={{
            marginTop: "15px",
            backgroundColor: "#F7D95C",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
