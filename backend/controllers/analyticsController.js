import { analyticsOverviewData, analyticsSeriesData } from '../data/mockData.js';

export const analyticsOverview = (req, res) => {
  res.json(analyticsOverviewData);
};

export const analyticsSeries = (req, res) => {
  res.json(analyticsSeriesData);
};
