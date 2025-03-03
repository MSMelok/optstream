import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Wifi, WifiOff } from "lucide-react";
import { SettingsManager } from '@/lib/settingsManager';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const [settingsManager] = useState(() => new SettingsManager());
  const [currentView, setCurrentView] = useState<string>('main');
  const [description, setDescription] = useState<string>('');
  const [showDevicePanel, setShowDevicePanel] = useState(false);
  const [devicePanelView, setDevicePanelView] = useState<string>('main');
  const [showAppDetails, setShowAppDetails] = useState<string | null>(null);
  const [showAllApps, setShowAllApps] = useState(false);

  const optimumTVSettings = [
    {
      id: 'favorite-channels',
      title: 'Favorite Channels',
      arrow: '>',
      description: 'You can set your favorite channels, then you can filter the guide to only show your favorite channels.'
    },
    {
      id: 'dvr',
      title: 'DVR Preferences',
      arrow: '>',
      description: 'Set or update your DVR recording and storage preferences.'
    },
    {
      id: 'sap',
      title: 'Secondary Audio Program (SAP)',
      arrow: '>',
      description: 'Set the default language for Optimum TV. Not all programming offers alternate languages.'
    },
    {
      id: 'parental',
      title: 'Parental Controls',
      arrow: '>',
      description: 'Parental Controls allow you to limit access to programming based on the rating or channel it appears on.'
    },
    {
      id: 'pin',
      title: 'Purchase PIN',
      arrow: '>',
      description: 'Create or enter a 4-digit code used to confirm movie rentals and charges to your service.'
    },
    {
      id: 'default-channel',
      title: 'Default Channel',
      arrow: 'News 12',
      description: 'You can change the channel that your Optimum TV services will start on.'
    },
    {
      id: 'account',
      title: 'My Account',
      arrow: '>',
      description: 'View and manage your Optimum account settings.'
    }
  ];

  const generalSettings = [
    {
      id: 'accessibility',
      title: 'Accessibility',
      arrow: '>',
      description: 'Access accessibility settings such as Closed Captions and Talkback.'
    },
    {
      id: 'device',
      title: 'Device & Remote Settings',
      arrow: '>',
      description: 'Access to Network and WiFi, Remote Control, and other settings for your Optimum Stream.'
    },
    {
      id: 'help',
      title: 'Help',
      arrow: '>',
      description: 'Get help with your Optimum Stream device and services.'
    }
  ];

  const devicePanelOptions = [
    { id: 'network', title: 'Network & Internet' },
    { id: 'accounts', title: 'Accounts & Sign In' },
    { id: 'apps', title: 'Apps' },
    { id: 'preferences', title: 'Device Preferences' },
    { id: 'tv', title: 'TV settings' },
    { id: 'remote', title: 'Remote & Accessories' }
  ];

  const handleMenuClick = (id: string) => {
    if (id === 'device') {
      setShowDevicePanel(true);
    } else {
      setCurrentView(id);
    }
  };

  const handleAppAction = (appName: string, action: 'force-stop' | 'clear-data' | 'clear-cache') => {
    let confirmed = false;
    switch (action) {
      case 'force-stop':
        confirmed = settingsManager.forceStopApp(appName);
        break;
      case 'clear-data':
        confirmed = settingsManager.clearAppData(appName);
        if (confirmed) {
          settingsManager.updateAppStorage(appName, 'data');
        }
        break;
      case 'clear-cache':
        confirmed = settingsManager.clearAppCache(appName);
        if (confirmed) {
          settingsManager.updateAppStorage(appName, 'cache');
        }
        break;
    }
  };

  const renderDevicePanelContent = () => {
    switch (devicePanelView) {
      case 'network':
        const networkState = settingsManager.getNetworkState();
        return (
          <div className="space-y-6">
            <div className="panel-section">
              <h3 className="text-lg font-semibold mb-4">Ethernet</h3>
              <p className="text-white/60">{networkState.ethernet.status}</p>
            </div>

            <div className="panel-section">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Wi-Fi</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={networkState.wifi.enabled}
                    onChange={(e) => settingsManager.handleWifiToggle(e.target.checked)} 
                  />
                  <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {networkState.wifi.enabled && (
                <div className="space-y-2">
                  <p className="text-white/60 mb-4">
                    Connected to: {networkState.wifi.connected || 'Not connected'}
                  </p>
                  <div className="space-y-2">
                    {networkState.wifi.availableNetworks.map((network: any, index: number) => (
                      <button
                        key={index}
                        className="w-full p-4 bg-white/5 rounded-lg flex items-center justify-between hover:bg-white/10 transition-colors"
                        onClick={() => settingsManager.connectToNetwork(network.name)}
                      >
                        <div className="flex items-center gap-3">
                          {network.signal === 'strong' ? (
                            <Wifi className="w-5 h-5 text-blue-400" />
                          ) : (
                            <WifiOff className="w-5 h-5 text-white/60" />
                          )}
                          <span>{network.name}</span>
                        </div>
                        {network.secured && <span className="text-white/60">Secured</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'accounts':
        const accountState = settingsManager.getAccountState();
        return (
          <div className="space-y-6">
            <div className="panel-section">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl">
                  {accountState.googleAccount.name[0]}
                </div>
                <div>
                  <h3 className="font-semibold">{accountState.googleAccount.name}</h3>
                  <p className="text-white/60">{accountState.googleAccount.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <button className="settings-button">
                  <span>Google Account settings</span>
                  <span className="text-muted-foreground">{'>'}</span>
                </button>
                <button className="settings-button">
                  <span>Privacy</span>
                  <span className="text-muted-foreground">{'>'}</span>
                </button>
                <button className="settings-button">
                  <span>Sync settings</span>
                  <span className="text-muted-foreground">{'>'}</span>
                </button>
              </div>
            </div>
          </div>
        );

      case 'apps':
        const appsState = settingsManager.getAppsState();
        if (showAppDetails) {
          const app = appsState.installed.find((a: any) => a.name === showAppDetails);
          return (
            <div className="space-y-6">
              <div className="panel-section">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-blue-600 flex items-center justify-center">
                    <span className="text-2xl">{app.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{app.name}</h3>
                    <p className="text-white/60">Version {app.version}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    className="settings-button"
                    onClick={() => handleAppAction(app.name, 'force-stop')}
                  >
                    Force Stop
                  </button>
                  <button
                    className="settings-button"
                    onClick={() => handleAppAction(app.name, 'clear-data')}
                  >
                    Clear Data ({app.dataSize})
                  </button>
                  <button
                    className="settings-button"
                    onClick={() => handleAppAction(app.name, 'clear-cache')}
                  >
                    Clear Cache ({app.cacheSize})
                  </button>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="space-y-6">
            {!showAllApps ? (
              <div className="panel-section">
                <button 
                  className="settings-button"
                  onClick={() => setShowAllApps(true)}
                >
                  <span>See all apps</span>
                  <span className="text-muted-foreground">{'>'}</span>
                </button>

                <div className="space-y-2 mt-6">
                  <h3 className="text-lg font-semibold mb-4">Recently opened apps</h3>
                  {appsState.installed
                    .filter(app => !app.system)
                    .slice(0, 5)
                    .map((app: any, index: number) => (
                      <button
                        key={index}
                        className="settings-button"
                        onClick={() => setShowAppDetails(app.name)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                            <span className="text-lg">{app.icon}</span>
                          </div>
                          <span>{app.name}</span>
                        </div>
                        <span className="text-white/60">{app.size}</span>
                      </button>
                    ))}
                </div>
              </div>
            ) : (
              <>
                <div className="panel-section">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">All apps</h3>
                    <button 
                      className="text-sm text-blue-400 hover:text-blue-300"
                      onClick={() => setShowAllApps(false)}
                    >
                      Back
                    </button>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <span>Show system apps</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={appsState.showSystemApps}
                        onChange={(e) => settingsManager.toggleSystemApps(e.target.checked)} 
                      />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="space-y-2">
                    {appsState.installed
                      .filter((app: any) => appsState.showSystemApps || !app.system)
                      .map((app: any, index: number) => (
                        <button
                          key={index}
                          className="settings-button"
                          onClick={() => setShowAppDetails(app.name)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                              <span className="text-lg">{app.icon}</span>
                            </div>
                            <span>{app.name}</span>
                          </div>
                          <span className="text-white/60">{app.size}</span>
                        </button>
                      ))}
                  </div>
                </div>
              </>
            )}
          </div>
        );

      case 'preferences':
        return (
          <div className="p-4 text-center text-white/60">
            Content coming soon...
          </div>
        );
      case 'tv':
        return (
          <div className="p-4 text-center text-white/60">
            Content coming soon...
          </div>
        );
      case 'remote':
        const remoteState = settingsManager.getRemoteState();
        return (
          <div className="space-y-6">
            <div className="panel-section">
              <button 
                className="settings-button"
                onClick={() => settingsManager.addRemote()}
              >
                <span>Add Stream Remote</span>
                <span className="text-muted-foreground">{'>'}</span>
              </button>
              <button 
                className="settings-button mt-4"
                onClick={() => settingsManager.addAccessory()}
              >
                <span>Add accessory</span>
                <span className="text-muted-foreground">{'>'}</span>
              </button>
              <button className="settings-button mt-4">
                <div className="flex flex-col items-start">
                  <span>Stream Remote</span>
                  <span className="text-sm text-green-400">Connected</span>
                </div>
                <span className="text-muted-foreground">{'>'}</span>
              </button>
            </div>

            <div className="panel-section">
              <h3 className="text-lg font-semibold mb-4">Connected devices</h3>
              {remoteState.devices.map((device: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="font-medium">{device.name}</h4>
                    <p className="text-white/60">Battery: {device.batteryLevel}</p>
                  </div>
                  <span className="text-green-400">Connected</span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4 text-center text-white/60">
            Content coming soon...
          </div>
        );
    }
  };

  return (
    <>
      <div className={`fixed top-0 right-0 w-[500px] h-full bg-background/95 border-l border-white/10 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="bg-card p-8 flex items-center gap-4">
          {currentView !== 'main' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentView('main')}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          )}
          <h2 className="text-2xl font-bold">Settings</h2>
          {currentView === 'main' && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={onClose}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          )}
        </div>

        <div className="mt-8 px-8">
          <div className="space-y-8">
            <div>
              <h3 className="text-muted-foreground mb-4">Optimum TV</h3>
              <div className="space-y-4">
                {optimumTVSettings.map((item) => (
                  <button
                    key={item.id}
                    className="settings-button"
                    onClick={() => handleMenuClick(item.id)}
                    onMouseEnter={() => setDescription(item.description)}
                    onMouseLeave={() => setDescription('')}
                  >
                    <span>{item.title}</span>
                    <span className="text-muted-foreground">{item.arrow}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-muted-foreground mb-4">General</h3>
              <div className="space-y-4">
                {generalSettings.map((item) => (
                  <button
                    key={item.id}
                    className="settings-button"
                    onClick={() => handleMenuClick(item.id)}
                    onMouseEnter={() => setDescription(item.description)}
                    onMouseLeave={() => setDescription('')}
                  >
                    <span>{item.title}</span>
                    <span className="text-muted-foreground">{item.arrow}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {description && (
          <div className="absolute bottom-8 left-8 right-8 text-center text-white/80">
            {description}
          </div>
        )}
      </div>

      {/* Device Settings Right Panel */}
      <div className={`fixed top-0 right-0 w-[500px] h-full bg-background/95 border-l border-white/10 transform transition-transform duration-300 ease-in-out ${showDevicePanel ? 'translate-x-0' : 'translate-x-full'}`} style={{ zIndex: 60 }}>
        <div className="bg-card p-8 flex items-center gap-4">
          {devicePanelView !== 'main' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (showAppDetails) {
                  setShowAppDetails(null);
                } else {
                  setDevicePanelView('main');
                }
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          )}
          <h2 className="text-2xl font-bold">
            {devicePanelView === 'main' ? 'Device & Remote Settings' : 
             showAppDetails ? showAppDetails :
             devicePanelOptions.find(opt => opt.id === devicePanelView)?.title}
          </h2>
          {devicePanelView === 'main' && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={() => {
                setShowDevicePanel(false);
                setDevicePanelView('main');
                setShowAppDetails(null);
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          )}
        </div>

        <div className="mt-8 px-8">
          {devicePanelView === 'main' ? (
            <div className="space-y-4">
              {devicePanelOptions.map((option) => (
                <button
                  key={option.id}
                  className="settings-button"
                  onClick={() => setDevicePanelView(option.id)}
                >
                  <span>{option.title}</span>
                  <span className="text-muted-foreground">{'>'}</span>
                </button>
              ))}
            </div>
          ) : (
            renderDevicePanelContent()
          )}
        </div>
      </div>
    </>
  );
}