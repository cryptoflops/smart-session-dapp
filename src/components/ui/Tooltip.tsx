import React, { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | boolean)[]) {
    return twMerge(clsx(inputs));
}

interface TooltipProps {
    content: React.ReactNode;
    children: React.ReactElement;
    position?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
}

export function Tooltip({
    content,
    children,
    position = 'top',
    delay = 200
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const showTooltip = () => {
        const id = setTimeout(() => setIsVisible(true), delay);
        setTimeoutId(id);
    };

    const hideTooltip = () => {
        if (timeoutId) clearTimeout(timeoutId);
        setIsVisible(false);
    };

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2'
    };

    const arrowClasses = {
        top: 'top-full left-1/2 -translate-x-1/2 border-t-surface border-x-transparent border-b-transparent',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-surface border-x-transparent border-t-transparent',
        left: 'left-full top-1/2 -translate-y-1/2 border-l-surface border-y-transparent border-r-transparent',
        right: 'right-full top-1/2 -translate-y-1/2 border-r-surface border-y-transparent border-l-transparent'
    };

    return (
        <div
            className="relative inline-flex"
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
        >
            {children}

            {isVisible && (
                <div
                    className={cn(
                        'absolute z-50 px-3 py-2 text-sm',
                        'bg-surface border border-glass rounded-lg shadow-lg',
                        'text-text-primary whitespace-nowrap',
                        'animate-fade-in',
                        positionClasses[position]
                    )}
                    role="tooltip"
                >
                    {content}
                    <div
                        className={cn(
                            'absolute w-0 h-0 border-4',
                            arrowClasses[position]
                        )}
                    />
                </div>
            )}
        </div>
    );
}

// InfoTooltip for permission explanations
interface InfoTooltipProps {
    content: string;
}

export function InfoTooltip({ content }: InfoTooltipProps) {
    return (
        <Tooltip content={content}>
            <button
                type="button"
                className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-white/10 text-text-muted hover:text-text-primary hover:bg-white/20 transition-colors text-xs"
                aria-label="More information"
            >
                ?
            </button>
        </Tooltip>
    );
}
