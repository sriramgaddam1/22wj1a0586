import React, { useState } from "react";
import { logToServer } from "../utils/logger";

function URLShortener() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!longUrl) return;

    try {
      const res = await fetch("http://localhost:5000/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl }),
      });

      const data = await res.json();
      setShortUrl(data.shortUrl);

      await logToServer({
        stack: "frontend",
        level: "info",
        pkg: "urlShortener",
        message: `Shortened URL: ${data.shortUrl}`,
      });
    } catch (error) {
      await logToServer({
        stack: "frontend",
        level: "error",
        pkg: "urlShortener",
        message: `Failed to shorten URL: ${error.message}`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Enter long URL"
        className="w-full p-2 border border-gray-300 rounded"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Shorten
      </button>
      {shortUrl && (
        <p>
          Short URL: <a href={shortUrl} className="text-blue-600">{shortUrl}</a>
        </p>
      )}
    </form>
  );
}

export default URLShortener;