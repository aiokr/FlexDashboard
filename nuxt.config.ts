// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@element-plus/nuxt', '@nuxtjs/tailwindcss', "@nuxtjs/supabase"],
  devtools: { enabled: true },
  components: {
    dirs: []
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
})