import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

type View = 'dashboard' | 'create' | 'activity' | 'settings';

interface LayoutProps {
    children: React.ReactNode;
    onNavigate?: (view: View) => void;
    currentView?: View;
}

export function Layout({ children, onNavigate, currentView = 'dashboard' }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-text-primary">
            <Navbar onMenuClick={() => setSidebarOpen(true)} />

            <div className="flex h-[calc(100vh-4rem)]">
                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    onNavigate={onNavigate}
                    currentView={currentView}
                />

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="mx-auto max-w-6xl animate-fade-in">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
