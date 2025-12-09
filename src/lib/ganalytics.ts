import 'server-only';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import type {
  GAData,
  StatsData,
  TimePeriodData,
  PageData,
  SourceData,
  EventData,
} from './analytics-types';

// Re-export types for convenience
export type { GAData, StatsData, TimePeriodData, PageData, SourceData, EventData };

// Google Analytics Data API Configuration
function getGAConfig() {
  return {
    propertyId: process.env.GA_PROPERTY_ID || '',
    credentials: {
      client_email: process.env.GA_CLIENT_EMAIL || '',
      private_key: (process.env.GA_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    },
  };
}

// Initialize Google Analytics Data API client
function getAnalyticsClient() {
  const config = getGAConfig();
  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: config.credentials.client_email,
      private_key: config.credentials.private_key,
    },
  });
}

// Convert period string to GA4 date range
function getDateRange(period: string): { startDate: string; endDate: string } {
  const endDate = 'today';
  let startDate: string;

  switch (period) {
    case 'day':
      startDate = 'today';
      break;
    case '7d':
      startDate = '7daysAgo';
      break;
    case '30d':
      startDate = '30daysAgo';
      break;
    case '12mo':
      startDate = '365daysAgo';
      break;
    default:
      startDate = '7daysAgo';
  }

  return { startDate, endDate };
}

// Get previous period date range for comparison
function getPreviousDateRange(period: string): { startDate: string; endDate: string } {
  switch (period) {
    case 'day':
      return { startDate: 'yesterday', endDate: 'yesterday' };
    case '7d':
      return { startDate: '14daysAgo', endDate: '8daysAgo' };
    case '30d':
      return { startDate: '60daysAgo', endDate: '31daysAgo' };
    case '12mo':
      return { startDate: '730daysAgo', endDate: '366daysAgo' };
    default:
      return { startDate: '14daysAgo', endDate: '8daysAgo' };
  }
}

