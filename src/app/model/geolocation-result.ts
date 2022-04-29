export interface GeolocationResult {
  results: {
    address_components: {
      long_name: string,
      types: string[]
    }[]
  }[]
}
