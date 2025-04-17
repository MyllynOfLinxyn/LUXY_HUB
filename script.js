const state = {
    settings: {
        theme: 'dark',
        userFont: 'Roboto',
        connectionAlerts: true,
        resourceAlerts: true,
        uiMode: 'complete',
        datePosition: 'top-left',
        visualEffect: 'none',
        widgetScale: 1,
        customEffectImage: null
    },
    user: {
        nickname: 'Usuário',
        profilePic: 'https://via.placeholder.com/80',
        background: '',
        banner: 'https://via.placeholder.com/400x120',
        font: 'Roboto',
        borderColor: '#ff4d4d',
        nicknameColor: '#e0e0e0',
        pronouns: 'She/Her',
        biography: 'Escreva algo sobre você...',
        mood: 'Café + código = ☕💻'
    },
    metrics: {
        cpu: 0,
        memory: 0,
        networkSpeed: 0,
        hubStartTime: Date.now()
    },
    socialLinks: [
        { id: 'youtube', url: 'https://youtube.com', icon: 'fab fa-youtube' },
        { id: 'discord', url: 'https://discord.com', icon: 'fab fa-discord' },
        { id: 'roblox', url: 'https://roblox.com', icon: 'fas fa-gamepad' },
        { id: 'spotify', url: 'https://spotify.com', icon: 'fab fa-spotify' }
    ],
    widgetPositions: {
        'metrics-card': { x: 0, y: 0, width: 300, visible: true },
        'profile-details-card': { x: 320, y: 0, width: 250, visible: true },
        'navigation-card': { x: 600, y: 0, width: 300, visible: true },
        'date-display': { x: 10, y: 10, width: 150, visible: true }
    },
    notificationsMuted: false
};

function loadStateFromStorage() {
    const savedState = localStorage.getItem('cyberHubState');
    if (savedState) {
        Object.assign(state, JSON.parse(savedState));
        state.metrics.hubStartTime = Date.now();
    }
}

function saveStateToStorage() {
    localStorage.setItem('cyberHubState', JSON.stringify(state));
}

const elements = {
    settingsPanel: document.getElementById('settings-panel'),
    customizationPanel: document.getElementById('customization-panel'),
    settingsToggle: document.getElementById('settings-toggle'),
    notification: document.getElementById('notification'),
    notificationMessage: document.getElementById('notification-message'),
    cpuUsage: document.getElementById('cpu-usage'),
    cpuBar: document.getElementById('cpu-bar'),
    ramUsage: document.getElementById('ram-usage'),
    ramBar: document.getElementById('ram-bar'),
    networkSpeed: document.getElementById('network-speed'),
    speedBar: document.getElementById('speed-bar'),
    hubUptime: document.getElementById('hub-uptime'),
    batteryMetric: document.getElementById('battery-metric'),
    batteryLevel: document.getElementById('battery-level'),
    batteryBar: document.getElementById('battery-bar'),
    osInfo: document.getElementById('os-info'),
    browserInfo: document.getElementById('browser-info'),
    profileUpload: document.getElementById('profile-upload'),
    backgroundUpload: document.getElementById('background-upload'),
    bannerUpload: document.getElementById('banner-upload'),
    nicknameInput: document.getElementById('nickname-input'),
    fontSelect: document.getElementById('font-select'),
    customFontUpload: document.getElementById('custom-font-upload'),
    borderColor: document.getElementById('border-color'),
    nicknameColor: document.getElementById('nickname-color'),
    pronounsInput: document.getElementById('pronouns-input'),
    bioInput: document.getElementById('bio-input'),
    moodInput: document.getElementById('mood-input'),
    themeSelect: document.getElementById('theme-select'),
    userFontSelect: document.getElementById('user-font-select'),
    userCustomFontUpload: document.getElementById('user-custom-font-upload'),
    connectionAlerts: document.getElementById('connection-alerts'),
    resourceAlerts: document.getElementById('resource-alerts'),
    detailedProfileImage: document.getElementById('detailed-profile-image'),
    detailedNickname: document.getElementById('detailed-nickname'),
    detailedPronouns: document.getElementById('detailed-pronouns'),
    detailedBio: document.getElementById('detailed-bio'),
    bannerImage: document.getElementById('banner-image'),
    customizationToggle: document.getElementById('customization-toggle'),
    navLinkInput: document.getElementById('nav-link-input'),
    navLinkBtn: document.getElementById('nav-link-btn'),
    socialLinksContainer: document.getElementById('social-links'),
    newSocialUrl: document.getElementById('new-social-url'),
    newSocialIcon: document.getElementById('new-social-icon'),
    addSocialBtn: document.getElementById('add-social-btn'),
    uiModeSelect: document.getElementById('ui-mode-select'),
    datePositionSelect: document.getElementById('date-position-select'),
    dateDisplay: document.getElementById('date-display'),
    currentDate: document.getElementById('current-date'),
    currentTime: document.getElementById('current-time'),
    visualEffectsSelect: document.getElementById('visual-effects-select'),
    visualEffectsContainer: document.getElementById('visual-effects-container'),
    increaseWidgetSizeBtn: document.getElementById('increase-widget-size'),
    decreaseWidgetSizeBtn: document.getElementById('decrease-widget-size'),
    themeBackgroundBtn: document.getElementById('theme-background-btn'),
    customEffectUpload: document.getElementById('custom-effect-upload'),
    customEffectImage: document.getElementById('custom-effect-image'),
    uploadEffectImageBtn: document.getElementById('upload-effect-image-btn')
};

