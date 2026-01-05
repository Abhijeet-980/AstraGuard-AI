'use client';

import { useState, useEffect } from 'react';
import { MissionState } from '../types/dashboard';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { VerticalNav } from '../components/dashboard/VerticalNav';
import { MissionPanel } from '../components/mission/MissionPanel';
import { AlertFeed, SystemHealth, CommandPanel } from '../components/dashboard/EnhancedFeatures';
import dashboardData from '../mocks/dashboard.json';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mission' | 'systems'>('mission');
  const [mission, setMission] = useState<MissionState>(dashboardData.mission as MissionState);
  const [selectedSat, setSelectedSat] = useState<string>('');
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      setMission((prev) => ({
        ...prev,
        updated: new Date().toLocaleTimeString('en-IN'),
      }));
    }, 1000 * 30);
    return () => clearInterval(iv);
  }, []);

  const handleTabChange = (tab: 'mission' | 'systems') => {
    setActiveTab(tab);
  };

  return (
    <div className="dashboard-container min-h-screen text-white font-mono antialiased">
      <DashboardHeader data={mission} />

      <div className="flex h-[calc(100vh-80px)] mt-[80px]">
        <VerticalNav />

        <main className="flex-1 p-6 overflow-auto">
          <nav
            className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-cyan-500/30 mb-8 pb-4 -mx-6 px-6 flex items-center justify-between"
            role="tablist"
            aria-label="Mission Control Tabs"
          >
            <div className="flex gap-2">
              <button
                role="tab"
                aria-selected={activeTab === 'mission'}
                aria-controls="mission-panel"
                id="mission-tab"
                className={`px-6 py-3 rounded-t-lg font-mono text-lg font-semibold transition-all duration-300 ${
                  activeTab === 'mission'
                    ? 'tab-active-cyan bg-cyan-500/10 border-b-2 border-cyan-400 text-cyan-300 glow-cyan'
                    : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/5'
                }`}
                onClick={() => handleTabChange('mission')}
              >
                Mission
              </button>

              <button
                role="tab"
                aria-selected={activeTab === 'systems'}
                aria-controls="systems-panel"
                id="systems-tab"
                className={`ml-2 px-6 py-3 rounded-t-lg font-mono text-lg font-semibold transition-all duration-300 ${
                  activeTab === 'systems'
                    ? 'tab-active-magenta bg-magenta-500/10 border-b-2 border-magenta-400 text-magenta-300 glow-magenta'
                    : 'text-gray-400 hover:text-magenta-300 hover:bg-magenta-500/5'
                }`}
                onClick={() => handleTabChange('systems')}
              >
                Systems
              </button>
            </div>

            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="px-4 py-2 text-sm bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-500/30 rounded text-cyan-400 transition glow-cyan"
            >
              {showSidebar ? '✕ Hide' : '⊕ Show'} Sidebar
            </button>
          </nav>

          <div className="flex gap-6 h-[calc(100vh-200px)]">
            {/* Main Content */}
            <div className="flex-1 overflow-auto">
              <div className="min-h-[600px]">
                <section
                  id="mission-panel"
                  role="tabpanel"
                  aria-labelledby="mission-tab"
                  className={`transition-all duration-500 ${
                    activeTab === 'mission'
                      ? 'scale-100 opacity-100 pointer-events-auto'
                      : 'absolute scale-95 opacity-0 pointer-events-none'
                  }`}
                >
                  <MissionPanel onSelectSatellite={setSelectedSat} />
                </section>

                <section
                  id="systems-panel"
                  role="tabpanel"
                  aria-labelledby="systems-tab"
                  className={`p-8 rounded-2xl border-2 transition-all duration-500 ${
                    activeTab === 'systems'
                      ? 'border-magenta-500/50 bg-magenta-500/5 scale-100 opacity-100'
                      : 'absolute border-transparent scale-95 opacity-0'
                  }`}
                >
                  <div className="text-center py-20 text-gray-500">
                    <h2 className="text-4xl font-bold mb-4 text-magenta-400 glow-magenta">
                      Systems Health
                    </h2>
                    <p className="text-xl">Ready for KPIs, breakers, and telemetry charts (#89)</p>
                  </div>
                </section>
              </div>
            </div>

            {/* Right Sidebar */}
            {showSidebar && (
              <aside className="w-96 flex flex-col gap-6 overflow-auto">
                <AlertFeed />
                <SystemHealth />
                <CommandPanel selectedSat={selectedSat} />
              </aside>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

