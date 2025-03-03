document.addEventListener('DOMContentLoaded', function() {
  // Time Update
  function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    
    document.getElementById('current-time').textContent = `${hours}:${minutes} ${ampm}`;
  }

  setInterval(updateTime, 1000);
  updateTime();

  // Welcome Overlay
  const overlay = document.getElementById('overlay');
  setTimeout(() => {
  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 500);
}, 4000);

  // Tab Navigation
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const targetId = button.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // Settings Description
  const menuButtons = document.querySelectorAll('.menu-button');
  const descriptionText = document.getElementById('description-text');

  menuButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      const description = button.getAttribute('data-text');
      if (description) {
        descriptionText.textContent = description;
      }
    });

    button.addEventListener('mouseleave', () => {
      descriptionText.textContent = '';
    });
  });

  // Right Panel
  const deviceSettingsBtn = document.getElementById('deviceSettingsBtn');
  const rightPanel = document.getElementById('rightPanel');
  const backButton = document.querySelector('.back-button');

  deviceSettingsBtn.addEventListener('click', () => {
    rightPanel.classList.add('active');
  });

  backButton.addEventListener('click', () => {
    rightPanel.classList.remove('active');
  });

  // Settings Options Navigation
  const settingOptions = document.querySelectorAll('.setting-option');
  settingOptions.forEach(option => {
    option.addEventListener('click', () => {
      // Here you can add specific behavior for each setting option
      console.log(`Selected setting: ${option.textContent}`);
    });
  });
});