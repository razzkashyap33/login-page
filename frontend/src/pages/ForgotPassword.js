import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { motion } from 'framer-motion';
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (!email) {
            return handleError('Email is required');
        }
        setIsLoading(true);
        try {
            const url = `http://localhost:8080/auth/forgot-password`;
            const response = await axios.post(url, { email });
            if (response.data.success) {
                handleSuccess(response.data.message);
                setIsSent(true);
            }
        } catch (err) {
            if (err.response && err.response.data) {
                handleError(err.response.data.message || 'Failed to send email');
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
                        Reset your password
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>
                
                {!isSent ? (
                    <form className="mt-8 space-y-6" onSubmit={handleForgotPassword}>
                        <div className="rounded-md shadow-sm">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    required
                                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm mt-1"
                                    placeholder="Enter your email..."
                                    value={email}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isLoading ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200`}
                            >
                                {isLoading ? 'Sending Link...' : 'Send Reset Link'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="mt-8 bg-green-50 dark:bg-green-900/30 p-4 rounded-md">
                        <p className="text-sm text-green-700 dark:text-green-400 text-center">
                            An email with instructions to reset your password has been sent to {email}. (Check server console for Ethereal test link!)
                        </p>
                    </div>
                )}
                
                <div className="flex items-center justify-center mt-4">
                    <div className="text-sm">
                        <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400">
                            Back to Sign in
                        </Link>
                    </div>
                </div>
            </motion.div>
            <ToastContainer />
        </div>
    );
}

export default ForgotPassword;
