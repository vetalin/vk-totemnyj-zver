import bridge from '@vkontakte/vk-bridge';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@vkontakte/vkui/dist/vkui.css';
import './index.css';
import App from './App.tsx';

bridge.send('VKWebAppInit');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
