const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        subject: { type: String, required: true, trim: true, index: true },
        fileUrl: { type: String, required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);
