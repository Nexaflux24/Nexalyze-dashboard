import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import analyticsRoutes from './routes/analytics.js';
import campaignsRoutes from './routes/campaigns.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/campaigns', campaignsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`✅ Nexalyze backend running on http://localhost:${PORT}`);
});
