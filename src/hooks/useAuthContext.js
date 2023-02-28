import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

export const useAuthContext = () => {
  const auth = useContext(AuthContext)

  if(!auth) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return auth
}