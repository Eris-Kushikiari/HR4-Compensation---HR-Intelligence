import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../utils/axios'

interface User {
    id: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string, confirmPassword: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: async () => {},
    register: async () => {},
    logout: async () => {},
})

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        api
        .get('/api/profile')
        .then((res) => setUser(res.data.user))
        .catch(() => setUser(null))
        .finally(() => setLoading(false))
    }, [])

    const login = async (email: string, password: string) =>{
        await api.post('/api/auth/login', {email, password})
        const res = await api.get('/api/profile')
        setUser(res.data.user)
    }

    const register = async (username: string, email: string, password: string, confirmPassword: string) =>{
        await api.post('/api/auth/register', {username, email, password, confirmPassword})
        const res = await api.get('/api/profile')
        setUser(res.data.user)
    }

    const logout = async () =>{
        await api.post('/api/auth/logout')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, loading, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

