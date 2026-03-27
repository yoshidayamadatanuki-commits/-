const CACHE_NAME = 'qr-scanner-v1';
// キャッシュするファイルの一覧
const ASSETS_TO_CACHE = [
  './',
  './index.html', // HTMLファイル名（GitHub上のファイル名に合わせてください）
  './manifest.json'
];

// インストール時にファイルをキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// オフライン時はキャッシュから応答
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});