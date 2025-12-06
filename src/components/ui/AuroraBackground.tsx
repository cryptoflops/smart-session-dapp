import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAccount, useChainId } from 'wagmi';

// Network color themes
const NETWORK_THEMES = {
    // Base - Blue gradient
    8453: {
        name: 'Base',
        primary: '#0052FF',
        secondary: '#00A3FF',
        tertiary: '#0066CC',
        accent: '#00F0FF',
        background: 'rgba(0, 82, 255, 0.08)',
    },
    // Optimism - Red gradient  
    10: {
        name: 'Optimism',
        primary: '#FF0420',
        secondary: '#FF4D4D',
        tertiary: '#CC0000',
        accent: '#FF6B6B',
        background: 'rgba(255, 4, 32, 0.08)',
    },
    // Celo - Yellow/Green gradient
    42220: {
        name: 'Celo',
        primary: '#FCFF52',
        secondary: '#35D07F',
        tertiary: '#FBCC5C',
        accent: '#73E17D',
        background: 'rgba(53, 208, 127, 0.08)',
    },
    // Default - Cyan (not connected)
    default: {
        name: 'Default',
        primary: '#00F0FF',
        secondary: '#7000FF',
        tertiary: '#00A3FF',
        accent: '#00F0FF',
        background: 'rgba(0, 240, 255, 0.08)',
    },
};

interface AuroraBackgroundProps {
    children?: React.ReactNode;
    className?: string;
    intensity?: 'low' | 'medium' | 'high';
}

export function AuroraBackground({ children, className = '', intensity = 'medium' }: AuroraBackgroundProps) {
    const { isConnected } = useAccount();
    const chainId = useChainId();

    const theme = useMemo(() => {
        if (!isConnected) return NETWORK_THEMES.default;
        return NETWORK_THEMES[chainId as keyof typeof NETWORK_THEMES] || NETWORK_THEMES.default;
    }, [isConnected, chainId]);

    const opacityMultiplier = intensity === 'low' ? 0.5 : intensity === 'high' ? 1.5 : 1;

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Aurora gradient blobs */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                {/* Primary blob - largest, slowest */}
                <motion.div
                    className="absolute rounded-full blur-[120px]"
                    style={{
                        width: '60%',
                        height: '60%',
                        background: `radial-gradient(circle, ${theme.primary}40, transparent 70%)`,
                    }}
                    animate={{
                        x: ['0%', '30%', '-10%', '20%', '0%'],
                        y: ['0%', '20%', '40%', '10%', '0%'],
                        scale: [1, 1.1, 0.95, 1.05, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />

                {/* Secondary blob */}
                <motion.div
                    className="absolute right-0 top-0 rounded-full blur-[100px]"
                    style={{
                        width: '50%',
                        height: '50%',
                        background: `radial-gradient(circle, ${theme.secondary}35, transparent 70%)`,
                    }}
                    animate={{
                        x: ['0%', '-30%', '10%', '-20%', '0%'],
                        y: ['0%', '30%', '-10%', '20%', '0%'],
                        scale: [1, 0.95, 1.1, 1, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 2,
                    }}
                />

                {/* Tertiary blob - accent */}
                <motion.div
                    className="absolute bottom-0 left-1/4 rounded-full blur-[80px]"
                    style={{
                        width: '40%',
                        height: '40%',
                        background: `radial-gradient(circle, ${theme.tertiary}30, transparent 70%)`,
                    }}
                    animate={{
                        x: ['0%', '20%', '-15%', '10%', '0%'],
                        y: ['0%', '-20%', '10%', '-15%', '0%'],
                        scale: [1, 1.05, 0.9, 1.1, 1],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 4,
                    }}
                />

                {/* Small accent blob */}
                <motion.div
                    className="absolute top-1/3 right-1/4 rounded-full blur-[60px]"
                    style={{
                        width: '25%',
                        height: '25%',
                        background: `radial-gradient(circle, ${theme.accent}25, transparent 70%)`,
                    }}
                    animate={{
                        x: ['-10%', '30%', '0%', '20%', '-10%'],
                        y: ['10%', '-15%', '25%', '0%', '10%'],
                        scale: [1, 1.2, 0.85, 1.1, 1],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1,
                    }}
                />

                {/* Noise overlay for texture */}
                <div
                    className="absolute inset-0 opacity-30 mix-blend-soft-light"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            {/* Content */}
            {children}
        </div>
    );
}

// Hook for accessing current network theme
export function useNetworkTheme() {
    const { isConnected } = useAccount();
    const chainId = useChainId();

    return useMemo(() => {
        if (!isConnected) return NETWORK_THEMES.default;
        return NETWORK_THEMES[chainId as keyof typeof NETWORK_THEMES] || NETWORK_THEMES.default;
    }, [isConnected, chainId]);
}

// Export themes for use elsewhere
export { NETWORK_THEMES };
