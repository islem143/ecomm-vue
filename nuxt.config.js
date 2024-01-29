// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'
export default defineNuxtConfig({
    typescript: false,
    // build: { 
    //     transpile: ['vue-i18n'] 
    //   }, 
    //   vite: { 
    //     plugins: [ 
    //       VueI18nVitePlugin({ 
    //         include: [ 
    //           resolve(dirname(fileURLToPath(import.meta.url)), './locales/*.json') 
    //         ] 
    //       }) 
    //     ] 
    //   } ,
    app: {
        head: {
            title: 'Sakai Vue',
            link: [
                {
                    id: 'theme-css',
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: '/themes/mdc-light-indigo/theme.css'
                },
            ]
        },
    
    },
    modules: ['nuxt-primevue'],
    primevue: {
        options: { ripple: true },
        components: {
            exclude: ['Editor']
        }
    },
 

    
    script: [
        // {
        //     strategy: 'lazyOnload',
        //     src: 'https://www.googletagmanager.com/gtag/js?id=UA-93461466-1'
        // },
        // {
        //     id: 'ga-analytics',
        //     strategy: 'lazyOnload',
        //     children: `
        //         window.dataLayer = window.dataLayer || [];
        //         function gtag(){dataLayer.push(arguments);}
        //         gtag('js', new Date());
        //         gtag('config', 'UA-93461466-1');
        //     `
        // }
    ],
    css: ['primeicons/primeicons.css', 'primeflex/primeflex.scss', 'primevue/resources/primevue.min.css', '@/assets/styles.scss']
});
