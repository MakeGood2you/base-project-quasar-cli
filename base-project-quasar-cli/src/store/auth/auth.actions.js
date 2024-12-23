import HTTP from '../../services/HTTP'

export async function loginAdmin({ commit }, user) {
  try {
    const userData = await HTTP.post('/signin', { email: user.email, password: user.password })
    commit('setToken', userData.data.accessToken)
    return userData.data
  } catch (err) {
    return err.response.data
  }
}

export async function forgotPassword({ commit }, form) {
  try {
    return await HTTP.post('/auth/forgot-password', { email: form.email })
  } catch (err) {
    throw err
  }
}


export async function resetPassword({ commit }, form) {
  try {
    return await HTTP.post('/auth/reset-password', form)
  } catch (err) {
    throw err
  }
}

