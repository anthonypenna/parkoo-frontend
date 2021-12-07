declare global {
  namespace NodeJS {
    interface Process {
      env: {
        VUE_APP_MAPBOX_ACCESS_TOKEN: string
      }
    }
  }
}
