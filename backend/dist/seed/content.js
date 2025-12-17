export const siteSettingsSeed = {
    name: "Sasurie Institute of Technology",
    shortName: "SIT",
    tagline: "Innovate. Inspire. Impact.",
    logo: {
        light: "/assets/logos/sit-light.svg",
        dark: "/assets/logos/sit-dark.svg",
        favicon: "/assets/logos/favicon.png",
    },
    heroMedia: {
        type: "video",
        url: "https://cdn.example.com/media/campus-tour.mp4",
        poster: "https://cdn.example.com/media/campus-tour-poster.jpg",
    },
    colors: {
        primary: "#6428C7",
        secondary: "#FFB703",
        accent: "#19B8A2",
        gradient: "linear-gradient(135deg, #6428C7 0%, #19B8A2 100%)",
    },
    contact: {
        email: "admissions@sasurie.edu",
        phone: "+91 98765 43210",
        whatsapp: "+91 98765 41230",
        address: "Vijayamangalam, Tiruppur - 638056, Tamil Nadu, India",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912...",
    },
    socialLinks: {
        facebook: "https://facebook.com/sasurieengineering",
        instagram: "https://instagram.com/sasurieengineering",
        linkedin: "https://linkedin.com/school/sasurie",
        youtube: "https://youtube.com/@sasurieengineering",
    },
    paymentGateway: {
        provider: "pending",
        enabled: false,
        statusMessage: "Payment gateway integration will be available soon.",
    },
};
export const programSeed = [
    {
        title: "Computer Science and Engineering",
        code: "CSE",
        degree: "B.E.",
        duration: "4 Years",
        category: "undergraduate",
        description: "AI-driven curriculum with research labs, hackathons, and product incubation support.",
        highlights: [
            "AI + ML specialization tracks",
            "IBM & AWS Center of Excellence",
            "100% internship guarantee",
        ],
        intake: 180,
        brochureUrl: "https://cdn.example.com/brochures/cse.pdf",
        accreditation: ["AICTE", "NAAC A+"],
        heroImage: "https://cdn.example.com/images/programs/cse.jpg",
    },
    {
        title: "Master of Business Administration",
        code: "MBA",
        degree: "MBA",
        duration: "2 Years",
        category: "postgraduate",
        description: "Industry-focused MBA with dual specialization and global immersion program.",
        highlights: [
            "Harvard Business Publishing curriculum partner",
            "FinTech & Analytics lab",
            "Career mentorship by CXOs",
        ],
        intake: 120,
        brochureUrl: "https://cdn.example.com/brochures/mba.pdf",
        accreditation: ["AICTE"],
        heroImage: "https://cdn.example.com/images/programs/mba.jpg",
    },
];
export const statsSeed = [
    { label: "Years of Excellence", value: 24 },
    { label: "Recruiters", value: 350, suffix: "+", highlight: true },
    { label: "Acre Campus", value: 45 },
    { label: "Students Placed", value: 8500, suffix: "+" },
];
export const eventsSeed = [
    {
        title: "YUVA 2K25 Innovation Summit",
        category: "event",
        date: new Date().toISOString(),
        location: "Main Auditorium",
        excerpt: "48-hour prototype challenge with industry mentors across AI, EV, and MedTech tracks.",
        ctaLabel: "Register",
        ctaUrl: "https://sasurie.edu/events/yuva",
    },
    {
        title: "Admissions 2025 Orientation Webinar",
        category: "announcement",
        date: new Date().toISOString(),
        location: "Virtual",
        excerpt: "Get clarity on eligibility, scholarships, and hostel facilities with the admissions team.",
        ctaLabel: "Join Webinar",
        ctaUrl: "https://sasurie.edu/webinar/admissions",
    },
];
export const testimonialsSeed = [
    {
        name: "Dhanya Krishnan",
        role: "Software Engineer, Zoho",
        avatar: "https://cdn.example.com/avatars/dhanya.png",
        quote: "The mentorship and research exposure I received at Sasurie helped me ace product interviews with confidence.",
        category: "placement",
    },
    {
        name: "Arjun Balaji",
        role: "Parent of ECE 2023",
        avatar: "https://cdn.example.com/avatars/arjun.png",
        quote: "Transparent communication and personalised academic support made my son's journey stress-free.",
        category: "testimonial",
    },
];
//# sourceMappingURL=content.js.map