const serviceWorkerPath = 'mapboxsw.js'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    await navigator.serviceWorker.register(serviceWorkerPath)
    console.log('Registered mapbox service worker.')
  })
}
