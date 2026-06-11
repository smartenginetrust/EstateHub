import { useState } from "react";
import { Phone, Mail, TrendingUp, Target, Users, Building2, Star, Search } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { AGENTS, BRANCHES, LEADS, PROPERTIES } from "@/constants/mockData";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { Agent } from "@/types";

export default function Agents() {
  const [selected, setSelected] = useState<Agent | null>(null);
  const [search, setSearch] = useState("");

  return (
    <Layout title="Danışmanlar" subtitle="Ekip performansını takip edin">
      {(selectedBranch) => {
        let filtered = selectedBranch === "all" ? AGENTS : AGENTS.filter((a) => a.branchId === selectedBranch);
        if (search) filtered = filtered.filter((a) =>
          a.name.toLowerCase().includes(search.toLowerCase()) ||
          a.email.toLowerCase().includes(search.toLowerCase())
        );

        const sorted = [...filtered].sort((a, b) => b.commission - a.commission);

        return (
          <div className="space-y-6">
            {/* Search */}
            <div className="relative max-w-sm">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Danışman ara..."
                className="w-full bg-white/5 border border-white/10 text-slate-300 placeholder-slate-600 text-sm rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:border-amber-500/40"
              />
            </div>

            {/* Top 3 Leaderboard */}
            {sorted.length >= 3 && (
              <div className="bg-[#0D1526]/60 border border-white/5 rounded-xl p-5">
                <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400" />
                  En İyi Danışmanlar
                </h3>
                <div className="flex items-end gap-4 justify-center">
                  {[sorted[1], sorted[0], sorted[2]].map((agent, i) => {
                    const rank = i === 1 ? 1 : i === 0 ? 2 : 3;
                    const heights = ["h-28", "h-36", "h-24"];
                    const badges = ["🥈", "🏆", "🥉"];
                    const branch = BRANCHES.find((b) => b.id === agent.branchId);
                    return (
                      <div
                        key={agent.id}
                        onClick={() => setSelected(agent)}
                        className={cn("flex flex-col items-center gap-2 cursor-pointer group flex-1")}
                      >
                        <span className="text-2xl">{badges[i]}</span>
                        <img
                          src={agent.avatar}
                          alt={agent.name}
                          className={cn("rounded-xl object-cover border-2 group-hover:border-amber-500 transition-colors w-16",
                            i === 1 ? "h-16 border-amber-500" : "h-14 border-white/10"
                          )}
                        />
                        <div className="text-center">
                          <p className="text-white font-semibold text-sm">{agent.name.split(" ")[0]}</p>
                          <p className="text-amber-400 text-xs font-bold">{formatCurrency(agent.commission)}</p>
                          <p className="text-slate-500 text-xs">{branch?.city}</p>
                        </div>
                        <div className={cn("w-full rounded-t-lg bg-gradient-to-t from-amber-500/20 to-transparent flex items-end justify-center pb-2", heights[i])}>
                          <span className="text-slate-400 text-xs font-bold">#{rank}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Agent Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sorted.map((agent) => {
                const branch = BRANCHES.find((b) => b.id === agent.branchId);
                const agentLeads = LEADS.filter((l) => l.agentId === agent.id);
                const agentProps = PROPERTIES.filter((p) => p.agentId === agent.id && p.status === "active");
                const progress = Math.min(100, Math.round((agent.commission / agent.monthlyTarget) * 100));

                return (
                  <div
                    key={agent.id}
                    onClick={() => setSelected(agent)}
                    className={cn(
                      "bg-[#0D1526]/60 border rounded-xl p-4 cursor-pointer hover:border-amber-500/30 transition-all",
                      selected?.id === agent.id ? "border-amber-500/40 bg-amber-500/5" : "border-white/5"
                    )}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <img src={agent.avatar} alt={agent.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-white font-semibold text-sm truncate">{agent.name}</p>
                        <p className="text-amber-400/80 text-xs">{agent.title}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: branch?.color }} />
                          <p className="text-slate-500 text-xs truncate">{branch?.name}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="text-center">
                        <p className="text-white text-sm font-bold">{agent.totalSales}</p>
                        <p className="text-slate-500 text-xs">Satış</p>
                      </div>
                      <div className="text-center">
                        <p className="text-white text-sm font-bold">{agentLeads.length}</p>
                        <p className="text-slate-500 text-xs">Lead</p>
                      </div>
                      <div className="text-center">
                        <p className="text-white text-sm font-bold">{agentProps.length}</p>
                        <p className="text-slate-500 text-xs">İlan</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-500 text-xs">Hedef Gerçekleşme</span>
                        <span className="text-xs font-semibold text-amber-400">%{progress}</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Agent Detail */}
            {selected && (
              <div className="bg-[#0D1526]/60 border border-amber-500/20 rounded-xl p-6">
                <div className="flex flex-wrap items-start gap-6">
                  <div className="flex items-start gap-4">
                    <img src={selected.avatar} alt={selected.name} className="w-20 h-20 rounded-xl object-cover" />
                    <div>
                      <h3 className="text-white font-bold text-xl">{selected.name}</h3>
                      <p className="text-amber-400 text-sm">{selected.title}</p>
                      <p className="text-slate-500 text-sm">{BRANCHES.find((b) => b.id === selected.branchId)?.name}</p>
                      <p className="text-slate-600 text-xs mt-1">Katılım: {formatDate(selected.joinedAt)}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a href={`tel:${selected.phone}`} className="flex items-center gap-2 bg-white/5 border border-white/10 text-slate-300 text-sm px-4 py-2.5 rounded-lg hover:bg-white/10 transition-colors">
                      <Phone className="w-4 h-4 text-amber-400" /> {selected.phone}
                    </a>
                    <a href={`mailto:${selected.email}`} className="flex items-center gap-2 bg-white/5 border border-white/10 text-slate-300 text-sm px-4 py-2.5 rounded-lg hover:bg-white/10 transition-colors">
                      <Mail className="w-4 h-4 text-blue-400" /> {selected.email}
                    </a>
                  </div>

                  <div className="flex flex-wrap gap-4 ml-auto">
                    <div className="text-center p-4 bg-white/5 rounded-xl min-w-[100px]">
                      <TrendingUp className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                      <p className="text-white text-xl font-bold">{selected.totalSales}</p>
                      <p className="text-slate-500 text-xs">Toplam Satış</p>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl min-w-[100px]">
                      <Building2 className="w-5 h-5 text-violet-400 mx-auto mb-1" />
                      <p className="text-white text-xl font-bold">{selected.totalRentals}</p>
                      <p className="text-slate-500 text-xs">Kiralama</p>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl min-w-[100px]">
                      <Users className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                      <p className="text-white text-xl font-bold">{selected.activeLeads}</p>
                      <p className="text-slate-500 text-xs">Aktif Lead</p>
                    </div>
                    <div className="text-center p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl min-w-[100px]">
                      <Target className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                      <p className="text-amber-400 text-xl font-bold">{formatCurrency(selected.commission)}</p>
                      <p className="text-slate-500 text-xs">Toplam Komisyon</p>
                    </div>
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
