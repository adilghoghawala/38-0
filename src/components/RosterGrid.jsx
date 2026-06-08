import { POSITIONS } from "../data/players";

export function RosterGrid({ roster }) {
  return (
    <div className="grid grid-cols-5 gap-2 mb-6">
      {POSITIONS.map(pos => {
        const p = roster[pos];
        return (
          <div key={pos} className={"rounded-xl border p-3 min-h-[90px] " + (p ? "bg-white/5 border-white/10" : "bg-white/[0.02] border-white/5 border-dashed")}>
            <div className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-1">{pos}</div>
            {p ? (
              <>
                <div className="text-sm font-medium text-white leading-tight">{p.name}</div>
                <div className="text-[10px] text-white/40 mt-0.5">{p._era}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {[{l:"pts",v:p.pts},{l:"reb",v:p.reb},{l:"ast",v:p.ast}].map(({l,v}) => (
                    <span key={l} className="text-[9px] bg-white/10 text-white/50 px-1.5 py-0.5 rounded-full">{v.toFixed(1)} {l}</span>
                  ))}
                </div>
              </>
            ) : <div className="text-xs text-white/20 mt-1">Empty</div>}
          </div>
        );
      })}
    </div>
  );
}
