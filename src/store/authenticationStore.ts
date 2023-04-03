import { makeAutoObservable } from 'mobx'

const initial = {
  email: null,
  token: null,
  id: null
}

class AuthenticationStore {
  name = 'user'
  initialState = initial

  constructor () {
    makeAutoObservable(this)
  }

  setUser (action: any): void {
    this.initialState.email = action.email
    this.initialState.token = action.token
    this.initialState.id = action.id
  }

  removeUser (): void {
    this.initialState.email = null
    this.initialState.token = null
    this.initialState.id = null
  }
}

export default new AuthenticationStore()
