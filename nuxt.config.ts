/*
 * @Author: cumany cuman@qq.com
 * @Date: 2023-09-06 10:58:21
 * @LastEditors: cumany cuman@qq.com
 * @LastEditTime: 2023-11-03 14:08:29
 * @Description: 
 */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'Pkmer-widget',
            meta: [
                { name: 'description', content: 'Pkmer挂件集市.' },
                { 'http-equiv': 'cache-control', content: 'max-age=180' }
            ],
        }
    },
    devtools: { enabled: true },
    build: {
        transpile:
            process.env.NODE_ENV === 'production' ?
                [
                    "moment",
                    "moment/dist/locale/zh-cn",
                    "tinycolor2",
                    "naive-ui",
                    'vueuc',
                    '@css-render/vue3-ssr',
                    '@juggle/resize-observer'
                ] : [
                    "moment",
                    "moment/dist/locale/zh-cn",
                    "tinycolor2",
                    '@juggle/resize-observer'
                ],
    },
    vite: {
        optimizeDeps: {
            include:
                process.env.NODE_ENV === 'development'
                    ? ['naive-ui', 'vueuc', 'date-fns-tz/formatInTimeZone']
                    : []
        }
    }
})
