import mongoose, { InferSchemaType, model, Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    post_id: mongoose.Schema.ObjectId,
    user_id: mongoose.Schema.ObjectId,
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

export type Comment = InferSchemaType<typeof CommentSchema>;
export default model<Comment>("Comment", CommentSchema);
