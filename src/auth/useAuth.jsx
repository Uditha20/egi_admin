import { useContext } from 'react';
import { AuthContext } from './userContext'

export const useAuth = () => {
    return useContext(AuthContext);
};