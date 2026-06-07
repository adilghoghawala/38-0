const API_KEY = "06d60c2f-4902-4581-bb96-8e0a687e7128";
const BASE = "https://api.balldontlie.io/v1";

// Cache fetched era data so we don't re-fetch on every spin
const cache = {};

export async function fetchEraPlayers(teamEra) {
  if (cache[teamEra]) return cache[teamEra];

  const config = TEAM_ERA_CONFIG[teamEra];
  if (!config) return [];

  const { playerIds, seasons } = config;
  const seasonParams = seasons.map(s => `seasons[]=${s}`).join("&");
  const playerParams = playerIds.map(id => `player_ids[]=${id}`).join("&");

  const res = await fetch(
    `${BASE}/season_averages?${playerParams}&${seasonParams}`,
    { headers: { Authorization: API_KEY } }
  );

  if (!res.ok) throw new Error(`API error ${res.status}`);
  const json = await res.json();

  // For each player, find their peak season in the decade
  const byPlayer = {};
  for (const avg of json.data) {
    const pid = avg.player.id;
    if (!byPlayer[pid] || avg.pts > byPlayer[pid].pts) {
      byPlayer[pid] = avg;
    }
  }

  const result = Object.values(byPlayer).map(avg => {
    const pid = avg.player.id;
    const meta = PLAYER_META[pid] || {};
    return {
      id: pid,
      name: `${avg.player.first_name} ${avg.player.last_name}`,
      pos: meta.pos || posFromApi(avg.player.position),
      pts: round1(avg.pts),
      reb: round1(avg.reb),
      ast: round1(avg.ast),
      stl: round1(avg.stl || 0),
      blk: round1(avg.blk || 0),
    };
  }).filter(p => p.pts > 0);

  cache[teamEra] = result;
  return result;
}

function round1(n) { return Math.round(n * 10) / 10; }

function posFromApi(pos) {
  if (!pos) return ["SF"];
  if (pos === "G") return ["PG", "SG"];
  if (pos === "F") return ["SF", "PF"];
  if (pos === "C") return ["C"];
  if (pos === "G-F") return ["SG", "SF"];
  if (pos === "F-C") return ["PF", "C"];
  return ["SF"];
}

// Manually curated positions for key players
export const PLAYER_META = {
  // Guards
  115:  { pos: ["SG", "SF"] }, // Michael Jordan
  2:    { pos: ["PG"] },       // Magic Johnson
  140:  { pos: ["PG"] },       // John Stockton
  182:  { pos: ["PG"] },       // Isiah Thomas
  259:  { pos: ["PG"] },       // Gary Payton
  396:  { pos: ["PG", "SG"] }, // Clyde Drexler
  265:  { pos: ["PG"] },       // Kevin Johnson
  337:  { pos: ["SG"] },       // Reggie Miller
  344:  { pos: ["SG"] },       // Joe Dumars
  349:  { pos: ["PG", "SG"] }, // Chauncey Billups
  145:  { pos: ["SG", "PG"] }, // Dwyane Wade
  279:  { pos: ["PG"] },       // Steve Nash
  232:  { pos: ["PG"] },       // Jason Kidd
  475:  { pos: ["PG"] },       // Tony Parker
  160:  { pos: ["PG"] },       // Kyrie Irving
  177:  { pos: ["PG"] },       // Stephen Curry
  434:  { pos: ["PG"] },       // Russell Westbrook
  268:  { pos: ["PG"] },       // Chris Paul
  246:  { pos: ["PG"] },       // Nikola Jokic - listed as C
  // Forwards
  1:    { pos: ["SF", "PF"] }, // LeBron James
  237:  { pos: ["SF", "PF"] }, // Larry Bird
  390:  { pos: ["SF", "PF"] }, // Scottie Pippen
  22:   { pos: ["PF"] },       // Karl Malone
  104:  { pos: ["SF", "PF"] }, // Julius Erving
  77:   { pos: ["PF", "C"] },  // Charles Barkley
  333:  { pos: ["PF", "C"] },  // Dennis Rodman
  378:  { pos: ["PF", "C"] },  // Kevin Garnett
  153:  { pos: ["SF", "PF"] }, // Kevin Durant
  23:   { pos: ["PF", "C"] },  // Dirk Nowitzki
  310:  { pos: ["SF", "SG"] }, // Klay Thompson
  214:  { pos: ["PF", "C"] },  // Draymond Green
  369:  { pos: ["SF", "PF"] }, // Kawhi Leonard
  406:  { pos: ["PF", "C"] },  // Giannis Antetokounmpo
  488:  { pos: ["SF", "PF"] }, // Jayson Tatum
  // Centers
  14:   { pos: ["C"] },        // Kareem Abdul-Jabbar
  38:   { pos: ["C"] },        // Hakeem Olajuwon
  103:  { pos: ["C"] },        // Patrick Ewing
  35:   { pos: ["C"] },        // Shaquille O'Neal
  13:   { pos: ["C", "PF"] },  // Tim Duncan
  284:  { pos: ["C"] },        // David Robinson
  57:   { pos: ["C", "PF"] },  // Robert Parish
  170:  { pos: ["C", "PF"] },  // Kevin McHale
  282:  { pos: ["C", "PF"] },  // Moses Malone
  36:   { pos: ["C"] },        // Ben Wallace
  246:  { pos: ["C"] },        // Nikola Jokic
  461:  { pos: ["C", "PF"] },  // Anthony Davis
  420:  { pos: ["C"] },        // Brook Lopez
};

