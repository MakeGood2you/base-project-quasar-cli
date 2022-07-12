import Vue from 'vue'
import {getHTTP} from '../services/HTTP'
Vue.prototype.$axios = getHTTP()
