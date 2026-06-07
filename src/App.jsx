import { motion, AnimatePresence } from "framer-motion";
import { useGameState } from "./lib/useGameState";
import { RosterGrid } from "./components/RosterGrid";
import { SlotMachine } from "./components/SlotMachine";
import { PickPanel } from "./components/PickPanel";
import { ResultScreen } from "./components/ResultScreen";
import { THRESHOLDS } from "./data/teams";

export default function App() {
  const game = useGameState();
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold tracking-tight mb-2">38-0</h1>
          <p className="text-sm text-white/40">Build the perfect NBA playoff roster. Go undefeated.</p>
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className="text-xs text-white/30">HoopIQ mode</span>
            <button onClick={() => game.setHoopIQ(h => !h)}
              className={"relative w-10 h-5 rounded-full border transition-all cursor-pointer " + (game.hoopIQ ? "bg-blue-500/40 border-blue-400/50" : "bg-white/10 border-white/10")}>
              <span className={"absolute top-0.5 w-4 h-4 rounded-full transition-all " + (game.hoopIQ ? "left-5 bg-blue-300" : "left-0.5 bg-white/30")} />
            </button>
            <span className="text-xs text-white/30">Stats hidden</span>
          </div>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          {Array.from({ length: game.TOTAL_ROUNDS }).map((_, i) => (
            <motion.div key={i}
              className={"w-2 h-2 rounded-full transition-colors " + (i < game.round ? "bg-green-400" : i === game.round && game.phase !== "result" ? "bg-blue-400" : "bg-white/10")}
              animate={{ scale: i === game.round && game.phase !== "result" ? 1.3 : 1 }} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {game.phase !== "result" ? (
            <motion.div key="draft" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
              <RosterGrid roster={game.roster} />
              <SlotMachine
                spinDisplay={game.spinDisplay} isSpinning={game.isSpinning}
                isLoading={game.isLoading} loadError={game.loadError}
                phase={game.phase} round={game.round} totalRounds={game.TOTAL_ROUNDS}
                skipsLeft={game.skipsLeft} onSpin={game.doSpin} onSkip={game.doSkip}
              />
              {game.phase === "pick" && game.currentSpin && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                  <PickPanel
                    currentSpin={game.currentSpin} players={game.currentPlayers}
                    roster={game.roster} selectedPos={game.selectedPos}
                    hoopIQ={game.hoopIQ} onSelectPos={game.selectPos} onPickPlayer={game.pickPlayer}
                  />
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <ResultScreen result={game.result} roster={game.roster} onReset={game.reset} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 text-center text-[10px] text-white/15">
          Scoring: pts floor {THRESHOLDS.pts} · reb {THRESHOLDS.reb} · ast {THRESHOLDS.ast} · stl {THRESHOLDS.stl} · blk {THRESHOLDS.blk}
        </div>
      </div>
    </div>
  );
}
