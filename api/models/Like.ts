import mongoose, { InferSchemaType, model, Schema } from "mongoose";

const LikeSchema = new Schema(
  {
    post_id: mongoose.Schema.ObjectId,
    user_id: mongoose.Schema.ObjectId,
  },
  { timestamps: true }
);
export type Like = InferSchemaType<typeof LikeSchema>;
export default model<Like>("Like", LikeSchema);
