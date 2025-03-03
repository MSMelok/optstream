import { Card } from '@/components/ui/card';

export default function Apps() {
  const apps = {
    featured: [
      { name: 'Optimum TV', icon: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868' },
      { name: 'Netflix', icon: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0' },
      { name: 'Prime Video', icon: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7' },
      { name: 'HBO Max', icon: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff' },
      { name: 'Disney+', icon: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113' }
    ],
    system: [
      { name: 'Settings', icon: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868' },
      { name: 'Play Store', icon: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0' }
    ]
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Apps</h1>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Featured Apps</h2>
        <div className="grid grid-cols-6 gap-6">
          {apps.featured.map((app, i) => (
            <Card key={i} className="p-4 hover:bg-white/5 transition-colors cursor-pointer">
              <img src={app.icon} alt={app.name} className="w-16 h-16 rounded-xl mb-3 mx-auto" />
              <p className="text-center text-sm">{app.name}</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-6">System Apps</h2>
        <div className="grid grid-cols-6 gap-6">
          {apps.system.map((app, i) => (
            <Card key={i} className="p-4 hover:bg-white/5 transition-colors cursor-pointer">
              <img src={app.icon} alt={app.name} className="w-16 h-16 rounded-xl mb-3 mx-auto" />
              <p className="text-center text-sm">{app.name}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
