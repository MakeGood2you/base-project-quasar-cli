import Vue from 'vue'


Vue.mixin({
  methods:{
    showLoading() {
      this.loading.show({
        spinnerColor: 'primary',
        spinnerSize: 140,
      })
    }
  }
})

