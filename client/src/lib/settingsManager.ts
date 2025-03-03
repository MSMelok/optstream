export class SettingsManager {
  private state: any;

  constructor() {
    this.state = this.loadState();
  }

  private loadState() {
    const savedState = localStorage.getItem('streamSettings');
    return savedState ? JSON.parse(savedState) : {
      network: {
        wifi: {
          enabled: true,
          connected: "Home_Network_5G",
          availableNetworks: [
            { name: "Home_Network_5G", signal: "strong", secured: true, connected: true },
            { name: "Neighbor_WiFi", signal: "medium", secured: true, connected: false },
            { name: "Public_WiFi", signal: "weak", secured: false, connected: false },
            { name: "Guest_Network", signal: "strong", secured: true, connected: false }
          ]
        },
        ethernet: {
          connected: false,
          status: "Not connected"
        }
      },
      account: {
        googleAccount: {
          email: "user@gmail.com",
          name: "Stream User",
          sync: true,
          services: ["Play Store", "YouTube", "Google Play Games"]
        }
      },
      apps: {
        installed: [
          {
            name: "Optimum TV",
            version: "2.1.0",
            size: "1.2 GB",
            dataSize: "800 MB",
            cacheSize: "400 MB",
            system: true,
            icon: "O"
          },
          {
            name: "Netflix",
            version: "8.5.0",
            size: "500 MB",
            dataSize: "200 MB",
            cacheSize: "150 MB",
            system: false,
            icon: "N"
          },
          {
            name: "YouTube",
            version: "17.49.37",
            size: "400 MB",
            dataSize: "150 MB",
            cacheSize: "100 MB",
            system: false,
            icon: "Y"
          },
          {
            name: "Prime Video",
            version: "3.0.355",
            size: "350 MB",
            dataSize: "120 MB",
            cacheSize: "80 MB",
            system: false,
            icon: "P"
          },
          {
            name: "Disney+",
            version: "2.15.0",
            size: "450 MB",
            dataSize: "180 MB",
            cacheSize: "90 MB",
            system: false,
            icon: "D"
          },
          {
            name: "Hulu",
            version: "4.47.0",
            size: "380 MB",
            dataSize: "140 MB",
            cacheSize: "85 MB",
            system: false,
            icon: "H"
          },
          {
            name: "HBO Max",
            version: "52.15.0",
            size: "420 MB",
            dataSize: "160 MB",
            cacheSize: "95 MB",
            system: false,
            icon: "H"
          },
          {
            name: "Peacock",
            version: "3.2.0",
            size: "390 MB",
            dataSize: "145 MB",
            cacheSize: "88 MB",
            system: false,
            icon: "P"
          },
          {
            name: "ESPN",
            version: "6.75.0",
            size: "360 MB",
            dataSize: "130 MB",
            cacheSize: "75 MB",
            system: false,
            icon: "E"
          },
          {
            name: "Spotify",
            version: "8.8.0",
            size: "320 MB",
            dataSize: "110 MB",
            cacheSize: "70 MB",
            system: false,
            icon: "S"
          },
          {
            name: "Chrome",
            version: "120.0",
            size: "280 MB",
            dataSize: "100 MB",
            cacheSize: "65 MB",
            system: true,
            icon: "C"
          },
          {
            name: "Play Store",
            version: "33.8.17",
            size: "250 MB",
            dataSize: "90 MB",
            cacheSize: "60 MB",
            system: true,
            icon: "P"
          },
          {
            name: "Google Play Services",
            version: "23.45.16",
            size: "300 MB",
            dataSize: "120 MB",
            cacheSize: "80 MB",
            system: true,
            icon: "G"
          },
          {
            name: "Android System",
            version: "13.0",
            size: "1.5 GB",
            dataSize: "500 MB",
            cacheSize: "200 MB",
            system: true,
            icon: "A"
          },
          {
            name: "System UI",
            version: "13.0",
            size: "800 MB",
            dataSize: "300 MB",
            cacheSize: "150 MB",
            system: true,
            icon: "S"
          }
        ],
        showSystemApps: false,
        showAllApps: false
      },
      remote: {
        devices: [
          {
            name: "Stream Remote 1",
            connected: true,
            batteryLevel: "85%",
            lastConnected: "Now"
          }
        ]
      },
      display: {
        resolution: '1080p',
        hdr: true,
        audioOutput: 'HDMI'
      },
      storage: {
        total: '32 GB',
        used: '18.5 GB',
        free: '13.5 GB'
      }
    };
  }

  private saveState() {
    localStorage.setItem('streamSettings', JSON.stringify(this.state));
  }

  handleWifiToggle(enabled: boolean) {
    this.state.network.wifi.enabled = enabled;
    this.saveState();
  }

  connectToNetwork(networkName: string) {
    this.state.network.wifi.connected = networkName;
    this.state.network.wifi.availableNetworks = this.state.network.wifi.availableNetworks.map((network: any) => ({
      ...network,
      connected: network.name === networkName
    }));
    this.saveState();
  }

  toggleSystemApps(show: boolean) {
    this.state.apps.showSystemApps = show;
    this.saveState();
  }

  toggleAllApps(show: boolean) {
    this.state.apps.showAllApps = show;
    this.saveState();
  }

  forceStopApp(appName: string): boolean {
    return window.confirm(`Are you sure you want to force stop ${appName}? This may cause the app to misbehave.`);
  }

  clearAppData(appName: string): boolean {
    return window.confirm(`Are you sure you want to clear all data for ${appName}? This will permanently delete all app data including accounts, settings, and files.`);
  }

  clearAppCache(appName: string): boolean {
    return window.confirm(`Clear cache for ${appName}?`);
  }

  updateAppStorage(appName: string, action: 'data' | 'cache') {
    const app = this.state.apps.installed.find((a: any) => a.name === appName);
    if (app) {
      if (action === 'data') {
        app.dataSize = "0 B";
      } else {
        app.cacheSize = "0 B";
      }
      this.saveState();
    }
  }

  addRemote() {
    alert("Searching for new Stream Remote...\nPress and hold the Home button on your remote to begin pairing.");
  }

  addAccessory() {
    alert("Searching for nearby Bluetooth accessories...\nMake sure your device is in pairing mode.");
  }

  getNetworkState() {
    return this.state.network;
  }

  getAccountState() {
    return this.state.account;
  }

  getAppsState() {
    return this.state.apps;
  }

  getRemoteState() {
    return this.state.remote;
  }
  updatePanel(panelId: string) {
    const panel = document.getElementById(`${panelId}-panel`);
    if (!panel) return;

    switch (panelId) {
      case 'network':
        this.renderNetworkPanel(panel);
        break;
      case 'display':
        this.renderDisplayPanel(panel);
        break;
      case 'remote':
        this.renderRemotePanel(panel);
        break;
      case 'storage':
        this.renderStoragePanel(panel);
        break;
      case 'about':
        this.renderAboutPanel(panel);
        break;
      case 'account':
        this.renderAccountPanel(panel);
        break;
      case 'apps':
        this.renderAppsPanel(panel);
        break;
    }
  }

  private renderNetworkPanel(panel: HTMLElement) {
    panel.innerHTML = `
      <div class="panel-section">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">WiFi</h3>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer" ${this.state.network.wifi.enabled ? 'checked' : ''}>
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <p class="text-white/60">Connected to: ${this.state.network.wifi.connected || 'Not connected'}</p>
        <div>
          <h3>Available Networks:</h3>
          <ul>
            ${this.state.network.wifi.availableNetworks.map((network: any) => `
              <li>${network.name} - Signal: ${network.signal}, Secured: ${network.secured ? 'Yes' : 'No'}, Connected: ${network.connected ? 'Yes' : 'No'}</li>
            `).join('')}
          </ul>
        </div>
        <div>
          <h3>Ethernet:</h3>
          <p class="text-white/60">${this.state.network.ethernet.status}</p>
        </div>
      </div>
    `;
  }

  private renderDisplayPanel(panel: HTMLElement) {
    panel.innerHTML = `
      <div class="panel-section">
        <h3 class="text-lg font-semibold mb-4">Resolution</h3>
        <select class="w-full bg-secondary/20 border border-white/20 rounded p-2">
          <option value="2160p" ${this.state.display.resolution === '2160p' ? 'selected' : ''}>4K (2160p)</option>
          <option value="1080p" ${this.state.display.resolution === '1080p' ? 'selected' : ''}>Full HD (1080p)</option>
          <option value="720p" ${this.state.display.resolution === '720p' ? 'selected' : ''}>HD (720p)</option>
        </select>
      </div>
    `;
  }

  private renderRemotePanel(panel: HTMLElement) {
    panel.innerHTML = `
      <div class="panel-section">
        <h3 class="text-lg font-semibold mb-4">Paired Devices</h3>
        ${this.state.remote.devices.map((remote: any) => `
          <div class="flex items-center justify-between p-3 bg-secondary/20 rounded mb-2">
            <span>${remote.name}</span>
            <span class="text-white/60">Battery: ${remote.batteryLevel}, Last Connected: ${remote.lastConnected}</span>
          </div>
        `).join('')}
        <button onclick="settingsManager.addRemote()">Add Remote</button>
      </div>
    `;
  }

  private renderStoragePanel(panel: HTMLElement) {
    const usedPercentage = (parseFloat(this.state.storage.used) / parseFloat(this.state.storage.total)) * 100;

    panel.innerHTML = `
      <div class="panel-section">
        <h3 class="text-lg font-semibold mb-4">Storage Usage</h3>
        <div class="w-full h-2 bg-secondary/20 rounded overflow-hidden">
          <div class="h-full bg-blue-600" style="width: ${usedPercentage}%"></div>
        </div>
        <div class="flex justify-between mt-2 text-white/60">
          <span>Used: ${this.state.storage.used}</span>
          <span>Free: ${this.state.storage.free}</span>
        </div>
      </div>
    `;
  }

  private renderAboutPanel(panel: HTMLElement) {
    panel.innerHTML = `
      <div class="panel-section">
        <h3 class="text-lg font-semibold mb-4">Device Information</h3>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span>Model</span>
            <span class="text-white/60">Optimum Stream Box</span>
          </div>
          <div class="flex justify-between">
            <span>Software Version</span>
            <span class="text-white/60">2.1.0</span>
          </div>
          <div class="flex justify-between">
            <span>Serial Number</span>
            <span class="text-white/60">OSB123456789</span>
          </div>
        </div>
      </div>
    `;
  }

  private renderAccountPanel(panel: HTMLElement) {
    panel.innerHTML = `
      <div class="panel-section">
        <h3 class="text-lg font-semibold mb-4">Google Account</h3>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span>Email</span>
            <span class="text-white/60">${this.state.account.googleAccount.email}</span>
          </div>
          <div class="flex justify-between">
            <span>Name</span>
            <span class="text-white/60">${this.state.account.googleAccount.name}</span>
          </div>
          <div class="flex justify-between">
            <span>Sync</span>
            <span class="text-white/60">${this.state.account.googleAccount.sync ? 'Enabled' : 'Disabled'}</span>
          </div>
          <div>
            <span>Services:</span>
            <ul>
            ${this.state.account.googleAccount.services.map((service: string) => `<li>${service}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  private renderAppsPanel(panel: HTMLElement) {
    panel.innerHTML = `
      <div class="panel-section">
        <h3 class="text-lg font-semibold mb-4">App Management</h3>
        <div class="mb-4">
          <label>
            <input type="checkbox" ${this.state.apps.showSystemApps ? 'checked' : ''} onchange="settingsManager.toggleSystemApps(this.checked)"> Show System Apps
          </label>
          <label>
            <input type="checkbox" ${this.state.apps.showAllApps ? 'checked' : ''} onchange="settingsManager.toggleAllApps(this.checked)"> See All Apps
          </label>
        </div>
        <ul>
          ${this.state.apps.installed.filter((app: any) => this.state.apps.showSystemApps || !app.system || this.state.apps.showAllApps).map((app: any) => `
            <li class="flex items-center space-x-2">
              <span class="text-xl font-bold">${app.icon}</span>
              <div>
                <span>${app.name} (${app.version}) - Size: ${app.size}, Data: ${app.dataSize}, Cache: ${app.cacheSize}</span>
                <div class="flex space-x-2 mt-1">
                  <button onclick="settingsManager.forceStopApp('${app.name}')">Force Stop</button>
                  <button onclick="settingsManager.updateAppStorage('${app.name}', 'data')">Clear Data</button>
                  <button onclick="settingsManager.updateAppStorage('${app.name}', 'cache')">Clear Cache</button>
                </div>
              </div>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }
}