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

const ACCESS_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzcmlyYW1nYWRkYW04MDFAZ21haWwuY29tIiwiZXhwIjoxNzUxNTI5MTAzLCJpYXQiOjE3NTE1MjgyMDMsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIyMzk2M2U4Yi1hNDczLTRlMTEtYTczOC0wZTZiZGM5N2YwMDIiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJnYWRkYW0gc3JpcmFtIiwic3ViIjoiZmNjNjdlYzMtOTJiNi00MmMyLThiYjctNGY1ZGU1M2Y2NGIyIn0sImVtYWlsIjoic3JpcmFtZ2FkZGFtODAxQGdtYWlsLmNvbSIsIm5hbWUiOiJnYWRkYW0gc3JpcmFtIiwicm9sbE5vIjoiMjJ3ajFhMDU4NiIsImFjY2Vzc0NvZGUiOiJQYm1WQVQiLCJjbGllbnRJRCI6ImZjYzY3ZWMzLTkyYjYtNDJjMi04YmI3LTRmNWRlNTNmNjRiMiIsImNsaWVudFNlY3JldCI6IlNtd2NZYVlVUHNySEF5WVcifQ.aa-xZoFYW4T77YgFMTiwsoYbIHiqMe65R9qwfescUt4";

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
