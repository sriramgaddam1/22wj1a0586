export async function logToServer({ stack, level, pkg, message }) {
  try {
    const res = await fetch("http://localhost:5000/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });

    const data = await res.json();
    console.log("✅ Log sent via backend:", data);
  } catch (err) {
    console.error("❌ Logging failed:", err);
  }
}
