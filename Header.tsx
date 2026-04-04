import React, { useState } from 'react';
import { Bell, Moon, Sun, Search, Menu, User, Settings, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import NotificationsDropdown from './NotificationsDropdown';

interface HeaderProps {
    onOpenProfile: () => void;
    onOpenSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenProfile, onOpenSettings }) => {
    const { theme, toggleTheme, notifications, role, setRole } = useAppContext();
    const { user, logout } = useAuth();
    
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleProfileClick = () => {
        setIsProfileDropdownOpen(false);
        onOpenProfile();
    };

    const handleSettingsClick = () => {
        setIsProfileDropdownOpen(false);
        onOpenSettings();
    };

    const handleLogout = () => {
        setIsProfileDropdownOpen(false);
        logout();
    };

    return (
        <header className="h-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 md:px-8 shrink-0 relative z-30">
            <div className="flex items-center w-full md:w-auto">
                <button className="md:hidden p-2 mr-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Menu size={24} />
                </button>
                <div className="relative w-full md:w-96 hidden sm:block">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                        placeholder="Search transactions..."
                    />
                </div>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4">
                {/* Role Switcher */}
                <div className="hidden sm:block">
                    <select 
                        value={role}
                        onChange={(e) => setRole(e.target.value as 'admin' | 'viewer')}
                        className="bg-transparent border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 p-2 outline-none cursor-pointer transition-colors hover:border-gray-300 dark:hover:border-gray-600"
                    >
                        <option value="admin" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Admin</option>
                        <option value="viewer" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Viewer</option>
                    </select>
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-xl transition-colors"
                    aria-label="Toggle theme"
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                {/* Notifications */}
                <div className="relative">
                    <button 
                        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                        className="p-2.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-xl transition-colors relative"
                    >
                        <Bell size={20} />
                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 flex items-center justify-center min-w-[10px] h-2.5 px-1 bg-red-500 text-[10px] font-bold text-white rounded-full border-2 border-white dark:border-gray-800">
                            </span>
                        )}
                    </button>
                    <NotificationsDropdown isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
                </div>

                {/* Profile */}
                <div className="relative ml-2">
                    <button 
                        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                        className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-sm transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    >
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </button>

                    {isProfileDropdownOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setIsProfileDropdownOpen(false)}></div>
                            <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user?.name || 'Guest User'}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user?.email || 'Not logged in'}</p>
                                </div>
                                
                                <div className="py-1">
                                    <button onClick={handleProfileClick} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center gap-3 transition-colors">
                                        <User size={18} className="text-gray-400" /> My Profile
                                    </button>
                                    <button onClick={handleSettingsClick} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center gap-3 transition-colors">
                                        <Settings size={18} className="text-gray-400" /> Account Settings
                                    </button>
                                </div>
                                
                                <div className="py-1 border-t border-gray-100 dark:border-gray-700">
                                    <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-colors">
                                        <LogOut size={18} className="text-red-500" /> Sign Out
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
