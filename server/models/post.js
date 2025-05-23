const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const postSchema = new mongoose.Schema(
    {
        body: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            required: true
        },
        likes: [
            {
                type: ObjectId,
                ref: "USER"
            }
        ],
        comments: [
            {
                comment: { type: String },
                postedBy: { type: ObjectId, ref: "USER" }
            }
        ],
        postedBy: {
            type: ObjectId,
            ref: "USER"
        },
        followers: [{ type: ObjectId, ref: "USER" }] // 🔹 NEW: Followers of post author
    },
    { timestamps: true }
);

mongoose.model("POST", postSchema);
