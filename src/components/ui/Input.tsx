import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    success?: boolean;
    hint?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    variant?: 'default' | 'address';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({
        className,
        label,
        error,
        success,
        hint,
        leftIcon,
        rightIcon,
        variant = 'default',
        id,
        ...props
    }, ref) => {
        const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

        const baseStyles = cn(
            'w-full bg-surface border rounded-lg px-4 py-3',
            'text-text-primary placeholder:text-text-muted',
            'focus:outline-none focus:ring-2 transition-all duration-200',
            variant === 'address' && 'font-mono text-sm',
            leftIcon && 'pl-11',
            rightIcon && 'pr-11',
        );

        const stateStyles = cn(
            error
                ? 'border-danger/50 focus:border-danger focus:ring-danger/20'
                : success
                    ? 'border-success/50 focus:border-success focus:ring-success/20'
                    : 'border-glass focus:border-primary/50 focus:ring-primary/20'
        );

        return (
            <div className="space-y-2">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-text-secondary"
                    >
                        {label}
                    </label>
                )}

                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                            {leftIcon}
                        </div>
                    )}

                    <input
                        ref={ref}
                        id={inputId}
                        className={cn(baseStyles, stateStyles, className)}
                        {...props}
                    />

                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
                            {rightIcon}
                        </div>
                    )}

                    {success && !rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-success">
                            <CheckCircle2 className="h-5 w-5" />
                        </div>
                    )}
                </div>

                {error && (
                    <div className="flex items-center gap-1.5 text-sm text-danger">
                        <AlertCircle className="h-4 w-4" />
                        <span>{error}</span>
                    </div>
                )}

                {hint && !error && (
                    <p className="text-sm text-text-muted">{hint}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
