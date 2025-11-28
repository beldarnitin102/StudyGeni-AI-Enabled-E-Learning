const File = require("../models/File");
const cloudinary = require("../config/cloudinary");

exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });
        const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto" });
        const file = await File.create({
            title: req.body.title,
            description: req.body.description,
            subject: req.body.subject,
            fileUrl: result.secure_url,
            createdBy: req.user.id
        });
        res.status(201).json({ message: "File uploaded successfully", file });
    } catch (error) {
        res.status(500).json({ message: "Upload failed", error: error.message });
    }
};

exports.getAllFiles = async (req, res) => {
    try {
        const files = await File.find().sort({ createdAt: -1 });
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ message: "Could not fetch files", error: error.message });
    }
};

exports.getSingleFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.fileId);
        if (!file) return res.status(404).json({ message: "File not found" });
        res.status(200).json({ message: "File fetched successfully", file });
    } catch (error) {
        res.status(500).json({ message: "Could not fetch file", error: error.message });
    }
};

exports.getFileSummary = async (req, res) => {
    try {
        const file = await File.findById(req.params.fileId);
        if (!file) return res.status(404).json({ message: "File not found" });
        const summary = file.description ? file.description.substring(0, 100) : "No description available";
        res.status(200).json({ message: "Summary generated successfully", summary });
    } catch (error) {
        res.status(500).json({ message: "Could not generate summary", error: error.message });
    }
};

exports.generateQuiz = async (req, res) => {
    try {
        const file = await File.findById(req.params.fileId);
        if (!file) return res.status(404).json({ message: "File not found" });
        const quiz = [{ question: `What is the main topic of the file titled "${file.title}"?`, options: ["Option A", "Option B", "Option C", "Option D"], answer: file.subject || "Unknown" }];
        res.status(200).json({ message: "Quiz generated successfully", quiz });
    } catch (error) {
        res.status(500).json({ message: "Could not generate quiz", error: error.message });
    }
};
