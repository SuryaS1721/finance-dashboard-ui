export type Role = 'viewer' | 'admin';
export type Theme = 'light' | 'dark';
export type TransactionType = 'income' | 'expense';

export interface Transaction {
    id: string;
    date: string;
    amount: number;
    category: string;
    type: TransactionType;
    description: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface NotificationItem {
    id: string;
    title: string;
    message: string;
    date: string;
    read: boolean;
}

export interface AppState {
    transactions: Transaction[];
    role: Role;
    theme: Theme;
    notifications: NotificationItem[];
}
