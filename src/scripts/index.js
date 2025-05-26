// CSS imports
import '../styles/styles.css';
import '../styles/responsives.css';
import 'tiny-slider/dist/tiny-slider.css';
import 'leaflet/dist/leaflet.css';

import App from './pages/app';
import Camera from './utils/camera';

class RuangKisahAPI {
  static async login(credentials) {
    try {
      const response = await fetch('YOUR_API_ENDPOINT/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  }
  
 
}

export default RuangKisahAPI;

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.getElementById('main-content'),
    drawerButton: document.getElementById('drawer-button'),
    drawerNavigation: document.getElementById('navigation-drawer'),
    skipLinkButton: document.getElementById('skip-link'),
  });
  await app.renderPage();

  window.addEventListener('hashchange', async () => {
    await app.renderPage();

    
    Camera.stopAllStreams();
  });
});

const publicVapidKey = 'BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

document.getElementById('subscribe-push').addEventListener('click', async () => {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    alert('Push notification tidak didukung browser ini.');
    return;
  }
  const reg = await navigator.serviceWorker.ready;
  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });

  // Ambil token login dari localStorage/session (ganti sesuai implementasi Anda)
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Anda harus login untuk mengaktifkan notifikasi.');
    return;
  }

  // Kirim subscription ke API Dicoding
  await fetch('https://story-api.dicoding.dev/v1/notifications/subscribe', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sub),
  });

  alert('Push Notification diaktifkan!');
});

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
