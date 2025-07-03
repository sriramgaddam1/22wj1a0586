import React from "react";
import URLShortener from "./components/URLShortener";

function App() {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">URL Shortener with Logging</h1>
      <URLShortener />
    </div>
  );
}

export default App;
