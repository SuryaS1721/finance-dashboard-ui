import type { Transaction } from '../types';

export const mockTransactions: Transaction[] = [
    {
        id: '1',
        date: '2026-04-01',
        amount: 5000,
        category: 'Salary',
        type: 'income',
        description: 'Monthly Salary',
    },
    {
        id: '2',
        date: '2026-04-02',
        amount: 1500,
        category: 'Rent',
        type: 'expense',
        description: 'Monthly Rent Payment',
    },
    {
        id: '3',
        date: '2026-04-03',
        amount: 120.5,
        category: 'Groceries',
        type: 'expense',
        description: 'Supermarket',
    },
    {
        id: '4',
        date: '2026-04-05',
        amount: 60,
        category: 'Utilities',
        type: 'expense',
        description: 'Internet Bill',
    },
    {
        id: '5',
        date: '2026-04-06',
        amount: 300,
        category: 'Freelance',
        type: 'income',
        description: 'Web Design Project',
    },
    {
        id: '6',
        date: '2026-04-08',
        amount: 85,
        category: 'Entertainment',
        type: 'expense',
        description: 'Movie and Dinner',
    },
];
