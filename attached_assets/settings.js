// Mock data for WiFi networks and device settings
const mockNetworks = [
  { ssid: 'Home_WiFi_2.4G', strength: 4, secured: true },
  { ssid: 'Neighbor_5G', strength: 3, secured: true },
  { ssid: 'Public_WiFi', strength: 2, secured: false },
  { ssid: 'Guest_Network', strength: 1, secured: true }
];

// Mock data for apps
const mockApps = {
  optimum: {
    name: 'Optimum TV',
    icon: 'https://i.imgur.com/XYZ123.png',
    version: '2.1.0',
    storage: {
      total: '1.2 GB',
      data: '800 MB',
      cache: '400 MB'
    }
  },
  netflix: {
    name: 'Netflix',
    icon: 'https://i.imgur.com/ABC456.png',
    version: '8.4.0',
    storage: {
      total: '2.1 GB',
      data: '1.5 GB',
      cache: '600 MB'
    }
  }
};

// Device settings structure
const deviceSettings = {
  network: {
    title: 'Network & Internet',
    icon: 'fa-wifi',
    template: 'wifi-panel-template'
  },
  display: {
    title: 'Display & Sound',
    icon: 'fa-tv',
    template: 'display-panel-template'
  },
  remote: {
    title: 'Remote & Accessories',
    icon: 'fa-gamepad',
    template: 'remote-panel-template'
  },
  storage: {
    title: 'Storage',
    icon: 'fa-hard-drive',
    template: 'storage-panel-template'
  },
  about: {
    title: 'About',
    icon: 'fa-info-circle',
    template: 'about-panel-template'
  }
};

class SettingsManager {
  constructor() {
    this.state = this.loadState();
    this.currentPanel = null;
    this.panelContainer = document.querySelector('.right-panel-stack');
    this.panelHistory = [];
    
    // Initialize templates
    this.templates = {};
    Object.keys(deviceSettings).forEach(key => {
      const templateId = deviceSettings[key].template;
      const template = document.getElementById(templateId);
      if (template) {
        this.templates[key] = template;
      }
    });

    this.templates.deviceMenu = document.getElementById('device-menu-template');
    this.templates.appSettings = document.getElementById('app-settings-template');

    this.initializeEventListeners();
  }

  loadState() {
    const savedState = localStorage.getItem('optimumSettings');
    return savedState ? JSON.parse(savedState) : {
      wifi: {
        enabled: true,
        connected: null
      },
      display: {
        resolution: '1080p',
        hdr: true,
        audioOutput: 'HDMI'
      },
      remote: {
        paired: ['Optimum Remote 1'],
        batteryLevel: '85%'
      },
      storage: {
        total: '32 GB',
        used: '18.5 GB',
        free: '13.5 GB'
      },
      apps: mockApps,
      language: 'English',
      parentalControls: {
        enabled: false,
        pin: null
      }
    };
  }

  saveState() {
    localStorage.setItem('optimumSettings', JSON.stringify(this.state));
  }

  showDeviceSettings() {
    if (this.currentPanel) {
      this.closePanel();
      return;
    }
    
    this.createMainPanel();
  }

  createMainPanel() {
    if (!this.templates.deviceMenu) return;
    
    const panel = this.templates.deviceMenu.content.cloneNode(true);
    const panelElement = panel.querySelector('.right-panel');
    
    this.currentPanel = panelElement;
    this.panelContainer.appendChild(panelElement);
    
    this.initializeDeviceMenu(panelElement);
    
    requestAnimationFrame(() => {
      panelElement.classList.add('active');
    });
  }

  updatePanelContent(template, title) {
    if (!this.currentPanel || !template) return;

    // Store current content for back navigation
    const currentContent = this.currentPanel.querySelector('.right-panel-content').innerHTML;
    const currentTitle = this.currentPanel.querySelector('.right-panel-header h2').textContent;
    this.panelHistory.push({ content: currentContent, title: currentTitle });

    // Update header
    const header = this.currentPanel.querySelector('.right-panel-header h2');
    if (header) {
      header.textContent = title;
    }

    // Update content
    const content = template.content.cloneNode(true);
    const panelContent = this.currentPanel.querySelector('.right-panel-content');
    panelContent.innerHTML = '';
    panelContent.appendChild(content);

    // Initialize the new content
    this.initializePanelContent(this.currentPanel);
  }

