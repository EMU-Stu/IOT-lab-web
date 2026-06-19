export type DayActivity = {
  commits: number;
  articles: number;
};

export type LabStatsMap = Record<string, DayActivity>;

export type HeatmapCell = {
  date: string;
  commits: number;
  articles: number;
  level: number;
  inRange: boolean;
  isFuture: boolean;
};
