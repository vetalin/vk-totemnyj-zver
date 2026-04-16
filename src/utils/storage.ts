import bridge from '@vkontakte/vk-bridge';
import type { SavedResult } from '../types';

const STORAGE_KEY = 'totem_last_result';
const HISTORY_KEY = 'totem_history';
const LS_PREFIX = '__totem_fallback__';
const MAX_HISTORY = 10;

async function vkStorageGet(key: string): Promise<string | null> {
  try {
    const res = await bridge.send('VKWebAppStorageGet', { keys: [key] }) as {
      keys: Array<{ key: string; value: string }>;
    };
    const entry = res.keys.find((k) => k.key === key);
    return entry && entry.value ? entry.value : null;
  } catch {
    return null;
  }
}

async function vkStorageSet(key: string, value: string): Promise<boolean> {
  try {
    await bridge.send('VKWebAppStorageSet', { key, value });
    return true;
  } catch {
    return false;
  }
}

function lsGet(key: string): string | null {
  try {
    return localStorage.getItem(LS_PREFIX + key);
  } catch {
    return null;
  }
}

function lsSet(key: string, value: string): void {
  try {
    localStorage.setItem(LS_PREFIX + key, value);
  } catch {
    // storage blocked (private mode) — silently ignore
  }
}

async function readKey(key: string): Promise<string | null> {
  const fromVK = await vkStorageGet(key);
  if (fromVK !== null) return fromVK;
  return lsGet(key);
}

async function writeKey(key: string, value: string): Promise<void> {
  const ok = await vkStorageSet(key, value);
  if (!ok) lsSet(key, value);
  else lsSet(key, value); // mirror to LS as faster local cache
}

export async function loadLastResult(): Promise<SavedResult | null> {
  const raw = await readKey(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as SavedResult;
    if (!parsed.animalId || !Array.isArray(parsed.answers)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function saveLastResult(result: SavedResult): Promise<void> {
  await writeKey(STORAGE_KEY, JSON.stringify(result));
  // Append to history
  const history = await loadHistory();
  const next = [result, ...history].slice(0, MAX_HISTORY);
  await writeKey(HISTORY_KEY, JSON.stringify(next));
}

export async function loadHistory(): Promise<SavedResult[]> {
  const raw = await readKey(HISTORY_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as SavedResult[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((r) => r && r.animalId && Array.isArray(r.answers));
  } catch {
    return [];
  }
}