  goBack() {
    if (this.panelHistory.length === 0) {
      this.closePanel();
      return;
    }

    const previous = this.panelHistory.pop();
    const header = this.currentPanel.querySelector('.right-panel-header h2');
    const content = this.currentPanel.querySelector('.right-panel-content');

    if (header && content && previous) {
      header.textContent = previous.title;
      content.innerHTML = previous.content;
      this.initializeDeviceMenu(this.currentPanel);
    }
  }

  closePanel() {
    if (this.currentPanel) {
      this.currentPanel.classList.remove('active');
      
      setTimeout(() => {
        if (this.currentPanel && this.currentPanel.parentNode) {
          this.currentPanel.parentNode.removeChild(this.currentPanel);
        }
        this.currentPanel = null;
        this.panelHistory = [];
      }, 300);
    }
  }

  initializePanelContent(panel) {
    const header = panel.querySelector('.right-panel-header h2');
    if (!header) return;

    const type = header.textContent;
    
    switch (type) {
      case 'Network & Internet':
        this.initializeWiFiPanel(panel);
        break;
      case 'Display & Sound':
        this.initializeDisplayPanel(panel);
        break;
      case 'Remote & Accessories':
        this.initializeRemotePanel(panel);
        break;
      case 'Storage':
        this.initializeStoragePanel(panel);
        break;
      case 'About':
        this.initializeAboutPanel(panel);
        break;
      case 'App Settings':
        this.initializeAppSettings(panel);
        break;
    }

    // Add back button functionality
    const backButton = panel.querySelector('.back-button');
    if (backButton) {
      backButton.addEventListener('click', () => this.goBack());
    }
  }

  initializeDeviceMenu(panel) {
    const menuList = panel.querySelector('.settings-menu-list');
    if (!menuList) return;
    
    menuList.innerHTML = ''; // Clear existing items
    
    Object.entries(deviceSettings).forEach(([key, setting]) => {
      const menuItem = document.createElement('div');
      menuItem.className = 'settings-menu-item';
      menuItem.innerHTML = `
        <i class="fas ${setting.icon}"></i>
        <span>${setting.title}</span>
        <i class="fas fa-chevron-right"></i>
      `;
      
      menuItem.addEventListener('click', () => {
        const template = this.templates[key];
        if (template) {
          this.updatePanelContent(template, setting.title);
        }
      });
      
      menuList.appendChild(menuItem);
    });
  }

  initializeWiFiPanel(panel) {
    const networkList = panel.querySelector('#network-list');
    const wifiToggle = panel.querySelector('#wifi-toggle');
    const currentNetwork = panel.querySelector('#current-network');
    
    if (!networkList || !wifiToggle || !currentNetwork) return;

    // Set initial state
    wifiToggle.checked = this.state.wifi.enabled;
    currentNetwork.textContent = this.state.wifi.connected || 'Not connected';
    
    // Add networks
    networkList.innerHTML = ''; // Clear existing networks
    mockNetworks.forEach(network => {
      const networkElement = document.createElement('div');
      networkElement.className = 'network-item';
      networkElement.innerHTML = `
        <div class="network-info">
          <span class="network-name">${network.ssid}</span>
          <div class="network-signal">
            ${Array(network.strength).fill('<i class="fas fa-signal"></i>').join('')}
          </div>
        </div>
        ${network.secured ? '<i class="fas fa-lock"></i>' : ''}
      `;
      
      networkElement.addEventListener('click', () => this.connectToNetwork(network));
      networkList.appendChild(networkElement);
    });
    
    // Toggle WiFi
    wifiToggle.addEventListener('change', () => {
      this.state.wifi.enabled = wifiToggle.checked;
      if (!wifiToggle.checked) {
        this.state.wifi.connected = null;
        currentNetwork.textContent = 'Not connected';
      }
      this.saveState();
    });
  }

