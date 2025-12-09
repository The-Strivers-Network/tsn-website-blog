// Types for Google Analytics Data
export type TimePeriodData = {
  date: string;
  visitors: number;
  pageViews?: number;
  bounceRate?: number;
  visitDuration?: number;
};

export type PageData = {
  page: string;
  visitors: number;
  pageViews?: number;
  bounceRate: number;
  visitDuration: number;
};

export type SourceData = {
  source: string;
  visitors: number;
  bounceRate: number;
  visitDuration: number;
};

export type EventData = {
  goal: string;
  visitors: number;
  events: number;
  conversionRate: number;
};

export type StatsData = {
  visitors: { value: number; change: number | null };
  pageViews: { value: number; change: number | null };
  bounceRate: { value: number; change: number | null };
  visitDuration: { value: number; change: number | null };
};

export interface GAData {
  stats: StatsData;
  timeseries: TimePeriodData[];
  pages: PageData[];
  sources: SourceData[];
  events: EventData[];
  realtime: { visitors: number };
}

// Formatting utilities (safe for client-side use)
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${Math.round(seconds)}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatChange(change: number | null): { text: string; isPositive: boolean } {
  if (change === null || change === 0) {
    return { text: '0%', isPositive: false };
  }

  const isPositive = change > 0;
  const text = `${isPositive ? '+' : ''}${Math.round(change)}%`;
  return { text, isPositive };
}
