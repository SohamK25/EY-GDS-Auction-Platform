import AuctionItem from '../models/auction.model.js';

export const auction = async (req, res) => {
    try{
        const {itemName, description, startingBid, closingTime} = req.body;
        if (!itemName || !description || !startingBid || !closingTime){
            return res.status(400).json({message: "Please enter all the details"});
        }

        const newItem = new AuctionItem({
            itemName,
            description,
            currentBid: startingBid,
            highestBidder: '',
            closingTime,
        });

        await newItem.save();
        return res.status(201).json({message: "Auction Item Created", item: newItem});
    }catch (error) {
        console.log("Error in creating auction item", error.message);
        res.status(500).json({ message: "Internal server error" });
    }};

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
        if(!auctionItem) return res.status(400).json({message: "Item not found"});

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
        
        if (!req.user || !req.user.username) {
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

