import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { TailSpin } from "react-loader-spinner";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Function to validate the cookie
        const validateCookie = async () => {
            try {
                const response = await axios.get('/user/getuser');
                if (response.status === 200) {
                    setUser(response.data.user);
                    setIsLoading(false);
                } else {
                    setUser(null);
                    window.location.href = process.env.REACT_APP_MAIN_URL
                }
            } catch (error) {
                setUser(null);
                window.location.href = process.env.REACT_APP_MAIN_URL
             } // } finally {
            //     setIsLoading(false);
            // }
        };

        validateCookie();
    }, []);

    if (isLoading) {
        return (
          <div className="spinner-container">
            <TailSpin
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        );
      }

    return (
        <AuthContext.Provider value={{ user, setUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};