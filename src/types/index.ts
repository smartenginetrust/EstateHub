export type BranchId = string;

export interface Branch {
  id: BranchId;
  name: string;
  city: string;
  address: string;
  phone: string;
  managerName: string;
  agentCount: number;
  color: string;
}

export type LeadStatus = "new" | "contacted" | "viewing" | "offer" | "closed" | "lost";
export type PropertyType = "apartment" | "villa" | "commercial" | "land" | "office";
export type ListingStatus = "active" | "sold" | "rented" | "passive";
export type ListingKind = "sale" | "rent";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  branchId: BranchId;
  agentId: string;
  status: LeadStatus;
  source: string;
  budget: number;
  propertyType: PropertyType;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  kind: ListingKind;
  status: ListingStatus;
  branchId: BranchId;
  agentId: string;
  price: number;
  area: number;
  rooms: number;
  bathrooms: number;
  floor: number;
  totalFloors: number;
  city: string;
  district: string;
  address: string;
  description: string;
  imageUrl: string;
  features: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  branchId: BranchId;
  title: string;
  avatar: string;
  totalSales: number;
  totalRentals: number;
  commission: number;
  monthlyTarget: number;
  joinedAt: string;
  activeLeads: number;
  activeListings: number;
}

export interface Activity {
  id: string;
  type: "call" | "meeting" | "offer" | "closed" | "note" | "viewing";
  leadId?: string;
  agentId: string;
  branchId: BranchId;
  title: string;
  description: string;
  createdAt: string;
}

export interface DashboardStats {
  totalLeads: number;
  activeListings: number;
  monthlySales: number;
  monthlyRevenue: number;
  conversionRate: number;
  totalAgents: number;
}
