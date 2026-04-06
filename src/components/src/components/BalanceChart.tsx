import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const SummaryCards = () => {
    const { transactions } = useAppContext();

    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const balance = income - expenses;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Total Balance Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Balance</p>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                            ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </h3>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/40 rounded-xl text-blue-600 dark:text-blue-400">
                        <DollarSign size={24} />
                    </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-500 font-medium flex items-center bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-md">
                        <ArrowUpRight size={16} className="mr-1" />
                        +2.5%
                    </span>
                    <span className="text-gray-400 ml-2">from last month</span>
                </div>
            </div>

            {/* Total Income Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Income</p>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                            ${income.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </h3>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/40 rounded-xl text-green-600 dark:text-green-400">
                        <ArrowUpRight size={24} />
                    </div>
                </div>
            </div>

            {/* Total Expenses Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Expenses</p>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                            ${expenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </h3>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-900/40 rounded-xl text-red-600 dark:text-red-400">
                        <ArrowDownRight size={24} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummaryCards;
