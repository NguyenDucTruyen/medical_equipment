// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/main.scss" as *;'
        }
      }
    }
  },
  modules: ['@pinia/nuxt'],
  app: {
    head: {
      title:'Quản lý thiết bị y tế',
      link: [
      { rel: "icon", type: "image/png", href: "/logo_dana_hospital.png" }
    ]
    },
    
  },
})
