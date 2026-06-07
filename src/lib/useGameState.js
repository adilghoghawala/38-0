import { useState } from "react";
import { TEAM_ERAS, simulate, getGrade } from "../data/teams";
import { fetchEraPlayers } from "../data/fetchPlayers";

export function useGameState() {
  const [phase, setPhase] = useState("spin");
  const [round, setRound] = useState(0);
  const [roster, setRoster] = useState({});
  const [currentSpin, setCurrentSpin] = useState(null);
  const [currentPlayers, setCurrentPlayers] = useState([]);
  const [selectedPos, setSelectedPos] = useState(null);
  const [skipsLeft, setSkipsLeft] = useState(1);
  const [usedEras, setUsedEras] = useState(new Set());
  const [isSpinning, setIsSpinning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [spinDisplay, setSpinDisplay] = useState({ era: "—", team: "—" });
  const [hoopIQ, setHoopIQ] = useState(false);

  const TOTAL_ROUNDS = 5;

  function toDisplay(teamEra) {
    const parts = teamEra.split(" ");
    return { era: parts[0], team: parts.slice(1).join(" ") };
  }

  async function doSpin() {
    if (phase !== "spin" || isSpinning || isLoading) return;
    setIsSpinning(true);
    setLoadError(null);

    let available = TEAM_ERAS.filter(te => !usedEras.has(te));
    if (!available.length) available = [...TEAM_ERAS];
    const final = available[Math.floor(Math.random() * available.length)];

    // Animate the slot machine
    await new Promise(resolve => {
      let count = 0;
      const interval = setInterval(() => {
        const rand = TEAM_ERAS[Math.floor(Math.random() * TEAM_ERAS.length)];
        setSpinDisplay(toDisplay(rand));
        count++;
        if (count > 16) {
          clearInterval(interval);
          setSpinDisplay(toDisplay(final));
          resolve();
        }
      }, 75);
    });

    setIsSpinning(false);
    setIsLoading(true);

    try {
      const players = await fetchEraPlayers(final);
      setCurrentSpin(final);
      setCurrentPlayers(players);
      setUsedEras(prev => new Set([...prev, final]));
      setPhase("pick");
    } catch (err) {
      setLoadError("Couldn't load player data. Try again.");
      setSpinDisplay({ era: "—", team: "—" });
    } finally {
      setIsLoading(false);
    }
  }

  function doSkip() {
    if (skipsLeft < 1 || phase !== "pick") return;
    setSkipsLeft(s => s - 1);
    setCurrentSpin(null);
    setCurrentPlayers([]);
    setSelectedPos(null);
    setSpinDisplay({ era: "—", team: "—" });
    setPhase("spin");
  }

  function selectPos(pos) { setSelectedPos(pos); }

  function pickPlayer(playerName) {
    const player = currentPlayers.find(p => p.name === playerName);
    if (!player || !selectedPos) return;
    const newRoster = { ...roster, [selectedPos]: { ...player, _era: currentSpin } };
    setRoster(newRoster);
    const newRound = round + 1;
    setRound(newRound);
    setCurrentSpin(null);
    setCurrentPlayers([]);
    setSelectedPos(null);
    setSpinDisplay({ era: "—", team: "—" });
    setPhase(newRound >= TOTAL_ROUNDS ? "result" : "spin");
  }

  function reset() {
    setPhase("spin"); setRound(0); setRoster({});
    setCurrentSpin(null); setCurrentPlayers([]);
    setSelectedPos(null); setSkipsLeft(1);
    setUsedEras(new Set()); setIsSpinning(false);
    setIsLoading(false); setLoadError(null);
    setSpinDisplay({ era: "—", team: "—" });
  }

  const result = phase === "result" ? (() => {
    const sim = simulate(roster);
    return { ...sim, ...getGrade(sim.wins) };
  })() : null;

  return {
    phase, round, roster, currentSpin, currentPlayers, selectedPos,
    skipsLeft, isSpinning, isLoading, loadError, spinDisplay, hoopIQ,
    TOTAL_ROUNDS, result,
    doSpin, doSkip, selectPos, pickPlayer, reset, setHoopIQ,
  };
}
