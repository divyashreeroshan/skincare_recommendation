const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/recommend", async (req, res) => {
  const { userInput } = req.body;

  try {
    const prompt = `A user describes their skin condition as: "${userInput}". Based on this, provide a detailed skincare routine including cleanser, toner, serum, moisturizer, and SPF.`;

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a professional dermatologist assistant." },
        { role: "user", content: prompt },
      ],
    });

    const skincareRoutine = response.data.choices[0].message.content;
    res.json({ skincareRoutine });
  } catch (error) {
    console.error("Error from OpenAI:", error.message);
    res.status(500).json({ error: "Failed to get recommendation from AI" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
