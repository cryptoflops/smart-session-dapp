import React from 'react';
import { LayoutDashboard, Shield, History, Settings, LogOut, X } from 'lucide-react';
import { clsx } from 'clsx';
import { useDisconnect } from 'wagmi';

type View = 'dashboard' | 'create' | 'activity' | 'settings';

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
    onNavigate?: (view: View) => void;
    currentView?: View;
}

const navigation: { name: string; view: View; icon: React.ElementType }[] = [
    { name: 'Dashboard', view: 'dashboard', icon: LayoutDashboard },
    { name: 'Create Session', view: 'create', icon: Shield },
    { name: 'Activity', view: 'activity', icon: History },
    { name: 'Settings', view: 'settings', icon: Settings },
];

export function Sidebar({ isOpen, onClose, onNavigate, currentView = 'dashboard' }: SidebarProps) {
    const { disconnect } = useDisconnect();

    const handleNavigate = (view: View) => {
        onNavigate?.(view);
        onClose?.();
    };

    const handleDisconnect = () => {
        disconnect();
        onClose?.();
    };

    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={clsx(
                "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-white/10 bg-surface/95 backdrop-blur-md transition-transform duration-300 lg:static lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Mobile Header */}
                <div className="flex h-16 items-center justify-between px-6 border-b border-white/10 lg:hidden">
                    <span className="text-lg font-bold font-display">Menu</span>
                    <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-1 p-4">
                    {navigation.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => handleNavigate(item.view)}
                            className={clsx(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                currentView === item.view
                                    ? "bg-primary/10 text-primary shadow-glow-sm"
                                    : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </button>
                    ))}
                </nav>

                {/* Footer */}
                <div className="absolute bottom-0 w-full p-4 border-t border-white/10">
                    <button
                        onClick={handleDisconnect}
                        className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-danger hover:bg-danger/10 transition-all duration-200"
                    >
                        <LogOut className="h-5 w-5" />
                        Disconnect
                    </button>
                </div>
            </aside>
        </>
    );
}
