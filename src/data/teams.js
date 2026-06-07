// Each team/era maps to an array of balldontlie player IDs + decade seasons
// Seasons = year the season started (1995 = 1995-96 season)

export const TEAM_ERA_CONFIG = {
  "1970s Lakers": {
    ids: [3, 226, 88, 162, 212],
    seasons: [1969,1970,1971,1972,1973,1974,1975,1976,1977,1978],
  },
  "1970s Celtics": {
    ids: [63, 204, 332, 289, 245, 280],
    seasons: [1969,1970,1971,1972,1973,1974,1975,1976,1977,1978],
  },
  "1970s Knicks": {
    ids: [140, 228, 72, 38, 69, 24],
    seasons: [1969,1970,1971,1972,1973,1974,1975,1976,1977,1978],
  },
  "1970s Warriors": {
    ids: [30, 203, 282, 255, 20],
    seasons: [1969,1970,1971,1972,1973,1974,1975,1976,1977,1978],
  },
  "1970s Bucks": {
    ids: [3, 244, 46, 159],
    seasons: [1969,1970,1971,1972,1973,1974,1975,1976,1977,1978],
  },
  "1970s Blazers": {
    ids: [44, 220, 170, 27, 75],
    seasons: [1969,1970,1971,1972,1973,1974,1975,1976,1977,1978],
  },
  "1980s Lakers": {
    ids: [211, 3, 190, 34, 56, 190],
    seasons: [1979,1980,1981,1982,1983,1984,1985,1986,1987,1988],
  },
  "1980s Celtics": {
    ids: [33, 252, 202, 71, 10, 44],
    seasons: [1979,1980,1981,1982,1983,1984,1985,1986,1987,1988],
  },
  "1980s 76ers": {
    ids: [104, 222, 18, 221, 6, 27],
    seasons: [1979,1980,1981,1982,1983,1984,1985,1986,1987,1988],
  },
  "1980s Pistons": {
    ids: [299, 81, 39, 278, 5, 308],
    seasons: [1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989],
  },
  "1980s Rockets": {
    ids: [124, 253, 295, 248, 11],
    seasons: [1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989],
  },
  "1980s Bulls": {
    ids: [115, 390, 147, 32, 283],
    seasons: [1984,1985,1986,1987,1988,1989],
  },
  "1980s Spurs": {
    ids: [258, 307, 93, 135, 312],
    seasons: [1979,1980,1981,1982,1983,1984,1985,1986,1987,1988],
  },
  "1990s Bulls": {
    ids: [115, 390, 333, 440, 191, 179, 262],
    seasons: [1990,1991,1992,1993,1995,1996,1997,1998],
  },
  "1990s Jazz": {
    ids: [22, 140, 175, 328, 2, 160],
    seasons: [1990,1991,1992,1993,1994,1995,1996,1997,1998],
  },
  "1990s Spurs": {
    ids: [284, 13, 15, 386, 79],
    seasons: [1990,1991,1992,1993,1994,1995,1996,1997,1998,1999],
  },
  "1990s Suns": {
    ids: [77, 265, 314, 197, 47],
    seasons: [1992,1993,1994,1995,1996,1997,1998],
  },
  "1990s Rockets": {
    ids: [124, 396, 383, 295, 51, 319, 207],
    seasons: [1993,1994,1995,1996,1997,1998],
  },
  "1990s Knicks": {
    ids: [103, 416, 295, 273, 113, 147],
    seasons: [1990,1991,1992,1993,1994,1995,1996,1997,1998,1999],
  },
  "1990s Pacers": {
    ids: [337, 375, 233, 92, 291, 290],
    seasons: [1993,1994,1995,1996,1997,1998,1999],
  },
  "1990s Magic": {
    ids: [35, 324, 297, 147, 62],
    seasons: [1992,1993,1994,1995,1996],
  },
  "1990s Pistons": {
    ids: [299, 81, 278, 39, 5],
    seasons: [1989,1990,1991,1992,1993],
  },
  "1990s Sonics": {
    ids: [259, 230, 144, 330, 100],
    seasons: [1992,1993,1994,1995,1996,1997,1998],
  },
  "1990s Heat": {
    ids: [19, 102, 55, 232, 9],
    seasons: [1995,1996,1997,1998,1999],
  },
  "2000s Lakers": {
    ids: [35, 85, 196, 99, 362, 319],
    seasons: [1999,2000,2001,2002,2003,2007,2008,2009],
  },
  "2000s Spurs": {
    ids: [13, 475, 468, 43, 284, 319],
    seasons: [1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009],
  },
  "2000s Pistons": {
    ids: [349, 330, 36, 331, 424, 231],
    seasons: [2000,2001,2002,2003,2004,2005,2006,2007,2008],
  },
  "2000s Heat": {
    ids: [145, 35, 19, 259, 8, 437],
    seasons: [2000,2001,2002,2003,2004,2005,2006],
  },
  "2000s Mavs": {
    ids: [23, 279, 135, 210, 427],
    seasons: [2000,2001,2002,2003,2004,2005,2006,2007,2008,2009],
  },
  "2000s Suns": {
    ids: [279, 370, 367, 31, 30, 28],
    seasons: [2004,2005,2006,2007,2008,2009],
  },
  "2000s Celtics": {
    ids: [318, 20, 378, 351, 107],
    seasons: [2007,2008,2009],
  },
  "2000s Cavaliers": {
    ids: [1, 342, 214, 430, 289],
    seasons: [2003,2004,2005,2006,2007,2008,2009],
  },
  "2000s Raptors": {
    ids: [1, 247, 407, 118, 343],
    seasons: [2004,2005,2006,2007,2008,2009],
  },
  "2010s Heat": {
    ids: [1, 145, 258, 20, 236, 411],
    seasons: [2010,2011,2012,2013,2014],
  },
  "2010s Warriors": {
    ids: [177, 153, 310, 214, 126, 333],
    seasons: [2014,2015,2016,2017,2018,2019],
  },
  "2010s Cavaliers": {
    ids: [1, 160, 307, 416, 422, 380],
    seasons: [2014,2015,2016,2017,2018],
  },
  "2010s Spurs": {
    ids: [13, 475, 468, 369, 6, 233],
    seasons: [2010,2011,2012,2013,2014,2015,2016],
  },
  "2010s Thunder": {
    ids: [153, 434, 213, 398, 392],
    seasons: [2010,2011,2012,2013,2014,2015,2016],
  },
  "2010s Raptors": {
    ids: [369, 307, 434, 163, 233, 499],
    seasons: [2018,2019],
  },
  "2010s Mavs": {
    ids: [23, 232, 367, 415, 427],
    seasons: [2010,2011],
  },
  "2010s Clippers": {
    ids: [268, 87, 66, 319, 293, 50],
    seasons: [2011,2012,2013,2014,2015,2016,2017],
  },
  "2010s Rockets": {
    ids: [213, 268, 346, 136, 394, 389],
    seasons: [2012,2013,2014,2015,2016,2017,2018,2019],
  },
  "2010s Bulls": {
    ids: [302, 218, 139, 52, 96, 83],
    seasons: [2010,2011,2012,2013,2014,2015,2016],
  },
  "2010s Pacers": {
    ids: [360, 93, 55, 218, 132, 173],
    seasons: [2012,2013,2014,2015,2016],
  },
  "2010s Grizzlies": {
    ids: [226, 189, 261, 117, 353],
    seasons: [2010,2011,2012,2013,2014,2015,2016],
  },
  "2020s Lakers": {
    ids: [1, 461, 321, 404, 12, 233],
    seasons: [2019,2020,2021,2022,2023],
  },
  "2020s Bucks": {
    ids: [406, 364, 220, 420, 448, 101],
    seasons: [2019,2020,2021,2022,2023],
  },
  "2020s Celtics": {
    ids: [488, 445, 220, 109, 516, 502, 491],
    seasons: [2021,2022,2023,2024],
  },
  "2020s Nuggets": {
    ids: [246, 448, 447, 132, 404, 50],
    seasons: [2019,2020,2021,2022,2023],
  },
  "2020s Warriors": {
    ids: [177, 310, 214, 437, 449],
    seasons: [2020,2021,2022],
  },
  "2020s Heat": {
    ids: [472, 462, 307, 460, 503, 463],
    seasons: [2019,2020,2021,2022,2023],
  },
  "2020s Suns": {
    ids: [489, 268, 484, 450, 464, 468],
    seasons: [2020,2021,2022],
  },
  "2020s Clippers": {
    ids: [268, 87, 502, 477, 458],
    seasons: [2020,2021,2022,2023],
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

// Position overrides for players the API returns with generic positions
export const POS_OVERRIDES = {
  115:  ["SG","SF"], // Jordan
  1:    ["SF","PF"], // LeBron
  211:  ["PG"],      // Magic
  3:    ["C"],       // Kareem
  33:   ["SF","PF"], // Bird
  252:  ["C"],       // Parish
  202:  ["PF","C"],  // McHale
  71:   ["PG","SG"], // D. Johnson
  77:   ["PF","C"],  // Barkley
  22:   ["PF"],      // K. Malone
  140:  ["PG"],      // Stockton
  284:  ["C"],       // D. Robinson
  13:   ["C","PF"],  // Duncan
  35:   ["C"],       // Shaq
  85:   ["SG","SF"], // Kobe
  390:  ["SF","PF"], // Pippen
  333:  ["PF","C"],  // Rodman
  177:  ["PG"],      // Curry
  153:  ["SF","PF"], // KD
  310:  ["SG","SF"], // Klay
  214:  ["PF","C"],  // Draymond
  1:    ["SF","PF"], // LeBron
  160:  ["PG","SG"], // Kyrie
  406:  ["PF","C"],  // Giannis
  488:  ["SF","PF"], // Tatum
  445:  ["SG","SF"], // Brown
  246:  ["C"],       // Jokic
  461:  ["C","PF"],  // AD
  472:  ["SF","SG"], // Butler
  462:  ["C","PF"],  // Bam
  489:  ["SG","PG"], // Booker
  268:  ["PG"],      // CP3
  434:  ["PG"],      // Westbrook
  213:  ["SG","SF"], // Harden
  369:  ["SF","SG"], // Kawhi
  278:  ["PF","C"],  // Rodman
  299:  ["PG"],      // Isiah
  81:   ["SG","PG"], // Dumars
  104:  ["SF","PF"], // Erving
  222:  ["C"],       // Moses
  279:  ["PG"],      // Nash
  23:   ["PF","C"],  // Dirk
  145:  ["SG","PG"], // Wade
  258:  ["PF","C"],  // Bosh
  475:  ["PG"],      // Parker
  468:  ["SG","SF"], // Ginobili
  396:  ["SG","SF"], // Drexler
  124:  ["C"],       // Hakeem
  259:  ["PG"],      // GP
  307:  ["PF","C"],  // Love / Lowry (both id 307 won't happen - just example)
  378:  ["PF","C"],  // Garnett
  318:  ["SF","SG"], // Pierce
  20:   ["SG"],      // Ray Allen
  351:  ["PG"],      // Rondo
  337:  ["SG","SF"], // Reggie
  103:  ["C"],       // Ewing
  324:  ["PG","SG"], // Penny
  349:  ["PG","SG"], // Billups
  330:  ["SG"],      // Rip Hamilton
  36:   ["C","PF"],  // Ben Wallace
  331:  ["PF","C"],  // Sheed
  424:  ["SF","PF"], // Tayshaun
  370:  ["PF","C"],  // Amare
  367:  ["SF","PF"], // Marion
  87:   ["PF"],      // Griffin
  66:   ["C"],       // DJ
};

export function posForPlayer(apiPlayer) {
  const override = POS_OVERRIDES[apiPlayer.id];
  if (override) return override;
  const p = apiPlayer.position || "";
  if (p === "G") return ["PG","SG"];
  if (p === "F") return ["SF","PF"];
  if (p === "C") return ["C"];
  if (p === "G-F") return ["SG","SF"];
  if (p === "F-C") return ["PF","C"];
  return ["SF"];
}

export function playerRating(p) {
  return +(p.pts * 0.35 + p.reb * 0.22 + p.ast * 0.20 + p.stl * 1.2 + p.blk * 1.1).toFixed(1);
}

export function simulate(roster) {
  const players = Object.values(roster);
  const totals = { pts: 0, reb: 0, ast: 0, stl: 0, blk: 0 };
  players.forEach(p => {
    totals.pts += p.pts; totals.reb += p.reb; totals.ast += p.ast;
    totals.stl += p.stl; totals.blk += p.blk;
  });
  const failed = Object.keys(THRESHOLDS).filter(k => totals[k] < THRESHOLDS[k]);
  let wins = 38;
  failed.forEach(k => { wins -= Math.round((THRESHOLDS[k] - totals[k]) / THRESHOLDS[k] * 18); });
  wins = Math.max(0, Math.min(38, wins));
  return { totals, failed, wins, losses: 38 - wins };
}

export function getGrade(wins) {
  if (wins === 38) return { record: "38-0", grade: "Dynasty", flavor: "Unstoppable. A perfect playoff run for the ages.", color: "text-yellow-400" };
  if (wins >= 35) return { record: `${wins}-${38-wins}`, grade: "Elite", flavor: "One of the greatest runs ever. Near-perfect.", color: "text-green-400" };
  if (wins >= 30) return { record: `${wins}-${38-wins}`, grade: "Contender", flavor: "Strong enough to win a title on a good night.", color: "text-blue-400" };
  if (wins >= 24) return { record: `${wins}-${38-wins}`, grade: "Dangerous", flavor: "Solid, but flaws will catch up eventually.", color: "text-orange-400" };
  if (wins >= 16) return { record: `${wins}-${38-wins}`, grade: "Inconsistent", flavor: "Big names, big flaws. First-round upset incoming.", color: "text-red-400" };
  return { record: `${wins}-${38-wins}`, grade: "Historic... ly bad", flavor: "Somehow worse than the 2012 Bobcats.", color: "text-red-600" };
}
