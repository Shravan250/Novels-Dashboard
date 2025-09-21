import mongoose from "mongoose";

const novelSchema = new mongoose.Schema(
  {
    section: { type: String, required: true },
    title: { type: String, required: true },
    link: { type: String, required: true },
    status: {
      type: String,
      enum: ["Ongoing", "Completed", "Hiatus"],
      default: "Ongoing",
    },
    tags: [{ type: String }],
    remarks: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Novel", novelSchema);