elements.settingsToggle.addEventListener('click', toggleSettings);
elements.profileUpload.addEventListener('change', handleProfileUpload);
elements.backgroundUpload.addEventListener('change', handleBackgroundUpload);
elements.bannerUpload.addEventListener('change', handleBannerUpload);
elements.nicknameInput.addEventListener('change', updateNickname);
elements.fontSelect.addEventListener('change', updateFont);
elements.customFontUpload.addEventListener('change', handleCustomFontUpload);
elements.borderColor.addEventListener('input', updateBorderColor);
elements.nicknameColor.addEventListener('input', updateNicknameColor);
elements.pronounsInput.addEventListener('change', updatePronouns);
elements.bioInput.addEventListener('change', updateBio);
elements.moodInput.addEventListener('change', updateMood);
elements.userFontSelect.addEventListener('change', updateUserFont);
elements.userCustomFontUpload.addEventListener('change', handleUserCustomFontUpload);
document.getElementById('upload-avatar-btn').addEventListener('click', () => elements.profileUpload.click());
document.getElementById('upload-background-btn').addEventListener('click', () => elements.backgroundUpload.click());
document.getElementById('upload-font-btn').addEventListener('click', () => elements.customFontUpload.click());
document.getElementById('user-upload-font-btn').addEventListener('click', () => elements.userCustomFontUpload.click());
document.getElementById('update-nickname-btn').addEventListener('click', updateNickname);
document.getElementById('save-settings-btn').addEventListener('click', saveSettings);
document.querySelector('.mute-btn').addEventListener('click', muteNotifications);
elements.bannerImage.addEventListener('click', () => elements.bannerUpload.click());
elements.customizationToggle.addEventListener('click', toggleCustomization);
elements.navLinkBtn.addEventListener('click', openNavLink);
elements.addSocialBtn.addEventListener('click', addSocialLink);
elements.newSocialIcon.addEventListener('change', handleSocialIconUpload);
elements.increaseWidgetSizeBtn.addEventListener('click', increaseWidgetSize);
elements.decreaseWidgetSizeBtn.addEventListener('click', decreaseWidgetSize);
elements.themeBackgroundBtn.addEventListener('click', applyThemeBackground);
elements.visualEffectsSelect.addEventListener('change', toggleCustomEffectUpload);
elements.uploadEffectImageBtn.addEventListener('click', () => elements.customEffectImage.click());
elements.customEffectImage.addEventListener('change', handleCustomEffectImage);
window.addEventListener('resize', adjustWidgetPositions);

