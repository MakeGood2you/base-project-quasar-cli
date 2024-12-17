import HTTP from '../../services/HTTP'

export async function loginAdmin({ commit }, user) {
  try {
    const userData = await HTTP.post('/authentication/signin', { email: user.email, password: user.password })
    commit('setToken', userData.data.accessToken)
    return userData.data
  } catch (err) {
    return err.response.data
  }
}

export async function forgotPassword({ commit }, form) {
  try {
    return await HTTP.post('/authentication/forgot-password', { email: form.email })
  } catch (err) {
    throw err
  }
}


export async function resetPassword({ commit }, form) {
  try {
    return await HTTP.post('/authentication/reset-password', form)
  } catch (err) {
    throw err
  }
}


export async function changePassword({ commit }, params) {
  try {
    return await HTTP.post('/authentication/change-password', params)
  } catch (err) {
    throw err
  }
}
