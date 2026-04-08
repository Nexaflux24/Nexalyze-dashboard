import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { analyticsOverview, analyticsSeries } from '../controllers/analyticsController.js';

const router = express.Router();
router.use(authenticate);

router.get('/', analyticsOverview);
router.get('/series', analyticsSeries);

export default router;