document.addEventListener('mouseup', (event) => {
    const draggingWidget = document.querySelector('.dragging');
    if (draggingWidget) {
        console.log('Forçando soltura do widget:', draggingWidget.id);
        draggingWidget.classList.remove('dragging');
        const id = draggingWidget.id;
        const x = parseFloat(draggingWidget.getAttribute('data-x')) || 0;
        const y = parseFloat(draggingWidget.getAttribute('data-y')) || 0;
        state.widgetPositions[id].x = x;
        state.widgetPositions[id].y = y;
        saveStateToStorage();
        adjustWidgetPositions(draggingWidget);
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    initDragAndDrop();
    loadStateFromStorage();
    loadUserProfile();
    renderSocialLinks();
    startMetricsMonitoring();
    initBatteryMonitoring();
    initSystemInfo();
    initWebSocket();
    initServiceWorker();
    updateDateTimeDisplay();
    initVisualEffects();
    applyWidgetPositions();
});

function toggleSettings() {
    elements.settingsPanel.classList.toggle('active');
}

function toggleCustomization() {
    elements.customizationPanel.classList.toggle('active');
}

function saveSettings() {
    Object.assign(state.settings, {
        theme: elements.themeSelect.value,
        userFont: elements.userFontSelect.value,
        connectionAlerts: elements.connectionAlerts.checked,
        resourceAlerts: elements.resourceAlerts.checked,
        uiMode: elements.uiModeSelect.value,
        datePosition: elements.datePositionSelect.value,
        visualEffect: elements.visualEffectsSelect.value,
        widgetScale: state.settings.widgetScale,
        customEffectImage: state.settings.customEffectImage
    });
    applySettings();
    saveStateToStorage();
    showNotification('Configurações salvas com sucesso!');
    updateDateTimeDisplay();
    initVisualEffects();
}

function applySettings() {
    const currentTheme = state.settings.theme ? `${state.settings.theme}-theme` : 'dark-theme';
    const newUIMode = `${state.settings.uiMode}-mode`;

    document.body.classList.remove('complete-mode', 'compact-mode', 'minimalist-mode');
    document.body.classList.add(currentTheme, newUIMode);

    document.body.style.fontFamily = state.settings.userFont;
    document.documentElement.style.setProperty('--widget-scale', state.settings.widgetScale);
    
    if (state.user.background) {
        document.body.style.background = state.user.background.startsWith('url') ? state.user.background : `url(${state.user.background}) no-repeat center/cover`;
    }
}

function applyThemeBackground() {
    const themeBackgrounds = {
        dark: '#121218',
        light: '#f5f5f7',
        cyberpunk: '#0d1b2a',
        hacker: '#0f3b21',
        hell: '#1a0000',
        synthwave: '#1a0033',
        glitch: '#1a0033',
        floresta: '#2e3b1f',
        oceano: '#003366',
        deserto: '#d2b48c',
        vampiro: '#1c0000',
        lunar: '#1c2526',
        'neon-tokyo': '#1a0033',
        psicodelico: '#1a0033',
        candy: '#ffb6c1'
    };
    
    state.user.background = '';
    const newBackground = themeBackgrounds[state.settings.theme];
    document.body.style.background = newBackground;
    document.body.style.backgroundImage = 'none';
    saveStateToStorage();
    showNotification('Background do tema aplicado com sucesso!');
}

function handleProfileUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            state.user.profilePic = event.target.result;
            elements.detailedProfileImage.src = event.target.result;
            saveStateToStorage();
        };
        reader.readAsDataURL(file);
    }
}

function handleBackgroundUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            state.user.background = event.target.result;
            document.body.style.background = `url(${event.target.result}) no-repeat center/cover`;
            saveStateToStorage();
        };
        reader.readAsDataURL(file);
    }
}

function handleBannerUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            state.user.banner = event.target.result;
            elements.bannerImage.style.backgroundImage = `url(${event.target.result})`;
            saveStateToStorage();
        };
        reader.readAsDataURL(file);
    }
}

function handleCustomFontUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const fontName = file.name.split('.')[0];
            const fontFace = new FontFace(fontName, event.target.result);
            fontFace.load().then(loadedFace => {
                document.fonts.add(loadedFace);
                state.user.font = fontName;
                elements.detailedNickname.style.fontFamily = fontName;
                const option = document.createElement('option');
                option.value = fontName;
                option.textContent = fontName;
                elements.fontSelect.appendChild(option);
                elements.fontSelect.value = fontName;
                saveStateToStorage();
            }).catch(err => {
                console.error('Erro ao carregar fonte:', err);
                showNotification('Falha ao carregar fonte personalizada.');
            });
        };
        reader.readAsArrayBuffer(file);
    }
}

function handleUserCustomFontUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const fontName = file.name.split('.')[0];
            const fontFace = new FontFace(fontName, event.target.result);
            fontFace.load().then(loadedFace => {
                document.fonts.add(loadedFace);
                state.settings.userFont = fontName;
                document.body.style.fontFamily = fontName;
                const option = document.createElement('option');
                option.value = fontName;
                option.textContent = fontName;
                elements.userFontSelect.appendChild(option);
                elements.userFontSelect.value = fontName;
                saveStateToStorage();
            }).catch(err => {
                console.error('Erro ao carregar fonte:', err);
                showNotification('Falha ao carregar fonte personalizada.');
            });
        };
        reader.readAsArrayBuffer(file);
    }
}

function handleSocialIconUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const url = elements.newSocialUrl.value.trim();
            if (url) {
                const id = `custom-${Date.now()}`;
                state.socialLinks.push({
                    id: id,
                    url: url.startsWith('http') ? url : `https://${url}`,
                    icon: event.target.result
                });
                renderSocialLinks();
                elements.newSocialUrl.value = '';
                elements.newSocialIcon.value = '';
                saveStateToStorage();
            } else {
                showNotification('Por favor, insira um URL válido.');
            }
        };
        reader.readAsDataURL(file);
    }
}

function handleCustomEffectImage(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            state.settings.customEffectImage = event.target.result;
            saveStateToStorage();
            initVisualEffects();
        };
        reader.readAsDataURL(file);
    }
}

function toggleCustomEffectUpload() {
    elements.customEffectUpload.style.display = elements.visualEffectsSelect.value === 'custom' ? 'block' : 'none';
}

function addSocialLink() {
    elements.newSocialIcon.click();
}

function removeSocialLink(id) {
    state.socialLinks = state.socialLinks.filter(link => link.id !== id);
    renderSocialLinks();
    saveStateToStorage();
    showNotification('Link removido com sucesso!');
}

function renderSocialLinks() {
    elements.socialLinksContainer.innerHTML = '';
    state.socialLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = '_blank';
        a.className = 'social-btn';
        a.dataset.id = link.id;
        if (typeof link.icon === 'string' && link.icon.startsWith('data:')) {
            const img = document.createElement('img');
            img.src = link.icon;
            a.appendChild(img);
        } else {
            const i = document.createElement('i');
            i.className = link.icon;
            a.appendChild(i);
        }
        const removeBtn = document.createElement('span');
        removeBtn.className = 'remove-link';
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            removeSocialLink(link.id);
        });
        a.appendChild(removeBtn);
        elements.socialLinksContainer.appendChild(a);
    });
}

function updateNickname() {
    const newNickname = elements.nicknameInput.value.trim();
    if (newNickname) {
        state.user.nickname = newNickname;
        elements.detailedNickname.textContent = newNickname;
        saveStateToStorage();
        showNotification('Nickname atualizado!');
    }
}

function updateFont() {
    state.user.font = elements.fontSelect.value;
    elements.detailedNickname.style.fontFamily = state.user.font;
    saveStateToStorage();
}

function updateUserFont() {
    state.settings.userFont = elements.userFontSelect.value;
    document.body.style.fontFamily = state.settings.userFont;
    saveStateToStorage();
}

function updateBorderColor() {
    state.user.borderColor = elements.borderColor.value;
    elements.detailedProfileImage.style.borderColor = state.user.borderColor;
    saveStateToStorage();
}

function updateNicknameColor() {
    state.user.nicknameColor = elements.nicknameColor.value;
    elements.detailedNickname.style.color = state.user.nicknameColor;
    saveStateToStorage();
}

function updatePronouns() {
    state.user.pronouns = elements.pronounsInput.value.trim() || 'She/Her';
    elements.detailedPronouns.textContent = state.user.pronouns;
    saveStateToStorage();
}

function updateBio() {
    state.user.biography = elements.bioInput.value.trim() || 'Escreva algo sobre você...';
    elements.detailedBio.textContent = state.user.biography;
    saveStateToStorage();
}

function updateMood() {
    state.user.mood = elements.moodInput.value.trim() || 'Café + código = ☕💻';
    elements.moodInput.value = state.user.mood;
    saveStateToStorage();
}

function openNavLink() {
    const url = elements.navLinkInput.value.trim();
    if (url) {
        const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
        window.open(formattedUrl, '_blank');
    }
}

function muteNotifications() {
    state.notificationsMuted = true;
    saveStateToStorage();
    showNotification('Notificações silenciadas!');
}

function startMetricsMonitoring() {
    setInterval(() => {
        state.metrics.cpu = Math.min(100, Math.max(0, state.metrics.cpu + (Math.random() * 6 - 3)));
        state.metrics.memory = Math.min(8, Math.max(0, state.metrics.memory + (Math.random() * 0.5 - 0.25)));
        state.metrics.networkSpeed = Math.min(100, Math.max(0, state.metrics.networkSpeed + (Math.random() * 10 - 5)));
        updateMetricsDisplay();
        checkForAlerts();
        saveStateToStorage();
    }, 1000);

    setInterval(updateUptime, 1000);
}

