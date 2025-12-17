import mongoose from "mongoose";
const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    excerpt: { type: String, required: true },
    ctaLabel: String,
    ctaUrl: String,
});
export const EventModel = mongoose.model("Event", EventSchema);
//# sourceMappingURL=Event.js.map