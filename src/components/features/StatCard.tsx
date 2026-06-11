import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  color: "amber" | "blue" | "emerald" | "violet";
}

const colorMap = {
  amber: {
    icon: "bg-amber-500/15 text-amber-400",
    value: "text-amber-400",
    trend: "text-amber-400",
    border: "border-amber-500/10",
    glow: "shadow-amber-500/5",
  },
  blue: {
    icon: "bg-blue-500/15 text-blue-400",
    value: "text-blue-400",
    trend: "text-blue-400",
    border: "border-blue-500/10",
    glow: "shadow-blue-500/5",
  },
  emerald: {
    icon: "bg-emerald-500/15 text-emerald-400",
    value: "text-emerald-400",
    trend: "text-emerald-400",
    border: "border-emerald-500/10",
    glow: "shadow-emerald-500/5",
  },
  violet: {
    icon: "bg-violet-500/15 text-violet-400",
    value: "text-violet-400",
    trend: "text-violet-400",
    border: "border-violet-500/10",
    glow: "shadow-violet-500/5",
  },
};

export default function StatCard({ label, value, subValue, icon: Icon, trend, color }: StatCardProps) {
  const c = colorMap[color];
  return (
    <div className={cn(
      "bg-[#0D1526]/60 backdrop-blur rounded-xl border p-5 flex flex-col gap-4 hover:bg-[#0D1526]/80 transition-all shadow-lg",
      c.border, c.glow
    )}>
      <div className="flex items-start justify-between">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", c.icon)}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-full",
            trend.value >= 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
          )}>
            {trend.value >= 0 ? "▲" : "▼"} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
      <div>
        <p className={cn("text-2xl font-bold leading-none", c.value)}>{value}</p>
        {subValue && <p className="text-slate-500 text-xs mt-1">{subValue}</p>}
        <p className="text-slate-400 text-sm mt-1.5">{label}</p>
      </div>
    </div>
  );
}
