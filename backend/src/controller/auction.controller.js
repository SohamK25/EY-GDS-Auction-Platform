import AuctionItem from "../models/auction.model.js";
import upload from "../middleware/multer.js";

// Create an Auction Item
export const auction = async (req, res) => {
    try {
        const { itemName, description, startingBid, startingTime, closingTime } = req.body;
        const picture = req.file ? req.file.path : ""; // Get image URL from Cloudinary

        if (!req.user || !req.user.username) {
            return res.status(401).json({ message: "Unauthorized: User not authenticated" });
        }

        if (!itemName || !description || !startingBid || !startingTime || !closingTime) {
            return res.status(400).json({ message: "Please enter all the details" });
        }

        const newItem = new AuctionItem({
            itemName,
            description,
            currentBid: startingBid, // Ensure this is the correct field
            highestBidder: "",
            startingTime,
            closingTime,
            createdBy: req.user.username,
            picture, // Save Cloudinary URL
        });

        await newItem.save();
        return res.status(201).json({ message: "Auction Item Created", item: newItem });

    } catch (error) {
        console.error("Error in creating auction item:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Fetch All Auctions
export const auctions = async (req, res) => {
    try {
        const allAuctions = await AuctionItem.find();
        res.json(allAuctions);
    } catch (error) {
        console.error("Error in fetching auction items:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Fetch Single Auction Item
export const auctionItem = async (req, res) => {
    try {
        const item = await AuctionItem.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });

        res.json(item);
    } catch (error) {
        console.error("Error in fetching auction item:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Place a Bid on an Auction
export const bidOnItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { bid } = req.body;

        if (!req.user || !req.user.username) {
            return res.status(401).json({ message: "Unauthorized: User not authenticated" });
        }

        const item = await AuctionItem.findById(id);
        if (!item) return res.status(404).json({ message: "Item not found" });
        if (item.isClosed) return res.status(400).json({ message: "Auction is closed" });

        if (new Date() > new Date(item.closingTime)) {
            item.isClosed = true;
            await item.save();
            return res.json({ message: "Auction is closed.", winner: item.highestBidder });
        }

        if (bid > item.currentBid) {
            item.currentBid = bid;
            item.highestBidder = req.user.username;
            console.log("User making bid:", req.user);

            await item.save();
            return res.json({ message: "Bid Successful", item });

        } else {
            return res.status(400).json({ message: "Bid is too low" });
        }

    } catch (error) {
        console.error("Error in bidding on item:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Edit an Auction Item
export const editAuction = async (req, res) => {
    try {
        const { id } = req.params;
        const { itemName, description, startingBid, startingTime, closingTime } = req.body;
        const picture = req.file ? req.file.path : ""; // Optional image update

        console.log("Authenticated User:", req.user);

        if (!req.user || !req.user.username) {
            return res.status(401).json({ message: "Unauthorized: User not authenticated" });
        }

        let item = await AuctionItem.findById(id);
        if (!item) return res.status(404).json({ message: "Auction item not found" });

        if (item.createdBy !== req.user.username) {
            return res.status(403).json({ message: "Unauthorized: You can only edit your own auctions" });
        }

        // Update fields only if they are provided
        if (itemName) item.itemName = itemName;
        if (description) item.description = description;
        if (startingBid) item.currentBid = startingBid; 
        if (startingTime) item.startingTime = startingTime;
        if (closingTime) item.closingTime = closingTime;
        if (picture) item.picture = picture; 

        await item.save();
        return res.json({ message: "Auction item updated successfully", item });

    } catch (error) {
        console.error("Error in editing auction item:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete an Auction Item
export const deleteAuction = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.user || !req.user.username) {
            return res.status(401).json({ message: "Unauthorized: User not authenticated" });
        }

        const item = await AuctionItem.findById(id);
        if (!item) return res.status(404).json({ message: "Auction item not found" });

        if (item.createdBy !== req.user.username) {
            return res.status(403).json({ message: "Unauthorized: You can only delete your own auctions" });
        }

        await AuctionItem.findByIdAndDelete(id);
        return res.json({ message: "Auction item deleted successfully" });

    } catch (error) {
        console.error("Error in deleting auction item:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