// Main function to get Google Analytics data
export async function getGAData(period: string = '7d'): Promise<GAData | null> {
  const config = getGAConfig();

  if (!config.propertyId || !config.credentials.client_email || !config.credentials.private_key) {
    console.error('Google Analytics credentials not configured');
    return null;
  }

  try {
    const analyticsDataClient = getAnalyticsClient();
    const propertyId = config.propertyId;
    const { startDate, endDate } = getDateRange(period);
    const previousRange = getPreviousDateRange(period);

    // Fetch all data in parallel
    const [
      currentStatsResponse,
      previousStatsResponse,
      timeseriesResponse,
      pagesResponse,
      sourcesResponse,
      eventsResponse,
      realtimeResponse,
    ] = await Promise.all([
      // Current period aggregate stats
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'screenPageViews' },
          { name: 'bounceRate' },
          { name: 'averageSessionDuration' },
        ],
      }),
      // Previous period for comparison
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: previousRange.startDate, endDate: previousRange.endDate }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'screenPageViews' },
          { name: 'bounceRate' },
          { name: 'averageSessionDuration' },
        ],
      }),
      // Timeseries data
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'date' }],
        metrics: [{ name: 'activeUsers' }],
        orderBys: [{ dimension: { dimensionName: 'date' } }],
      }),
      // Top pages
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'screenPageViews' },
          { name: 'bounceRate' },
          { name: 'averageSessionDuration' },
        ],
        orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
        limit: 10,
      }),
      // Top sources
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'sessionSource' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'bounceRate' },
          { name: 'averageSessionDuration' },
        ],
        orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
        limit: 10,
      }),
      // Events/Goals
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'eventName' }],
        metrics: [{ name: 'activeUsers' }, { name: 'eventCount' }, { name: 'eventCountPerUser' }],
        orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
        limit: 10,
      }),
      // Realtime data
      analyticsDataClient
        .runRealtimeReport({
          property: `properties/${propertyId}`,
          metrics: [{ name: 'activeUsers' }],
        })
        .catch(() => null),
    ]);

    // Process current stats
    const currentRow = currentStatsResponse[0]?.rows?.[0];
    const previousRow = previousStatsResponse[0]?.rows?.[0];

    const currentVisitors = parseInt(currentRow?.metricValues?.[0]?.value || '0');
    const currentPageViews = parseInt(currentRow?.metricValues?.[1]?.value || '0');
    const currentBounceRate = parseFloat(currentRow?.metricValues?.[2]?.value || '0') * 100;
    const currentVisitDuration = parseFloat(currentRow?.metricValues?.[3]?.value || '0');

    const previousVisitors = parseInt(previousRow?.metricValues?.[0]?.value || '0');
    const previousPageViews = parseInt(previousRow?.metricValues?.[1]?.value || '0');
    const previousBounceRate = parseFloat(previousRow?.metricValues?.[2]?.value || '0') * 100;
    const previousVisitDuration = parseFloat(previousRow?.metricValues?.[3]?.value || '0');

    // Calculate percentage changes
    const calculateChange = (current: number, previous: number): number | null => {
      if (previous === 0) return current > 0 ? 100 : null;
      return ((current - previous) / previous) * 100;
    };

    const stats: StatsData = {
      visitors: {
        value: currentVisitors,
        change: calculateChange(currentVisitors, previousVisitors),
      },
      pageViews: {
        value: currentPageViews,
        change: calculateChange(currentPageViews, previousPageViews),
      },
      bounceRate: {
        value: currentBounceRate,
        change: calculateChange(currentBounceRate, previousBounceRate),
      },
      visitDuration: {
        value: currentVisitDuration,
        change: calculateChange(currentVisitDuration, previousVisitDuration),
      },
    };

    // Process timeseries
    const timeseries: TimePeriodData[] = (timeseriesResponse[0]?.rows || []).map((row) => {
      const dateStr = row.dimensionValues?.[0]?.value || '';
      // Convert YYYYMMDD to YYYY-MM-DD format
      const formattedDate = `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
      return {
        date: formattedDate,
        visitors: parseInt(row.metricValues?.[0]?.value || '0'),
      };
    });

    // Process pages
    const pages: PageData[] = (pagesResponse[0]?.rows || []).map((row) => ({
      page: row.dimensionValues?.[0]?.value || '',
      visitors: parseInt(row.metricValues?.[0]?.value || '0'),
      pageViews: parseInt(row.metricValues?.[1]?.value || '0'),
      bounceRate: parseFloat(row.metricValues?.[2]?.value || '0') * 100,
      visitDuration: parseFloat(row.metricValues?.[3]?.value || '0'),
    }));

    // Process sources
    const sources: SourceData[] = (sourcesResponse[0]?.rows || []).map((row) => ({
      source: row.dimensionValues?.[0]?.value || '(direct)',
      visitors: parseInt(row.metricValues?.[0]?.value || '0'),
      bounceRate: parseFloat(row.metricValues?.[1]?.value || '0') * 100,
      visitDuration: parseFloat(row.metricValues?.[2]?.value || '0'),
    }));

    // Process events
    const totalUsers = currentVisitors || 1;
    const events: EventData[] = (eventsResponse[0]?.rows || []).map((row) => ({
      goal: row.dimensionValues?.[0]?.value || '',
      visitors: parseInt(row.metricValues?.[0]?.value || '0'),
      events: parseInt(row.metricValues?.[1]?.value || '0'),
      conversionRate: (parseInt(row.metricValues?.[0]?.value || '0') / totalUsers) * 100,
    }));

    // Process realtime
    const realtimeVisitors = parseInt(
      realtimeResponse?.[0]?.rows?.[0]?.metricValues?.[0]?.value || '0'
    );

    return {
      stats,
      timeseries,
      pages,
      sources,
      events,
      realtime: { visitors: realtimeVisitors },
    };
  } catch (error) {
    console.error('Error fetching Google Analytics data:', error);
    return null;
  }
}
