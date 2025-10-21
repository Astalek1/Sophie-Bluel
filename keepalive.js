import fetch from "node-fetch";

async function keepAlive() {
  try {
    const response = await fetch(
      "https://sophie-bluel-production.up.railway.app/api/works"
    );
    console.log(`[${new Date().toISOString()}] Ping OK (${response.status})`);
  } catch (error) {
    console.error("Ping failed:", error.message);
  }
}

await keepAlive();
