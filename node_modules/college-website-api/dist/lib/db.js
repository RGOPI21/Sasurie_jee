import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
// Get directory safely
function getSafeDataPaths() {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        // Store db.json in backend/data (one level up from src/lib, so ../../data)
        const DATA_DIR = path.resolve(__dirname, "../../data");
        const DB_FILE = path.join(DATA_DIR, "db.json");
        return { DATA_DIR, DB_FILE };
    }
    catch (e) {
        console.warn("[db] Failed to resolve paths:", e);
        return { DATA_DIR: "/tmp", DB_FILE: "/tmp/db.json" };
    }
}
const DEFAULT_DB = {
    leads: [],
    users: [],
    applications: [],
    programs: [
        {
            _id: "1",
            title: "Computer Science Engineering",
            degree: "B.E.",
            duration: "4 Years",
            category: "Engineering",
            description: "Learn to build modern software systems.",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
        },
        {
            _id: "2",
            title: "Mechanical Engineering",
            degree: "B.E.",
            duration: "4 Years",
            category: "Engineering",
            description: "Design and manufacture mechanical systems.",
            image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad",
        },
        {
            _id: "3",
            title: "Artificial Intelligence & Data Science",
            degree: "B.Tech",
            duration: "4 Years",
            category: "Technology",
            description: "Master the future of AI and Big Data.",
            image: "https://images.unsplash.com/photo-1555255707-c07966088b7b",
        }
    ],
    events: [
        {
            _id: "1",
            title: "Annual Tech Symposium",
            date: new Date().toISOString(),
            description: "Showcasing student projects and innovations.",
        },
    ],
    stats: [
        { _id: "1", label: "Students", value: 2500, suffix: "+" },
        { _id: "2", label: "Faculty", value: 150, suffix: "+" },
        { _id: "3", label: "Placements", value: 95, suffix: "%" },
        { _id: "4", label: "Years of Excellence", value: 25, suffix: "+" }
    ],
    testimonials: [
        {
            _id: "1",
            name: "Sarah J.",
            role: "Alumni, Batch 2020",
            quote: "The best 4 years of my life! Great faculty and campus.",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
            _id: "2",
            name: "Karthik R.",
            role: "Student, CSE",
            quote: "Sasurie gave me the platform to launch my startup.",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
        }
    ],
    siteSettings: {
        name: "Sasurie College of Engineering",
        shortName: "Sasurie",
        tagline: "Empowering the next generation of engineers.",
        contactEmail: "admissions@sasurie.edu",
        contactPhone: "+91 98765 43210",
        colors: {
            primary: "#8B0000",
            secondary: "#FFD700",
            accent: "#1A1A1A",
            gradient: "linear-gradient(135deg, #8B0000 0%, #000000 100%)"
        }
    },
};
// Ensure data directory exists
async function ensureDb() {
    // Skip if in serverless/production environment where writes might be restricted
    if (process.env.NODE_ENV === 'production' || process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME) {
        return;
    }
    const { DATA_DIR, DB_FILE } = getSafeDataPaths();
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        try {
            await fs.access(DB_FILE);
        }
        catch {
            // File doesn't exist, write default
            await fs.writeFile(DB_FILE, JSON.stringify(DEFAULT_DB, null, 2));
        }
    }
    catch (error) {
        // Silent fail in environments where we can't write
        // console.warn("[db] Failed to initialize DB (expected in read-only envs)");
    }
}
export async function readDb() {
    const { DB_FILE } = getSafeDataPaths();
    // In production/serverless, just return defaults to be safe and fast
    // Unless we really want to read a file that was bundled?
    // But dynamic writes won't work anyway, so static defaults are safer.
    if (process.env.NODE_ENV === 'production') {
        return DEFAULT_DB;
    }
    await ensureDb();
    try {
        const dataContent = await fs.readFile(DB_FILE, "utf-8");
        const data = JSON.parse(dataContent);
        // Merge with default to ensure all keys exist
        return { ...DEFAULT_DB, ...data };
    }
    catch (error) {
        console.warn("[db] Error reading DB, returning default");
        return DEFAULT_DB;
    }
}
export async function writeDb(data) {
    if (process.env.NODE_ENV === 'production') {
        // Cannot write in production
        return;
    }
    const { DATA_DIR, DB_FILE } = getSafeDataPaths();
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
    }
    catch (error) {
        console.error("[db] Failed to write DB:", error);
    }
}
//# sourceMappingURL=db.js.map