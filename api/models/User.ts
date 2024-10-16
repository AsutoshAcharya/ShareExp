import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
  user_name: { type: String, required: true, unique: true },
  email: { type: String, required: true, select: false, unique: true },
  password: { type: String, required: true, select: false },
  phone: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  year_of_experience: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  company: { type: String },
  skills: { type: [String] },
  profile_picture: { type: String },
  about: { type: String },
  socials: { type: [String] },
});

export type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
