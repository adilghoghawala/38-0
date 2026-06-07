import { useRef } from "react";
import { POSITIONS, THRESHOLDS } from "../data/teams";
import html2canvas from "html2canvas";

const STAT_LABELS = { pts: "Points", reb: "Rebounds", ast: "Assists", stl: "Steals", blk: "Blocks" };

export function ResultScreen({ result, roster, onReset }) {
  const { wins, totals, record, grade, flavor, color } = result;
  const perfect = wins === 38;
  const cardRef = useRef(null);

  async function shareResult() {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, { backgroundColor: "#0f0f0f", scale: 2 });
      const link = document.createElement("a");
      link.download = "38-0-result.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) { console.error(e); }
  }

  return (
    <div className="space-y-4">
      <div ref={cardRef} className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 text-center">
        <div className="text-[10px] text-white/30 uppercase tracking-widest mb-3">38-0 · NBA Playoffs</div>
        <div className={`text-6xl font-bold mb-1 ${color}`}>{record}</div>
        <div className="text-xl font-medium text-white mb-1">{grade}</div>
        <div className="text-sm text-white/40 mb-6">{flavor}</div>
        <div className="grid grid-cols-5 gap-2 mb-6">
          {Object.keys(THRESHOLDS).map(k => {
            const pass = totals[k] >= THRESHOLDS[k];
            return (
              <div key={k} className="bg-white/5 rounded-xl p-3">
                <div className="text-[10px] text-white/30 mb-1">{STAT_LABELS[k]}</div>
                <div className={`text-base font-semibold ${pass ? "text-green-400" : "text-red-400"}`}>{totals[k].toFixed(1)}</div>
                <div className="text-[9px] text-white/20">floor {THRESHOLDS[k]}</div>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-5 gap-2">
          {POSITIONS.map(pos => {
            const p = roster[pos];
            return (
              <div key={pos} className="bg-white/5 rounded-xl p-2.5">
                <div className="text-[9px] text-white/30 uppercase tracking-widest mb-1">{pos}</div>
                <div className="text-xs font-medium text-white leading-tight">{p?.name ?? "—"}</div>
                <div className="text-[9px] text-white/30 mt-0.5">{p?._era ?? ""}</div>
              </div>
            );
          })}
        </div>
        {perfect && <div className="mt-4 text-yellow-400/80 text-xs font-medium tracking-wide">Perfect. The GOAT lineup.</div>}
      </div>
      <div className="flex gap-3">
        <button onClick={shareResult} className="flex-1 py-2.5 rounded-xl border border-white/20 text-sm text-white/70 hover:bg-white/5 active:scale-95 transition-all cursor-pointer">Save as image</button>
        <button onClick={onReset} className="flex-1 py-2.5 rounded-xl border border-white/20 text-sm text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer">Play again</button>
      </div>
    </div>
  );
}
