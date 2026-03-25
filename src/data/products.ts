export type Product = {
  id: number;
  name: string;
  category: string;
  subCategory: string;
  fit: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  details: string[];
  stock: {
    S: number;
    M: number;
    L: number;
    XL: number;
    XXL: number;
  };
  isNew?: boolean;
};

export const products: Product[] = [
  // --- ÜST GİYİM ---
  {
    id: 1,
    name: "Washed Essential Hoodie",
    category: "Üst Giyim",
    subCategory: "Hoodie",
    fit: "Oversize",
    price: 1450,
    originalPrice: 1800,
    images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&auto=format&fit=crop"],
    description: "Sokağın Ruhu'na yakışan, premium ağır gramaj pamuktan üretilmiş yıkamalı gri hoodie. Drop shoulder kesimiyle ekstra dökümlü durur.",
    details: ["450 GSM Ağır Gramaj", "Boxy & Dropped Shoulder", "Özel Acid-Wash"],
    stock: { S: 5, M: 0, L: 12, XL: 2, XXL: 0 },
    isNew: true
  },
  {
    id: 2,
    name: "Heavyweight Boxy T-Shirt",
    category: "Üst Giyim",
    subCategory: "T-Shirt",
    fit: "Boxy",
    price: 850,
    images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop"],
    description: "Sokak modasının demirbaşı siyah tişört. Ağır gramajı sayesinde yıllarca formunu kaybetmez.",
    details: ["280 GSM Pamuk", "Oversize Kalıp", "Kalın Yaka Lastiği"],
    stock: { S: 10, M: 15, L: 8, XL: 4, XXL: 2 }
  },
  {
    id: 3,
    name: "Graphic Printed Hoodie",
    category: "Üst Giyim",
    subCategory: "Hoodie",
    fit: "Oversize",
    price: 1600,
    images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop"],
    description: "Arkasındaki devasa 'Disturbed' ekran baskısıyla iddialı görünüm.",
    details: ["380 GSM Şardonlu", "Arkada DTG Baskı", "Oversize Kalıp"],
    stock: { S: 1, M: 1, L: 0, XL: 1, XXL: 1 }
  },
  {
    id: 4,
    name: "Vintage College Knitwear",
    category: "Üst Giyim",
    subCategory: "Kazak",
    fit: "Oversize",
    price: 1150,
    images: ["https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop"],
    description: "Kolej kültüründen esinlenilmiş, kalın örgü triko.",
    details: ["Yün karışımı", "Sarkma yapmaz", "Drop Shoulder"],
    stock: { S: 5, M: 0, L: 5, XL: 0, XXL: 5 }
  },
  {
    id: 5,
    name: "Half-Zip Sweatshirt",
    category: "Üst Giyim",
    subCategory: "Sweatshirt",
    fit: "Relaxed",
    price: 1250,
    images: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop"],
    description: "Gündelik kullanıma uygun retro esintili yarım fermuarlı.",
    details: ["320 GSM French Terry", "Metalik YKK Fermuar", "Relaxed Fit"],
    stock: { S: 2, M: 5, L: 5, XL: 2, XXL: 0 },
    isNew: true
  },
  {
    id: 6,
    name: "Oversize Flannel Shirt",
    category: "Üst Giyim",
    subCategory: "Gömlek",
    fit: "Oversize",
    price: 1050,
    images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop"],
    description: "İster tişört üstüne katmanla, ister tek giy. Kalın flanel kumaş.",
    details: ["%100 Pamuk Dokuma", "Kareli Oduncu Deseni", "Geniş Kalıp"],
    stock: { S: 8, M: 10, L: 6, XL: 3, XXL: 1 }
  },
  {
    id: 7,
    name: "Acid Wash Basic T-Shirt",
    category: "Üst Giyim",
    subCategory: "T-Shirt",
    fit: "Relaxed",
    price: 650,
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop"],
    description: "Asit yıkaması sayesinde benzersiz gri tonları yakalayan basic tişört.",
    details: ["Asit Yıkama Efekti", "Pamuklu Esnek Doku", "Minimal Tasarım"],
    stock: { S: 0, M: 0, L: 4, XL: 6, XXL: 2 }
  },

  // --- ALT GİYİM ---
  {
    id: 8,
    name: "Baggy Kargo Pantolon",
    category: "Alt Giyim",
    subCategory: "Kargo Pantolon",
    fit: "Baggy",
    price: 1250,
    images: ["https://images.unsplash.com/photo-1620012253295-c15bc3a6f444?w=800&auto=format&fit=crop"],
    description: "Bolluk ve rahatlık üzerine tasarlandı. Cırt detaylı geniş cepler.",
    details: ["Su itici gabardin", "Geniş paça (Baggy)", "Beli lastikli"],
    stock: { S: 2, M: 5, L: 0, XL: 0, XXL: 1 }
  },
  {
    id: 9,
    name: "Washed Denim Baggy Jeans",
    category: "Alt Giyim",
    subCategory: "Baggy Jean",
    fit: "Baggy",
    price: 1550,
    originalPrice: 1950,
    images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop"],
    description: "Asi ruhun geri dönüşü. Yıllanmış efektli yıkama, dökümlü bol kalıp.",
    details: ["%100 Pamuk Denim", "Eskitme Asit Yıkamalı", "Yüksek Bel"],
    stock: { S: 3, M: 8, L: 5, XL: 0, XXL: 0 }
  },
  {
    id: 10,
    name: "Wide Leg Sweatpants",
    category: "Alt Giyim",
    subCategory: "Eşofman Altı",
    fit: "Relaxed",
    price: 950,
    images: ["https://images.unsplash.com/photo-1610385906377-6bbce31ba95e?w=800&auto=format&fit=crop"],
    description: "Rahatına düşkünler için terletmez kumaştan üretilen geniş boru paça eşofman.",
    details: ["Ağır Gramaj Dalgıç", "Boru Paça Kesim", "Büzgülü Gizli Kordon"],
    stock: { S: 10, M: 14, L: 6, XL: 2, XXL: 0 },
    isNew: true
  },
  {
    id: 11,
    name: "Street Cargo Shorts",
    category: "Alt Giyim",
    subCategory: "Şort",
    fit: "Oversize",
    price: 800,
    images: ["https://images.unsplash.com/photo-1591195853828-11f486b72a6b?w=800&auto=format&fit=crop"],
    description: "Yazın sokak tarzını yakalaman için tasarlandı. Diz altı oversize kargo şort.",
    details: ["Tok Pamuk Kumaş", "Çoklu Kargo Cebi", "Diz Altı Boy"],
    stock: { S: 0, M: 2, L: 2, XL: 10, XXL: 5 }
  },
  {
    id: 12,
    name: "Parachute Tech Pants",
    category: "Alt Giyim",
    subCategory: "Kargo Pantolon",
    fit: "Baggy",
    price: 1350,
    images: ["https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&auto=format&fit=crop"],
    description: "Techwear esintili dev paçalı paraşüt pantolon.",
    details: ["İnce Paraşüt Kumaş", "Stoperli Ayarlanabilir Paça", "Su İtici Doku"],
    stock: { S: 4, M: 6, L: 0, XL: 0, XXL: 2 }
  },

  // --- DIŞ GİYİM ---
  {
    id: 13,
    name: "Parachute Zip-Up Jacket",
    category: "Dış Giyim",
    subCategory: "Rüzgarlık",
    fit: "Relaxed",
    price: 2100,
    originalPrice: 2450,
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop"],
    description: "Rüzgarlık hissini sokaklara taşıyan hafif ceket.",
    details: ["Paraşüt kumaş", "Relaxed rahat kesim", "Metalik fermuar"],
    stock: { S: 0, M: 2, L: 2, XL: 1, XXL: 0 }
  },
  {
    id: 14,
    name: "Oversize Leather Racer",
    category: "Dış Giyim",
    subCategory: "Ceket",
    fit: "Boxy",
    price: 4500,
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop"],
    description: "Hacimli kesimi ve motor yarışlarından ilham alan yapısıyla gerçek derinin asi duruşu.",
    details: ["Premium Vegan Deri", "Kalın Omuz Vatkalı", "Boxy Crop Kesim"],
    stock: { S: 1, M: 0, L: 2, XL: 0, XXL: 0 },
    isNew: true
  },
  {
    id: 15,
    name: "Puffer Vest - Street Edit",
    category: "Dış Giyim",
    subCategory: "Ceket",
    fit: "Relaxed",
    price: 1850,
    images: ["https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop"],
    description: "Kapüşonlu veya tişört üzerinde harika katmanlama sağlayan hacimli şişme yelek.",
    details: ["Yüksek İzolasyon", "Mat Yüzey Kaplama", "Sıcak Tutan Astar"],
    stock: { S: 5, M: 12, L: 8, XL: 2, XXL: 0 }
  },
  
  // --- İKİLİ TAKIM ---
  {
    id: 16,
    name: "Street Tracksuit Biker Set",
    category: "İkili Takım",
    subCategory: "Takım",
    fit: "Relaxed",
    price: 2800,
    originalPrice: 3200,
    images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop"],
    description: "Alt ve üst parçalardan oluşan teknolojik görünüme sahip eşofman kombini.",
    details: ["Dalgıç kumaş", "Reflektörlü şeritler", "Relaxed Boy"],
    stock: { S: 0, M: 0, L: 4, XL: 2, XXL: 0 },
    isNew: true
  },
  {
    id: 17,
    name: "Summer Utility Co-Ord",
    category: "İkili Takım",
    subCategory: "Takım",
    fit: "Oversize",
    price: 2200,
    images: ["https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=800&auto=format&fit=crop"],
    description: "Kısa kollu cepli gömlek ve kargo şort kombinasyonundan oluşan ikili utility set.",
    details: ["Hafif Gabardin Pamuk", "Oversize Gömlek", "Diz Boyu Kargo Şort"],
    stock: { S: 5, M: 6, L: 5, XL: 5, XXL: 4 }
  }
];
