import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { Upload } from 'lucide-react';

const AddAuctionPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [images, setImages] = useState(null);

  const handleFileChange = (event) => {
    setImages(event.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      itemName,
      description,
      startingPrice,
      startDate: startDate ? format(startDate, "yyyy-MM-dd HH:mm") : "",
      endDate: endDate ? format(endDate, "yyyy-MM-dd HH:mm") : "",
      images,
    });
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
          placeholder="Enter item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          style={{
            width: "98%",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: "#c9d1d9",
            color: "#0d1117",
            fontSize: "14px",
            borderRadius: "5px",
            border: "none",
            transition: "background-color 0.3s ease"
                  }} 
                  onMouseOver={(e) => (e.target.style.backgroundColor = "white")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#c9d1d9")}
          required
        />

        <label style={{ fontWeight: "bold", fontSize: "14px" }}>Description</label>
        <textarea
          value={description}
          placeholder="Describe the item"
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "98%",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: "#c9d1d9",
            color: "#0d1117",
            fontSize: "14px",
            borderRadius: "5px",
            border: "none",
            transition: "background-color 0.3s ease"
                  }} 
                  onMouseOver={(e) => (e.target.style.backgroundColor = "white")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#c9d1d9")}
          required
        />

        <label style={{ fontWeight: "bold", fontSize: "14px" }}>Starting Price</label>
        <input
          type="number"
          placeholder="0.00"
          value={startingPrice}
          onChange={(e) => setStartingPrice(e.target.value)}
          style={{
            width: "98%",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: "#c9d1d9",
            color: "#0d1117",
            fontSize: "14px",
            borderRadius: "5px",
            border: "none",
            transition: "background-color 0.3s ease"
                  }} 
                  onMouseOver={(e) => (e.target.style.backgroundColor = "white")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#c9d1d9")}
          required
        />

        <div style={{ display: "flex", justifyContent: "space-between", gap: "20px", marginTop: "10px", marginBottom: "20px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: "bold", fontSize: "14px", marginRight: "5px" }}>Start Date and Time</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="yyyy-MM-dd HH:mm"
              placeholderText="Pick a date and time"
              customInput={
                <input
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    backgroundColor: "#c9d1d9",
                    color: "#0d1117",
                    fontSize: "14px",
                    border: "none",
                    transition: "background-color 0.3s ease"
                  }} 
                  onMouseOver={(e) => (e.target.style.backgroundColor = "white")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#c9d1d9")}
                />
              }
              required
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: "bold", fontSize: "14px", marginRight: "5px" }}>End Date and Time</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              dateFormat="yyyy-MM-dd HH:mm"
              placeholderText="Pick a date and time"
              customInput={
                <input
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    backgroundColor: "#c9d1d9",
                    color: "#0d1117",
                    fontSize: "14px",
                    border: "none",
                    transition: "background-color 0.3s ease"
                  }} 
                  onMouseOver={(e) => (e.target.style.backgroundColor = "white")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#c9d1d9")}
                />
              }
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
            <span style={{ fontSize: "24px", marginBottom: "10px" }}><Upload /></span>
            <span>Upload <span style={{ color: "black" }}>files</span> one or multiple at a time</span>
            <span style={{ fontSize: "12px", color: "#0d1117" }}>PNG, JPG, GIF up to 10MB</span>
            <input
              id="fileUpload"
              type="file"
              multiple
              onChange={handleFileChange}
              // style={{ display: "none" }}
              required
            />
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
          >
            Submit Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAuctionPage;
