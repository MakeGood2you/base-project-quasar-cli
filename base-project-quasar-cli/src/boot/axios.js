import Vue from 'vue'
import '../services/storage'
import {getHTTP} from '../services/HTTP'
Vue.prototype.$axios = getHTTP()
