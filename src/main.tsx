import bridge from './bridge';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@vkontakte/vkui/dist/vkui.css';
import './index.css';
import App from './App.tsx';

try { bridge.send('VKWebAppInit'); } catch (e) { /* Not in VK environment */ }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
