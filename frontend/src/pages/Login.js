import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { motion } from 'framer-motion';
import axios from 'axios';

function Login() {
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('Email and password are required');
        }
        setIsLoading(true);
        try {
            // Updated to local dev backend; in prod, it will use relative path or env variable
            const API_URL = process.env.REACT_APP_API_URL || '';
            const url = `${API_URL}/auth/login`;
            const response = await axios.post(url, loginInfo, {
                withCredentials: true // Important for HttpOnly cookies
            });
            
            const { success, message, user } = response.data;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                setTimeout(() => navigate('/home'), 1000);
            }
        } catch (err) {
            if (err.response && err.response.data) {
                handleError(err.response.data.message || 'Login failed');
            } else {
                handleError('Internal server error');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-10 rounded-xl shadow-2xl"
            >
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
                            <input
                                onChange={handleChange}
                                type="email"
                                name="email"
                                required
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm mt-1"
                                placeholder="Enter your email..."
                                value={loginInfo.email}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                            <input
                                onChange={handleChange}
                                type="password"
                                name="password"
                                required
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm mt-1"
                                placeholder="Enter your password..."
                                value={loginInfo.password}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isLoading ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200`}
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm">
                            <Link to="/forgot-password" className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400">
                                Forgot your password?
                            </Link>
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Don't have an account? </span>
                            <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </form>
            </motion.div>
            <ToastContainer />
        </div>
    );
}

export default Login;
