import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';

interface AuthContextProps {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, pass: string) => boolean;
    signup: (name: string, email: string, pass: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('finance_dashboard_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            } catch (e) {
                console.error('Failed to restore user session');
            }
        }
    }, []);

    const login = (email: string, pass: string): boolean => {
        // Mock checking localStorage for the credentials
        const storedCredentials = localStorage.getItem('finance_dashboard_credentials');
        if (storedCredentials) {
            const creds = JSON.parse(storedCredentials);
            if (creds.email === email && creds.password === pass) {
                const loggedInUser: User = { id: creds.id, name: creds.name, email: creds.email };
                setUser(loggedInUser);
                setIsAuthenticated(true);
                localStorage.setItem('finance_dashboard_user', JSON.stringify(loggedInUser));
                return true;
            }
        }
        // Allows any generic credentials if none exist for a smooth demo experience, or just simple check
        if (email && pass) {
            const tempUser: User = { id: Math.random().toString(36).substring(7), name: email.split('@')[0], email };
            setUser(tempUser);
            setIsAuthenticated(true);
            localStorage.setItem('finance_dashboard_user', JSON.stringify(tempUser));
            return true;
        }
        return false;
    };

    const signup = (name: string, email: string, pass: string): boolean => {
        const id = Math.random().toString(36).substring(7);
        const newUser: User = { id, name, email };
        
        // Save to credentials 
        localStorage.setItem('finance_dashboard_credentials', JSON.stringify({ id, name, email, password: pass }));
        
        // Auto login
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('finance_dashboard_user', JSON.stringify(newUser));
        
        return true;
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('finance_dashboard_user');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
