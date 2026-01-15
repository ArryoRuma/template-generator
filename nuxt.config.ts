// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-12-22',
  devtools: { enabled: true },
  
  // Static Site Generation for GitHub Pages
  ssr: true,
  nitro: { 
    preset: 'github_pages' 
  },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/template-generator/',
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { 
          rel: 'stylesheet', 
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Open+Sans:wght@400;600&display=swap' 
        }
      ]
    }
  },
  css: [
    '@/assets/css/theme.css',
    '@/assets/css/slide.css',
  ],
})
