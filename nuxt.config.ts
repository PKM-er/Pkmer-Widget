// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    build: {
        transpile: [
            "moment/dist/locale/zh-cn",
            "tinycolor2"
        ]
    }
})
