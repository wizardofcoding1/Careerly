const express = require("express");
const { GoogleGenAI } = require("@google/genai"); // Gemini SDK
const router = express.Router();

// Initialize Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, // make sure .env has GEMINI_API_KEY
});

// POST /api/generate-quiz
router.post("/generate-quiz", async (req, res) => {
  const { level, topic, numQuestions = 10, description } = req.body;

  if (!topic || !level) {
    return res.status(400).json({ error: "Level and topic are required." });
  }

  try {
    // Strict prompt requesting JSON only
    const prompt = `
Generate ${numQuestions} quiz questions on the topic "${topic}" for level "${level}".
Include description: "${description || "N/A"}"
Output ONLY a JSON array with this format:
[
  { "id": 1, "question": "Question text", "options": ["option1","option2","option3","option4"], "answer": "correct option" },
  ...
]
Do NOT include any extra text, explanations, or comments.
`;

    // Call Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    console.log("Gemini raw output:", response.text); // log raw output for debugging

    // Extract JSON array from the text using regex
    const match = response.text.match(/\[.*\]/s); // 's' allows newlines
    if (!match) {
      console.error("No JSON array found in Gemini output:", response.text);
      return res
        .status(500)
        .json({ error: "Failed to parse generated questions." });
    }

    let quizQuestions;
    try {
      quizQuestions = JSON.parse(match[0]);
    } catch (err) {
      console.error("Failed to parse extracted JSON:", match[0]);
      return res
        .status(500)
        .json({ error: "Failed to parse generated questions." });
    }

    // Return the quiz questions
    return res.json({ quiz: quizQuestions });
  } catch (err) {
    console.error("Gemini API error:", err);
    return res
      .status(500)
      .json({ error: "Questions could not be generated. See server logs." });
  }
});

module.exports = router;
