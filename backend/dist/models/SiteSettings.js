import mongoose from "mongoose";
const SiteSettingsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    tagline: { type: String, required: true },
    logo: {
        light: String,
        dark: String,
        favicon: String,
    },
    heroMedia: {
        type: { type: String, enum: ["image", "video"] },
        url: String,
        poster: String,
    },
    colors: {
        primary: String,
        secondary: String,
        accent: String,
        gradient: String,
    },
    contact: {
        email: String,
        phone: String,
        whatsapp: String,
        address: String,
        mapEmbedUrl: String,
    },
    socialLinks: {
        facebook: String,
        instagram: String,
        twitter: String,
        linkedin: String,
        youtube: String,
    },
    paymentGateway: {
        provider: String,
        enabled: Boolean,
        statusMessage: String,
    },
});
export const SiteSettingsModel = mongoose.model("SiteSettings", SiteSettingsSchema);
//# sourceMappingURL=SiteSettings.js.map