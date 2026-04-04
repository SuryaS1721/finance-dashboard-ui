import { useState } from 'react';
import { MoreHorizontal, Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Transaction } from '../types';
import TransactionModal from './TransactionModal';

interface TransactionListProps {
    limit?: number;
}

const TransactionList = ({ limit }: TransactionListProps) => {
    const { transactions, role, addTransaction, editTransaction, deleteTransaction } = useAppContext();

    const [filterType, setFilterType] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const filteredTransactions = transactions.filter(t => {
        const matchesType = filterType === 'all' || t.type === filterType;
        const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.category.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesType && matchesSearch;
    });

    const displayedTransactions = limit ? filteredTransactions.slice(0, limit) : filteredTransactions;

    const handleAdd = () => {
        setEditingTransaction(null);
        setIsModalOpen(true);
    };

    const handleEdit = (tx: Transaction) => {
        setEditingTransaction(tx);
        setIsModalOpen(true);
        setOpenMenuId(null);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            deleteTransaction(id);
        }
        setOpenMenuId(null);
    };

    const handleSave = (data: Omit<Transaction, 'id'>) => {
        if (editingTransaction) {
            editTransaction({ ...data, id: editingTransaction.id });
        } else {
            addTransaction(data);
        }
    };

    const toggleMenu = (id: string) => {
        if (openMenuId === id) {
            setOpenMenuId(null);
        } else {
            setOpenMenuId(id);
        }
    };

    return (
        <div className="w-full">
            {/* Filtering Header - hide if it's a limited quick view on dashboard */}
            {!limit && (
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                        {['all', 'income', 'expense'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={twMerge(
                                    'px-4 py-2 text-sm font-medium rounded-md capitalize transition-colors',
                                    filterType === type
                                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                )}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-64 border rounded-xl dark:border-gray-700 bg-white dark:bg-gray-800">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-xl bg-transparent border-none focus:ring-0 text-sm dark:text-gray-200"
                            />
                        </div>
                        {role === 'admin' && (
                            <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl flex items-center justify-center transition-colors">
                                <Plus size={20} />
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto min-h-[300px]">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 relative">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800/50 dark:text-gray-300">
                        <tr>
                            <th scope="col" className="px-6 py-4 rounded-l-lg">Transaction</th>
                            <th scope="col" className="px-6 py-4">Category</th>
                            <th scope="col" className="px-6 py-4">Date</th>
                            <th scope="col" className="px-6 py-4 text-right">Amount</th>
                            {role === 'admin' && <th scope="col" className="px-6 py-4 rounded-r-lg"></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {displayedTransactions.length > 0 ? (
                            displayedTransactions.map((tx) => (
                                <tr key={tx.id} className="bg-white dark:bg-transparent border-b dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        {tx.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-md text-xs font-medium">
                                            {tx.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td className={clsx("px-6 py-4 text-right font-bold", tx.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white')}>
                                        {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </td>
                                    {role === 'admin' && (
                                        <td className="px-4 py-4 text-right relative">
                                            <button 
                                                onClick={() => toggleMenu(tx.id)}
                                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-md transition-colors"
                                            >
                                                <MoreHorizontal size={20} />
                                            </button>
                                            
                                            {openMenuId === tx.id && (
                                                <>
                                                    <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)}></div>
                                                    <div className="absolute right-8 top-10 mt-1 w-32 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 z-20 py-1 overflow-hidden">
                                                        <button 
                                                            onClick={() => handleEdit(tx)}
                                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                                                        >
                                                            <Edit2 size={14} /> Edit
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(tx.id)}
                                                            className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                                                        >
                                                            <Trash2 size={14} /> Delete
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={role === 'admin' ? 5 : 4} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                    No transactions found matching your criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <TransactionModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                transaction={editingTransaction}
            />
        </div>
    );
};

export default TransactionList;
