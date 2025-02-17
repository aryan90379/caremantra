import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: function () {
        const formattedDate = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit", // Include seconds for additional granularity
        }).format(new Date());
        const randomString = Math.random().toString(36).substring(2, 8); // Generates a short random string
        return `Your amazing article starts here - ${formattedDate} - ${randomString}`;
      },
    },
    
    
    slug: {
      type: String,
      required: true,
      unique: true,
      default: () => {
        const formattedDate = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit", // Include seconds
        })
          .format(new Date())
          .replace(/ /g, "-");
        const randomString = Math.random().toString(36).substring(2, 8); // Generates a short random string
        return `awesome-slug-${formattedDate}-${randomString}`;
      },
    },
    
    
    
    metaTitle: {
      type: String,
      required: true,
      trim: true,
      default: "Default Meta Title",
    },
    metaDescription: {
      type: String,
      required: true,
      maxlength: 160,
      default: "Default Meta Description",
    },
    keywords: { type: [String], index: true, default: ["default", "keywords"] },
    content: {
      type: String,
      required: true,
      default: "This is the default content for the article.",
    },
    author: { type: String, required: true, default: "Anonymous" },
    category: {
      type: String,
      required: true,
      index: true,
      enum: [
        "Cardiology",
        "Orthopedics",
        "Gastroenterology",
        "Pediatrics",
        "Gynecology",
        "Urology",
        "Pulmonology",
        "Ophthalmology",
        "ENT",
        "Nephrology",
        "Endocrinology",
        "Rheumatology",
        "Nutrition & Diet",
        "Mental Health",
        "New Mom Tips",
        "Lifestyle",
        "Dermatology",
        "Oncology",
        "Fertility Health"
      ],
      default: "Uncategorized",
    },
    
    
    
    tags: { type: [String], index: true, default: ["default", "tags"] },
    featuredImage: {
      type: String,
      required: true,
      default: "/placeholder.jpg",
    },
    thumbnail: {
      type: String,
      default: "/placeholder.jpg",
    },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: {
      type: [
        {
          by_user: { type: String, required: true },
          parentId: { type: String, default: null }, // Remove `required: true`
          childId: { type: String, default: null }, // Remove `required: true`
          onDate: { type: Date, required: true },
          content: { type: String, required: true },
          profile: { type: String, required: true }, // User profile image URL
          // Unique identifier for each comment
        },
      ],
      default: [],
    },

    readingTime: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    publishedAt: { type: Date, default: null },
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
