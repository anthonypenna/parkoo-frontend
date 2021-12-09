const requestProtocol = 'https://'
const mapboxDomains = ['tiles.mapbox.com', 'api.mapbox.com']
const cacheName = 'mapbox'

// 'https://api.mapbox.com/v4/mapbox.mapbox-streets-v8,mapbox.mapbox-terrain-v2/10/551/376.vector.pbf?style=mapbox://styles/anthonypenna/ckwt4kriz2ivh15nvz54lzhz3@1638701525217&sku=101mVzfr8gRxn&access_token=pk.eyJ1IjoiYW50aG9ueXBlbm5hIiwiYSI6ImNrdjE0YzVuNzNrbzEydXM3czk5ajZ2enMifQ.VHHz_skzADwqVboV2kgaVg'

self.addEventListener('install', event => {
  event.waitUntil(this.skipWaiting())
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', async event => {
  const { url } = event.request
  const protocolMatches = url.startsWith(requestProtocol)
  const domainMatches = url.includes('.vector.pbf')
  if (protocolMatches && domainMatches) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return (
          response ||
          fetch(event.request).then(response => {
            const cachedResponse = response.clone()
            caches.open(cacheName).then(cache => {
              cache.put(event.request, cachedResponse)
            })
            return response
          })
        )
      })
    )
  }
})
