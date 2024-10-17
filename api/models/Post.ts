import { InferSchemaType, model, Schema } from "mongoose";

const postSchema = new Schema(
  {
    posted_by: { type: String, required: true }, //user_id
    title: { type: String, required: true },
    body: { type: String, required: true },
    image: { type: String },
    total_likes: { type: Number },
    total_comments: { type: Number },
  },
  { timestamps: true }
);

export type Post = InferSchemaType<typeof postSchema>;

export default model<Post>("Post", postSchema);
