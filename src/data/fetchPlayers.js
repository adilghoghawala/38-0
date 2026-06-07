import { TEAM_ERA_CONFIG, posForPlayer } from "./teams";

const cache = {};

function round1(n) {
  return Math.round((n || 0) * 10) / 10;
}

export async function fetchEraPlayers(teamEra) {
  if (cache[teamEra]) return cache[teamEra];

  const config = TEAM_ERA_CONFIG[teamEra];
  if (!config) return [];

  const { ids, seasons } = config;

  const params = new URLSearchParams();
  ids.forEach(id => params.append("player_ids", id));
  seasons.forEach(s => params.append("seasons", s));

  const res = await fetch(`/api/players?${params.toString()}`);
  if (!res.ok) throw new Error(`API error ${res.status}`);

  const json = await res.json();

  // Group by player id and pick their peak season
  const byPlayer = {};
  for (const avg of json.data) {
    const pid = avg.player.id;
    const score = (avg.pts || 0) + (avg.reb || 0) * 0.5 + (avg.ast || 0) * 0.3;
    if (!byPlayer[pid] || score > byPlayer[pid]._score) {
      byPlayer[pid] = { ...avg, _score: score };
    }
  }

  const result = Object.values(byPlayer)
    .map(avg => ({
      id: avg.player.id,
      name: `${avg.player.first_name} ${avg.player.last_name}`,
      pos: posForPlayer(avg.player),
      pts: round1(avg.pts),
      reb: round1(avg.reb),
      ast: round1(avg.ast),
      stl: round1(avg.stl),
      blk: round1(avg.blk),
    }))
    .filter(p => p.pts > 0 || p.reb > 0);

  cache[teamEra] = result;
  return result;
}
