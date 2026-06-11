import { MapPin, Maximize2, BedDouble, Bath } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency, LISTING_STATUS_LABELS, LISTING_STATUS_COLORS, PROPERTY_TYPE_LABELS } from "@/lib/formatters";
import type { Property } from "@/types";
import { AGENTS, BRANCHES } from "@/constants/mockData";

interface PropertyCardProps {
  property: Property;
  onClick?: () => void;
}

export default function PropertyCard({ property, onClick }: PropertyCardProps) {
  const agent = AGENTS.find((a) => a.id === property.agentId);
  const branch = BRANCHES.find((b) => b.id === property.branchId);

  return (
    <div
      onClick={onClick}
      className="bg-[#0D1526]/60 border border-white/5 rounded-xl overflow-hidden hover:border-amber-500/20 transition-all cursor-pointer group shadow-lg"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080F1E]/80 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#080F1E]/80 text-amber-400 border border-amber-500/30">
            {PROPERTY_TYPE_LABELS[property.type]}
          </span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#080F1E]/80 text-slate-300 border border-white/10">
            {property.kind === "sale" ? "Satılık" : "Kiralık"}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={cn("text-xs font-medium px-2.5 py-0.5 rounded-full border", LISTING_STATUS_COLORS[property.status])}>
            {LISTING_STATUS_LABELS[property.status]}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <p className="text-white font-bold text-lg leading-none">
            {formatCurrency(property.price)}
            {property.kind === "rent" && <span className="text-sm font-normal text-slate-300">/ay</span>}
          </p>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold text-sm leading-tight line-clamp-1 mb-2">{property.title}</h3>
        <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-3">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span>{property.district}, {property.city}</span>
        </div>

        <div className="flex items-center gap-3 text-slate-400 text-xs mb-3">
          <span className="flex items-center gap-1"><Maximize2 className="w-3 h-3" />{property.area} m²</span>
          {property.rooms > 0 && <span className="flex items-center gap-1"><BedDouble className="w-3 h-3" />{property.rooms}+1</span>}
          {property.bathrooms > 0 && <span className="flex items-center gap-1"><Bath className="w-3 h-3" />{property.bathrooms}</span>}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-center gap-2">
            <img src={agent?.avatar} alt={agent?.name} className="w-6 h-6 rounded-full object-cover" />
            <span className="text-slate-400 text-xs">{agent?.name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: branch?.color }} />
            <span className="text-slate-500 text-xs">{branch?.city}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
