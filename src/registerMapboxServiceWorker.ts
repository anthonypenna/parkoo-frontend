const serviceWorkerPath = '/mapboxServiceWorker.js'
const logStyles = ['color: dodgerblue', 'font-weight: bold']

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    await navigator.serviceWorker.register(serviceWorkerPath)
    console.log('%c[MBSW] Mapbox asset caching enabled.', logStyles.join(';'))
  })
}
