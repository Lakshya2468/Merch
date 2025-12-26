// Designer profiles and portfolio data
export interface Designer {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  specialty: string[];
  location: string;
  joinedDate: string;
  socialLinks: {
    instagram?: string;
    twitter?: string;
    behance?: string;
    dribbble?: string;
    website?: string;
  };
  stats: {
    totalDesigns: number;
    totalDownloads: number;
    rating: number;
    followers: number;
  };
  featured: boolean;
  verified: boolean;
}

export const designersData: Designer[] = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    avatar: "https://i.pravatar.cc/150?img=1",
    bio: "Digital artist specializing in abstract and geometric designs. I love creating vibrant, modern patterns that bring joy and energy to everyday items. My work is inspired by urban architecture and natural forms.",
    specialty: ["Abstract", "Geometric", "Modern"],
    location: "San Francisco, CA",
    joinedDate: "2022-03-15",
    socialLinks: {
      instagram: "https://instagram.com/sarahchen",
      behance: "https://behance.net/sarahchen",
      website: "https://sarahchen.design",
    },
    stats: {
      totalDesigns: 24,
      totalDownloads: 2840,
      rating: 4.9,
      followers: 1250,
    },
    featured: true,
    verified: true,
  },
  {
    id: "mike-rodriguez",
    name: "Mike Rodriguez",
    avatar: "https://i.pravatar.cc/150?img=12",
    bio: "Retro design enthusiast with 10+ years of experience in vintage aesthetics. I bring the golden age of advertising into the modern era with authentic vintage vibes and classic typography.",
    specialty: ["Retro", "Vintage", "Typography"],
    location: "Austin, TX",
    joinedDate: "2021-08-20",
    socialLinks: {
      instagram: "https://instagram.com/mikerodriguez",
      dribbble: "https://dribbble.com/mikerodriguez",
      twitter: "https://twitter.com/mikerodriguez",
    },
    stats: {
      totalDesigns: 32,
      totalDownloads: 3210,
      rating: 4.8,
      followers: 1890,
    },
    featured: true,
    verified: true,
  },
  {
    id: "emma-wilson",
    name: "Emma Wilson",
    avatar: "https://i.pravatar.cc/150?img=5",
    bio: "Nature photographer and botanical illustrator. My designs celebrate the beauty of the natural world through detailed illustrations and organic patterns. Passionate about sustainability and eco-friendly design.",
    specialty: ["Nature", "Botanical", "Organic"],
    location: "Portland, OR",
    joinedDate: "2022-01-10",
    socialLinks: {
      instagram: "https://instagram.com/emmawilson",
      behance: "https://behance.net/emmawilson",
      website: "https://emmawilson.art",
    },
    stats: {
      totalDesigns: 18,
      totalDownloads: 1890,
      rating: 5.0,
      followers: 980,
    },
    featured: true,
    verified: true,
  },
  {
    id: "alex-turner",
    name: "Alex Turner",
    avatar: "https://i.pravatar.cc/150?img=8",
    bio: "Street artist and graffiti designer from NYC. I bring the raw energy of urban culture to wearable art. My designs are bold, unapologetic, and inspired by the streets that raised me.",
    specialty: ["Street Art", "Urban", "Graffiti"],
    location: "New York, NY",
    joinedDate: "2021-11-05",
    socialLinks: {
      instagram: "https://instagram.com/alexturner",
      twitter: "https://twitter.com/alexturner",
    },
    stats: {
      totalDesigns: 28,
      totalDownloads: 2650,
      rating: 4.7,
      followers: 1560,
    },
    featured: true,
    verified: true,
  },
  {
    id: "luna-park",
    name: "Luna Park",
    avatar: "https://i.pravatar.cc/150?img=9",
    bio: "Space enthusiast and digital artist exploring the cosmos through design. I create otherworldly patterns inspired by galaxies, nebulas, and the infinite beauty of the universe.",
    specialty: ["Space", "Cosmic", "Sci-Fi"],
    location: "Seattle, WA",
    joinedDate: "2022-05-22",
    socialLinks: {
      instagram: "https://instagram.com/lunapark",
      behance: "https://behance.net/lunapark",
      dribbble: "https://dribbble.com/lunapark",
    },
    stats: {
      totalDesigns: 21,
      totalDownloads: 3450,
      rating: 4.9,
      followers: 2100,
    },
    featured: true,
    verified: true,
  },
  {
    id: "john-davis",
    name: "John Davis",
    avatar: "https://i.pravatar.cc/150?img=13",
    bio: "Minimalist designer focused on clean aesthetics and timeless simplicity. Less is more in my world. I create designs that speak volumes through subtle elegance and refined simplicity.",
    specialty: ["Minimal", "Clean", "Modern"],
    location: "Los Angeles, CA",
    joinedDate: "2021-09-18",
    socialLinks: {
      behance: "https://behance.net/johndavis",
      website: "https://johndavis.minimal",
    },
    stats: {
      totalDesigns: 15,
      totalDownloads: 1720,
      rating: 4.6,
      followers: 720,
    },
    featured: false,
    verified: true,
  },
];

// Helper functions
export function getAllDesigners(): Designer[] {
  return designersData;
}

export function getDesignerById(id: string): Designer | undefined {
  return designersData.find((designer) => designer.id === id);
}

export function getFeaturedDesigners(): Designer[] {
  return designersData.filter((designer) => designer.featured);
}

export function getDesignersBySpecialty(specialty: string): Designer[] {
  return designersData.filter((designer) =>
    designer.specialty.some((s) => s.toLowerCase() === specialty.toLowerCase())
  );
}

export function searchDesigners(query: string): Designer[] {
  const lowerQuery = query.toLowerCase();
  return designersData.filter(
    (designer) =>
      designer.name.toLowerCase().includes(lowerQuery) ||
      designer.bio.toLowerCase().includes(lowerQuery) ||
      designer.specialty.some((s) => s.toLowerCase().includes(lowerQuery))
  );
}
