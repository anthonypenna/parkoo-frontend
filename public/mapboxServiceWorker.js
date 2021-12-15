const mapboxDomain = 'https://api.mapbox.com'
const mapboxAssetFormat = '.pbf'
const geocodingEndpoint = '/geocoding'
const mapStyle = 'styles=mapbox://styles/anthonypenna/'
const mapboxCacheName = 'mapbox'

self.addEventListener('install', event => {
  event.waitUntil(this.skipWaiting())
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', async event => {
  const { url } = event.request

  const isCacheable =
    url.includes(mapboxAssetFormat) ||
    url.includes(geocodingEndpoint) ||
    url.includes(mapStyle)

  if (url.startsWith(mapboxDomain) && isCacheable) {
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
