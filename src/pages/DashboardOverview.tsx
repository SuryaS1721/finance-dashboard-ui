import { useState } from 'react';
import { Plus } from 'lucide-react';
import SummaryCards from './SummaryCards';
import BalanceChart from './BalanceChart';
import SpendingChart from './SpendingChart';
import TransactionList from './TransactionList';
import InsightsPanel from './InsightsPanel';
import TransactionModal from './TransactionModal';
import { useAppContext } from '../context/AppContext';

const DashboardOverview = () => {
    const { role, addTransaction } = useAppContext();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <div className="max-w-7xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Last updated: Today, 10:45 AM
                </div>
            </div>

            <InsightsPanel />
            <SummaryCards />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                    <BalanceChart />
                </div>
                <div className="lg:col-span-1">
                    <SpendingChart />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden mb-8">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Transactions</h2>
                    {role === 'admin' && (
                        <button 
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg flex items-center justify-center gap-1 text-sm font-medium transition-colors shadow-sm"
                        >
                            <Plus size={16} /> Add New
                        </button>
                    )}
                </div>
                <div className="p-6">
                    <TransactionList limit={5} />
                </div>
            </div>

            <TransactionModal 
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={(data) => {
                    addTransaction(data);
                    setIsAddModalOpen(false);
                }}
                transaction={null}
            />
        </div>
    );
};

export default DashboardOverview;
