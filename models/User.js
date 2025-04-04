import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String },
  profilepic: { type: String },
});
export default mongoose.models.User || model("User", UserSchema);
