import axios from '../api/axios';
import useAuth from './useAuth';
import { useAuthContext } from './useAuthContext';

const useRefreshToken = () => {
    const { setAuth } = useAuthContext();

    const refresh = async () => {
        const response = await axios.get('/login/refresh/', {
            
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.acess);
            return { ...prev, acess: response.data.acess }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
