if (process.env.NODE_ENV === 'development') {
  importScripts('/mapboxServiceWorker.js')
} else {
  importScripts('/service-worker.js', '/mapboxServiceWorker.js')
}