function updateUptime() {
    const uptime = Date.now() - state.metrics.hubStartTime;
    const hours = Math.floor(uptime / (1000 * 60 * 60));
    const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((uptime % (1000 * 60)) / 1000);
    elements.hubUptime.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function initBatteryMonitoring() {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            elements.batteryMetric.style.display = 'block';
            const updateBattery = () => {
                const level = (battery.level * 100).toFixed(0);
                elements.batteryLevel.textContent = `${level}%`;
                elements.batteryBar.style.width = `${level}%`;
            };
            updateBattery();
            battery.addEventListener('levelchange', updateBattery);
        });
    }
}

function initSystemInfo() {
    elements.osInfo.textContent = detectOS();
    elements.browserInfo.textContent = detectBrowser();
}

function detectOS() {
    const platform = navigator.platform || navigator.userAgent;
    if (/Win/i.test(platform)) return 'Windows';
    if (/Mac/i.test(platform)) return 'MacOS';
    if (/Linux/i.test(platform)) return 'Linux';
    if (/Android/i.test(platform)) return 'Android';
    if (/iPhone|iPad|iPod/i.test(platform)) return 'iOS';
    return 'Desconhecido';
}

function detectBrowser() {
    const userAgent = navigator.userAgent;
    if (/Chrome/i.test(userAgent) && !/Edg/i.test(userAgent)) return 'Chrome';
    if (/Firefox/i.test(userAgent)) return 'Firefox';
    if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) return 'Safari';
    if (/Edg/i.test(userAgent)) return 'Edge';
    if (/Opera|OPR/i.test(userAgent)) return 'Opera';
    if (/MSIE|Trident/i.test(userAgent)) return 'Internet Explorer';
    return 'Desconhecido';
}

function updateMetricsDisplay() {
    elements.cpuUsage.textContent = state.metrics.cpu.toFixed(1) + '%';
    elements.cpuBar.style.width = state.metrics.cpu + '%';
    elements.ramUsage.textContent = state.metrics.memory.toFixed(2) + ' GB';
    elements.ramBar.style.width = (state.metrics.memory / 8 * 100) + '%';
    elements.networkSpeed.textContent = state.metrics.networkSpeed.toFixed(2) + ' Mbps';
    elements.speedBar.style.width = state.metrics.networkSpeed + '%';
}

function checkForAlerts() {
    if (state.notificationsMuted || !state.settings.connectionAlerts || !state.settings.resourceAlerts) return;
    if (state.metrics.cpu > 90 && state.settings.resourceAlerts) {
        showNotification(`Alerta: CPU está em ${state.metrics.cpu.toFixed(1)}%!`);
    }
    if (state.metrics.memory > 7 && state.settings.resourceAlerts) {
        showNotification(`Alerta: Memória está em ${state.metrics.memory.toFixed(2)}GB!`);
    }
}

function showNotification(message) {
    elements.notificationMessage.textContent = message;
    elements.notification.classList.add('show');
    setTimeout(() => elements.notification.classList.remove('show'), 3000);
}

function updateDateTimeDisplay() {
    const update = () => {
        const now = new Date();
        elements.currentDate.textContent = now.toLocaleDateString('pt-BR');
        elements.currentTime.textContent = now.toLocaleTimeString('pt-BR');
        elements.dateDisplay.classList.remove('top-left', 'top-right', 'bottom-left', 'bottom-right', 'custom');
        elements.dateDisplay.classList.add(state.settings.datePosition);
        if (state.settings.datePosition === 'custom') {
            const pos = state.widgetPositions['date-display'];
            elements.dateDisplay.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
            elements.dateDisplay.setAttribute('data-x', pos.x);
            elements.dateDisplay.setAttribute('data-y', pos.y);
        }
    };
    update();
    setInterval(update, 1000);
}

function increaseWidgetSize() {
    state.settings.widgetScale = Math.min(1.5, state.settings.widgetScale + 0.1);
    document.documentElement.style.setProperty('--widget-scale', state.settings.widgetScale);
    saveStateToStorage();
    adjustWidgetPositions();
}

function decreaseWidgetSize() {
    state.settings.widgetScale = Math.max(0.5, state.settings.widgetScale - 0.1);
    document.documentElement.style.setProperty('--widget-scale', state.settings.widgetScale);
    saveStateToStorage();
    adjustWidgetPositions();
}

