import type { Branch, Lead, Property, Agent, Activity } from "@/types";
import saadetAvatar from "@/assets/saadet-takas.png";

export const BRANCHES: Branch[] = [
  { id: "b1", name: "Konyaaltı Şubesi", city: "Antalya", address: "Konyaaltı Cad. No:12, Konyaaltı", phone: "0242 xxx xx xx", managerName: "Ahmet Yıldız", agentCount: 8, color: "#3B82F6" },
  { id: "b2", name: "Kepez Şubesi", city: "Antalya", address: "Atatürk Bulvarı No:45, Kepez", phone: "0242 xxx xx xx", managerName: "Selin Kaya", agentCount: 6, color: "#8B5CF6" },
  { id: "b3", name: "Muratpaşa Şubesi", city: "Antalya", address: "İsmet Paşa Cad. No:89, Muratpaşa", phone: "0242 xxx xx xx", managerName: "Murat Demir", agentCount: 5, color: "#10B981" },
  { id: "b4", name: "Alanya Şubesi", city: "Antalya", address: "Atatürk Cad. No:34, Alanya", phone: "0242 xxx xx xx", managerName: "Elif Şahin", agentCount: 4, color: "#F59E0B" },
];

export const AGENTS: Agent[] = [
  { id: "a1", name: "Cemre Arslan", email: "cemre@takasgayrimenkul.com", phone: "0532 111 22 33", branchId: "b1", title: "Kıdemli Danışman", avatar: "https://i.pravatar.cc/150?img=1", totalSales: 28, totalRentals: 14, commission: 142000, monthlyTarget: 300000, joinedAt: "2021-03-15", activeLeads: 12, activeListings: 6 },
  { id: "a2", name: "Burak Öztürk", email: "burak@takasgayrimenkul.com", phone: "0533 222 33 44", branchId: "b1", title: "Danışman", avatar: "https://i.pravatar.cc/150?img=3", totalSales: 15, totalRentals: 22, commission: 87000, monthlyTarget: 200000, joinedAt: "2022-07-01", activeLeads: 8, activeListings: 4 },
  { id: "a3", name: "Dila Yılmaz", email: "dila@takasgayrimenkul.com", phone: "0534 333 44 55", branchId: "b2", title: "Kıdemli Danışman", avatar: "https://i.pravatar.cc/150?img=5", totalSales: 34, totalRentals: 8, commission: 198000, monthlyTarget: 350000, joinedAt: "2020-11-20", activeLeads: 15, activeListings: 9 },
  { id: "a4", name: "Tarık Güneş", email: "tarik@takasgayrimenkul.com", phone: "0535 444 55 66", branchId: "b2", title: "Danışman", avatar: "https://i.pravatar.cc/150?img=7", totalSales: 11, totalRentals: 18, commission: 65000, monthlyTarget: 150000, joinedAt: "2023-01-10", activeLeads: 6, activeListings: 3 },
  { id: "a5", name: "Saadet Takas", email: "saadet@takasgayrimenkul.com", phone: "0536 555 66 77", branchId: "b3", title: "Şube Müdürü", avatar: saadetAvatar, totalSales: 42, totalRentals: 19, commission: 245000, monthlyTarget: 400000, joinedAt: "2019-06-15", activeLeads: 10, activeListings: 7 },
  { id: "a6", name: "Okan Çelik", email: "okan@takasgayrimenkul.com", phone: "0537 666 77 88", branchId: "b3", title: "Danışman", avatar: "https://i.pravatar.cc/150?img=11", totalSales: 9, totalRentals: 12, commission: 48000, monthlyTarget: 120000, joinedAt: "2023-05-20", activeLeads: 7, activeListings: 3 },
  { id: "a7", name: "İrem Koç", email: "irem@takasgayrimenkul.com", phone: "0538 777 88 99", branchId: "b4", title: "Kıdemli Danışman", avatar: "https://i.pravatar.cc/150?img=13", totalSales: 22, totalRentals: 31, commission: 125000, monthlyTarget: 250000, joinedAt: "2021-09-01", activeLeads: 11, activeListings: 5 },
  { id: "a8", name: "Can Yıldırım", email: "can@takasgayrimenkul.com", phone: "0539 888 99 00", branchId: "b4", title: "Danışman", avatar: "https://i.pravatar.cc/150?img=15", totalSales: 7, totalRentals: 9, commission: 38000, monthlyTarget: 100000, joinedAt: "2024-01-15", activeLeads: 4, activeListings: 2 },
];

