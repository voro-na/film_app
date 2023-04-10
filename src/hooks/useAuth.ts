import authenticationStore from '../store/authenticationStore'
interface useAuthType {
  isAuth: boolean
  email: string | null
  token: string | null
  id: string | null
}
const useAuth = (): useAuthType => {
  const { email, token, id } = { ...authenticationStore.initialState }
  return {
    isAuth: !(email == null),
    email,
    token,
    id
  }
}
export default useAuth
