import { Bell, Search, ChevronDown } from "lucide-react";
import { BRANCHES } from "@/constants/mockData";

interface HeaderProps {
  title: string;
  subtitle?: string;
  selectedBranch: string;
  onBranchChange: (id: string) => void;
}

export default function Header({ title, subtitle, selectedBranch, onBranchChange }: HeaderProps) {
  return (
    <header className="h-16 bg-[#0D1526]/80 backdrop-blur border-b border-white/5 flex items-center px-6 gap-4 sticky top-0 z-10">
      <div className="flex-1">
        <h1 className="text-white font-bold text-lg leading-none">{title}</h1>
        {subtitle && <p className="text-slate-500 text-xs mt-0.5">{subtitle}</p>}
      </div>

      {/* Branch selector */}
      <div className="relative group">
        <select
          value={selectedBranch}
          onChange={(e) => onBranchChange(e.target.value)}
          className="appearance-none bg-white/5 border border-white/10 text-slate-300 text-sm rounded-lg pl-3 pr-8 py-2 cursor-pointer hover:bg-white/10 transition-colors focus:outline-none focus:border-amber-500/40"
        >
          <option value="all" className="bg-[#0D1526]">Tüm Şubeler</option>
          {BRANCHES.map((b) => (
            <option key={b.id} value={b.id} className="bg-[#0D1526]">{b.name}</option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          placeholder="Ara..."
          className="bg-white/5 border border-white/10 text-slate-300 placeholder-slate-600 text-sm rounded-lg pl-9 pr-4 py-2 w-48 focus:outline-none focus:border-amber-500/40 focus:w-64 transition-all"
        />
      </div>

      {/* Notifications */}
      <button className="relative w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
        <Bell className="w-4 h-4 text-slate-400" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500" />
      </button>

      {/* Avatar */}
      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
        <span className="text-white text-xs font-bold">GM</span>
      </div>
    </header>
  );
}
