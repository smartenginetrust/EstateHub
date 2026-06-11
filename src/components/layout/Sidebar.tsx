import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  UserCircle,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BRANCHES } from "@/constants/mockData";

const NAV_ITEMS = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/leads", label: "Müşteri & Lead", icon: Users },
  { path: "/properties", label: "Portföy", icon: Building2 },
  { path: "/agents", label: "Danışmanlar", icon: UserCircle },
  { path: "/analytics", label: "Analitik", icon: BarChart3 },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-[#0B1120] border-r border-white/5 transition-all duration-300 z-20 fixed left-0 top-0",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center h-16 px-4 border-b border-white/5", collapsed ? "justify-center" : "gap-3")}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0">
          <Building2 className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-white font-bold text-sm leading-none">EstateHub</p>
            <p className="text-amber-400/70 text-xs mt-0.5">CRM Pro</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="px-2 space-y-0.5">
          {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group",
                  active
                    ? "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="w-4.5 h-4.5 flex-shrink-0 w-5 h-5" />
                {!collapsed && <span className="text-sm font-medium truncate">{label}</span>}
                {active && !collapsed && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Branches */}
        {!collapsed && (
          <div className="px-4 mt-6 mb-2">
            <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold">Şubeler</p>
          </div>
        )}
        {!collapsed && (
          <div className="px-2 space-y-0.5">
            {BRANCHES.map((branch) => (
              <div key={branch.id} className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer group">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: branch.color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-slate-400 text-xs font-medium truncate group-hover:text-white transition-colors">{branch.name}</p>
                </div>
                <MapPin className="w-3 h-3 text-slate-600 flex-shrink-0" />
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/5 p-2 space-y-0.5">
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">GM</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">Genel Müdür</p>
              <p className="text-slate-500 text-xs truncate">Tüm Şubeler</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span className="text-xs">Daralt</span>}
        </button>
      </div>
    </aside>
  );
}
