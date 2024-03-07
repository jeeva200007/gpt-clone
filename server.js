const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;

const API_KEY = "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";

app.use(express.json());
app.use(cors());

app.post("/completions", async (req, res) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: req.body.message }],
        max_tokens: 100,
      }),
    };
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    res.send(data);
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
