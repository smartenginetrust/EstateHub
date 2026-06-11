import { cn } from "@/lib/utils";
import { LEAD_STATUS_LABELS, LEAD_STATUS_COLORS } from "@/lib/formatters";
import type { LeadStatus } from "@/types";

export default function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={cn("text-xs font-medium px-2.5 py-0.5 rounded-full border", LEAD_STATUS_COLORS[status])}>
      {LEAD_STATUS_LABELS[status]}
    </span>
  );
}