export const PROPERTIES: Property[] = [
  { id: "p1", title: "Konyaaltı'nda Deniz Manzaralı 3+1 Daire", type: "apartment", kind: "sale", status: "active", branchId: "b1", agentId: "a1", price: 8500000, area: 145, rooms: 3, bathrooms: 2, floor: 5, totalFloors: 8, city: "Antalya", district: "Konyaaltı", address: "Sarısu Mah.", description: "Deniz manzaralı, asansörlü binada lüks daire.", imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80", features: ["Deniz Manzarası", "Asansör", "Otopark", "Güvenlik"], createdAt: "2024-10-15", updatedAt: "2024-11-01" },
  { id: "p2", title: "Kepez Merkez 2+1 Kiralık", type: "apartment", kind: "rent", status: "active", branchId: "b2", agentId: "a3", price: 25000, area: 85, rooms: 2, bathrooms: 1, floor: 3, totalFloors: 6, city: "Antalya", district: "Kepez", address: "Varsak Mah.", description: "Merkezi konumda, eşyalı kiralık daire.", imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80", features: ["Eşyalı", "Merkezi Konum", "Toplu Taşıma Yakını"], createdAt: "2024-11-01", updatedAt: "2024-11-05" },
  { id: "p3", title: "Muratpaşa'da Lüks Villa", type: "villa", kind: "sale", status: "active", branchId: "b3", agentId: "a5", price: 15000000, area: 320, rooms: 5, bathrooms: 3, floor: 0, totalFloors: 2, city: "Antalya", district: "Muratpaşa", address: "Lara Mah.", description: "Özel bahçeli, havuzlu lüks villa.", imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80", features: ["Özel Havuz", "Bahçe", "Kapalı Garaj", "Akıllı Ev"], createdAt: "2024-09-20", updatedAt: "2024-10-15" },
  { id: "p4", title: "Alanya'da Ofis Katı", type: "office", kind: "rent", status: "active", branchId: "b4", agentId: "a7", price: 45000, area: 220, rooms: 6, bathrooms: 2, floor: 4, totalFloors: 10, city: "Antalya", district: "Alanya", address: "Atatürk Cad.", description: "Deniz manzaralı, tam donanımlı ofis katı.", imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", features: ["Deniz Manzarası", "Kafe", "Güvenlik", "Otopark"], createdAt: "2024-10-01", updatedAt: "2024-10-20" },
  { id: "p5", title: "Konyaaltı'nda Satılık Arsa", type: "land", kind: "sale", status: "active", branchId: "b1", agentId: "a2", price: 5200000, area: 450, rooms: 0, bathrooms: 0, floor: 0, totalFloors: 0, city: "Antalya", district: "Konyaaltı", address: "Hurma Mah.", description: "İmarlı, köşe başı yapıya uygun arsa.", imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80", features: ["İmarlı", "Köşe Başı", "Ulaşım Kolay"], createdAt: "2024-11-10", updatedAt: "2024-11-10" },
  { id: "p6", title: "Kepez'de Satıldı 1+1 Daire", type: "apartment", kind: "sale", status: "sold", branchId: "b2", agentId: "a3", price: 2800000, area: 55, rooms: 1, bathrooms: 1, floor: 2, totalFloors: 5, city: "Antalya", district: "Kepez", address: "Gülveren Mah.", description: "Bakımlı, ulaşımı kolay daire.", imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80", features: ["Toplu Taşıma Yakını", "Bakımlı"], createdAt: "2024-08-01", updatedAt: "2024-10-30" },
  { id: "p7", title: "Muratpaşa'da Kiralık Dükkan", type: "commercial", kind: "rent", status: "active", branchId: "b3", agentId: "a6", price: 12000, area: 80, rooms: 1, bathrooms: 1, floor: 0, totalFloors: 1, city: "Antalya", district: "Muratpaşa", address: "Balbey Mah.", description: "Ana cadde üzeri, vitrinli ticari alan.", imageUrl: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=600&q=80", features: ["Ana Cadde", "Vitrinli", "Depo"], createdAt: "2024-11-05", updatedAt: "2024-11-05" },
  { id: "p8", title: "Alanya'da 4+1 Lüks Daire", type: "apartment", kind: "sale", status: "active", branchId: "b4", agentId: "a7", price: 7200000, area: 190, rooms: 4, bathrooms: 2, floor: 8, totalFloors: 12, city: "Antalya", district: "Alanya", address: "Cleopatra Mah.", description: "Deniz manzaralı, yeni bina lüks daire.", imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80", features: ["Deniz Manzarası", "Yeni Bina", "SPA", "Otopark"], createdAt: "2024-10-25", updatedAt: "2024-11-02" },
];

export const LEADS: Lead[] = [
  { id: "l1", name: "Mehmet Avcı", phone: "0533 100 10 10", email: "m.avci@gmail.com", branchId: "b1", agentId: "a1", status: "viewing", source: "Website", budget: 7000000, propertyType: "apartment", notes: "Deniz manzarası şart. Hafta sonu görüntüleme planlandı.", createdAt: "2024-11-01", updatedAt: "2024-11-10" },
  { id: "l2", name: "Ayşe Kıran", phone: "0534 200 20 20", email: "ayse.kiran@hotmail.com", branchId: "b1", agentId: "a2", status: "offer", source: "Referans", budget: 3500000, propertyType: "apartment", notes: "2+1 tercih ediyor. Teklif verildi.", createdAt: "2024-10-20", updatedAt: "2024-11-08" },
  { id: "l3", name: "Kemal Doğan", phone: "0535 300 30 30", email: "kemal.d@gmail.com", branchId: "b2", agentId: "a3", status: "new", source: "Sahibinden", budget: 15000, propertyType: "apartment", notes: "Kiralık arıyor, Kepez bölgesi.", createdAt: "2024-11-10", updatedAt: "2024-11-10" },
  { id: "l4", name: "Fatma Yıldız", phone: "0536 400 40 40", email: "fatma.y@yahoo.com", branchId: "b2", agentId: "a3", status: "contacted", source: "Instagram", budget: 12000000, propertyType: "villa", notes: "İstanbul'dan Antalya'ya taşınacak.", createdAt: "2024-11-05", updatedAt: "2024-11-09" },
  { id: "l5", name: "Ali Çetin", phone: "0537 500 50 50", email: "ali.cetin@gmail.com", branchId: "b3", agentId: "a5", status: "closed", source: "Website", budget: 14000000, propertyType: "villa", notes: "Sözleşme imzalandı! ✅", createdAt: "2024-09-15", updatedAt: "2024-10-28" },
  { id: "l6", name: "Seda Mercan", phone: "0538 600 60 60", email: "seda.mercan@gmail.com", branchId: "b3", agentId: "a6", status: "viewing", source: "Referans", budget: 10000, propertyType: "commercial", notes: "Dükkan arıyor, Muratpaşa.", createdAt: "2024-11-08", updatedAt: "2024-11-10" },
  { id: "l7", name: "Emre Aslan", phone: "0539 700 70 70", email: "emre.aslan@gmail.com", branchId: "b4", agentId: "a7", status: "contacted", source: "Hürriyet Emlak", budget: 6500000, propertyType: "apartment", notes: "Deniz manzaralı, geniş daire istiyor.", createdAt: "2024-11-07", updatedAt: "2024-11-10" },
  { id: "l8", name: "Hülya Demir", phone: "0531 800 80 80", email: "hulya.d@gmail.com", branchId: "b4", agentId: "a8", status: "new", source: "Website", budget: 40000, propertyType: "office", notes: "Alanya bölgesinde ofis arıyor.", createdAt: "2024-11-10", updatedAt: "2024-11-10" },
  { id: "l9", name: "Oğuz Kara", phone: "0532 900 90 90", email: "oguz.kara@gmail.com", branchId: "b1", agentId: "a1", status: "lost", source: "Website", budget: 5000000, propertyType: "apartment", notes: "Başka firmadan aldı.", createdAt: "2024-10-01", updatedAt: "2024-10-25" },
];

export const ACTIVITIES: Activity[] = [
  { id: "act1", type: "call", leadId: "l1", agentId: "a1", branchId: "b1", title: "Mehmet Avcı ile görüşme", description: "Görüntüleme için randevu alındı. Cumartesi saat 14:00.", createdAt: "2024-11-10T10:30:00" },
  { id: "act2", type: "offer", leadId: "l2", agentId: "a2", branchId: "b1", title: "Ayşe Kıran'a teklif verildi", description: "3.200.000 ₺ teklif verildi. Pazarlık aşamasında.", createdAt: "2024-11-09T14:15:00" },
  { id: "act3", type: "viewing", leadId: "l6", agentId: "a6", branchId: "b3", title: "Dükkan görüntüleme", description: "Pazar Cad. dükkanı gösterildi. Beğendi.", createdAt: "2024-11-10T11:00:00" },
  { id: "act4", type: "closed", leadId: "l5", agentId: "a5", branchId: "b3", title: "Satış tamamlandı! 🏆", description: "Ali Çetin villa satışı tamamlandı. 14.500.000 ₺", createdAt: "2024-10-28T16:00:00" },
  { id: "act5", type: "meeting", leadId: "l4", agentId: "a3", branchId: "b2", title: "Fatma Yıldız ofis toplantısı", description: "Bütçe ve bölge tercihleri görüşüldü.", createdAt: "2024-11-09T10:00:00" },
  { id: "act6", type: "note", leadId: "l7", agentId: "a7", branchId: "b4", title: "Emre Aslan notları güncellendi", description: "3+1 tercih ediyor, maksimum 8M bütçe var.", createdAt: "2024-11-10T09:00:00" },
];

export const MONTHLY_DATA = [
  { month: "Haz", sales: 8, rentals: 15, revenue: 4200000 },
  { month: "Tem", sales: 11, rentals: 18, revenue: 5800000 },
  { month: "Ağu", sales: 7, rentals: 12, revenue: 3900000 },
  { month: "Eyl", sales: 14, rentals: 22, revenue: 7200000 },
  { month: "Eki", sales: 16, rentals: 19, revenue: 8500000 },
  { month: "Kas", sales: 9, rentals: 14, revenue: 5100000 },
];

export const BRANCH_PERFORMANCE = [
  { branch: "Konyaaltı", sales: 18, revenue: 9200000, leads: 34 },
  { branch: "Kepez", sales: 14, revenue: 7800000, leads: 28 },
  { branch: "Muratpaşa", sales: 22, revenue: 11500000, leads: 41 },
  { branch: "Alanya", sales: 11, revenue: 6200000, leads: 22 },
];
