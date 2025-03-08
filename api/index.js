export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

 const INDEXNOW_KEY = "e1908b57dc524ff992fb97ebc5f635ad"; // 🔹 Replace with your actual key

const indexNowUrl = `https://www.bing.com/indexnow?url=${encodeURIComponent(url)}&key=${INDEXNOW_KEY}`;


  try {
    const response = await fetch(indexNowUrl, { method: "GET" });
    const data = await response.text();
    return res.status(200).json({ message: "Submitted", response: data });
  } catch (error) {
    return res.status(500).json({ error: "Indexing failed", details: error.message });
  }
}
