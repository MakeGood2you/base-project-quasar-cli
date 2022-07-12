import Vue from 'vue'


Vue.mixin({
  methods:{
    showLoading() {
      this.loading.show({
        spinnerColor: 'primery',
        spinnerSize: 140,
      })
    }
  }
})

new Vue({
  myOption: 'hello!'
})
// => "hello!"
