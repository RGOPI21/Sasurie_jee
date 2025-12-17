import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    avatar: { type: String, required: true },
    quote: { type: String, required: true },
    category: { type: String, required: true },
});

export const TestimonialModel = mongoose.model("Testimonial", TestimonialSchema);
