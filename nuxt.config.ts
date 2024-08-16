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
            '~/src/pages',
        ],
    },
    modules: ['@pinia/nuxt'],
    ssr: true,
})
