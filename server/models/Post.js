import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
    {
        username: { type: String },
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        imageUrl: { type: String, default: "" },
        views: { type: Number, default: 0 },
        author: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
        comments: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Comment" }],
    },
    { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
