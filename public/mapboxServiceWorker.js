const mapboxDomain = 'https://api.mapbox.com'
const mapboxAssetFormat = '.pbf'
const geocodingEndpoint = '/geocoding'
const mapboxCacheName = 'mapbox'

self.addEventListener('install', event => {
  event.waitUntil(this.skipWaiting())
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', async event => {
  const { url } = event.request

  if (
    url.startsWith(mapboxDomain) &&
    (url.includes(mapboxAssetFormat) || url.includes(geocodingEndpoint))
  ) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return (
          response ||
          fetch(event.request).then(response => {
            const cachedResponse = response.clone()
            caches.open(mapboxCacheName).then(cache => {
              cache.put(event.request, cachedResponse)
            })
            return response
          })
        )
      })
    )
  }
})
