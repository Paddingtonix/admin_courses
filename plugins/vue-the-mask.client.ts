import { defineNuxtPlugin } from '#app'
import VueTheMask from 'vue-the-mask'

export default defineNuxtPlugin((nuxtApp) => {

  const customTokens = {
    'D': { pattern: /[0-3]/ },
    '0': { pattern: /[0-9]/ },
    'M': { pattern: /[0-1]/ },
    'Y': { pattern: /[0-9]/ } 
  }

  nuxtApp.vueApp.use(VueTheMask, { tokens: customTokens })
})