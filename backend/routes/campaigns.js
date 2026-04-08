import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { getCampaigns } from '../controllers/campaignsController.js';

const router = express.Router();
router.use(authenticate);
router.get('/', getCampaigns);

export default router;
