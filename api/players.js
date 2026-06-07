const API_KEY = "06d60c2f-4902-4581-bb96-8e0a687e7128";
const BASE = "https://api.balldontlie.io/v1";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const { player_ids, seasons } = req.query;

  if (!player_ids || !seasons) {
    return res.status(400).json({ error: "Missing player_ids or seasons" });
  }

  const ids = Array.isArray(player_ids) ? player_ids : player_ids.split(",");
  const seasonList = Array.isArray(seasons) ? seasons : seasons.split(",");

  const playerParams = ids.map(id => `player_ids[]=${id}`).join("&");
  const seasonParams = seasonList.map(s => `seasons[]=${s}`).join("&");

  const url = `${BASE}/season_averages?${playerParams}&${seasonParams}`;

  try {
    const response = await fetch(url, {
      headers: { Authorization: API_KEY },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Upstream error: ${response.status}` });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
