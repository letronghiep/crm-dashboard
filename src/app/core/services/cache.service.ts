import { Injectable } from '@angular/core';

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  set<T>(key: string, data: T, ttlSeconds = 300): void {
    const entry: CacheEntry<T> = {
      data,
      expiresAt: Date.now() + ttlSeconds * 1000
    };
    localStorage.setItem(key, JSON.stringify(entry));
  }

  get<T>(key: string): T | null {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() > entry.expiresAt) {
      this.remove(key);
      return null;
    }
    return entry.data;
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }
}
