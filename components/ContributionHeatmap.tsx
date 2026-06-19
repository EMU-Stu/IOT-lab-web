"use client";

import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import {
  buildHeatmapCells,
  heatmapColumns,
  summarizeHeatmap,
} from "@/lib/heatmap-utils";
import type { LabStatsMap } from "@/lib/lab-stats-types";

const GREEN_LEVELS = [
  "bg-[#ebedf0]",
  "bg-[#9be9a8]",
  "bg-[#40c463]",
  "bg-[#30a14e]",
  "bg-[#216e39]",
];

function cellColor(cell: { commits: number; articles: number; level: number; inRange: boolean }): string {
  if (!cell.inRange) return "bg-transparent pointer-events-none";
  if (cell.commits === 0 && cell.articles === 0) return GREEN_LEVELS[0];
  if (cell.articles > 0 && cell.commits === 0) return "bg-[#0071e3]/45 hover:bg-[#0071e3]/65";
  if (cell.articles > 0 && cell.commits > 0) return "bg-[#a855f7] hover:bg-[#9333ea]";
  return `${GREEN_LEVELS[cell.level]} hover:scale-125 hover:z-10`;
}

function cellTitle(cell: { date: string; commits: number; articles: number; inRange: boolean }): string {
  if (!cell.inRange) return "";
  const parts = [`${cell.date}`];
  if (cell.commits > 0) parts.push(`${cell.commits} 次提交`);
  if (cell.articles > 0) parts.push(`${cell.articles} 篇博客`);
  if (cell.commits === 0 && cell.articles === 0) parts.push("无活动");
  return parts.join(" · ");
}

export function ContributionHeatmap() {
  const [stats, setStats] = useState<LabStatsMap | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const url = `${siteConfig.basePath}/lab-stats.json`;
    fetch(url, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((data) => setStats(data as LabStatsMap))
      .catch(() => setError(true));
  }, []);

  const cells = useMemo(() => (stats ? buildHeatmapCells(stats) : []), [stats]);
  const columns = useMemo(() => heatmapColumns(cells), [cells]);
  const summary = useMemo(() => summarizeHeatmap(cells), [cells]);

  if (error) {
    return (
      <section className="lab-glass rounded-3xl p-6 sm:p-8">
        <p className="text-sm text-[#6e6e73]">热力图数据暂不可用（请运行 npm run dev 或 build 生成 lab-stats.json）</p>
      </section>
    );
  }

  if (!stats) {
    return (
      <section className="lab-glass rounded-3xl p-6 sm:p-8">
        <p className="text-sm text-[#6e6e73]">加载实验室热力图…</p>
      </section>
    );
  }

  return (
    <section className="lab-glass rounded-3xl p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="lab-chip text-[#0071e3]">module: activity</p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">实验室活跃热力图</h2>
          <p className="mt-1 text-xs text-[#6e6e73]">
            本站仓库提交 + 带 <code className="rounded bg-black/[0.06] px-1 font-mono">{siteConfig.labCode}</code>{" "}
            标签的博客发文
          </p>
        </div>
        <span className="font-mono text-[11px] text-[#6e6e73]">{summary.rangeLabel}</span>
      </div>

      <div className="mt-6 overflow-x-auto pb-2">
        <div className="flex min-w-max items-start gap-1">
          <div className="sticky left-0 z-10 flex flex-col gap-[2px] bg-[#f5f5f7]/95 pr-1.5 pt-6 font-mono text-[9px] text-[#6e6e73]">
            <span className="flex h-5 items-center justify-end">一</span>
            <span className="flex h-5 items-center justify-end" />
            <span className="flex h-5 items-center justify-end">三</span>
            <span className="flex h-5 items-center justify-end" />
            <span className="flex h-5 items-center justify-end">五</span>
            <span className="flex h-5 items-center justify-end" />
            <span className="flex h-5 items-center justify-end">日</span>
          </div>

          <div className="flex gap-[2px]">
            {columns.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-[2px]">
                {col.map((cell) => (
                  <div
                    key={cell.date}
                    title={cellTitle(cell)}
                    className={`h-5 w-5 flex-shrink-0 rounded-[2px] transition-all duration-150 ${cellColor(cell)}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 border-t border-black/5 pt-5 text-sm sm:grid-cols-3">
        <div>
          <p className="text-xs text-[#6e6e73]">活跃天数</p>
          <p className="mt-1 font-mono font-semibold">{summary.activeDays} 天</p>
        </div>
        <div>
          <p className="text-xs text-[#6e6e73]">本站提交</p>
          <p className="mt-1 font-mono font-semibold">{summary.totalCommits} 次</p>
        </div>
        <div>
          <p className="text-xs text-[#6e6e73]">实验室博客</p>
          <p className="mt-1 font-mono font-semibold">{summary.totalArticles} 篇</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-end gap-3 text-[10px] text-[#6e6e73]">
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-[2px] bg-[#216e39]" /> 代码
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-[2px] bg-[#0071e3]/45" /> 博客
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-[2px] bg-[#a855f7]" /> 混合
        </span>
      </div>
    </section>
  );
}
