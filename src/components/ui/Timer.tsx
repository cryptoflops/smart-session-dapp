import React, { useState, useEffect, useMemo } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | boolean)[]) {
    return twMerge(clsx(inputs));
}

interface TimerProps {
    /** Expiry timestamp in milliseconds or ISO string */
    expiry: number | string;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Show ring visualization */
    showRing?: boolean;
    /** Callback when timer expires */
    onExpire?: () => void;
    /** Custom className */
    className?: string;
}

export function Timer({
    expiry,
    size = 'md',
    showRing = false,
    onExpire,
    className
}: TimerProps) {
    const expiryMs = useMemo(() => {
        if (typeof expiry === 'string') {
            return new Date(expiry).getTime();
        }
        return expiry;
    }, [expiry]);

    const [timeLeft, setTimeLeft] = useState(() => {
        const diff = expiryMs - Date.now();
        return diff > 0 ? diff : 0;
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const diff = expiryMs - Date.now();
            if (diff <= 0) {
                setTimeLeft(0);
                clearInterval(interval);
                onExpire?.();
            } else {
                setTimeLeft(diff);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [expiryMs, onExpire]);

    const formatTime = (ms: number) => {
        if (ms <= 0) return { hours: 0, minutes: 0, seconds: 0, display: 'Expired' };

        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / (1000 * 60)) % 60);
        const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));

        if (days > 0) {
            return { hours, minutes, seconds, display: `${days}d ${hours}h` };
        }
        if (hours > 0) {
            return { hours, minutes, seconds, display: `${hours}h ${minutes}m` };
        }
        return {
            hours,
            minutes,
            seconds,
            display: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        };
    };

    const { display, minutes } = formatTime(timeLeft);
    const isExpired = timeLeft <= 0;
    const isWarning = !isExpired && timeLeft < 10 * 60 * 1000; // < 10 minutes
    const isCritical = !isExpired && timeLeft < 2 * 60 * 1000; // < 2 minutes

    const getStatusColor = () => {
        if (isExpired) return 'text-danger';
        if (isCritical) return 'text-danger animate-pulse';
        if (isWarning) return 'text-warning';
        return 'text-success';
    };

    const getStatusClass = () => {
        if (isExpired) return 'bg-danger/10 text-danger border-danger/20';
        if (isCritical) return 'bg-danger/10 text-danger border-danger/20';
        if (isWarning) return 'bg-warning/10 text-warning border-warning/20';
        return 'bg-success/10 text-success border-success/20';
    };

    const sizeClasses = {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-2.5 py-1',
        lg: 'text-base px-3 py-1.5'
    };

    const ringSizes = {
        sm: 32,
        md: 48,
        lg: 64
    };

    // Calculate ring progress (for visual countdown)
    const progress = useMemo(() => {
        if (isExpired) return 0;
        // Assume max duration of 24 hours for visualization
        const maxDuration = 24 * 60 * 60 * 1000;
        return Math.min(timeLeft / maxDuration, 1);
    }, [timeLeft, isExpired]);

    if (showRing) {
        const ringSize = ringSizes[size];
        const strokeWidth = size === 'sm' ? 2 : size === 'md' ? 3 : 4;
        const radius = (ringSize - strokeWidth) / 2;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference * (1 - progress);

        return (
            <div className={cn('timer-ring', className)} style={{ width: ringSize, height: ringSize }}>
                <svg width={ringSize} height={ringSize}>
                    {/* Background ring */}
                    <circle
                        cx={ringSize / 2}
                        cy={ringSize / 2}
                        r={radius}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth={strokeWidth}
                    />
                    {/* Progress ring */}
                    <circle
                        cx={ringSize / 2}
                        cy={ringSize / 2}
                        r={radius}
                        fill="none"
                        stroke={isExpired ? '#FF0055' : isCritical ? '#FF0055' : isWarning ? '#FFC200' : '#00FF94'}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-1000"
                    />
                </svg>
                <span className={cn(
                    'absolute inset-0 flex items-center justify-center font-mono font-medium',
                    getStatusColor(),
                    size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
                )}>
                    {display}
                </span>
            </div>
        );
    }

    return (
        <span className={cn(
            'inline-flex items-center font-mono font-medium rounded-md border',
            sizeClasses[size],
            getStatusClass(),
            className
        )}>
            {display}
        </span>
    );
}

// Simple countdown text for session list
interface CountdownTextProps {
    expiry: string;
    className?: string;
}

export function CountdownText({ expiry, className }: CountdownTextProps) {
    const [text, setText] = useState('');

    useEffect(() => {
        const update = () => {
            const now = Date.now();
            const exp = new Date(expiry).getTime();
            const diff = exp - now;

            if (diff <= 0) {
                setText('Expired');
                return;
            }

            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));

            if (days > 0) setText(`${days}d ${hours}h`);
            else if (hours > 0) setText(`${hours}h ${minutes}m`);
            else setText(`${minutes}m`);
        };

        update();
        const interval = setInterval(update, 60000);
        return () => clearInterval(interval);
    }, [expiry]);

    return <span className={className}>{text}</span>;
}
