const router = require("express").Router();
const { getSummary, getQuiz } = require("../controllers/aiController");

router.get("/:id/summary", getSummary);
router.get("/:id/quiz", getQuiz);

module.exports = router;
