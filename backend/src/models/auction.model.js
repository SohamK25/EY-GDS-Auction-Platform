import mongoose from "mongoose";

const auctionItemSchema = new mongoose.Schema({
    itemName: String,
    description: String,
    currentBid: Number,
    highestBidder: String,
    closingTime: Date, 
    createdBy:String,
    isClosed: {type: Boolean, default: false}
});

const AuctionItem = mongoose.model("AuctionItem", auctionItemSchema);

export default AuctionItem;