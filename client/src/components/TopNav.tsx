import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search, Settings } from "lucide-react";
import SettingsPanel from "./SettingsPanel";

export default function TopNav() {
  const [location] = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <header className="flex justify-between items-center px-12 py-4">
      <nav className="flex gap-6 text-lg font-semibold">
        <Link href="/">
          <a className={`nav-item ${location === '/' ? 'active' : ''}`}>Home</a>
        </Link>
        <Link href="/guide">
          <a className={`nav-item ${location === '/guide' ? 'active' : ''}`}>Guide</a>
        </Link>
        <Link href="/on-demand">
          <a className={`nav-item ${location === '/on-demand' ? 'active' : ''}`}>On Demand</a>
        </Link>
        <Link href="/sports">
          <a className={`nav-item ${location === '/sports' ? 'active' : ''}`}>Sports</a>
        </Link>
        <Link href="/dvr">
          <a className={`nav-item ${location === '/dvr' ? 'active' : ''}`}>DVR</a>
        </Link>
        <Link href="/apps">
          <a className={`nav-item ${location === '/apps' ? 'active' : ''}`}>Apps</a>
        </Link>
        <button className="nav-item">
          <Search className="w-5 h-5" />
        </button>
        <button 
          className="nav-item"
          onClick={() => setShowSettings(true)}
        >
          <Settings className="w-5 h-5" />
        </button>
      </nav>

      <div className="flex items-center gap-6">
        <div className="text-xl font-bold">
          <span className="font-black">Optimum</span>
          <span className="text-[#f66608]">.</span>
          <span>tv</span>
        </div>
        <div className="text-xl font-bold">
          {formatTime(currentTime)}
        </div>
      </div>

      <SettingsPanel 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </header>
  );
}
