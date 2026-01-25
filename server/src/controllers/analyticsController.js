import {
  getAnalyticsOverview,
  getTrafficTrend,
  getConversionMetrics,
  getTrafficBySource,
  getTrafficByPlatform
} from '../services/analyticsService.js';

export const overview = async (req, res, next) => {
  try {
    const { workspaceId, startDate, endDate } = req.query;
    const data = await getAnalyticsOverview(req.user.userId, workspaceId, startDate, endDate);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const traffic = async (req, res, next) => {
  try {
    const { workspaceId, startDate, endDate } = req.query;
    const data = await getTrafficTrend(workspaceId, startDate, endDate);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const conversions = async (req, res, next) => {
  try {
    const { workspaceId, startDate, endDate } = req.query;
    const data = await getConversionMetrics(workspaceId, startDate, endDate);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const sources = async (req, res, next) => {
  try {
    const { workspaceId, startDate, endDate } = req.query;
    const data = await getTrafficBySource(workspaceId, startDate, endDate);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const platforms = async (req, res, next) => {
  try {
    const { workspaceId, startDate, endDate } = req.query;
    const data = await getTrafficByPlatform(workspaceId, startDate, endDate);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
