import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '@vkontakte/vkui/dist/vkui.css';
import './index.css';

// Initialize VK Bridge
import vkBridge from '@vkontakte/vk-bridge';
vkBridge.send('VKWebAppInit', {});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
