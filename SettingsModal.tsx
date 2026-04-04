import React, { useState } from 'react';
import { X, Moon, Sun, Monitor, Shield, KeyRound, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
    const { role, setRole, theme, toggleTheme } = useAppContext();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [msg, setMsg] = useState('');

    if (!isOpen) return null;

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock password change logic
        setMsg('Password updated successfully!');
        setTimeout(() => {
            setIsChangingPassword(false);
            setMsg('');
            setCurrentPassword('');
            setNewPassword('');
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex-shrink-0">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Account Settings</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1.5 rounded-xl hover:bg-white dark:hover:bg-gray-700 shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto">
                    
                    {/* Appearance Section */}
                    <div className="mb-8">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">Appearance</h3>
                        <div className="p-1 bg-gray-100 dark:bg-gray-900 rounded-2xl flex gap-1 items-center">
                            <button 
                                onClick={() => theme !== 'light' && toggleTheme()}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${theme === 'light' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-300'} dark:border-gray-700`}
                            >
                                <Sun size={16} /> Light
                            </button>
                            <button 
                                onClick={() => theme !== 'dark' && toggleTheme()}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${theme === 'dark' ? 'bg-gray-800 text-white shadow-sm ring-1 ring-gray-700' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <Moon size={16} /> Dark
                            </button>
                            <button 
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all text-gray-500 hover:text-gray-700 dark:hover:text-gray-300`}
                            >
                                <Monitor size={16} /> System
                            </button>
                        </div>
                    </div>

                    {/* Preferences / Role Section */}
                    <div className="mb-8">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">Application Role (Demo)</h3>
                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700/50 overflow-hidden">
                            <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-700/50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-blue-600 dark:text-blue-400">
                                        <Shield size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Admin Privileges</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Can add, edit, and delete transactions</p>
                                    </div>
                                </div>
                                <div className="relative inline-block w-11 h-6 select-none transition duration-200 ease-in">
                                    <input type="checkbox" checked={role === 'admin'} onChange={() => setRole(role === 'admin' ? 'viewer' : 'admin')} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-200 dark:border-gray-700 appearance-none cursor-pointer transition-transform duration-200 ease-in-out" style={{ transform: role === 'admin' ? 'translateX(100%)' : 'translateX(0)', borderColor: role === 'admin' ? '#2563EB' : '' }}/>
                                    <label className={`toggle-label block overflow-hidden h-6 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer ${role === 'admin' ? '!bg-blue-600' : ''}`}></label>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Security Section */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">Security</h3>
                        {!isChangingPassword ? (
                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700/50 overflow-hidden">
                                <button onClick={() => setIsChangingPassword(true)} className="w-full flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors text-left group">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                            <KeyRound size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">Change Password</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Update your account password</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className="text-gray-400" />
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handlePasswordChange} className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-4 animate-in fade-in zoom-in-95">
                                {msg && (
                                    <div className="mb-4 p-3 rounded-xl bg-green-50 dark:bg-green-900/30 text-sm text-green-600 dark:text-green-400 border border-green-100 dark:border-green-800/50 text-center font-medium">
                                        {msg}
                                    </div>
                                )}
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Current Password</label>
                                        <input type="password" required value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">New Password</label>
                                        <input type="password" required value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <button type="button" onClick={() => setIsChangingPassword(false)} className="flex-1 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            Cancel
                                        </button>
                                        <button type="submit" className="flex-1 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors">
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