function initVisualEffects() {
    elements.visualEffectsContainer.innerHTML = '';
    if (state.settings.visualEffect === 'none' || !state.settings.customEffectImage) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('img');
        particle.src = state.settings.customEffectImage;
        particle.className = 'visual-effect-particle';
        particle.style.width = '20px';
        particle.style.height = '20px';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        elements.visualEffectsContainer.appendChild(particle);
    }
}

function applyWidgetPositions() {
    Object.entries(state.widgetPositions).forEach(([id, pos]) => {
        const widget = document.getElementById(id);
        if (widget) {
            widget.setAttribute('data-x', pos.x);
            widget.setAttribute('data-y', pos.y);
            widget.style.width = `${pos.width}px`;
            widget.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(var(--widget-scale))`;
            widget.classList.toggle('hidden', !pos.visible);
        }
    });
    adjustWidgetPositions();
}

function initDragAndDrop() {
    interact('.draggable').draggable({
        inertia: false,
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
        ],
        autoScroll: true,
        listeners: {
            start(event) {
                console.log('Arrasto iniciado para o widget:', event.target.id);
                const target = event.target;
                target.classList.add('dragging');
            },
            move(event) {
                const target = event.target;
                let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.transform = `translate(${x}px, ${y}px) scale(var(--widget-scale))`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },
            end(event) {
                console.log('Evento end disparado para o widget:', event.target.id);
                const target = event.target;
                target.classList.remove('dragging');
                const id = target.id;
                const x = parseFloat(target.getAttribute('data-x')) || 0;
                const y = parseFloat(target.getAttribute('data-y')) || 0;
                state.widgetPositions[id].x = x;
                state.widgetPositions[id].y = y;
                saveStateToStorage();
                adjustWidgetPositions(target);
            }
        }
    });
}

function adjustWidgetPositions(movedWidget) {
    console.log('Ajustando posições, widget movido:', movedWidget?.id);
    const scale = state.settings.widgetScale;
    const containerRect = document.body.getBoundingClientRect();

    if (movedWidget) {
        const movedRect = movedWidget.getBoundingClientRect();
        let x = parseFloat(movedWidget.getAttribute('data-x')) || 0;
        let y = parseFloat(movedWidget.getAttribute('data-y')) || 0;

        if (movedRect.left < containerRect.left) x = 0;
        if (movedRect.right > containerRect.right) x = (containerRect.width - movedRect.width) / scale;
        if (movedRect.top < containerRect.top) y = 0;
        if (movedRect.bottom > containerRect.bottom) y = (containerRect.height - movedRect.height) / scale;

        movedWidget.setAttribute('data-x', x);
        movedWidget.setAttribute('data-y', y);
        state.widgetPositions[movedWidget.id].x = x;
        state.widgetPositions[movedWidget.id].y = y;
        movedWidget.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    }

    saveStateToStorage();
}

function isOverlapping(rect1, rect2) {
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

function initWebSocket() {
    console.log('Iniciando conexão WebSocket...');
}

function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('ServiceWorker registrado com sucesso:', registration.scope))
            .catch(error => console.log('Falha no registro do ServiceWorker:', error));
    }
}

function loadUserProfile() {
    const { user } = state;
    elements.detailedProfileImage.src = user.profilePic;
    elements.detailedNickname.textContent = user.nickname;
    elements.detailedPronouns.textContent = user.pronouns;
    elements.detailedBio.textContent = user.biography;
    elements.pronounsInput.value = user.pronouns;
    elements.bioInput.value = user.biography;
    elements.moodInput.value = user.mood;
    elements.bannerImage.style.backgroundImage = `url(${user.banner})`;
    if (user.background) {
        document.body.style.background = user.background.startsWith('url') ? user.background : `url(${user.background}) no-repeat center/cover`;
    }
    if (user.font) {
        elements.detailedNickname.style.fontFamily = user.font;
        elements.fontSelect.value = user.font;
    }
    if (user.borderColor) {
        elements.detailedProfileImage.style.borderColor = user.borderColor;
        elements.borderColor.value = user.borderColor;
    }
    if (user.nicknameColor) {
        elements.detailedNickname.style.color = user.nicknameColor;
        elements.nicknameColor.value = user.nicknameColor;
    }
    if (state.settings.userFont) {
        document.body.style.fontFamily = state.settings.userFont;
        elements.userFontSelect.value = state.settings.userFont;
    }
    applySettings();
    toggleCustomEffectUpload();
}