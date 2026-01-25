import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  overview,
  traffic,
  conversions,
  sources,
  platforms
} from '../controllers/analyticsController.js';

const router = express.Router();

// All analytics routes require authentication
router.use(authenticate);

router.get('/overview', overview);
router.get('/traffic', traffic);
router.get('/conversions', conversions);
router.get('/sources', sources);
router.get('/platforms', platforms);

export default router;
