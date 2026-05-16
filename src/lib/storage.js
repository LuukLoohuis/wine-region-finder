const COLLECTION_KEY = 'wine_cellar_collection';
const API_KEY_KEY    = 'wine_claude_api_key';

export function loadCollection() {
  try {
    return JSON.parse(localStorage.getItem(COLLECTION_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function saveCollection(collection) {
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
}

export function loadApiKey() {
  return localStorage.getItem(API_KEY_KEY) ?? '';
}

export function saveApiKey(key) {
  localStorage.setItem(API_KEY_KEY, key);
}

export function generateId() {
  return `bottle_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}
