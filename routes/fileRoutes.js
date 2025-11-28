const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { uploadFile, getAllFiles, getSingleFile, getFileSummary, generateQuiz } = require("../controllers/fileController");
const User = require("../models/User");

router.get("/", getAllFiles);
router.get("/:fileId", getSingleFile);
router.get("/:fileId/summary", getFileSummary);
router.get("/:fileId/quiz", generateQuiz);

router.get("/test-login/:email/:password", async (req, res) => {
    const { email, password } = req.params;
    const user = await User.findOne({ email });
    if (!user) return res.send("User not found");
    if (user.password !== password) return res.send("Wrong password");
    res.send(`Login success: ${user.email}`);
});

router.post("/", auth, role("teacher"), upload.single("file"), uploadFile);

module.exports = router;
