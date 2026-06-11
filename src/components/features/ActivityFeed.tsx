import { Phone, Users, Home, CheckCircle, FileText, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatRelativeTime, ACTIVITY_TYPE_LABELS } from "@/lib/formatters";
import { ACTIVITIES } from "@/constants/mockData";
import { AGENTS } from "@/constants/mockData";

const ACTIVITY_ICONS: Record<string, React.ElementType> = {
  call: Phone,
  meeting: Users,
  offer: FileText,
  closed: CheckCircle,
  note: FileText,
  viewing: Eye,
};

const ACTIVITY_BG: Record<string, string> = {
  call: "bg-blue-500/15 text-blue-400",
  meeting: "bg-violet-500/15 text-violet-400",
  offer: "bg-amber-500/15 text-amber-400",
  closed: "bg-emerald-500/15 text-emerald-400",
  note: "bg-slate-500/15 text-slate-400",
  viewing: "bg-orange-500/15 text-orange-400",
};

export default function ActivityFeed({ limit = 6 }: { limit?: number }) {
  const activities = [...ACTIVITIES]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);

  return (
    <div className="space-y-3">
      {activities.map((activity) => {
        const agent = AGENTS.find((a) => a.id === activity.agentId);
        const Icon = ACTIVITY_ICONS[activity.type] || FileText;
        return (
          <div key={activity.id} className="flex items-start gap-3">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5", ACTIVITY_BG[activity.type])}>
              <Icon className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium leading-tight">{activity.title}</p>
              <p className="text-slate-500 text-xs mt-0.5 line-clamp-1">{activity.description}</p>
              <div className="flex items-center gap-2 mt-1">
                <img src={agent?.avatar} alt={agent?.name} className="w-4 h-4 rounded-full object-cover" />
                <span className="text-slate-500 text-xs">{agent?.name}</span>
                <span className="text-slate-600 text-xs">•</span>
                <span className="text-slate-600 text-xs">{formatRelativeTime(activity.createdAt)}</span>
              </div>
            </div>
            <span className="text-slate-600 text-xs flex-shrink-0 mt-0.5">{ACTIVITY_TYPE_LABELS[activity.type]}</span>
          </div>
        );
      })}
    </div>
  );
}
