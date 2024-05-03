export default {
  fourDev: {
    baseUrls: {
      apiUrl: (path: string) => {
        return `${import.meta.env.VITE_API}${path}`
      }
    }
  }
}
