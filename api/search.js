const API_KEY = "06d60c2f-4902-4581-bb96-8e0a687e7128";
const BASE = "https://api.balldontlie.io/v1";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const { search } = req.query;
  if (!search) return res.status(400).json({ error: "Missing search" });

  const url = `${BASE}/players?search=${encodeURIComponent(search)}&per_page=10`;

  try {
    const response = await fetch(url, {
      headers: { Authorization: API_KEY },
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
