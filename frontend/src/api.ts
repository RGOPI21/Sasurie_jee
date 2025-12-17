// Dynamic API URL - works in both development and production
// In production (Netlify), API calls go to /api/* which redirects to Netlify Functions
// In development, API calls go to localhost:5001
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === 'production' ? '/api' : 'http://localhost:5001/api');

export interface SiteSettings {
  name: string;
  shortName: string;
  tagline: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
  };
}

export interface StatMetric {
  _id: string;
  label: string;
  value: number;
  suffix?: string;
  highlight?: boolean;
}

export interface Program {
  _id: string;
  title: string;
  degree: string;
  duration: string;
  category: string;
  description: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  quote: string;
}

export interface LeadPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message?: string;
  interestAreas?: string[];
  source?: string;
}

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

export function getSiteSettings() {
  return fetchJson<SiteSettings>("/site-settings");
}

export function getStats() {
  return fetchJson<StatMetric[]>("/stats");
}

export function getPrograms() {
  return fetchJson<Program[]>("/programs");
}

export function getTestimonials() {
  return fetchJson<Testimonial[]>("/testimonials");
}

export async function submitLead(payload: LeadPayload) {
  const res = await fetch(`${API_BASE_URL}/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Lead submit failed: ${res.status}`);
  }

  return res.json();
}

export async function register(payload: any) {
  const res = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Registration failed");
  }
  return res.json();
}

export async function login(payload: any) {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Login failed");
  }
  return res.json();
}


