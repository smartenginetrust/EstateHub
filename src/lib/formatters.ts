export const formatCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M ₺`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K ₺`;
  }
  return `${value.toLocaleString("tr-TR")} ₺`;
};

export const formatFullCurrency = (value: number): string => {
  return `${value.toLocaleString("tr-TR")} ₺`;
};

export const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("tr-TR", { day: "2-digit", month: "short", year: "numeric" });
};

export const formatRelativeTime = (dateStr: string): string => {
  const now = new Date();
  const past = new Date(dateStr);
  const diffMs = now.getTime() - past.getTime();
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffHours < 1) return "Az önce";
  if (diffHours < 24) return `${diffHours} saat önce`;
  if (diffDays < 7) return `${diffDays} gün önce`;
  return formatDate(dateStr);
};

export const LEAD_STATUS_LABELS: Record<string, string> = {
  new: "Yeni",
  contacted: "İletişimde",
  viewing: "Görüntüleme",
  offer: "Teklif",
  closed: "Kapandı",
  lost: "Kayıp",
};

export const LEAD_STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  contacted: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  viewing: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  offer: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  closed: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  lost: "bg-red-500/20 text-red-300 border-red-500/30",
};

export const PROPERTY_TYPE_LABELS: Record<string, string> = {
  apartment: "Daire",
  villa: "Villa",
  commercial: "Ticari",
  land: "Arsa",
  office: "Ofis",
};

export const LISTING_STATUS_LABELS: Record<string, string> = {
  active: "Aktif",
  sold: "Satıldı",
  rented: "Kiralandı",
  passive: "Pasif",
};

export const LISTING_STATUS_COLORS: Record<string, string> = {
  active: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  sold: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  rented: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  passive: "bg-slate-500/20 text-slate-300 border-slate-500/30",
};

export const ACTIVITY_TYPE_LABELS: Record<string, string> = {
  call: "Arama",
  meeting: "Toplantı",
  offer: "Teklif",
  closed: "Satış",
  note: "Not",
  viewing: "Görüntüleme",
};

export const ACTIVITY_TYPE_COLORS: Record<string, string> = {
  call: "bg-blue-500",
  meeting: "bg-violet-500",
  offer: "bg-amber-500",
  closed: "bg-emerald-500",
  note: "bg-slate-500",
  viewing: "bg-orange-500",
};
