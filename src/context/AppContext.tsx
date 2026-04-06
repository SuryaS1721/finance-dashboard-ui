import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Transaction, Role, Theme, AppState, NotificationItem } from '../types';
import { mockTransactions } from '../mocks/transactions';

interface AppContextProps extends AppState {
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    editTransaction: (transaction: Transaction) => void;
    deleteTransaction: (id: string) => void;
    setRole: (role: Role) => void;
    toggleTheme: () => void;
    markAsRead: (id: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

const initialNotifications: NotificationItem[] = [
    { id: '1', title: 'New transaction added', message: 'A new income of $4,000 was added.', date: new Date().toISOString(), read: false },
    { id: '2', title: 'High expense alert', message: 'You spent $500 on Groceries.', date: new Date(Date.now() - 86400000).toISOString(), read: false },
    { id: '3', title: 'Monthly summary ready', message: 'Your financial summary for last month is ready.', date: new Date(Date.now() - 172800000).toISOString(), read: true },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
    const [role, setRoleState] = useState<Role>('viewer');
    const [theme, setThemeState] = useState<Theme>('light');
    const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
        const newTransaction: Transaction = {
            ...transaction,
            id: Math.random().toString(36).substr(2, 9),
        };
        setTransactions(prev => [newTransaction, ...prev]);
        
        // Add a notification
        setNotifications(prev => [
            { id: Math.random().toString(), title: 'Transaction Added', message: `Added ${transaction.type} of $${transaction.amount}`, date: new Date().toISOString(), read: false },
            ...prev
        ]);
    };

    const editTransaction = (updated: Transaction) => {
        setTransactions(prev => prev.map(t => (t.id === updated.id ? updated : t)));
    };

    const deleteTransaction = (id: string) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    const setRole = (newRole: Role) => setRoleState(newRole);

    const toggleTheme = () => setThemeState(prev => prev === 'dark' ? 'light' : 'dark');

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    return (
        <AppContext.Provider value={{ transactions, role, theme, notifications, addTransaction, editTransaction, deleteTransaction, setRole, toggleTheme, markAsRead }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
