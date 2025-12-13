'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CheckCircle } from 'lucide-react';

const Layout = ({ children }) => {
    const pathname = usePathname();

    const navItems = [
        { href: '/', label: 'Active Tasks', icon: LayoutDashboard },
        { href: '/completed', label: 'Completed', icon: CheckCircle },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-purple-500 selection:text-white">
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>

            <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20 overflow-hidden">
                                <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
                            </div>
                            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                Eisenhower<span className="font-light">.ai</span>
                            </span>
                        </div>

                        <div className="flex gap-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`
                      relative px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300
                      ${isActive
                                                ? 'bg-white/10 text-white shadow-inner'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }
                    `}
                                    >
                                        <Icon size={18} />
                                        <span className="text-sm font-medium">{item.label}</span>
                                        {isActive && (
                                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"></span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                {children}
            </main>
        </div>
    );
};

export default Layout;
