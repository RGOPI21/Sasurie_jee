import mongoose from "mongoose";

const StatMetricSchema = new mongoose.Schema({
    label: { type: String, required: true },
    value: { type: Number, required: true },
    suffix: String,
    highlight: Boolean,
});

export const StatMetricModel = mongoose.model("StatMetric", StatMetricSchema);
