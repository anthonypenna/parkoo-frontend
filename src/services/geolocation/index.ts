export function getGeolocationPosition(): Promise<GeolocationPosition> {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}
