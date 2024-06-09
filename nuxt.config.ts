// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  css: ["@/assets/css/main.css"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/main.scss" as *;'
        }
      }
    }
  },
  modules: ['@pinia/nuxt','@element-plus/nuxt','@nuxtjs/color-mode','@nuxtjs/tailwindcss'],
  app: {
    head: {
      title:'Bệnh viện Đà Nẵng',
      link: [
      { rel: "icon", type: "image/png", href: "/logo_dana_hospital.png" }
    ]
    },
    
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://api.example.com/',
    },
  },
})
