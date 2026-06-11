import { useState } from "react";
import { Plus, Search, SlidersHorizontal, X, MapPin, Maximize2, BedDouble, Bath, Calendar } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PropertyCard from "@/components/features/PropertyCard";
import { PROPERTIES, AGENTS, BRANCHES } from "@/constants/mockData";
import { formatFullCurrency, LISTING_STATUS_LABELS, PROPERTY_TYPE_LABELS, formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { Property, PropertyType, ListingStatus, ListingKind } from "@/types";

export default function Properties() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<PropertyType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<ListingStatus | "all">("all");
  const [kindFilter, setKindFilter] = useState<ListingKind | "all">("all");
  const [selected, setSelected] = useState<Property | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <Layout title="Portföy" subtitle="Emlak ilanlarını yönetin">
      {(selectedBranch) => {
        let filtered = selectedBranch === "all" ? PROPERTIES : PROPERTIES.filter((p) => p.branchId === selectedBranch);
        if (typeFilter !== "all") filtered = filtered.filter((p) => p.type === typeFilter);
        if (statusFilter !== "all") filtered = filtered.filter((p) => p.status === statusFilter);
        if (kindFilter !== "all") filtered = filtered.filter((p) => p.kind === kindFilter);
        if (search) filtered = filtered.filter((p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.district.toLowerCase().includes(search.toLowerCase()) ||
          p.city.toLowerCase().includes(search.toLowerCase())
        );

        return (
          <div className="flex gap-6 h-[calc(100vh-112px)]">
            <div className="flex-1 flex flex-col min-w-0">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="relative flex-1 min-w-48">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="İlan ara..."
                    className="w-full bg-white/5 border border-white/10 text-slate-300 placeholder-slate-600 text-sm rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:border-amber-500/40"
                  />
                </div>
                <select
                  value={kindFilter}
                  onChange={(e) => setKindFilter(e.target.value as ListingKind | "all")}
                  className="bg-white/5 border border-white/10 text-slate-300 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500/40"
                >
                  <option value="all" className="bg-[#0D1526]">Satılık & Kiralık</option>
                  <option value="sale" className="bg-[#0D1526]">Satılık</option>
                  <option value="rent" className="bg-[#0D1526]">Kiralık</option>
                </select>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as PropertyType | "all")}
                  className="bg-white/5 border border-white/10 text-slate-300 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500/40"
                >
                  <option value="all" className="bg-[#0D1526]">Tüm Türler</option>
                  {(["apartment","villa","commercial","land","office"] as PropertyType[]).map((t) => (
                    <option key={t} value={t} className="bg-[#0D1526]">{PROPERTY_TYPE_LABELS[t]}</option>
                  ))}
                </select>
                <button className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
                  <Plus className="w-4 h-4" />
                  İlan Ekle
                </button>
              </div>

              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-500 text-sm">{filtered.length} ilan</p>
                <div className="flex items-center gap-1.5 bg-white/5 rounded-lg p-1">
                  {(["grid","list"] as const).map((v) => (
                    <button key={v} onClick={() => setView(v)}
                      className={cn("px-3 py-1 rounded-md text-xs font-medium transition-all",
                        view === v ? "bg-amber-500/15 text-amber-400" : "text-slate-500 hover:text-white"
                      )}>
                      {v === "grid" ? "Kart" : "Liste"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-auto">
                {view === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filtered.map((p) => <PropertyCard key={p.id} property={p} onClick={() => setSelected(p)} />)}
                  </div>
                ) : (
                  <div className="rounded-xl border border-white/5 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-[#0D1526]/80 sticky top-0">
                        <tr>
                          {["İlan", "Tür", "Fiyat", "Alan", "Konum", "Durum", "Danışman"].map((h) => (
                            <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((p) => {
                          const agent = AGENTS.find((a) => a.id === p.agentId);
                          return (
                            <tr key={p.id} onClick={() => setSelected(p)} className="border-t border-white/5 hover:bg-white/3 cursor-pointer transition-colors">
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <img src={p.imageUrl} className="w-12 h-9 object-cover rounded-lg flex-shrink-0" alt={p.title} />
                                  <p className="text-white font-medium text-xs line-clamp-2 max-w-[160px]">{p.title}</p>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-slate-400 text-xs">{PROPERTY_TYPE_LABELS[p.type]}</td>
                              <td className="px-4 py-3 text-amber-400 font-semibold">{formatFullCurrency(p.price)}</td>
                              <td className="px-4 py-3 text-slate-400 text-xs">{p.area} m²</td>
                              <td className="px-4 py-3 text-slate-400 text-xs">{p.district}, {p.city}</td>
                              <td className="px-4 py-3 text-xs">
                                <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                                  {LISTING_STATUS_LABELS[p.status]}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <img src={agent?.avatar} className="w-6 h-6 rounded-full object-cover" alt={agent?.name} />
                                  <span className="text-slate-400 text-xs">{agent?.name}</span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Detail */}
            {selected && (
              <div className="w-80 bg-[#0D1526]/60 border border-white/5 rounded-xl overflow-hidden flex flex-col">
                <div className="relative h-48 flex-shrink-0">
                  <img src={selected.imageUrl} className="w-full h-full object-cover" alt={selected.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080F1E]/90 to-transparent" />
                  <button onClick={() => setSelected(null)} className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-bold text-base leading-tight">{selected.title}</p>
                    <p className="text-amber-400 font-bold text-lg">{formatFullCurrency(selected.price)}{selected.kind === "rent" && <span className="text-sm font-normal text-slate-300">/ay</span>}</p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                    <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    {selected.address}, {selected.district}, {selected.city}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white/5 rounded-lg p-2.5 text-center">
                      <Maximize2 className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                      <p className="text-white text-sm font-bold">{selected.area}</p>
                      <p className="text-slate-500 text-xs">m²</p>
                    </div>
                    {selected.rooms > 0 && (
                      <div className="bg-white/5 rounded-lg p-2.5 text-center">
                        <BedDouble className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                        <p className="text-white text-sm font-bold">{selected.rooms}+1</p>
                        <p className="text-slate-500 text-xs">Oda</p>
                      </div>
                    )}
                    {selected.bathrooms > 0 && (
                      <div className="bg-white/5 rounded-lg p-2.5 text-center">
                        <Bath className="w-4 h-4 text-violet-400 mx-auto mb-1" />
                        <p className="text-white text-sm font-bold">{selected.bathrooms}</p>
                        <p className="text-slate-500 text-xs">Banyo</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold mb-2">Özellikler</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.features.map((f) => (
                        <span key={f} className="bg-white/5 border border-white/10 text-slate-300 text-xs px-2 py-1 rounded-full">{f}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold mb-2">Açıklama</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{selected.description}</p>
                  </div>

                  <div className="pt-2 border-t border-white/5">
                    <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold mb-2">Sorumlu Danışman</p>
                    {(() => {
                      const agent = AGENTS.find((a) => a.id === selected.agentId);
                      const branch = BRANCHES.find((b) => b.id === selected.branchId);
                      return (
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <img src={agent?.avatar} className="w-10 h-10 rounded-lg object-cover" alt={agent?.name} />
                          <div>
                            <p className="text-white font-semibold text-sm">{agent?.name}</p>
                            <p className="text-slate-500 text-xs">{branch?.name}</p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold py-2.5 rounded-lg transition-colors">Düzenle</button>
                    <button className="flex-1 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors">Paylaş</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }}
    </Layout>
  );
}
