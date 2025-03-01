import express from 'express';
import { auction, auctions, bidOnItem } from '../controller/auction.controller';
import authenticate from '../middleware/authentication';


const router = express.Router();

router.post('/auction', auction);

router.get('/auctions', auctions);

router.get('/auctions/:id', auctions);

router.post('/bid/:id', bidOnItem, authenticate)

export default router;