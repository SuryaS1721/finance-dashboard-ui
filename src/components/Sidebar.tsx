import { LayoutDashboard, Receipt, PieChart, Settings, Wallet } from 'lucide-react';

interface SidebarProps {
    activeView: string;
    onViewChange: (view: string) => void;
    onOpenSettings: () => void;
}

const Sidebar = ({ activeView, onViewChange, onOpenSettings }: SidebarProps) => {
    return (
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg text-white">
                    <Wallet size={24} />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-300">
                    FinDash
                </span>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                <button
                    onClick={() => onViewChange('dashboard')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeView === 'dashboard' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </button>
                <button
                    onClick={() => onViewChange('transactions')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeView === 'transactions' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
                    <Receipt size={20} />
                    <span>Transactions</span>
                </button>
                <button
                    onClick={() => onViewChange('insights')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeView === 'insights' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
                    <PieChart size={20} />
                    <span>Insights</span>
                </button>
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <button onClick={onOpenSettings} className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl font-medium transition-colors">
                    <Settings size={20} />
                    <span>Settings</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
