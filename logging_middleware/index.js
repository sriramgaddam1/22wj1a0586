// backend/server.js
const express = require("express");
const cors = require("cors");
const { nanoid } = require("nanoid");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const urlDatabase = {}; // In-memory URL map

app.post("/api/shorten", (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl) {
    return res.status(400).json({ error: "URL is required" });
  }

  const id = nanoid(6);
  const shortUrl = `http://localhost:${PORT}/${id}`;
  urlDatabase[id] = longUrl;

  res.json({ shortUrl });
});

app.get("/:id", (req, res) => {
  const longUrl = urlDatabase[req.params.id];
  if (longUrl) {
    return res.redirect(longUrl);
  }
  res.status(404).send("URL not found");
});
const fetch = require("node-fetch");


app.post("/log", async (req, res) => {
  try {
    console.log("📦 Incoming log body:", req.body);

    const response = await fetch("http://20.244.56.144/evaluation-service/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": ACCESS_TOKEN,
      },
      body: JSON.stringify(req.body),
    });

    const result = await response.text(); // read full response (even if error)
    console.log("✅ Log API response:", result);

    res.status(response.status).json({ result });
  } catch (error) {
    console.error("❌ Log forwarding failed:", error.message);
    res.status(500).json({ error: "Logging failed" });
  }
});



app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
