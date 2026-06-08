import { motion, AnimatePresence } from "framer-motion";

export function SlotMachine({ spinDisplay, isSpinning, phase, round, totalRounds, skipsLeft, onSpin, onSkip }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4 text-center">
      <div className="text-xs text-white/40 uppercase tracking-widest mb-4">Round {round + 1} of {totalRounds}</div>
      <div className="flex justify-center gap-4 mb-6">
        <SlotBox label="Era" value={spinDisplay.era} spinning={isSpinning} />
        <SlotBox label="Team" value={spinDisplay.team} spinning={isSpinning} />
      </div>
      <button onClick={onSpin} disabled={phase !== "spin" || isSpinning}
        className="px-8 py-2.5 rounded-xl border border-white/20 text-sm font-medium text-white hover:bg-white/10 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer">
        {isSpinning ? "Spinning..." : "Spin"}
      </button>
      <div className="mt-3 flex items-center justify-center gap-2">
        <button onClick={onSkip} disabled={skipsLeft < 1 || phase !== "pick"}
          className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-white/40 hover:bg-white/5 active:scale-95 transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer">
          Skip this spin
        </button>
        <span className="text-[10px] text-white/20">{skipsLeft} skip remaining</span>
      </div>
    </div>
  );
}

function SlotBox({ label, value, spinning }) {
  return (
    <div className="bg-white/5 rounded-xl px-5 py-3 min-w-[130px]">
      <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1">{label}</div>
      <AnimatePresence mode="wait">
        <motion.div key={value} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 8, opacity: 0 }} transition={{ duration: 0.06 }}
          className={`text-lg font-semibold min-h-[28px] ${spinning ? "text-white/30" : "text-white"}`}>
          {value}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
