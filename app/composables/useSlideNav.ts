export const useSlideNav = (slug: string, currentSlide: number, totalSlides: number) => {
  const prevUrl = computed(() => {
    if (currentSlide <= 1) return undefined
    return `/p/${slug}/s/${currentSlide - 1}`
  })
  
  const nextUrl = computed(() => {
    if (currentSlide >= totalSlides) return undefined
    return `/p/${slug}/s/${currentSlide + 1}`
  })
  
  const indexUrl = computed(() => `/p/${slug}`)
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }
  
  return {
    prevUrl,
    nextUrl,
    indexUrl,
    toggleFullscreen
  }
}
