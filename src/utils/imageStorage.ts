/**
 * Image storage & compression utility for transparent and standard profile photos.
 * Preserves alpha transparency (PNG) and optimizes file size to prevent quota limits.
 */

const STORAGE_KEY = 'sudarshan_custom_profile_photo';
const DB_NAME = 'sudarshan_portfolio_db';
const STORE_NAME = 'profile_photos';

// Open IndexedDB database
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Compress and preserve transparency using HTML5 canvas
export function compressImage(file: File, maxDimension = 900): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Invalid image file'));
      img.onload = () => {
        let { width, height } = img;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        // Clear canvas with transparent pixels (critical for background-removed photos)
        ctx.clearRect(0, 0, width, height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Export as PNG to preserve transparent background
        const dataUrl = canvas.toDataURL('image/png', 0.92);
        resolve(dataUrl);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

// Save photo to both LocalStorage and IndexedDB, plus sync with server
export async function saveProfilePhoto(dataUrl: string): Promise<boolean> {
  let savedLocally = false;

  // 1. Try LocalStorage
  try {
    localStorage.setItem(STORAGE_KEY, dataUrl);
    savedLocally = true;
  } catch (err) {
    console.warn('LocalStorage quota limit reached, relying on IndexedDB fallback:', err);
  }

  // 2. Try IndexedDB (virtually unlimited capacity)
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(dataUrl, 'current_photo');
    savedLocally = true;
  } catch (idbErr) {
    console.warn('IndexedDB write error:', idbErr);
  }

  // 3. Sync to server backend
  try {
    fetch('/api/upload-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64: dataUrl }),
    }).catch(() => {
      // Background sync, non-blocking
    });
  } catch (_) {
    // Non-blocking
  }

  return savedLocally;
}

// Load saved profile photo from LocalStorage or IndexedDB
export async function loadSavedProfilePhoto(): Promise<string | null> {
  // 1. Check LocalStorage first
  try {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) return local;
  } catch (_) {}

  // 2. Check IndexedDB
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get('current_photo');
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch (_) {
    return null;
  }
}

// Clear custom profile photo
export async function resetProfilePhoto(): Promise<void> {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (_) {}

  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.delete('current_photo');
  } catch (_) {}

  try {
    fetch('/api/upload-profile/reset', { method: 'POST' }).catch(() => {});
  } catch (_) {}
}
