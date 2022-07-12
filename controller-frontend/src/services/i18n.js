import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import Languages from '../i18n'

Vue.use(VueI18n)

const locale = getBrowserLocale()
const loadedLanguages = []

export function getBrowserLocale() {
  if (localStorage.has('lang')) {
    return localStorage.get('lang')
  } else if (navigator.languages !== undefined)
    return navigator.languages[0]
  return navigator.language
}

export const i18n = new VueI18n({
  locale,
  fallbackLocale: locale,
  messages: {},
})

function setI18nLanguage(lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return i18n
}

export function getLanguage(lang) {
  const _lang = lang || locale
  try {
    // If the language was already loaded
    if (loadedLanguages.includes(lang)) {
      return Promise.resolve(setI18nLanguage(lang))
    }
    // Get the unloaded language from the server
    console.log(`Loading ${_lang} locale...`)
    const newMessages = Languages[_lang] || Languages['en-US']
    i18n.setLocaleMessage(_lang, newMessages)
    loadedLanguages.push(_lang)
    return setI18nLanguage(_lang)
  } catch (err) {
    console.log(err)
  }
}
