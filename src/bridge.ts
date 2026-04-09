/**
 * Safe vk-bridge wrapper that handles ESM/CJS differences
 * and gracefully fails when not running inside VK Mini App
 */
import * as vkBridgeModule from '@vkontakte/vk-bridge';

// Handle both ESM and CJS exports
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bridge = ((vkBridgeModule as any).default ?? vkBridgeModule) as typeof vkBridgeModule.default;

export default bridge;
