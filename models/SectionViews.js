import mongoose from "mongoose";
const { Schema, model } = mongoose;

const SectionViewsSchema = new Schema({
  section: { type: String, required: true, unique: true, index: true },
  views: { type: Number, default: 0 },
});

export default mongoose.models.SectionViews || model("SectionViews", SectionViewsSchema);
