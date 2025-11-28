const File = require("../models/File");
const genAI = require("../config/gemini");

exports.getSummary = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) return res.status(404).json({ error: "File not found" });
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Summarize the study material from this file URL: ${file.fileUrl}`;
        const result = await model.generateContent(prompt);
        res.json({ summary: result.response.text() });
    } catch (err) {
        res.status(500).json({ error: "Failed to generate summary" });
    }
};

exports.getQuiz = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) return res.status(404).json({ error: "File not found" });
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Create 5 multiple-choice questions with answers from this file URL: ${file.fileUrl}`;
        const result = await model.generateContent(prompt);
        res.json({ quiz: result.response.text() });
    } catch (err) {
        res.status(500).json({ error: "Failed to generate quiz" });
    }
};