  initializeDisplayPanel(panel) {
    const content = panel.querySelector('.panel-content');
    if (!content) return;

    content.innerHTML = `
      <div class="setting-group">
        <h3>Resolution</h3>
        <select class="setting-select" id="resolution">
          <option value="2160p" ${this.state.display.resolution === '2160p' ? 'selected' : ''}>4K (2160p)</option>
          <option value="1080p" ${this.state.display.resolution === '1080p' ? 'selected' : ''}>Full HD (1080p)</option>
          <option value="720p" ${this.state.display.resolution === '720p' ? 'selected' : ''}>HD (720p)</option>
        </select>
      </div>
      <div class="setting-group">
        <h3>HDR</h3>
        <label class="switch">
          <input type="checkbox" id="hdr" ${this.state.display.hdr ? 'checked' : ''}>
          <span class="slider round"></span>
        </label>
      </div>
      <div class="setting-group">
        <h3>Audio Output</h3>
        <select class="setting-select" id="audio-output">
          <option value="HDMI" ${this.state.display.audioOutput === 'HDMI' ? 'selected' : ''}>HDMI</option>
          <option value="Optical" ${this.state.display.audioOutput === 'Optical' ? 'selected' : ''}>Optical</option>
          <option value="Analog" ${this.state.display.audioOutput === 'Analog' ? 'selected' : ''}>Analog</option>
        </select>
      </div>
    `;

    // Add event listeners
    const resolution = content.querySelector('#resolution');
    const hdr = content.querySelector('#hdr');
    const audioOutput = content.querySelector('#audio-output');

    if (resolution) {
      resolution.addEventListener('change', (e) => {
        this.state.display.resolution = e.target.value;
        this.saveState();
        this.showNotification('Resolution updated');
      });
    }

    if (hdr) {
      hdr.addEventListener('change', (e) => {
        this.state.display.hdr = e.target.checked;
        this.saveState();
        this.showNotification('HDR setting updated');
      });
    }

    if (audioOutput) {
      audioOutput.addEventListener('change', (e) => {
        this.state.display.audioOutput = e.target.value;
        this.saveState();
        this.showNotification('Audio output updated');
      });
    }
  }

  initializeRemotePanel(panel) {
    const content = panel.querySelector('.panel-content');
    if (!content) return;

    content.innerHTML = `
      <div class="remote-info">
        <h3>Paired Remotes</h3>
        <div class="paired-remotes">
          ${this.state.remote.paired.map(remote => `
            <div class="remote-item">
              <i class="fas fa-gamepad"></i>
              <div class="remote-details">
                <span>${remote}</span>
                <span class="battery-level">Battery: ${this.state.remote.batteryLevel}</span>
              </div>
            </div>
          `).join('')}
        </div>
        <button class="action-button" id="pair-remote">
          <i class="fas fa-plus"></i> Pair New Remote
        </button>
      </div>
    `;

    // Add event listener for pair button
    const pairButton = content.querySelector('#pair-remote');
    if (pairButton) {
      pairButton.addEventListener('click', () => {
        this.showNotification('Searching for new remotes...');
        setTimeout(() => {
          this.showNotification('No new remotes found');
        }, 3000);
      });
    }
  }

  initializeStoragePanel(panel) {
    const content = panel.querySelector('.panel-content');
    if (!content) return;

    content.innerHTML = `
      <div class="storage-info">
        <div class="storage-overview">
          <h3>Storage Overview</h3>
          <div class="storage-bar">
            <div class="used-space" style="width: ${(parseFloat(this.state.storage.used) / parseFloat(this.state.storage.total)) * 100}%"></div>
          </div>
          <div class="storage-details">
            <span>Used: ${this.state.storage.used}</span>
            <span>Free: ${this.state.storage.free}</span>
          </div>
        </div>
        <div class="app-storage-list">
          <h3>App Storage</h3>
          ${Object.entries(this.state.apps).map(([id, app]) => `
            <div class="app-storage-item">
              <img src="${app.icon}" alt="${app.name}" class="app-icon">
              <div class="app-storage-details">
                <span>${app.name}</span>
                <span class="storage-size">${app.storage.total}</span>
              </div>
              <button class="clear-storage-btn" data-app-id="${id}">Clear</button>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Add event listeners for clear buttons
    content.querySelectorAll('.clear-storage-btn').forEach(button => {
      button.addEventListener('click', () => {
        const appId = button.dataset.appId;
        if (appId && this.state.apps[appId]) {
          if (confirm(`Clear storage for ${this.state.apps[appId].name}?`)) {
            this.clearAppStorage(appId);
          }
        }
      });
    });
  }

