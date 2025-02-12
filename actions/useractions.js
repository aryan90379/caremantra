"use server";
import { connectToDatabase } from "@/md/mongodb";
import Article from "@/models/Article";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache"; // ✅ Import for cache invalidation
import { redirect } from "next/navigation";
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
//       throw error;
//     }
//   };

export const fetchArticles = async () => {
  await connectToDatabase();
  let articles = await Article.find({});
  return articles.map((article) => JSON.parse(JSON.stringify(article)));
};

// export const updateArticle = async()=>{
//   await
// }

//fetching articles for updating based on ther

//fetch Article byID
export const fetchArticleID = async (id) => {
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
    return JSON.parse(JSON.stringify(article));
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
};

//fetch Article by TITLE
export const fetchArticleTitle = async (title) => {
  try {
    await connectToDatabase();

    // Validate and convert ID to ObjectId

    const article = await Article.findOne({ slug: title });
    if (!article) {
      throw new Error("Article not found");
    }

    // Convert Mongoose document to plain object
    return JSON.parse(JSON.stringify(article));
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

    let ndata = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    ); // Remove undefined values

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

    return true;
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};

export const CreateArticle = async (data = {}) => {
  try {
    await connectToDatabase();

    // Ensure data is an object and filter out undefined values (if any)
    let articleData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    // Create a new article instance with the provided data or defaults
    const newArticle = new Article(articleData);

    // Save the article, allowing Mongoose to apply defaults
    const savedArticle = await newArticle.save();

    // Return the ID of the created article
    // ✅ Revalidate cache for articles list
    revalidatePath("/admin/articles");

    // ✅ Redirect properly using `redirect()`
    redirect(`/admin/articles/${savedArticle._id}`);
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
};

// EDIT COMMENTS

export const updateCommentByTitle = async (title, newCommentData) => {
  try {
    await connectToDatabase();

    const article = await Article.findOne({ slug: title });

    if (!article) {
      throw new Error("Article not found");
    }

    // Ensure comments is an array before pushing
    if (!Array.isArray(article.comments)) {
      article.comments = [];
    }

    // Generate a unique ID for the new comment (if not provided)
    const newComment = {
      
      by_user: newCommentData.by_user, // User's email or username
      onDate: new Date(), // Current date and time
      content: newCommentData.content, // The comment content
      profile: newCommentData.profile || "/default-avatar.png", // User's profile picture or default
      parentId: newCommentData.parentId || null, // Include to_user field (defaults to null if not provided)
      childId: newCommentData.childId|| null, // Include to_user field (defaults to null if not provided)
    };

    // Append the new comment to the article's comments array
    article.comments.push(newComment);
    console.log("Updated comments:", article.comments);

    // Save the changes to the article
    await article.save();

    return true;
  } catch (error) {
    console.error("Error updating comments by title:", error);
    throw error;
  }
};



// DELETE A PARTICULAR COMMENT
export const deleteCommentById = async (title, commentId) => {
  try {
    await connectToDatabase();

    const article = await Article.findOne({ slug: title });

    if (!article) {
      throw new Error("Article not found");
    }

    if (!Array.isArray(article.comments)) {
      article.comments = [];
    }

    const commentIndex = article.comments.findIndex(
      (comment) => comment._id && comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      throw new Error("Comment not found");
    }

    article.comments.splice(commentIndex, 1);
    await article.save();

    console.log("Comment deleted successfully:", commentId);
    return { success: true };  // Return an object with success flag
  } catch (error) {
    console.error("Error deleting comment by ID:", error);
    return { success: false, message: error.message };  // Return failure status and error message
  }
};
