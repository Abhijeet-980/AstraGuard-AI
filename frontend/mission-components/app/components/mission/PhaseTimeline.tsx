'use client';

import { MissionPhase } from '../../types/mission';

interface Props {
  phases: MissionPhase[];
}

export const PhaseTimeline: React.FC<Props> = ({ phases }) => {
  const activeIndex = phases.findIndex((p) => p.isActive);
  const activePhase = phases[activeIndex];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-cyan-400 mb-4 glow-cyan">
        Mission Phase Timeline
      </h3>
      <div className="relative">
        <div className="flex items-center w-full h-4 bg-black/50 rounded-full border border-cyan-500/30">
          {phases.map((phase) => (
            <div
              key={phase.name}
              className={`h-4 rounded-full transition-all ${
                phases.indexOf(phase) <= activeIndex
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 glow-cyan shadow-lg'
                  : 'bg-gray-800/50'
              }`}
              style={{ width: `${100 / phases.length}%` }}
            />
          ))}
        </div>

        {activePhase && (
          <div className="absolute -bottom-20 left-0 w-full flex items-center justify-start px-2">
            <div className="bg-black/90 backdrop-blur-sm p-3 rounded-lg border border-cyan-500/50 glow-cyan min-w-[240px]">
              <div className="text-sm font-mono opacity-75 mb-1">{activePhase.name}</div>
              <div className="text-lg font-bold text-cyan-400">
                {activePhase.progress}% • {activePhase.eta}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-5 gap-2 mt-12">
        {phases.map((phase) => (
          <div
            key={phase.name}
            className={`p-2 rounded-lg text-center text-xs transition-all ${
              phase.isActive
                ? 'bg-cyan-500/20 border-2 border-cyan-400 glow-cyan font-bold text-cyan-300'
                : 'bg-gray-900/50 border border-gray-700 hover:bg-gray-800'
            }`}
          >
            <div className="truncate">{phase.name.split(' ')[0]}</div>
            <div className="text-lg font-bold mt-1">{phase.progress}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};
