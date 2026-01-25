import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAnalyticsOverview = async (userId, workspaceId, startDate, endDate) => {
  const data = await prisma.analyticsData.findMany({
    where: {
      workspaceId,
      date: {
        gte: new Date(startDate),
        lte: new Date(endDate)
      }
    },
    select: {
      visitors: true,
      uniqueVisitors: true,
      pageViews: true,
      bounceRate: true,
      conversionRate: true,
      revenue: true
    }
  });

  // Aggregate data
  const totals = data.reduce(
    (acc, row) => ({
      visitors: acc.visitors + row.visitors,
      uniqueVisitors: acc.uniqueVisitors + row.uniqueVisitors,
      pageViews: acc.pageViews + row.pageViews,
      bounceRate: acc.bounceRate + row.bounceRate,
      conversionRate: acc.conversionRate + row.conversionRate,
      revenue: acc.revenue + row.revenue
    }),
    { visitors: 0, uniqueVisitors: 0, pageViews: 0, bounceRate: 0, conversionRate: 0, revenue: 0 }
  );

  const count = data.length || 1;
  return {
    visitors: totals.visitors,
    uniqueVisitors: totals.uniqueVisitors,
    pageViews: totals.pageViews,
    bounceRate: (totals.bounceRate / count).toFixed(2),
    conversionRate: (totals.conversionRate / count).toFixed(2),
    revenue: totals.revenue.toFixed(2)
  };
};

export const getTrafficTrend = async (workspaceId, startDate, endDate, granularity = 'daily') => {
  const data = await prisma.analyticsData.findMany({
    where: {
      workspaceId,
      date: {
        gte: new Date(startDate),
        lte: new Date(endDate)
      }
    },
    orderBy: { date: 'asc' },
    select: { date: true, visitors: true, uniqueVisitors: true }
  });

  return data.map(row => ({
    date: row.date.toISOString().split('T')[0],
    visitors: row.visitors,
    uniqueVisitors: row.uniqueVisitors
  }));
};

export const getConversionMetrics = async (workspaceId, startDate, endDate) => {
  const data = await prisma.analyticsData.findMany({
    where: {
      workspaceId,
      date: {
        gte: new Date(startDate),
        lte: new Date(endDate)
      }
    },
    select: {
      date: true,
      visitors: true,
      conversionRate: true,
      revenue: true
    },
    orderBy: { date: 'asc' }
  });

  return data.map(row => ({
    date: row.date.toISOString().split('T')[0],
    conversions: Math.round(row.visitors * (row.conversionRate / 100)),
    conversionRate: row.conversionRate,
    revenue: row.revenue
  }));
};

export const getTrafficBySource = async (workspaceId, startDate, endDate) => {
  const data = await prisma.analyticsData.groupBy({
    by: ['source'],
    where: {
      workspaceId,
      date: {
        gte: new Date(startDate),
        lte: new Date(endDate)
      }
    },
    _sum: {
      visitors: true,
      pageViews: true
    }
  });

  return data.map(row => ({
    source: row.source || 'Direct',
    visitors: row._sum.visitors || 0,
    pageViews: row._sum.pageViews || 0
  }));
};

export const getTrafficByPlatform = async (workspaceId, startDate, endDate) => {
  const data = await prisma.analyticsData.groupBy({
    by: ['platform'],
    where: {
      workspaceId,
      date: {
        gte: new Date(startDate),
        lte: new Date(endDate)
      }
    },
    _sum: {
      visitors: true
    }
  });

  return data.map(row => ({
    platform: row.platform || 'Unknown',
    visitors: row._sum.visitors || 0
  }));
};
