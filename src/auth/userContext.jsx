import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Function to validate the cookie
        const validateCookie = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('/user/getuser');
                if (response.status === 200) {
                    setUser(response.data.user);
                } else {
                    setUser(null);
                    window.location.href = process.env.REACT_APP_MAIN_URL
                }
            } catch (error) {
                setUser(null);
                window.location.href = process.env.REACT_APP_MAIN_URL
            } finally {
                setIsLoading(false);
            }
        };

        validateCookie();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};