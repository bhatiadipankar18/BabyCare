import {createContext, useContext, useState} from "react";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // console.log("auth provider 注意我要创建新的useLocalStoreage了");
    const [user, setUser] = useLocalStorage("user", null);
    const [child, setChild] = useLocalStorage( "child",null);
    const value = {
            user,
            setUser,
            child,
            setChild
        };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
