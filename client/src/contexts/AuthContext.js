import { createContext, useContext } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

const initialUserData = {
    id: '',
    username: '',
    token: '',
    email: '',
    roleName: '',
}

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('user', initialUserData);

    const login = (userData) => {
        setUser(userData);
    }

    const logout = () => {
        setUser(initialUserData);
    }

    const register = (userData) => {
        setUser(userData);
    }


    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuthContext = () => {
    const authState = useContext(AuthContext);

    return authState;
}