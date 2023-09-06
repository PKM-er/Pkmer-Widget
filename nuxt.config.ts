// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'Pkmer-widget',
            meta: [
                { name: 'description', content: 'Pkmer挂件集市.' },
                { 'http-equiv': 'cache-control', content: 'max-age=180.' }
            ],
        }
    },
    devtools: { enabled: true },
    build: {
        transpile: [
            "moment/dist/locale/zh-cn",
            "tinycolor2"
        ]
    }
})
