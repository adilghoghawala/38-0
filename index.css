import { PLAYERS, POSITIONS, playerRating } from "../data/players";

export function PickPanel({ currentSpin, roster, selectedPos, hoopIQ, onSelectPos, onPickPlayer }) {
  if (!currentSpin) return null;

  const players = PLAYERS[currentSpin] || [];
  const filledPositions = new Set(Object.keys(roster));
  const availablePositions = POSITIONS.filter(p => !filledPositions.has(p));

  const eligibleForSelected = selectedPos
    ? players.filter(p => p.pos.includes(selectedPos)).sort((a, b) => playerRating(b) - playerRating(a))
    : [];

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
      <div className="text-xs text-white/40 mb-3">Pick a position for this era's player:</div>

      <div className="flex flex-wrap gap-2 mb-4">
        {availablePositions.map(pos => {
          const eligible = players.some(p => p.pos.includes(pos));
          return (
            <button
              key={pos}
              onClick={() => onSelectPos(pos)}
              disabled={!eligible}
              className={`px-4 py-1.5 rounded-lg text-sm border transition-all cursor-pointer active:scale-95 ${
                selectedPos === pos
                  ? "border-blue-400/60 bg-blue-400/10 text-blue-300"
                  : "border-white/10 text-white/50 hover:bg-white/5"
              } disabled:opacity-20 disabled:cursor-not-allowed`}
            >
              {pos}
            </button>
          );
        })}
      </div>

      {selectedPos && (
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {eligibleForSelected.length === 0 && (
            <div className="text-xs text-white/30 py-2">No eligible {selectedPos}s from this team/era</div>
          )}
          {eligibleForSelected.map(player => (
            <button
              key={player.name}
              onClick={() => onPickPlayer(player.name)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-white/8 bg-white/[0.03] hover:bg-white/8 active:scale-[0.99] transition-all text-left cursor-pointer"
            >
              <div>
                <div className="text-sm font-medium text-white">
                  {hoopIQ ? "???" : player.name}
                </div>
                {!hoopIQ && (
                  <div className="text-[11px] text-white/40 mt-0.5">
                    {player.pts.toFixed(1)} pts · {player.reb.toFixed(1)} reb · {player.ast.toFixed(1)} ast · {player.stl.toFixed(1)} stl · {player.blk.toFixed(1)} blk
                  </div>
                )}
                {hoopIQ && (
                  <div className="text-[11px] text-white/30 mt-0.5">Stats hidden — trust your gut</div>
                )}
              </div>
              {!hoopIQ && (
                <div className="text-sm font-semibold text-white/30 ml-4 shrink-0">
                  {playerRating(player)}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
