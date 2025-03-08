import mongoose from "mongoose";

const auctionItemSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    description: { type: String, required: true },
    picture: { type: String, default: "" }, 
    currentBid: { type: Number, required: true, default: 0 },
    highestBidder: { type: String, default: "" }, 
    startingTime: { type: Date, required: true },
    closingTime: { type: Date, required: true },
    createdBy: { type: String, required: true }, 
    isClosed: { type: Boolean, default: false }
}, { timestamps: true }); 

const AuctionItem = mongoose.model("AuctionItem", auctionItemSchema);

export default AuctionItem;
