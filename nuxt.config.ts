// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@element-plus/nuxt', '@nuxtjs/tailwindcss', "@nuxtjs/supabase"],
  devtools: { enabled: true },
  components: [
    {
      path: '~/components/',
      pathPrefix: true,
    },
  ],
  srcDir: 'src/',
  supabase: {
    redirect: true,
    redirectOptions: {
      login: '/login',
      callback: '/callback',
      include: ['/settings(/*)?', '/user(/*)?'],
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
})