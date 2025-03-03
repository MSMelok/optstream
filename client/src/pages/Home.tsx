import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Info } from 'lucide-react';

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] p-8">
      {showWelcome && (
        <div className="fixed inset-0 bg-background/90 flex items-center justify-center z-50 animate-fade-out">
          <h1 className="text-6xl font-bold">Welcome to Stream</h1>
        </div>
      )}

      <div className="featured-content mb-12">
        <Card className="bg-gradient-to-r from-background to-secondary/50 border-0 p-8">
          <h2 className="text-4xl font-bold mb-2">News 12</h2>
          <p className="text-xl text-white/80 mb-6">Live: Breaking News Coverage</p>
          <div className="flex gap-4">
            <Button size="lg" className="gap-2">
              <Play className="w-5 h-5" /> Watch Now
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Info className="w-5 h-5" /> More Info
            </Button>
          </div>
        </Card>
      </div>

      <div className="recent-channels mb-12">
        <h3 className="text-xl font-semibold mb-4">Recent Channels</h3>
        <div className="grid grid-cols-5 gap-4">
          {[
            'https://images.unsplash.com/photo-1467991521834-fb8e202c7074',
            'https://images.unsplash.com/photo-1593784991095-a205069470b6',
            'https://images.unsplash.com/photo-1593305841991-05c297ba4575',
            'https://images.unsplash.com/photo-1528928441742-b4ccac1bb04c',
            'https://images.unsplash.com/photo-1596549341587-2298cf209975'
          ].map((src, i) => (
            <Card key={i} className="overflow-hidden hover:scale-105 transition-transform cursor-pointer">
              <img src={src} alt={`Channel ${i + 1}`} className="w-full h-48 object-cover" />
            </Card>
          ))}
        </div>
      </div>

      <div className="favorite-apps">
        <h3 className="text-xl font-semibold mb-4">Favorite Apps</h3>
        <div className="grid grid-cols-5 gap-4">
          {[
            'https://images.unsplash.com/photo-1611162616475-46b635cb6868',
            'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0',
            'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7',
            'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff',
            'https://images.unsplash.com/photo-1611162617474-5b21e879e113'
          ].map((src, i) => (
            <Card key={i} className="overflow-hidden hover:scale-105 transition-transform cursor-pointer">
              <img src={src} alt={`App ${i + 1}`} className="w-full h-48 object-cover" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
