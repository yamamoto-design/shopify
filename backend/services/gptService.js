const { OpenAI } = require("openai");

require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateResponse = async (sentiment) => {
  try {
    console.log("apikey:", process.env.OPENAI_API_KEY);
    let returnCompletion = [];
    let emotionArr = ["Friendly", "Empathetic", "Bold"];
    if (typeof sentiment !== "string" || !sentiment.trim()) {
      throw new Error("Invalid sentiment value provided.");
    }

    for (let index = 0; index < emotionArr.length; index++) {
      const element = emotionArr[index];
      const prompt = `Generate a ${sentiment.toLowerCase()} response with good appear to a product review with ${element} tone.
      Write a professional message in response to a client inquiry. Do not include any names, job titles, or contact information unless they are explicitly provided. Use a neutral greeting and closing such as “Hello” and “Best regards.” Keep the entire message under 500 characters.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      });
      returnCompletion.push(completion.choices[0].message.content);
    }

    // Return the generated response
    return returnCompletion;
  } catch (error) {
    console.error("Error generating GPT response:", error);
    throw new Error("GPT response generation failed: " + error.message);
  }
};

module.exports = { generateResponse };
