import express from 'express';
import { auction, auctionItem, auctions, bidOnItem, editAuction, deleteAuction } from '../controller/auction.controller.js';
import authenticate from '../middleware/authentication.js';


const router = express.Router();

router.post('/auction', authenticate, auction);

router.get('/auctions', auctions);

router.get('/auctions/:id', auctionItem);

router.post('/bid/:id', authenticate, bidOnItem);

router.put('/auction/:id', authenticate, editAuction);

router.delete('/auction/:id', authenticate, deleteAuction);

export default router;

