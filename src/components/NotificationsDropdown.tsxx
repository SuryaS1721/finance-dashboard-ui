import { useAppContext } from '../context/AppContext';
import { BellRing, Check, CircleAlert, DollarSign } from 'lucide-react';

interface NotificationsDropdownProps {
    isOpen: boolean;
    onClose: () => void;
}

const NotificationsDropdown = ({ isOpen, onClose }: NotificationsDropdownProps) => {
    const { notifications, markAsRead } = useAppContext();

    if (!isOpen) return null;

    const getIcon = (title: string, read: boolean) => {
        const baseClass = "p-2 rounded-xl flex-shrink-0";
        if (title.toLowerCase().includes('alert')) {
            return (
                <div className={`${baseClass} ${read ? 'bg-gray-100 text-gray-500' : 'bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-400'}`}>
                    <CircleAlert size={18} />
                </div>
            );
        } else if (title.toLowerCase().includes('transaction') || title.toLowerCase().includes('income')) {
            return (
                <div className={`${baseClass} ${read ? 'bg-gray-100 text-gray-500' : 'bg-green-50 text-green-500 dark:bg-green-900/30 dark:text-green-400'}`}>
                    <DollarSign size={18} />
                </div>
            );
        } else {
            return (
                <div className={`${baseClass} ${read ? 'bg-gray-100 text-gray-500' : 'bg-blue-50 text-blue-500 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                    <BellRing size={18} />
                </div>
            );
        }
    };

    const formatTimestamp = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHrs = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHrs / 24);

        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHrs < 24) return `${diffHrs}h ago`;
        if (diffDays === 1) return `Yesterday`;
        return `${diffDays}d ago`;
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <>
            <div className="fixed inset-0 z-40" onClick={onClose}></div>
            <div className="absolute right-0 sm:right-20 mt-3 w-[min(calc(100vw-2rem),24rem)] max-w-sm rounded-3xl bg-white dark:bg-gray-800 shadow-2xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-4 duration-300">
                
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/50 backdrop-blur-md">
                    <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        Notifications
                        {unreadCount > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white shadow-sm shadow-blue-500/20">
                                {unreadCount} new
                            </span>
                        )}
                    </h3>
                </div>

                <div className="max-h-[60vh] overflow-y-auto overscroll-contain">
                    {notifications.length === 0 ? (
                        <div className="p-8 text-center flex flex-col items-center justify-center">
                            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-full mb-3 shadow-inner">
                                <BellRing size={24} className="text-gray-400 dark:text-gray-500" />
                            </div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">All caught up!</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">No new notifications to show.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {notifications.map((notification) => (
                                <button 
                                    key={notification.id}
                                    onClick={() => !notification.read && markAsRead(notification.id)}
                                    className={`w-full flex items-start gap-4 p-4 text-left transition-colors border-b border-gray-50 dark:border-gray-700/50 last:border-0 relative ${notification.read ? 'hover:bg-gray-50 dark:hover:bg-gray-700/30' : 'bg-blue-50/40 dark:bg-blue-900/10 hover:bg-blue-50 dark:hover:bg-blue-900/30'}`}
                                >
                                    {!notification.read && (
                                        <div className="absolute left-2.5 top-1/2 -mt-1 w-2 h-2 rounded-full bg-blue-600 shadow-sm shadow-blue-500/50"></div>
                                    )}
                                    
                                    <div className="pl-1">
                                        {getIcon(notification.title, notification.read)}
                                    </div>

                                    <div className="flex-1 pr-2">
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <p className={`text-sm font-semibold ${notification.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>
                                                {notification.title}
                                            </p>
                                            <span className={`text-[10px] font-medium whitespace-nowrap ${notification.read ? 'text-gray-400' : 'text-blue-600 dark:text-blue-400'}`}>
                                                {formatTimestamp(notification.date)}
                                            </span>
                                        </div>
                                        <p className={`text-xs leading-relaxed ${notification.read ? 'text-gray-500 dark:text-gray-400' : 'text-gray-600 dark:text-gray-300 font-medium'}`}>
                                            {notification.message}
                                        </p>
                                    </div>
                                    
                                    {!notification.read && (
                                        <div className="opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity absolute right-4 top-1/2 -translate-y-1/2">
                                            <div className="p-1.5 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 text-blue-600 dark:text-blue-400 hover:text-blue-700 relative z-10" title="Mark as read">
                                                <Check size={14} />
                                            </div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                
                {notifications.length > 0 && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-100 dark:border-gray-700">
                        <button 
                            onClick={() => {
                                notifications.forEach(n => !n.read && markAsRead(n.id));
                            }}
                            className="w-full py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
                        >
                            Mark all as read
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default NotificationsDropdown;
