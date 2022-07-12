export const setUsers = (state, users) => state.users = users

export const setUser = (state, user) => state.users.splice(0, 0, user)

export const updateUser = (state, user) => {
  const index = state.users.findIndex(e => e.uuid === user.uuid)
  if (index > -1) state.users[index] = user
}
