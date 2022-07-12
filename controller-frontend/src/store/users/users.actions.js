import HTTP from '../../services/HTTP'

export async function  getUsers({ commit }, params) {
  const { users, count } = await HTTP.get('/users', params)
  commit('setUsers', [...users])
  return { users, count }
}
export async function createUser({ commit }, params) {
  try {
    const { data } = await HTTP.post('/users', params)
    commit('setUser', { ...data.user })
  } catch (err) {
    throw err
  }
}
export async function updateUser({ commit }, params) {
  try {
    const { data } = await HTTP.put('/users/' + params.uuid, params)
    commit('updateUser', { ...data.user })
  } catch (err) {
    throw err
  }
}
export async function deleteUser({ commit, state }, id) {
  try {
    await HTTP.remove('/users/' + id, { data: { id: id } })
    const users = state.users
    commit('setUsers', users.filter(t => t.uuid !== id))
  } catch (err) {
    throw err
  }
}
