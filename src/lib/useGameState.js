import { useState } from "react";
import { TEAM_ERAS, PLAYERS, simulate, getGrade } from "../data/players";

export function useGameState() {
  const [phase, setPhase] = useState("spin"); // spin | pick | result
  const [round, setRound] = useState(0);
  const [roster, setRoster] = useState({});
  const [currentSpin, setCurrentSpin] = useState(null);
  const [selectedPos, setSelectedPos] = useState(null);
  const [skipsLeft, setSkipsLeft] = useState(1);
  const [usedEras, setUsedEras] = useState(new Set());
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinDisplay, setSpinDisplay] = useState({ era: "—", team: "—" });
  const [hoopIQ, setHoopIQ] = useState(false);

  const TOTAL_ROUNDS = 5;

  function doSpin() {
    if (phase !== "spin" || isSpinning) return;
    setIsSpinning(true);

    let available = TEAM_ERAS.filter(te => !usedEras.has(te));
    if (!available.length) available = [...TEAM_ERAS];
    const final = available[Math.floor(Math.random() * available.length)];

    let count = 0;
    const interval = setInterval(() => {
      const rand = TEAM_ERAS[Math.floor(Math.random() * TEAM_ERAS.length)];
      const parts = rand.split(" ");
      setSpinDisplay({ era: parts[0], team: parts.slice(1).join(" ") });
      count++;
      if (count > 16) {
        clearInterval(interval);
        const fp = final.split(" ");
        setSpinDisplay({ era: fp[0], team: fp.slice(1).join(" ") });
        setCurrentSpin(final);
        setUsedEras(prev => new Set([...prev, final]));
        setIsSpinning(false);
        setPhase("pick");
      }
    }, 75);
  }

  function doSkip() {
    if (skipsLeft < 1 || phase !== "pick") return;
    setSkipsLeft(s => s - 1);
    setCurrentSpin(null);
    setSelectedPos(null);
    setSpinDisplay({ era: "—", team: "—" });
    setPhase("spin");
  }

  function selectPos(pos) {
    setSelectedPos(pos);
  }

  function pickPlayer(playerName) {
    const players = PLAYERS[currentSpin] || [];
    const player = players.find(p => p.name === playerName);
    if (!player || !selectedPos) return;

    const newRoster = { ...roster, [selectedPos]: { ...player, _era: currentSpin } };
    setRoster(newRoster);

    const newRound = round + 1;
    setRound(newRound);
    setCurrentSpin(null);
    setSelectedPos(null);
    setSpinDisplay({ era: "—", team: "—" });

    if (newRound >= TOTAL_ROUNDS) {
      setPhase("result");
    } else {
      setPhase("spin");
    }
  }

  function reset() {
    setPhase("spin");
    setRound(0);
    setRoster({});
    setCurrentSpin(null);
    setSelectedPos(null);
    setSkipsLeft(1);
    setUsedEras(new Set());
    setIsSpinning(false);
    setSpinDisplay({ era: "—", team: "—" });
  }

  const result = phase === "result" ? (() => {
    const sim = simulate(roster);
    return { ...sim, ...getGrade(sim.wins) };
  })() : null;

  return {
    phase, round, roster, currentSpin, selectedPos,
    skipsLeft, isSpinning, spinDisplay, hoopIQ,
    TOTAL_ROUNDS, result,
    doSpin, doSkip, selectPos, pickPlayer, reset,
    setHoopIQ,
  };
}
