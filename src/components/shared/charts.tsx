"use client";

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Tiny dependency-free SVG charts used by the Parent / Teacher / Admin
// dashboards. All accept simple data props and render responsively.
// ---------------------------------------------------------------------------

export const SUBJECT_COLORS: Record<string, string> = {
  math: "#f59e0b", // amber-500
  english: "#f43f5e", // rose-500
  science: "#10b981", // emerald-500
  reading: "#8b5cf6", // violet-500
};

/** Horizontal labelled bar — the workhorse for "subject performance". */
export function BarRow({
  label,
  value,
  max = 100,
  color = SUBJECT_COLORS.math,
  suffix = "%",
}: {
  label: string;
  value: number;
  max?: number;
  color?: string;
  suffix?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 shrink-0 truncate text-sm font-semibold text-muted-foreground">
        {label}
      </span>
      <div
        className="h-3 flex-1 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`${label}: ${value}${suffix}`}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="w-12 shrink-0 text-right text-sm font-bold tabular-nums">
        {value}
        {suffix}
      </span>
    </div>
  );
}

/** Vertical bar chart (e.g. minutes learned per day). */
export function MiniBars({
  data,
  color = "#10b981",
  height = 120,
  suffix = "",
}: {
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
  suffix?: string;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className="w-full" role="img" aria-label="Bar chart">
      <div className="flex items-end gap-1.5 sm:gap-2" style={{ height }}>
        {data.map((d) => (
          <div key={d.label} className="group flex h-full flex-1 flex-col items-center justify-end gap-1">
            <span className="text-[10px] font-bold tabular-nums text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
              {d.value}
              {suffix}
            </span>
            <div
              className="w-full max-w-9 rounded-t-md transition-all duration-500"
              style={{
                height: `${Math.max(3, (d.value / max) * (height - 24))}px`,
                backgroundColor: d.value === 0 ? "#e5e7eb" : color,
              }}
              title={`${d.label}: ${d.value}${suffix}`}
            />
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex gap-1.5 sm:gap-2">
        {data.map((d) => (
          <div key={d.label} className="flex-1 truncate text-center text-[10px] font-medium text-muted-foreground">
            {d.label}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Smooth sparkline for score/progress trends. */
export function SparkLine({
  points,
  color = "#8b5cf6",
  height = 64,
}: {
  points: number[];
  color?: string;
  height?: number;
}) {
  if (points.length === 0) {
    return <div className="h-16 rounded-lg bg-muted/50" />;
  }
  const w = 240;
  const h = height;
  const pad = 6;
  const max = Math.max(...points, 100);
  const min = Math.min(...points, 0);
  const span = Math.max(1, max - min);
  const step = points.length > 1 ? (w - pad * 2) / (points.length - 1) : 0;
  const coords = points.map((p, i) => {
    const x = pad + i * step;
    const y = h - pad - ((p - min) / span) * (h - pad * 2);
    return `${x},${y}`;
  });
  const path = `M ${coords.join(" L ")}`;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full"
      style={{ height }}
      role="img"
      aria-label={`Trend chart: latest ${points[points.length - 1]}`}
      preserveAspectRatio="none"
    >
      <path
        d={`${path} L ${w - pad},${h} L ${pad},${h} Z`}
        fill={color}
        opacity={0.12}
      />
      <path d={path} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => {
        const [x, y] = coords[i].split(",").map(Number);
        return <circle key={i} cx={x} cy={y} r={3} fill={color} />;
      })}
    </svg>
  );
}

/** Circular progress ring for "overall progress". */
export function ProgressRing({
  value,
  size = 84,
  stroke = 9,
  color = "#f59e0b",
  label,
}: {
  value: number; // 0-100
  size?: number;
  stroke?: number;
  color?: string;
  label?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const filled = (Math.max(0, Math.min(100, value)) / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} role="img" aria-label={`${label ?? "Progress"}: ${Math.round(value)}%`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={`${filled} ${c}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="transition-all duration-700"
        />
      </svg>
      <span className="absolute text-sm font-extrabold tabular-nums">{Math.round(value)}%</span>
    </div>
  );
}

/** Small stat tile used across dashboards. */
export function StatTile({
  icon,
  label,
  value,
  hint,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border bg-card p-4", className)}>
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-1.5 text-2xl font-extrabold tabular-nums">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
