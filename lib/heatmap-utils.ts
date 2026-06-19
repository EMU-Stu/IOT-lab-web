import type { HeatmapCell, LabStatsMap } from "./lab-stats-types";

const STATS_START = "2025-05-01";
const BJ_OFFSET_MS = 8 * 60 * 60 * 1000;

/** 北京时间 YYYY-MM-DD */
export function beijingTodayStr(): string {
  const now = Date.now();
  const bj = new Date(now + BJ_OFFSET_MS - new Date(now).getTimezoneOffset() * 60 * 1000);
  const y = bj.getUTCFullYear();
  const m = String(bj.getUTCMonth() + 1).padStart(2, "0");
  const d = String(bj.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function activityScore(commits: number, articles: number): number {
  return commits + articles * 2;
}

function activityLevel(score: number): number {
  if (score <= 0) return 0;
  if (score === 1) return 1;
  if (score <= 3) return 2;
  if (score <= 6) return 3;
  return 4;
}

function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatLocalDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** 构建 7 行 × N 列（周）的热力图格子，列优先存储便于按周渲染 */
export function buildHeatmapCells(stats: LabStatsMap): HeatmapCell[] {
  const todayStr = beijingTodayStr();
  const startDate = parseLocalDate(STATS_START);
  const endDate = parseLocalDate(todayStr);

  const gridStart = new Date(startDate);
  const startDow = gridStart.getDay();
  gridStart.setDate(gridStart.getDate() - (startDow === 0 ? 6 : startDow - 1));

  const gridEnd = new Date(endDate);
  const endDow = gridEnd.getDay();
  gridEnd.setDate(gridEnd.getDate() + (endDow === 0 ? 0 : 7 - endDow));

  const dates: string[] = [];
  const cursor = new Date(gridStart);
  while (cursor <= gridEnd) {
    dates.push(formatLocalDate(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates.map((dateStr) => {
    const inRange = dateStr >= STATS_START && dateStr <= todayStr;
    const isFuture = dateStr > todayStr;
    const day = inRange ? (stats[dateStr] ?? { commits: 0, articles: 0 }) : { commits: 0, articles: 0 };
    const score = inRange ? activityScore(day.commits, day.articles) : 0;

    return {
      date: dateStr,
      commits: day.commits,
      articles: day.articles,
      level: inRange ? activityLevel(score) : 0,
      inRange,
      isFuture,
    };
  });
}

export function heatmapColumns(cells: HeatmapCell[]): HeatmapCell[][] {
  const weeks = Math.ceil(cells.length / 7);
  const columns: HeatmapCell[][] = [];
  for (let col = 0; col < weeks; col++) {
    columns.push(cells.slice(col * 7, col * 7 + 7));
  }
  return columns;
}

export function summarizeHeatmap(cells: HeatmapCell[]) {
  const todayStr = beijingTodayStr();
  let totalCommits = 0;
  let totalArticles = 0;
  let activeDays = 0;

  for (const cell of cells) {
    if (!cell.inRange || cell.isFuture) continue;
    if (cell.commits > 0 || cell.articles > 0) {
      activeDays += 1;
      totalCommits += cell.commits;
      totalArticles += cell.articles;
    }
  }

  return {
    todayStr,
    totalCommits,
    totalArticles,
    activeDays,
    rangeLabel: `${STATS_START} 至 ${todayStr}`,
  };
}
