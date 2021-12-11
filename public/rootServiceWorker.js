if (process.env.NODE_ENV === 'development') {
  importScripts('/mockServiceWorker.js', '/mapboxServiceWorker.js')
} else {
  importScripts('/service-worker.js', '/mapboxServiceWorker.js')
}
