import AuctionItem from '../models/auction.model.js';

export const auction = async (req, res) => {
    try {
        const { itemName, description, startingBid, closingTime } = req.body;

        if (!req.user || !req.user.username) {
            return res.status(401).json({ message: "Unauthorized: User not authenticated" });
        }

        if (!itemName || !description || !startingBid || !closingTime) {
            return res.status(400).json({ message: "Please enter all the details" });
        } else {

            const newItem = new AuctionItem({
                itemName,
                description,
                currentBid: startingBid,
                highestBidder: '',
                closingTime,
                createdBy: req.user.username,
            });

            await newItem.save();
            return res.status(201).json({ message: "Auction Item Created", item: newItem });
        }
    } catch (error) {
        console.log("Error in creating auction item", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const auctions = async (req, res) => {
    try {
        const auctions = await AuctionItem.find();
        res.json(auctions)
    } catch (error) {
        console.log("Error in fetching auction item", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const auctionItem = async (req, res) => {
    try {
        const auctionItem = await AuctionItem.findById(req.params.id);
        if (!auctionItem) return res.status(400).json({ message: "Item not found" });

        res.json(auctionItem);
    } catch (error) {
        console.log("Error in fetching auction item", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const bidOnItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { bid } = req.body;

        if (!req.user || !req.user.email) {
            return res.status(401).json({ message: "Unauthorized: User not authenticated" });
        }

        const item = await AuctionItem.findById(id);

        if (!item) return res.status(400).json({ message: "Item not found" });
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
        console.log("Error in bidding on item", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const editAuction = async (req, res) => {
    try {
        const { id } = req.params;
        const { itemName, description, startingBid, closingTime } = req.body;

        console.log("Authenticated User:", req.user);


        if (!req.user || !req.user.username) {
            return res.status(401).json({ message: "Unauthorized: User not authenticated" });
        }

        let item = await AuctionItem.findById(id);
        // console.log("Auction Item Created By:", item.createdBy);
        if (!item) return res.status(404).json({ message: "Auction item not found" });

        if (item.createdBy !== req.user.username) {
            return res.status(403).json({ message: "Unauthorized: You can only edit your own auctions" });
        }

        item.itemName = itemName || item.itemName;
        item.description = description || item.description;
        item.startingBid = startingBid || item.startingBid;
        item.closingTime = closingTime || item.closingTime;

        await item.save();
        return res.json({ message: "Auction item updated successfully", item });
    } catch (error) {
        console.log("Error in editing auction item", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


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
        console.log("Error in deleting auction item", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
