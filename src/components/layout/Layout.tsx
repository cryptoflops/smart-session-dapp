import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { AuroraBackground } from '../ui/AuroraBackground';

type View = 'dashboard' | 'create' | 'activity' | 'settings';

interface LayoutProps {
    children: React.ReactNode;
    onNavigate?: (view: View) => void;
    currentView?: View;
}

export function Layout({ children, onNavigate, currentView = 'dashboard' }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { isConnected } = useAccount();

    const handleLogoClick = () => {
        onNavigate?.('dashboard');
    };

    return (
        <AuroraBackground className="min-h-screen" intensity="medium">
            <div className="relative min-h-screen bg-background/80 text-text-primary backdrop-blur-sm">
                <Navbar
                    onMenuClick={() => setSidebarOpen(true)}
                    onLogoClick={handleLogoClick}
                />

                <div className="flex h-[calc(100vh-4rem)]">
                    {/* Only show sidebar when connected */}
                    {isConnected && (
                        <Sidebar
                            isOpen={sidebarOpen}
                            onClose={() => setSidebarOpen(false)}
                            onNavigate={onNavigate}
                            currentView={currentView}
                        />
                    )}

                    <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8" data-lenis-prevent>
                        <div className="mx-auto max-w-6xl animate-fade-in">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </AuroraBackground>
    );
}
