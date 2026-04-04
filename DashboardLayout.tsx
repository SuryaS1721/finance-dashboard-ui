import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import DashboardOverview from './DashboardOverview';
import TransactionList from './TransactionList';
import InsightsPanel from './InsightsPanel';
import SettingsModal from './SettingsModal';
import ProfileModal from './ProfileModal';

const DashboardLayout = () => {
    const [activeView, setActiveView] = useState('dashboard');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 overflow-hidden font-sans">
            {/* Sidebar */}
            <Sidebar 
                activeView={activeView} 
                onViewChange={setActiveView} 
                onOpenSettings={() => setIsSettingsOpen(true)}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header 
                    onOpenSettings={() => setIsSettingsOpen(true)}
                    onOpenProfile={() => setIsProfileOpen(true)}
                />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    {activeView === 'dashboard' && <DashboardOverview />}
                    {activeView === 'transactions' && <TransactionList />}
                    {activeView === 'insights' && <InsightsPanel />}
                </main>
            </div>

            {/* Global Modals */}
            <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </div>
    );
};

export default DashboardLayout;
