import { TrendingUp, Users, Building2, UserCircle, Target, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip,
  CartesianGrid, PieChart, Pie, Cell
} from "recharts";
import Layout from "@/components/layout/Layout";
import StatCard from "@/components/features/StatCard";
import ActivityFeed from "@/components/features/ActivityFeed";
import { LEADS, PROPERTIES, AGENTS, MONTHLY_DATA, BRANCH_PERFORMANCE } from "@/constants/mockData";
import { formatCurrency } from "@/lib/formatters";

const LEAD_PIPELINE = [
  { status: "Yeni", count: 0, color: "#3B82F6" },
  { status: "İletişimde", count: 0, color: "#8B5CF6" },
  { status: "Görüntüleme", count: 0, color: "#F59E0B" },
  { status: "Teklif", count: 0, color: "#F97316" },
  { status: "Kapandı", count: 0, color: "#10B981" },
];

export default function Dashboard() {
  const pipelineData = LEAD_PIPELINE.map((p) => ({
    ...p,
    count: LEADS.filter((l) => {
      const map: Record<string, string> = { "Yeni": "new", "İletişimde": "contacted", "Görüntüleme": "viewing", "Teklif": "offer", "Kapandı": "closed" };
      return l.status === map[p.status];
    }).length,
  }));

  const activeListings = PROPERTIES.filter((p) => p.status === "active").length;
  const totalRevenue = MONTHLY_DATA.reduce((s, m) => s + m.revenue, 0);
  const closedLeads = LEADS.filter((l) => l.status === "closed").length;
  const convRate = Math.round((closedLeads / LEADS.length) * 100);

  return (
    <Layout title="Dashboard" subtitle="Genel Bakış — Tüm Şubeler">
      {(selectedBranch) => {
        const filteredLeads = selectedBranch === "all" ? LEADS : LEADS.filter((l) => l.branchId === selectedBranch);
        const filteredAgents = selectedBranch === "all" ? AGENTS : AGENTS.filter((a) => a.branchId === selectedBranch);

        return (
          <div className="space-y-6">
            {/* KPI Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Toplam Lead" value={String(filteredLeads.length)} subValue={`${filteredLeads.filter((l) => l.status === "new").length} yeni bu hafta`} icon={Users} trend={{ value: 12, label: "geçen ay" }} color="blue" />
              <StatCard label="Aktif İlanlar" value={String(activeListings)} subValue="Portföyde" icon={Building2} trend={{ value: 5, label: "geçen ay" }} color="amber" />
              <StatCard label="Aylık Ciro" value={formatCurrency(8500000)} subValue="Kasım 2024" icon={TrendingUp} trend={{ value: 18, label: "geçen ay" }} color="emerald" />
              <StatCard label="Danışmanlar" value={String(filteredAgents.length)} subValue="Aktif çalışan" icon={UserCircle} trend={{ value: 2, label: "geçen ay" }} color="violet" />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Revenue Chart */}
              <div className="lg:col-span-2 bg-[#0D1526]/60 border border-white/5 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold">Aylık Ciro Trendi</h3>
                    <p className="text-slate-500 text-xs mt-0.5">Son 6 ay</p>
                  </div>
                  <span className="text-amber-400 text-sm font-semibold">{formatCurrency(totalRevenue)}</span>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={MONTHLY_DATA}>
                    <defs>
                      <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                    <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000000}M`} />
                    <Tooltip
                      contentStyle={{ background: "#0D1526", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}
                      labelStyle={{ color: "#94A3B8" }}
                      formatter={(v: number) => [formatCurrency(v), "Ciro"]}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#F59E0B" strokeWidth={2} fill="url(#revenueGrad)" dot={{ fill: "#F59E0B", r: 3 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Lead Pipeline */}
              <div className="bg-[#0D1526]/60 border border-white/5 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Lead Pipeline</h3>
                  <Link to="/leads" className="text-amber-400 text-xs hover:text-amber-300 flex items-center gap-1">
                    Tümü <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="space-y-3">
                  {pipelineData.map((item) => (
                    <div key={item.status}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-slate-400 text-xs">{item.status}</span>
                        <span className="text-white text-xs font-semibold">{item.count}</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${(item.count / LEADS.length) * 100}%`, backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-xs">Dönüşüm Oranı</span>
                    <span className="text-emerald-400 text-sm font-bold">%{convRate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Branch Performance */}
              <div className="lg:col-span-2 bg-[#0D1526]/60 border border-white/5 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Şube Performansı</h3>
                  <span className="text-slate-500 text-xs">Satış Adedi</span>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={BRANCH_PERFORMANCE} barSize={28}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                    <XAxis dataKey="branch" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: "#0D1526", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}
                      labelStyle={{ color: "#94A3B8" }}
                    />
                    <Bar dataKey="sales" radius={[4, 4, 0, 0]}>
                      {BRANCH_PERFORMANCE.map((_, i) => (
                        <Cell key={i} fill={["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"][i]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/5">
                  {BRANCH_PERFORMANCE.map((b, i) => (
                    <div key={b.branch} className="text-center">
                      <p className="text-white text-sm font-bold">{formatCurrency(b.revenue)}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{b.branch}</p>
                      <p className="text-slate-600 text-xs">{b.leads} lead</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Feed */}
              <div className="bg-[#0D1526]/60 border border-white/5 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Son Aktiviteler</h3>
                </div>
                <ActivityFeed limit={5} />
              </div>
            </div>

            {/* Top Agents */}
            <div className="bg-[#0D1526]/60 border border-white/5 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">En Başarılı Danışmanlar</h3>
                <Link to="/agents" className="text-amber-400 text-xs hover:text-amber-300 flex items-center gap-1">
                  Tümünü Gör <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredAgents.slice(0, 4).map((agent, i) => (
                  <div key={agent.id} className="flex items-center gap-3 p-3 bg-white/3 rounded-lg border border-white/5 hover:border-amber-500/20 transition-colors">
                    <div className="relative">
                      <img src={agent.avatar} alt={agent.name} className="w-10 h-10 rounded-lg object-cover" />
                      {i === 0 && <span className="absolute -top-1.5 -right-1.5 text-xs">🏆</span>}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-white text-sm font-medium truncate">{agent.name}</p>
                      <p className="text-slate-500 text-xs">{agent.totalSales} satış</p>
                      <p className="text-amber-400 text-xs font-semibold">{formatCurrency(agent.commission)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }}
    </Layout>
  );
}
