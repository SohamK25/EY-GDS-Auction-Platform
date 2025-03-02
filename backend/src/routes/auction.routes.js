import express from 'express';
import { auction, auctionItem, auctions, bidOnItem } from '../controller/auction.controller';
import authenticate from '../middleware/authentication';


const router = express.Router();

router.post('/auction', authenticate, auction);

router.get('/auctions', auctions);

router.get('/auctions/:id', auctionItem);

router.post('/bid/:id', authenticate, bidOnItem)

export default router;