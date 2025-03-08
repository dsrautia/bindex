export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const { url } = req.body;
        const apiKey = "e03d13f8b92d45159ad23b52d9e30a9d"; // Replace with your actual key

        const response = await fetch("https://www.bing.com/indexnow", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                host: new URL(url).hostname,
                key: apiKey,
                keyLocation: `https://${new URL(url).hostname}/indexnow-key.txt`,
                urlList: [url]
            }),
        });

        const data = await response.text();
        return res.status(200).json({ response: data });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
