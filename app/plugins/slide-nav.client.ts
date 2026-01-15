export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    const router = useRouter()
    
    const handleKeyDown = (event: KeyboardEvent) => {
      const route = router.currentRoute.value
      
      // Only handle keyboard shortcuts on slide pages
      if (!route.path.includes('/p/') || !route.path.includes('/s/')) {
        return
      }
      
      const slug = route.params.slug as string
      const currentSlide = parseInt(route.params.n as string)
      
      switch (event.key) {
        case 'ArrowLeft':
        case 'PageUp':
          event.preventDefault()
          if (currentSlide > 1) {
            router.push(`/p/${slug}/s/${currentSlide - 1}`)
          }
          break
          
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          event.preventDefault()
          router.push(`/p/${slug}/s/${currentSlide + 1}`)
          break
          
        case 'Home':
          event.preventDefault()
          router.push(`/p/${slug}`)
          break
          
        case 'f':
        case 'F':
          event.preventDefault()
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
          } else {
            document.exitFullscreen()
          }
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    
    // Cleanup on app unmount
    nuxtApp.hook('app:unmounted', () => {
      window.removeEventListener('keydown', handleKeyDown)
    })
  }
})
