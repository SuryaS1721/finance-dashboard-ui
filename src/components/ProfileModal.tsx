import React, { useState } from 'react';
import { X, User as UserIcon, Mail, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
    const { user } = useAuth();
    const { role } = useAppContext();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');

    if (!isOpen || !user) return null;

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock save logic
        if (user) {
            user.name = name;
            user.email = email;
            localStorage.setItem('finance_dashboard_user', JSON.stringify(user));
        }
        setIsEditing(false);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1.5 rounded-xl hover:bg-white dark:hover:bg-gray-700 shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-6">
                    <div className="flex flex-col items-center mb-8">
                        <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold text-4xl shadow-xl shadow-blue-500/20 mb-4 border-4 border-white dark:border-gray-800">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h3>
                        <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                        
                        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50">
                            <Shield size={12} />
                            {role.toUpperCase()}
                        </div>
                    </div>

                    {!isEditing ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700/50">
                                <div className="p-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                                    <UserIcon size={20} className="text-gray-500 dark:text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Full Name</p>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700/50">
                                <div className="p-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                                    <Mail size={20} className="text-gray-500 dark:text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Email Address</p>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.email}</p>
                                </div>
                            </div>

                            <button 
                                onClick={() => setIsEditing(true)}
                                className="w-full mt-2 py-3 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-xl transition-all outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Edit Profile
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSave} className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setName(user.name);
                                        setEmail(user.email);
                                    }}
                                    className="flex-1 py-3 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-[0.98]"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
