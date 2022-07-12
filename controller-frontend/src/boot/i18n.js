import Vue from 'vue'
import VueI18n from 'vue-i18n'
import '../services/storage'
import { getLanguage } from '../services/i18n'

Vue.use(VueI18n)

const i18n = getLanguage()

export default ({ app }) => {
  // Set i18n instance on app
  app.i18n = i18n
}

export { i18n }