// Team/era configs: player IDs + which seasons to fetch
// Seasons are year the season STARTED (e.g. 1995 = 1995-96 season)
export const TEAM_ERA_CONFIG = {
  "1980s Lakers": {
    playerIds: [2, 14, 113, 86, 67],
    seasons: [1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988],
  },
  "1980s Celtics": {
    playerIds: [237, 57, 170, 94, 25],
    seasons: [1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988],
  },
  "1980s 76ers": {
    playerIds: [104, 282, 77, 71, 6],
    seasons: [1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988],
  },
  "1980s Bulls": {
    playerIds: [115, 390, 147, 32],
    seasons: [1984, 1985, 1986, 1987, 1988, 1989],
  },
  "1980s Pistons": {
    playerIds: [182, 344, 52, 333, 9],
    seasons: [1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989],
  },
  "1980s Rockets": {
    playerIds: [38, 355, 310, 323],
    seasons: [1984, 1985, 1986, 1987, 1988, 1989],
  },
  "1990s Bulls": {
    playerIds: [115, 390, 333, 440, 191],
    seasons: [1990, 1991, 1992, 1993, 1995, 1996, 1997, 1998],
  },
  "1990s Jazz": {
    playerIds: [22, 140, 175, 328],
    seasons: [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
  "1990s Spurs": {
    playerIds: [284, 13, 15, 386],
    seasons: [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
  },
  "1990s Suns": {
    playerIds: [77, 265, 314, 197],
    seasons: [1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
  "1990s Rockets": {
    playerIds: [38, 396, 383, 165],
    seasons: [1993, 1994, 1995, 1996, 1997, 1998],
  },
  "1990s Knicks": {
    playerIds: [103, 416, 295, 273],
    seasons: [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
  },
  "1990s Pacers": {
    playerIds: [337, 375, 233, 92],
    seasons: [1993, 1994, 1995, 1996, 1997, 1998, 1999],
  },
  "1990s Magic": {
    playerIds: [35, 324, 297, 147],
    seasons: [1992, 1993, 1994, 1995, 1996],
  },
  "1990s Pistons": {
    playerIds: [182, 344, 333, 52, 9],
    seasons: [1990, 1991, 1992, 1993],
  },
  "2000s Lakers": {
    playerIds: [35, 85, 196, 99, 362],
    seasons: [1999, 2000, 2001, 2002, 2003, 2007, 2008, 2009],
  },
  "2000s Spurs": {
    playerIds: [13, 475, 468, 43],
    seasons: [1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009],
  },
  "2000s Pistons": {
    playerIds: [349, 330, 36, 331, 424],
    seasons: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008],
  },
  "2000s Heat": {
    playerIds: [145, 35, 19, 259],
    seasons: [2000, 2001, 2002, 2003, 2004, 2005, 2006],
  },
  "2000s Mavs": {
    playerIds: [23, 279, 135, 210],
    seasons: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009],
  },
  "2000s Suns": {
    playerIds: [279, 370, 367, 31],
    seasons: [2004, 2005, 2006, 2007, 2008, 2009],
  },
  "2000s Celtics": {
    playerIds: [318, 20, 378, 351],
    seasons: [2007, 2008, 2009],
  },
  "2010s Heat": {
    playerIds: [1, 145, 258, 20, 236],
    seasons: [2010, 2011, 2012, 2013, 2014],
  },
  "2010s Warriors": {
    playerIds: [177, 153, 310, 214, 126],
    seasons: [2014, 2015, 2016, 2017, 2018, 2019],
  },
  "2010s Cavaliers": {
    playerIds: [1, 160, 307, 416],
    seasons: [2014, 2015, 2016, 2017, 2018],
  },
  "2010s Spurs": {
    playerIds: [13, 475, 468, 369, 6],
    seasons: [2010, 2011, 2012, 2013, 2014, 2015, 2016],
  },
  "2010s Thunder": {
    playerIds: [153, 434, 213, 398],
    seasons: [2010, 2011, 2012, 2013, 2014, 2015, 2016],
  },
  "2010s Raptors": {
    playerIds: [369, 307, 434, 163, 233],
    seasons: [2018, 2019],
  },
  "2010s Mavs": {
    playerIds: [23, 232, 367, 415, 427],
    seasons: [2010, 2011],
  },
  "2010s Clippers": {
    playerIds: [268, 87, 66, 319],
    seasons: [2011, 2012, 2013, 2014, 2015, 2016, 2017],
  },
  "2010s Rockets": {
    playerIds: [213, 38, 268, 346],
    seasons: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
  },
  "2020s Lakers": {
    playerIds: [1, 461, 321, 404],
    seasons: [2019, 2020, 2021, 2022, 2023],
  },
  "2020s Bucks": {
    playerIds: [406, 364, 220, 420],
    seasons: [2019, 2020, 2021, 2022, 2023],
  },
  "2020s Celtics": {
    playerIds: [488, 445, 220, 109, 516],
    seasons: [2021, 2022, 2023, 2024],
  },
  "2020s Nuggets": {
    playerIds: [246, 448, 447, 132],
    seasons: [2019, 2020, 2021, 2022, 2023],
  },
  "2020s Warriors": {
    playerIds: [177, 310, 214, 437],
    seasons: [2020, 2021, 2022],
  },
  "2020s Heat": {
    playerIds: [472, 462, 307, 460],
    seasons: [2019, 2020, 2021, 2022, 2023],
  },
  "2020s Suns": {
    playerIds: [268, 489, 484, 450],
    seasons: [2020, 2021, 2022],
  },
};

export const TEAM_ERAS = Object.keys(TEAM_ERA_CONFIG);
export const POSITIONS = ["PG", "SG", "SF", "PF", "C"];

export const THRESHOLDS = {
  pts: 115,
  reb: 47,
  ast: 26,
  stl: 6.5,
  blk: 4.5,
};

export function playerRating(p) {
  return +(p.pts * 0.35 + p.reb * 0.22 + p.ast * 0.20 + p.stl * 1.2 + p.blk * 1.1).toFixed(1);
}

export function simulate(roster) {
  const players = Object.values(roster);
  const totals = { pts: 0, reb: 0, ast: 0, stl: 0, blk: 0 };
  players.forEach(p => {
    totals.pts += p.pts;
    totals.reb += p.reb;
    totals.ast += p.ast;
    totals.stl += p.stl;
    totals.blk += p.blk;
  });
  const failed = Object.keys(THRESHOLDS).filter(k => totals[k] < THRESHOLDS[k]);
  let wins = 38;
  failed.forEach(k => {
    wins -= Math.round((THRESHOLDS[k] - totals[k]) / THRESHOLDS[k] * 18);
  });
  wins = Math.max(0, Math.min(38, wins));
  return { totals, failed, wins, losses: 38 - wins };
}

export function getGrade(wins) {
  if (wins === 38) return { record: "38-0", grade: "Dynasty", flavor: "Unstoppable. A perfect playoff run for the ages.", color: "text-yellow-400" };
  if (wins >= 35) return { record: `${wins}-${38 - wins}`, grade: "Elite", flavor: "One of the greatest runs ever. Near-perfect.", color: "text-green-400" };
  if (wins >= 30) return { record: `${wins}-${38 - wins}`, grade: "Contender", flavor: "Strong enough to win a title on a good night.", color: "text-blue-400" };
  if (wins >= 24) return { record: `${wins}-${38 - wins}`, grade: "Dangerous", flavor: "Solid, but flaws will catch up eventually.", color: "text-orange-400" };
  if (wins >= 16) return { record: `${wins}-${38 - wins}`, grade: "Inconsistent", flavor: "Big names, big flaws. First-round upset incoming.", color: "text-red-400" };
  return { record: `${wins}-${38 - wins}`, grade: "Historic... ly bad", flavor: "Somehow worse than the 2012 Bobcats.", color: "text-red-600" };
}
