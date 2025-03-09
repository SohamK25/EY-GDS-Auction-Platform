import { useEffect, useState } from "react";
import { useAuctionStore } from "../store/useAuctionStore.js"; 
import { Loader, X } from "lucide-react";
import toast from "react-hot-toast";

const AuctionsPage = () => {
  const { auctions, fetchAuctions, isLoading, placeBid } = useAuctionStore();
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState("");

  useEffect(() => {
    fetchAuctions();
  }, [fetchAuctions]);

  const openBidModal = (auction) => {
    setSelectedAuction(auction);
    setBidAmount("");
  };

  const closeBidModal = () => {
    setSelectedAuction(null);
    setBidAmount("");
  };

  const handleBidSubmit = async () => {
    if (!bidAmount || isNaN(bidAmount) || Number(bidAmount) <= (selectedAuction.currentBid || selectedAuction.startingPrice)) {
      toast.error("Invalid bid. Enter a higher amount.");
      return;
    }

    await placeBid(selectedAuction._id, Number(bidAmount));
    closeBidModal();
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Loader size={40} color="white" className="animate-spin" />
      </div>
    );
  }

  return (
    <div style={{ padding: "16px", paddingTop: "100px" }}>
    <h2 style={{ color: "yellow", textAlign: "center", marginBottom: "30px" }}>Explore Auctions</h2>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px" }}>
        {auctions.length > 0 ? (
          auctions.map((auction) => (
            <div
              key={auction._id}
              style={{
                width: "280px",
                backgroundColor: "#0F3554",
                color: "white",
                borderRadius: "8px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                overflow: "hidden",
              }}
            >
              <img
                src={auction.picture || "default-image.jpg"}
                alt={auction.title}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <div style={{ padding: "16px" }}>
                <h3 style={{ color: "yellow", fontWeight: "bold", fontSize: "18px", marginBottom: "8px" }}>{auction.itemName}</h3>
                <h5 style={{ color: "#16a34a", fontSize: "14px" }}>
                  {auction.description.length > 100 ? `${auction.description.substring(0, 100)}...` : auction.description}
                </h5>
                <h4 style={{ color: "yellow", fontWeight: "bold", fontSize: "16px", marginTop: "8px" }}>
                  Current Bid: ₹{auction.currentBid || auction.startingPrice}
                </h4>
                <p style={{ fontSize: "14px", color: "lightgray" }}>Highest Bidder: {auction.highestBidder || "No bids yet"}</p>

                <button
                  onClick={() => openBidModal(auction)}
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    backgroundColor: "#F7D95C",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Place Bid
                </button>
              </div>
            </div>
          ))
        ) : (
          <h3 style={{ color: "white", textAlign: "center", fontSize: "18px" }}>No auctions available</h3>
        )}
      </div>

      {selectedAuction && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ background: "#1E3A5F", padding: "20px", borderRadius: "8px", width: "350px", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <h3 style={{ color: "white" }}>Place Your Bid</h3>
              <X size={20} color="white" onClick={closeBidModal} style={{ cursor: "pointer" }} />
            </div>
            <p style={{ color: "yellow" }}>
              Current Bid: ₹{selectedAuction.currentBid || selectedAuction.startingPrice}
            </p>
            <input
              type="number"
              placeholder="Enter your bid"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              style={{
                width: "90%",
                padding: "10px",
                marginTop: "10px",
                borderRadius: "4px",
                border: "none",
                fontSize: "16px",
              }}
            />
            <button
              onClick={handleBidSubmit}
              style={{
                width: "90%",
                marginTop: "10px",
                backgroundColor: "#F7D95C",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Submit Bid
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionsPage;
