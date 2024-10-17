export default defineNuxtConfig({
  devtools: { enabled: false },

  vite: {
      css: {
          preprocessorOptions: {
              sass: {
                  additionalData: '@import "./src/assets/style/index.sass"'
              },
          },
      },
  },

  components: {
      dirs: [
          '~/src/components/base/modals',
          '~/src/components/base',
          '~/src/components/ui-components',
          '~/pages',
      ],
  },

  modules: [
      '@pinia/nuxt'
  ],

  ssr: true,

  plugins: [
      '~/plugins/vue-the-mask.client.ts',
      '~/plugins/v-calendar.ts',
      '~/plugins/directives.ts',
      '~/plugins/animation.ts'
    ],

  compatibilityDate: '2024-10-16',
})