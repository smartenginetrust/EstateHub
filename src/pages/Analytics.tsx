import Layout from "@/components/layout/Layout";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip,
  CartesianGrid, PieChart, Pie, Cell, Legend
} from "recharts";
import { MONTHLY_DATA, BRANCH_PERFORMANCE, AGENTS, BRANCHES } from "@/constants/mockData";
import { formatCurrency } from "@/lib/formatters";
import { TrendingUp, Award, Target } from "lucide-react";

const SALES_VS_RENTALS = MONTHLY_DATA.map((m) => ({ month: m.month, Satış: m.sales, Kiralama: m.rentals }));

const LEAD_SOURCES = [
  { name: "Website", value: 35, color: "#3B82F6" },
  { name: "Referans", value: 28, color: "#F59E0B" },
  { name: "Sahibinden", value: 18, color: "#8B5CF6" },
  { name: "Instagram", value: 12, color: "#10B981" },
  { name: "Diğer", value: 7, color: "#64748B" },
];

const PROPERTY_TYPE_DIST = [
  { name: "Daire", value: 45, color: "#3B82F6" },
  { name: "Villa", value: 20, color: "#F59E0B" },
  { name: "Ofis", value: 15, color: "#8B5CF6" },
  { name: "Ticari", value: 12, color: "#10B981" },
  { name: "Arsa", value: 8, color: "#F97316" },
];

export default function Analytics() {
  const totalRevenue = MONTHLY_DATA.reduce((s, m) => s + m.revenue, 0);
  const totalSales = MONTHLY_DATA.reduce((s, m) => s + m.sales, 0);
  const totalRentals = MONTHLY_DATA.reduce((s, m) => s + m.rentals, 0);
  const avgDeal = Math.round(totalRevenue / (totalSales + totalRentals));

  return (
    <Layout title="Analitik" subtitle="Detaylı performans raporu">
      {() => (
        <div className="space-y-6">
          {/* Summary Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "6 Aylık Ciro", value: formatCurrency(totalRevenue), icon: TrendingUp, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
              { label: "Toplam Satış", value: String(totalSales), icon: Award, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
              { label: "Toplam Kiralama", value: String(totalRentals), icon: TrendingUp, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
              { label: "Ort. İşlem Tutarı", value: formatCurrency(avgDeal), icon: Target, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
            ].map((item) => (
              <div key={item.label} className={`bg-[#0D1526]/60 border rounded-xl p-5 ${item.bg}`}>
                <item.icon className={`w-5 h-5 mb-3 ${item.color}`} />
                <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                <p className="text-slate-400 text-sm mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Revenue & Sales Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-[#0D1526]/60 border border-white/5 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-1">Aylık Ciro Analizi</h3>
              <p className="text-slate-500 text-xs mb-4">Son 6 aylık ciro trendi</p>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={MONTHLY_DATA}>
                  <defs>
                    <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                  <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000000}M`} />
                  <Tooltip contentStyle={{ background: "#0D1526", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} formatter={(v: number) => [formatCurrency(v), "Ciro"]} />
                  <Area type="monotone" dataKey="revenue" stroke="#F59E0B" strokeWidth={2.5} fill="url(#grad1)" dot={{ fill: "#F59E0B", r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-[#0D1526]/60 border border-white/5 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-1">Satış & Kiralama</h3>
              <p className="text-slate-500 text-xs mb-4">Aylık karşılaştırma</p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={SALES_VS_RENTALS} barSize={14} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#0D1526", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                  <Legend wrapperStyle={{ fontSize: 11, color: "#94A3B8" }} />
                  <Bar dataKey="Satış" fill="#F59E0B" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="Kiralama" fill="#3B82F6" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Charts & Branch Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-[#0D1526]/60 border border-white/5 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4">Lead Kaynakları</h3>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={LEAD_SOURCES} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                    {LEAD_SOURCES.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#0D1526", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} formatter={(v: number) => [`%${v}`, ""]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {LEAD_SOURCES.map((s) => (
                  <div key={s.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-slate-400 text-xs">{s.name}</span>
                    </div>
                    <span className="text-white text-xs font-semibold">%{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0D1526]/60 border border-white/5 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4">İlan Tür Dağılımı</h3>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={PROPERTY_TYPE_DIST} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                    {PROPERTY_TYPE_DIST.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#0D1526", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} formatter={(v: number) => [`%${v}`, ""]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {PROPERTY_TYPE_DIST.map((s) => (
                  <div key={s.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-slate-400 text-xs">{s.name}</span>
                    </div>
                    <span className="text-white text-xs font-semibold">%{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Branch Table */}
            <div className="bg-[#0D1526]/60 border border-white/5 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4">Şube Sıralaması</h3>
              <div className="space-y-3">
                {[...BRANCH_PERFORMANCE].sort((a, b) => b.revenue - a.revenue).map((branch, i) => {
                  const colors = ["#F59E0B", "#3B82F6", "#8B5CF6", "#10B981"];
                  const medals = ["🥇", "🥈", "🥉", "4️⃣"];
                  return (
                    <div key={branch.branch} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <span className="text-lg flex-shrink-0">{medals[i]}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-white text-sm font-medium">{branch.branch}</p>
                          <p className="text-amber-400 text-xs font-bold">{formatCurrency(branch.revenue)}</p>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{
                            width: `${(branch.revenue / 11500000) * 100}%`,
                            backgroundColor: colors[i]
                          }} />
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-slate-600 text-xs">{branch.sales} satış</span>
                          <span className="text-slate-600 text-xs">{branch.leads} lead</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Agent Performance Table */}
          <div className="bg-[#0D1526]/60 border border-white/5 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-4">Danışman Performans Tablosu</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    {["#", "Danışman", "Şube", "Satış", "Kiralama", "Aktif Lead", "Komisyon", "Hedef %"].map((h) => (
                      <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-2 pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...AGENTS].sort((a, b) => b.commission - a.commission).map((agent, i) => {
                    const branchData = BRANCHES.find((b) => b.id === agent.branchId);
                    const progress = Math.min(100, Math.round((agent.commission / agent.monthlyTarget) * 100));
                    return (
                      <tr key={agent.id} className="border-t border-white/5 hover:bg-white/3 transition-colors">
                        <td className="py-3 pr-4 text-slate-600 font-bold">#{i + 1}</td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2.5">
                            <img src={agent.avatar} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" alt={agent.name} />
                            <div>
                              <p className="text-white font-medium">{agent.name}</p>
                              <p className="text-slate-500 text-xs">{agent.title}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          <span className="text-slate-400 text-xs">{branchData?.name}</span>
                        </td>
                        <td className="py-3 pr-4 text-white font-semibold">{agent.totalSales}</td>
                        <td className="py-3 pr-4 text-white font-semibold">{agent.totalRentals}</td>
                        <td className="py-3 pr-4 text-white">{agent.activeLeads}</td>
                        <td className="py-3 pr-4 text-amber-400 font-bold">{formatCurrency(agent.commission)}</td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className={`text-xs font-semibold ${progress >= 75 ? "text-emerald-400" : progress >= 50 ? "text-amber-400" : "text-red-400"}`}>%{progress}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
