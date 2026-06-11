import { useState } from "react";
import { Plus, Search, Filter, Phone, Mail, Calendar, ChevronRight, X } from "lucide-react";
import Layout from "@/components/layout/Layout";
import LeadStatusBadge from "@/components/features/LeadStatusBadge";
import { LEADS, AGENTS, BRANCHES } from "@/constants/mockData";
import { PROPERTY_TYPE_LABELS, formatCurrency, formatDate, LEAD_STATUS_LABELS } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { Lead, LeadStatus } from "@/types";

const ALL_STATUSES: LeadStatus[] = ["new", "contacted", "viewing", "offer", "closed", "lost"];

export default function Leads() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  return (
    <Layout title="Müşteri & Lead" subtitle="Tüm müşteri ilişkilerini yönetin">
      {(selectedBranch) => {
        let filtered = selectedBranch === "all" ? LEADS : LEADS.filter((l) => l.branchId === selectedBranch);
        if (statusFilter !== "all") filtered = filtered.filter((l) => l.status === statusFilter);
        if (search) filtered = filtered.filter((l) =>
          l.name.toLowerCase().includes(search.toLowerCase()) ||
          l.email.toLowerCase().includes(search.toLowerCase()) ||
          l.phone.includes(search)
        );

        const counts = ALL_STATUSES.reduce((acc, s) => {
          acc[s] = (selectedBranch === "all" ? LEADS : LEADS.filter((l) => l.branchId === selectedBranch)).filter((l) => l.status === s).length;
          return acc;
        }, {} as Record<string, number>);

        return (
          <div className="flex gap-6 h-[calc(100vh-112px)]">
            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Toolbar */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="İsim, e-posta veya telefon..."
                    className="w-full bg-white/5 border border-white/10 text-slate-300 placeholder-slate-600 text-sm rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:border-amber-500/40"
                  />
                </div>
                <button className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
                  <Plus className="w-4 h-4" />
                  Yeni Lead
                </button>
              </div>

              {/* Status Tabs */}
              <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
                <button
                  onClick={() => setStatusFilter("all")}
                  className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                    statusFilter === "all" ? "bg-amber-500/15 text-amber-400 border border-amber-500/20" : "text-slate-500 hover:text-white hover:bg-white/5"
                  )}
                >
                  Tümü <span className="bg-white/10 text-xs px-1.5 py-0.5 rounded-full">{filtered.length + (statusFilter === "all" ? 0 : 0)}</span>
                </button>
                {ALL_STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                      statusFilter === s ? "bg-amber-500/15 text-amber-400 border border-amber-500/20" : "text-slate-500 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {LEAD_STATUS_LABELS[s]} <span className="bg-white/10 text-xs px-1.5 py-0.5 rounded-full">{counts[s]}</span>
                  </button>
                ))}
              </div>

              {/* Table */}
              <div className="flex-1 overflow-auto rounded-xl border border-white/5">
                <table className="w-full text-sm">
                  <thead className="bg-[#0D1526]/80 sticky top-0">
                    <tr>
                      {["Müşteri", "Durum", "Danışman", "Bütçe", "Tür", "Güncelleme", ""].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((lead) => {
                      const agent = AGENTS.find((a) => a.id === lead.agentId);
                      const branch = BRANCHES.find((b) => b.id === lead.branchId);
                      return (
                        <tr
                          key={lead.id}
                          onClick={() => setSelectedLead(lead)}
                          className="border-t border-white/5 hover:bg-white/3 cursor-pointer transition-colors"
                        >
                          <td className="px-4 py-3">
                            <div>
                              <p className="text-white font-medium">{lead.name}</p>
                              <p className="text-slate-500 text-xs">{lead.phone}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3"><LeadStatusBadge status={lead.status} /></td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <img src={agent?.avatar} alt={agent?.name} className="w-6 h-6 rounded-full object-cover" />
                              <div>
                                <p className="text-slate-300 text-xs">{agent?.name}</p>
                                <p className="text-slate-600 text-xs">{branch?.name}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-amber-400 font-semibold">{formatCurrency(lead.budget)}</td>
                          <td className="px-4 py-3 text-slate-400">{PROPERTY_TYPE_LABELS[lead.propertyType]}</td>
                          <td className="px-4 py-3 text-slate-500 text-xs">{formatDate(lead.updatedAt)}</td>
                          <td className="px-4 py-3">
                            <ChevronRight className="w-4 h-4 text-slate-600" />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <div className="flex items-center justify-center py-16 text-slate-600">
                    <p>Sonuç bulunamadı</p>
                  </div>
                )}
              </div>
            </div>

            {/* Detail Panel */}
            {selectedLead && (
              <div className="w-80 bg-[#0D1526]/60 border border-white/5 rounded-xl p-5 flex flex-col gap-4 overflow-y-auto">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-bold text-lg">{selectedLead.name}</h3>
                    <LeadStatusBadge status={selectedLead.status} />
                  </div>
                  <button onClick={() => setSelectedLead(null)} className="text-slate-500 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 p-3 bg-white/5 rounded-lg">
                    <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{selectedLead.phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 bg-white/5 rounded-lg">
                    <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span className="text-slate-300 text-sm truncate">{selectedLead.email}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-slate-500 text-xs">Bütçe</p>
                    <p className="text-amber-400 font-bold text-sm mt-0.5">{formatCurrency(selectedLead.budget)}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-slate-500 text-xs">Tür</p>
                    <p className="text-white font-semibold text-sm mt-0.5">{PROPERTY_TYPE_LABELS[selectedLead.propertyType]}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-slate-500 text-xs">Kaynak</p>
                    <p className="text-white font-semibold text-sm mt-0.5">{selectedLead.source}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-slate-500 text-xs">Tarih</p>
                    <p className="text-white font-semibold text-sm mt-0.5">{formatDate(selectedLead.createdAt)}</p>
                  </div>
                </div>

                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Notlar</p>
                  <p className="text-slate-400 text-sm leading-relaxed bg-white/5 rounded-lg p-3">{selectedLead.notes}</p>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Danışman</p>
                  {(() => {
                    const agent = AGENTS.find((a) => a.id === selectedLead.agentId);
                    const branch = BRANCHES.find((b) => b.id === selectedLead.branchId);
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

                <div className="flex gap-2 mt-auto pt-2">
                  <button className="flex-1 bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold py-2.5 rounded-lg transition-colors">
                    Güncelle
                  </button>
                  <button className="flex-1 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors">
                    Randevu
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      }}
    </Layout>
  );
}
