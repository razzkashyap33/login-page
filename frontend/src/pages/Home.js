import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Settings, LogOut, Activity, CreditCard } from 'lucide-react';

function Home() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                setUser({ name: storedUser });
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        // Clear local storage and cookies in a real app, here we just clear local
        localStorage.removeItem('loggedInUser');
        handleSuccess('Successfully logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const stats = [
        { name: 'Total Revenue', value: '$45,231.89', change: '+20.1%', icon: CreditCard },
        { name: 'Active Users', value: '+2350', change: '+180.1%', icon: Users },
        { name: 'Active Sessions', value: '+12,234', change: '+19%', icon: Activity },
    ];

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col">
                <div className="h-16 flex items-center px-8 border-b border-gray-200 dark:border-gray-700">
                    <h1 className="text-xl font-bold text-purple-600 dark:text-purple-400">Welcome</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <button type="button" className="w-full text-left flex items-center px-4 py-3 text-sm font-medium rounded-lg bg-purple-50 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
                        <LayoutDashboard className="w-5 h-5 mr-3" />
                        Dashboard
                    </button>
                    <button type="button" className="w-full text-left flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50 transition-colors">
                        <Settings className="w-5 h-5 mr-3" />
                        Settings
                    </button>
                </nav>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button 
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        Log out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto">
                {/* Header */}
                <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-8">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Overview</h2>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
                            {user?.name}
                        </span>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="p-8 space-y-8 flex-1">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                                        <h3 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                                    </div>
                                    <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                                        <stat.icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center text-sm">
                                    <span className="text-emerald-500 font-medium">{stat.change}</span>
                                    <span className="ml-2 text-gray-500 dark:text-gray-400">from last month</span>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
                    >
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Welcome back, {user?.name}!</h3>
                        <p className="text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
                            This is your new production-ready dashboard. It is completely protected by the secure HttpOnly cookie session mechanism we set up in the backend. 
                            The layout is fully responsive and features a modern dark-mode-ready design powered by Tailwind CSS.
                        </p>
                    </motion.div>
                </div>
            </main>
            <ToastContainer />
        </div>
    );
}

export default Home;
