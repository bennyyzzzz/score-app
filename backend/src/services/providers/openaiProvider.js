const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generate = async (prompt) => {
  const response = await client.responses.create({
    model: process.env.AI_MODEL || "gpt-5.5",
    input: prompt,
  });

  return response.output_text;
};