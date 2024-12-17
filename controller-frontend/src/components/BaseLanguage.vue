<template>
  <base-select v-if="options.length > 1" :el="el" @input="changeLanguage"/>
</template>

<script>
import BaseSelect from '../components/form/BaseSelect'
import { getLanguage } from '../services/i18n'
import { getIndex } from '../services/helper'

export default {
  name: 'BaseLanguage',

  components: { BaseSelect },
  data() {
    return {
      form: {
        lang: 'en-US',
      },
      options: [
        { label: 'Hebrew', value: 'he' },
        { label: 'English', value: 'en-US' },
        // { label: 'Spanish', value: 'es' },
      ]
    }
  },
  computed: {
    el() {
      return {
        dense: true,
        emitValue: true,
        mapOptions: true,
        borderless: true,
        optionsDense: true,
        color: 'secondary',
        form: this.form,
        key: 'lang',
        options: this.options
      }
    }
  },

  methods: {
    async changeLanguage(lang) {
      if (!lang) lang = 'en-US'
      getLanguage(lang)
      this.setQuasarLanguage(lang)
      localStorage.set('lang', lang)
    },

    setQuasarLanguage(lang = 'en-US') {
      // dynamic import, so loading on demand only
      import('quasar/lang/' + lang.toLowerCase()).then(lang => {
        lang.default.rtl = false
        this.$q.lang.set(lang.default)
      })
    }
  },
  created() {
    if (localStorage.has('lang')) {
      const index = getIndex(this.options, 'value', localStorage.get('lang'))
      if (index > -1) this.form.lang = this.options[index].value
    } else {
      this.changeLanguage(this.form.lang)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
