import axios from 'axios'
import { v1 } from 'uuid'
import { getConfig } from './config'
import { getIndex } from '../services/helper'


let HTTP = null
const version = 'v1'
const lang = getBrowserLocale()

export function getBrowserLocale() {
  if (navigator.languages !== undefined)
    return navigator.languages[0]
  return navigator.language
}

const { CancelToken } = axios
const cancelTokens = {}

export const getHTTP = async () => {
  try {

    if (HTTP) return HTTP

    const config = await getConfig()

    if (!config) {
      alert('Communication issues.\nPlease refresh the browser and try again.')
      throw 'Communication error'
    }


    const baseURL = config.backend_url
    console.log('Backend base url: ' + baseURL)

    HTTP = axios.create({
      baseURL,
      withCredentials: false,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    HTTP.interceptors.request.use(config => {
      if (sessionStorage.has('accessToken')) {
        config.headers.authorization = 'Bearer ' + sessionStorage.get('accessToken')
      }
      return config
    }, (error) => {
      return Promise.reject(error)
    })

    HTTP.interceptors.response.use(function(response) {

      return response
    }, (error) => {
      if (error.response && error.response.status === 401) {
        sessionStorage.destroy()
        return location.reload()
      }
      return Promise.reject(error)
    })

    return HTTP

  } catch (err) {
    console.log(err)
  }
}

const setBaseURL = async (ou) => {
  const HTTP = await getHTTP()
  const config = await getConfig()
  HTTP.defaults.baseURL = config.backend_url + version + '/' + customer + '/' + ou
  console.log('Backend base url: ' + HTTP.defaults.baseURL)
}

const get = async (route, params = {}, config = {}) => new Promise(async (resolve, reject) => {
  const HTTP = await getHTTP()

  if (cancelTokens[config.cancelToken]) cancelTokens[config.cancelToken]('Request canceled.')

  const accessToken = params.authorization
  delete params.authorization

  HTTP.get(route, {
    headers: {
      ...(accessToken ? { authorization: 'Bearer ' + accessToken } : null),
      'X-Request-ID': v1(),
      'X-Locale': lang
    },
    params,
    cancelToken: config.cancelToken ? new CancelToken((c) => (cancelTokens[config.cancelToken] = c)) : null,
  }).then((res) => {
    resolve(res.data)
  }).catch((err) => {
    reject(err)
  })
})

const post = async (route, params, config = {}) => {
  return new Promise(async(resolve, reject) => {
    if (cancelTokens[config.cancelToken]) cancelTokens[config.cancelToken]('Request canceled.')

    const HTTP = await getHTTP()
    debugger
   return HTTP.post(route, params, {
      headers: {
        'X-Request-ID': v1(),
        'X-Locale': lang
      },
      cancelToken: config.cancelToken ? new CancelToken((c) => (cancelTokens[config.cancelToken] = c)) : null
    }).then((res) => {
      resolve(res)
    }).catch((err) => {

      reject(err)
    })
  })
}

const put = async (route, params, headers) => new Promise(async(resolve, reject) => {
  const HTTP = await getHTTP()
  HTTP.put(route, params, {
    headers: {
      'X-Request-ID': v1(),
      'X-Locale': lang,
      ...headers
    }
  }).then((res) => {
    resolve(res)
  }).catch((err) => {
    reject(err)
  })
})

const patch = async (route, params) => new Promise(async(resolve, reject) => {
  const HTTP = await getHTTP()
  HTTP.patch(route, params, {
    headers: {
      'X-Request-ID': v1(),
      'X-Locale': lang
    }
  }).then((res) => {
    resolve(res)
  }).catch((err) => {
    reject(err)
  })
})

const remove = async (route, params) => new Promise(async(resolve, reject) => {
  const HTTP = await getHTTP()
  HTTP.delete(route, params, {
    headers: {
      'X-Request-ID': v1(),
      'X-Locale': lang
    }
  }).then((res) => {
    resolve(res)
  }).catch((err) => {
    reject(err)
  })
})

export default {
  setBaseURL,
  get,
  put,
  post,
  patch,
  remove
}
