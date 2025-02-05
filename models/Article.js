import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ArticleSchema = new Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true }, // SEO-friendly URL
    metaTitle: { type: String, required: true, trim: true }, // SEO Title (shorter than title)
    metaDescription: { type: String, required: true, maxlength: 160 }, // SEO description
    keywords: { type: [String], index: true }, // SEO keywords
    content: { type: String, required: true }, // Main article content
    author: { type: String, required: true }, // Author name
    category: { type: String, required: true, index: true }, // Article category
    tags: { type: [String], index: true }, // Tags for filtering and SEO
    featuredImage: { type: String, required: true }, // Main image URL for social sharing
    thumbnail: { type: String }, // Optional thumbnail image
    status: { type: String, enum: ["draft", "published"], default: "draft" }, // Article status
    views: { type: Number, default: 0 }, // View count for analytics
    likes: { type: Number, default: 0 }, // Like count for engagement
    comments: { type: Number, default: 0 }, // Comment count
    readingTime: { type: Number, default: 0 }, // Estimated reading time in minutes
    isFeatured: { type: Boolean, default: false }, // Highlighted article
    publishedAt: { type: Date }, // Date of publication
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Auto-generate slug from title before saving
ArticleSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }
  next();
});

export default mongoose.models.Article || model("Article", ArticleSchema);