  initializeAboutPanel(panel) {
    const content = panel.querySelector('.panel-content');
    if (!content) return;

    content.innerHTML = `
      <div class="about-info">
        <div class="info-group">
          <h3>Device Information</h3>
          <div class="info-item">
            <span>Model</span>
            <span>Optimum Stream Box</span>
          </div>
          <div class="info-item">
            <span>Serial Number</span>
            <span>OS123456789</span>
          </div>
          <div class="info-item">
            <span>Software Version</span>
            <span>2.1.0</span>
          </div>
        </div>
        <div class="info-group">
          <h3>System</h3>
          <div class="info-item">
            <span>Android TV OS</span>
            <span>11.0</span>
          </div>
          <div class="info-item">
            <span>Build Number</span>
            <span>OPT.2023.12.15</span>
          </div>
        </div>
        <button class="action-button" id="check-update">Check for Updates</button>
      </div>
    `;

    // Add event listener for update check
    const updateButton = content.querySelector('#check-update');
    if (updateButton) {
      updateButton.addEventListener('click', () => {
        this.showNotification('Checking for updates...');
        setTimeout(() => {
          this.showNotification('System is up to date');
        }, 2000);
      });
    }
  }

  initializeAppSettings(panel, app) {
    const appIcon = panel.querySelector('.app-icon');
    const appName = panel.querySelector('.app-name');
    const appVersion = panel.querySelector('.app-version');
    const storageValues = panel.querySelectorAll('.storage-value');
    
    if (!app || !appIcon || !appName || !appVersion || !storageValues.length) return;

    // Set app info
    appIcon.src = app.icon;
    appIcon.alt = app.name;
    appName.textContent = app.name;
    appVersion.textContent = `Version ${app.version}`;
    
    // Set storage info
    const storage = app.storage;
    storageValues[0].textContent = storage.total;
    storageValues[1].textContent = storage.data;
    storageValues[2].textContent = storage.cache;
    
    // Add action handlers
    panel.querySelectorAll('.action-button').forEach(button => {
      button.addEventListener('click', () => this.handleAppAction(button.dataset.action, app));
    });
  }

  connectToNetwork(network) {
    if (!this.state.wifi.enabled) return;

    // Show connecting state
    const currentNetwork = document.querySelector('#current-network');
    if (!currentNetwork) return;

    currentNetwork.textContent = 'Connecting...';
    
    // Simulate connection process
    setTimeout(() => {
      this.state.wifi.connected = network.ssid;
      currentNetwork.textContent = network.ssid;
      this.saveState();
      
      // Show success notification
      this.showNotification(`Connected to ${network.ssid}`);
    }, 2000);
  }

  handleAppAction(action, app) {
    switch (action) {
      case 'force-stop':
        if (confirm(`Are you sure you want to force stop ${app.name}?`)) {
          this.showNotification(`${app.name} has been force stopped`);
        }
        break;
      case 'clear-data':
        if (confirm(`Are you sure you want to clear all data for ${app.name}? This action cannot be undone.`)) {
          this.state.apps[app.id].storage.data = '0 B';
          this.saveState();
          this.showNotification('App data cleared');
        }
        break;
      case 'clear-cache':
        this.state.apps[app.id].storage.cache = '0 B';
        this.saveState();
        this.showNotification('Cache cleared');
        break;
    }
  }

  clearAppStorage(appId) {
    this.state.apps[appId].storage.data = '0 B';
    this.state.apps[appId].storage.cache = '0 B';
    this.saveState();
    this.showNotification(`Storage cleared for ${this.state.apps[appId].name}`);
  }

  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 2000);
    }, 100);
  }

  initializeEventListeners() {
    // Device Settings button
    const deviceSettingsBtn = document.getElementById('deviceSettingsBtn');
    if (deviceSettingsBtn) {
      deviceSettingsBtn.addEventListener('click', () => {
        this.showDeviceSettings();
      });
    }

    // App click handlers
    document.querySelectorAll('.app-item').forEach(app => {
      app.addEventListener('click', () => {
        const appId = app.dataset.appId;
        if (appId && this.state.apps[appId]) {
          this.showPanel(this.templates.appSettings, this.state.apps[appId]);
        }
      });
    });
  }
}

// Initialize settings manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.settingsManager = new SettingsManager();
});