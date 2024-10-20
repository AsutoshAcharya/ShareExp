import { Schema, InferSchemaType, model } from "mongoose";

const RatingSchema = new Schema(
  {
    rated_user_id: { type: Schema.ObjectId, required: true },
    giver_user_id: { type: Schema.ObjectId, required: true },
    rating: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
  },
  { timestamps: true }
);

export type Rating = InferSchemaType<typeof RatingSchema>;

export default model<Rating>("Rating", RatingSchema);
