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
  modules: ['@pinia/nuxt','@element-plus/nuxt','@nuxtjs/color-mode'],
  app: {
    head: {
      title:'Bệnh viện Đà Nẵng',
      link: [
      { rel: "icon", type: "image/png", href: "/logo_dana_hospital.png" }
    ]
    },
    
  },
})
