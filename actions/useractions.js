"use server";
import { connectToDatabase } from "@/md/mongodb";
import Article from "@/models/Article";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types; // Access ObjectId from Mongoose

// export const fetchArticle = async (title) => {
//     try {
//       await connectToDatabase();

//       // Case-insensitive search
//       let u = await Article.findOne({ title: new RegExp(`^${title}$`, 'i') });

//       if (!u) {
//         throw new Error("Article not found");
//       }

//       // Convert Mongoose document to plain object
//       let article = u.toObject();

//       return article;
//     } catch (error) {
//       console.error("Error fetching article:", error);
//       throw error;
//     }
//   };

export const fetchArticles = async () => {
  await connectToDatabase();
  let articles = await Article.find({});
  // console.log(articles)
  return articles.map((article) =>
    article.toObject({ flattenObjectIds: true })
  );
};

// export const updateArticle = async()=>{
//   await
// }

//fetching articles for updating based on ther

export const fetchArticle = async (id) => {
  try {
    await connectToDatabase();

    // Validate and convert ID to ObjectId
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid article ID");
    }

    const article = await Article.findOne({ _id: new ObjectId(id) });

    if (!article) {
      throw new Error("Article not found");
    }

    // Convert Mongoose document to plain object
    return article.toObject();
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
};

export const updateArticle = async (data, id) => {
  try {
    await connectToDatabase();

    if (!ObjectId.isValid(id)) {
      console.error("Invalid ID:", id);
      throw new Error("Invalid article ID");
    }

    let ndata = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined)); // Remove undefined values

    console.log("Updating article with ID:", id);
    console.log("Update data:", ndata);

    const article = await Article.findById(id); // Fetch the article by its ID

    if (!article) {
      throw new Error("No matching article found");
    }

    // Update the article with new data
    Object.assign(article, ndata);

    // If the title was updated, auto-generate the slug
    if (article.isModified("title")) {
      article.slug = article.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }

    // Save the updated article, triggering the pre-save middleware
    const result = await article.save(); // This will trigger the save hook

    console.log("Updated article:", result);

    return true;
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};



