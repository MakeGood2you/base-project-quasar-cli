// import axios from 'axios'

let config = null

const getConfig = async () => {
  try {
    if (config) return config
      config = {
        backend_url: process.env.API,
        gtms: process.env.GTM ? JSON.parse(process.env.GTM) : [],
        features: process.env.FEATURES ? JSON.parse(process.env.FEATURES) : {}
      }
    return config

  } catch (err) {
    console.log(err)
  }
}

export {
  getConfig,
}
