import { useContext, useDebugValue } from "react";
import {AuthContext} from "../context/AuthContext";

const useAuth = () => {
    const  auth  = useContext(AuthContext);
    if(!auth) {
        throw Error('useAuthContext must be used inside an AuthContextProvider')
      }
    return auth;
}

export default useAuth;