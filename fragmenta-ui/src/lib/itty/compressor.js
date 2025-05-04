// compressor.js
import LZString from 'lz-string';

export function compress(text) {
  const compressed = LZString.compressToEncodedURIComponent(text);
  return 'https://itty.bitty.site/#data:text/html,' + compressed;
}
