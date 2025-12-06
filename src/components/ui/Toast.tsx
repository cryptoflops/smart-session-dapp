import React, { createContext, useContext, useState, useCallback } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';

function cn(...inputs: (string | undefined | boolean)[]) {
    return twMerge(clsx(inputs));
}

// Toast Types
type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: string;
    message: string;
    variant: ToastVariant;
    duration?: number;
}

interface ToastContextType {
    toasts: Toast[];
    addToast: (message: string, variant?: ToastVariant, duration?: number) => void;
    removeToast: (id: string) => void;
    success: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
    info: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

interface ToastProviderProps {
    children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const addToast = useCallback((message: string, variant: ToastVariant = 'info', duration = 5000) => {
        const id = Math.random().toString(36).substr(2, 9);
        const toast: Toast = { id, message, variant, duration };

        setToasts(prev => [...prev, toast]);

        if (duration > 0) {
            setTimeout(() => removeToast(id), duration);
        }
    }, [removeToast]);

    const success = useCallback((message: string) => addToast(message, 'success'), [addToast]);
    const error = useCallback((message: string) => addToast(message, 'error', 8000), [addToast]);
    const warning = useCallback((message: string) => addToast(message, 'warning', 6000), [addToast]);
    const info = useCallback((message: string) => addToast(message, 'info'), [addToast]);

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast, success, error, warning, info }}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    );
}

// Toast Container
interface ToastContainerProps {
    toasts: Toast[];
    onRemove: (id: string) => void;
}

function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
            {toasts.map((toast, index) => (
                <ToastItem
                    key={toast.id}
                    toast={toast}
                    onRemove={onRemove}
                    style={{ animationDelay: `${index * 50}ms` }}
                />
            ))}
        </div>
    );
}

// Individual Toast
interface ToastItemProps {
    toast: Toast;
    onRemove: (id: string) => void;
    style?: React.CSSProperties;
}

function ToastItem({ toast, onRemove, style }: ToastItemProps) {
    const icons = {
        success: CheckCircle2,
        error: AlertCircle,
        warning: AlertTriangle,
        info: Info
    };

    const styles = {
        success: 'bg-success/10 border-success/30 text-success',
        error: 'bg-danger/10 border-danger/30 text-danger',
        warning: 'bg-warning/10 border-warning/30 text-warning',
        info: 'bg-primary/10 border-primary/30 text-primary'
    };

    const Icon = icons[toast.variant];

    return (
        <div
            className={cn(
                'flex items-start gap-3 p-4 rounded-lg border backdrop-blur-md',
                'shadow-lg pointer-events-auto animate-slide-up',
                styles[toast.variant]
            )}
            style={style}
            role="alert"
        >
            <Icon className="h-5 w-5 shrink-0 mt-0.5" />
            <p className="flex-1 text-sm font-medium text-text-primary">{toast.message}</p>
            <button
                onClick={() => onRemove(toast.id)}
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="Dismiss"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}

// Standalone toast component for custom use
interface StandaloneToastProps {
    message: string;
    variant?: ToastVariant;
    onClose?: () => void;
}

export function Toast({ message, variant = 'info', onClose }: StandaloneToastProps) {
    const icons = {
        success: CheckCircle2,
        error: AlertCircle,
        warning: AlertTriangle,
        info: Info
    };

    const styles = {
        success: 'bg-success/10 border-success/30',
        error: 'bg-danger/10 border-danger/30',
        warning: 'bg-warning/10 border-warning/30',
        info: 'bg-primary/10 border-primary/30'
    };

    const iconStyles = {
        success: 'text-success',
        error: 'text-danger',
        warning: 'text-warning',
        info: 'text-primary'
    };

    const Icon = icons[variant];

    return (
        <div className={cn(
            'flex items-start gap-3 p-4 rounded-lg border backdrop-blur-md',
            styles[variant]
        )}>
            <Icon className={cn('h-5 w-5 shrink-0', iconStyles[variant])} />
            <p className="flex-1 text-sm text-text-primary">{message}</p>
            {onClose && (
                <button
                    onClick={onClose}
                    className="text-text-muted hover:text-text-primary transition-colors"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}
