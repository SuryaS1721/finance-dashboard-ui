import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Transaction, TransactionType } from '../types';

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Omit<Transaction, 'id'>) => void;
    transaction: Transaction | null;
}

const TransactionModal = ({ isOpen, onClose, onSave, transaction }: TransactionModalProps) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState<TransactionType>('expense');
    const [date, setDate] = useState('');

    useEffect(() => {
        if (transaction) {
            setDescription(transaction.description);
            setAmount(transaction.amount.toString());
            setCategory(transaction.category);
            setType(transaction.type);
            setDate(transaction.date);
        } else {
            setDescription('');
            setAmount('');
            setCategory('');
            setType('expense');
            setDate(new Date().toISOString().split('T')[0]);
        }
    }, [transaction, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            description,
            amount: parseFloat(amount),
            category,
            type,
            date
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {transaction ? 'Edit Transaction' : 'Add Transaction'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" checked={type === 'expense'} onChange={() => setType('expense')} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"/>
                                <span className="text-gray-900 dark:text-gray-100 font-medium">Expense</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" checked={type === 'income'} onChange={() => setType('income')} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"/>
                                <span className="text-gray-900 dark:text-gray-100 font-medium">Income</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <input required type="text" placeholder="e.g. Groceries" value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount ($)</label>
                            <input required type="number" step="0.01" min="0.01" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all focus:bg-white dark:focus:bg-gray-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                            <input required type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all focus:bg-white dark:focus:bg-gray-800 [color-scheme:light] dark:[color-scheme:dark]" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                        <input required type="text" placeholder="e.g. Food" value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all focus:bg-white dark:focus:bg-gray-800" />
                    </div>
                    <div className="pt-4 flex justify-end gap-3 mt-6">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm shadow-blue-500/20 active:scale-[0.98]">
                            {transaction ? 'Save Changes' : 'Add Transaction'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TransactionModal;
