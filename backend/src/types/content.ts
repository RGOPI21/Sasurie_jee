export type CategoryType =
  | "undergraduate"
  | "postgraduate"
  | "research"
  | "diploma"
  | "event"
  | "news"
  | "announcement"
  | "placement"
  | "testimonial";

export interface SiteSettings {
  name: string;
  shortName: string;
  tagline: string;
  logo: {
    light: string;
    dark: string;
    favicon: string;
  };
  heroMedia: {
    type: "image" | "video";
    url: string;
    poster?: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    mapEmbedUrl: string;
  };
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
  paymentGateway: {
    provider: string;
    enabled: boolean;
    statusMessage?: string;
  };
}

export interface Program {
  title: string;
  code: string;
  degree: string;
  duration: string;
  category: CategoryType;
  description: string;
  highlights: string[];
  intake: number;
  brochureUrl?: string;
  accreditation: string[];
  heroImage: string;
}

export interface StatMetric {
  label: string;
  value: number;
  suffix?: string;
  highlight?: boolean;
}

export interface EventItem {
  title: string;
  category: CategoryType;
  date: string;
  location: string;
  excerpt: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export interface PlacementHighlight {
  highestCtc: number;
  averageCtc: number;
  recruiters: string[];
  completionRate: number;
  topRoles: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  category: CategoryType;
}

export interface Lead {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  interestAreas: string[];
  message?: string;
  source: string;
}

