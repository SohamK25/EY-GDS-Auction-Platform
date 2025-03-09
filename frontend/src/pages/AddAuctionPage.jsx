import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Upload, Loader2 } from "lucide-react";
import { useAuctionStore } from "../store/useAuctionStore";

const AddAuctionPage = () => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null); 

  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    startingBid: "",
    startingTime: new Date(),
    closingTime: new Date(),  
    picture: null,
  });

  const { createAuction, isCreating } = useAuctionStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStartDateChange = (date) => {
    setFormData((prev) => ({ ...prev, startingTime: date || new Date() })); 
  };

  const handleEndDateChange = (date) => {
    setFormData((prev) => ({ ...prev, closingTime: date || new Date() })); 
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, picture: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const auctionData = new FormData();
    Object.keys(formData).forEach((key) => {
      auctionData.append(key, formData[key]);
    });

    try {
      await createAuction(auctionData);

      setFormData({
        itemName: "",
        description: "",
        startingBid: "",
        startingTime: new Date(),
        closingTime: new Date(),
        picture: null,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error creating auction:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(11, 36, 79, 0.87)",
        color: "white",
        padding: "20px",
        borderRadius: "10px",
        width: "70%",
        margin: "40px auto",
        marginTop: "100px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h2 style={{ color: "yellow", textAlign: "center" }}>Create New Listing</h2>

      <form onSubmit={handleSubmit}>
        <label style={{ fontWeight: "bold", fontSize: "14px" }}>Item Name</label>
        <input
          type="text"
          name="itemName"
          placeholder="Enter item name"
          value={formData.itemName}
          onChange={handleChange}
          required
          style={{
            width: "98%",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: "#c9d1d9",
            color: "#0d1117",
            fontSize: "14px",
            borderRadius: "5px",
            border: "none",
          }}
        />

        <label style={{ fontWeight: "bold", fontSize: "14px" }}>Description</label>
        <textarea
          name="description"
          placeholder="Describe the item"
          value={formData.description}
          onChange={handleChange}
          required
          style={{
            width: "98%",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: "#c9d1d9",
            color: "#0d1117",
            fontSize: "14px",
            borderRadius: "5px",
            border: "none",
          }}
        />

        <label style={{ fontWeight: "bold", fontSize: "14px" }}>Starting Price</label>
        <input
          type="number"
          name="startingBid"
          placeholder="0.00"
          value={formData.startingBid}
          onChange={handleChange}
          required
          style={{
            width: "98%",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: "#c9d1d9",
            color: "#0d1117",
            fontSize: "14px",
            borderRadius: "5px",
            border: "none",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", gap: "20px", marginBottom: "20px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: "bold", fontSize: "14px" }}>Start Date and Time</label>
            <DatePicker
              selected={formData.startingTime}
              onChange={handleStartDateChange}
              showTimeSelect
              dateFormat="yyyy-MM-dd HH:mm"
              required
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: "bold", fontSize: "14px" }}>End Date and Time</label>
            <DatePicker
              selected={formData.closingTime}
              onChange={handleEndDateChange}
              showTimeSelect
              dateFormat="yyyy-MM-dd HH:mm"
              required
            />
          </div>
        </div>

        <div style={{ marginTop: "10px" }}>
          <label style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "10px", display: "block" }}>
            Upload Images
          </label>
          <label
            htmlFor="fileUpload"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "95%",
              height: "150px",
              border: "2px dashed #007bff",
              borderRadius: "10px",
              backgroundColor: "#c9d1d9",
              cursor: "pointer",
              textAlign: "center",
              color: "#0d1117",
              fontWeight: "bold",
              padding: "20px",
            }}
          >
            <Upload size={24} />
            <span>Upload files (PNG, JPG, GIF up to 10MB)</span>
            <input id="fileUpload" type="file" ref={fileInputRef} onChange={handleFileChange} required />
          </label>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button
            type="submit"
            style={{
              width: "50%",
              backgroundColor: "#F7D95C",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            disabled={loading || isCreating}
          >
            {loading || isCreating ? <Loader2 size={18} className="animate-spin" /> : "Create Auction"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAuctionPage;
