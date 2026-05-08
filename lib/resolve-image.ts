// Server-only: imports node:fs, so the bundler will reject any accidental
// client-side import. (We could add `import 'server-only'` for a friendlier
// error message, but the fs import is enough of a guard.)
import fs from 'node:fs';
import path from 'node:path';
import type { Product } from '@/data/types';

/**
 * Server-only image existence resolver.
 *
 * The product / category / lookbook data files reference image paths that
 * may not exist on disk yet (the user is still generating editorial photos).
 * Without this guard, `next/image` issues `/_next/image?url=…` requests for
 * missing files, which return HTTP 400 and spam the browser console.
 *
 * Calling `resolveProducts(products)` (or `resolvePath('/categories/x.jpg')`)
 * from a server component checks each path against the filesystem at render
 * time and substitutes `/products/placeholder.svg` for any missing file.
 *
 * SVG fallback files are always considered to exist (they ship in /public).
 */

const FALLBACK = '/products/placeholder.svg';
const PUBLIC_DIR = path.join(process.cwd(), 'public');

// Tiny in-process cache so we don't hammer the disk on every render.
// IMPORTANT: in dev we skip the cache so images you drop into /public
// during the running session are picked up immediately. The cache only
// kicks in for production builds where files don't change at runtime.
const existsCache = new Map<string, boolean>();
const useCache = process.env.NODE_ENV === 'production';

function exists(srcPath: string): boolean {
  if (!srcPath || srcPath.startsWith('http') || srcPath.startsWith('data:')) return true;
  if (useCache) {
    const cached = existsCache.get(srcPath);
    if (cached !== undefined) return cached;
  }

  const rel = srcPath.replace(/^\//, '');
  const ok = fs.existsSync(path.join(PUBLIC_DIR, rel));
  if (useCache) existsCache.set(srcPath, ok);
  return ok;
}

/** Returns the original path if the file exists, otherwise the placeholder. */
export function resolvePath(srcPath: string): string {
  return exists(srcPath) ? srcPath : FALLBACK;
}

/** Resolve all images on a single product. Pure — does not mutate input. */
export function resolveProduct(p: Product): Product {
  return {
    ...p,
    images: p.images.map((img) =>
      exists(img.src) ? img : { ...img, src: FALLBACK },
    ),
  };
}

/** Resolve images on every product in the array. */
export function resolveProducts(arr: Product[]): Product[] {
  return arr.map(resolveProduct);
}
