import mongoose from "mongoose";

const ProgramSchema = new mongoose.Schema({
    title: { type: String, required: true },
    code: { type: String, required: true },
    degree: { type: String, required: true },
    duration: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    highlights: [String],
    intake: { type: Number, required: true },
    brochureUrl: String,
    accreditation: [String],
    heroImage: String,
});

export const ProgramModel = mongoose.model("Program", ProgramSchema);
