import React from 'react';
import { Shield, Menu } from 'lucide-react';
import { useAppKit } from "@reown/appkit/react";
import { useAccount, useChainId } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { useNetworkTheme, NETWORK_THEMES } from '../ui/AuroraBackground';

interface NavbarProps {
    onMenuClick?: () => void;
    onLogoClick?: () => void;
}

// Network badge component with animated color
function NetworkBadge() {
    const { isConnected } = useAccount();
    const chainId = useChainId();
    const theme = useNetworkTheme();

    if (!isConnected) return null;

    const networkName = NETWORK_THEMES[chainId as keyof typeof NETWORK_THEMES]?.name || 'Unknown';

    return (
        <AnimatePresence mode="wait">
            <motion.button
                key={chainId}
                initial={{ opacity: 0, scale: 0.9, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all"
                style={{
                    backgroundColor: `${theme.primary}15`,
                    borderColor: `${theme.primary}30`,
                }}
                onClick={() => { }}
            >
                <motion.span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: theme.primary }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.7, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <span className="text-sm font-medium" style={{ color: theme.primary }}>
                    {networkName}
                </span>
            </motion.button>
        </AnimatePresence>
    );
}

export function Navbar({ onMenuClick, onLogoClick }: NavbarProps) {
    const { open } = useAppKit();
    const { isConnected } = useAccount();
    const theme = useNetworkTheme();

    return (
        <motion.header
            className="sticky top-0 z-40 w-full border-b bg-background/60 backdrop-blur-xl"
            style={{
                borderColor: isConnected ? `${theme.primary}20` : 'rgba(255,255,255,0.1)',
            }}
            initial={false}
            animate={{
                borderColor: isConnected ? `${theme.primary}20` : 'rgba(255,255,255,0.1)',
            }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden text-text-secondary hover:text-text-primary transition-colors"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    {/* Clickable Logo with animated glow */}
                    <motion.button
                        onClick={onLogoClick}
                        className="flex items-center gap-2 group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <motion.div
                            className="flex h-8 w-8 items-center justify-center rounded-lg"
                            style={{
                                backgroundColor: `${theme.primary}15`,
                                color: theme.primary,
                            }}
                            animate={{
                                boxShadow: [
                                    `0 0 10px ${theme.primary}20`,
                                    `0 0 20px ${theme.primary}30`,
                                    `0 0 10px ${theme.primary}20`,
                                ],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            <Shield className="h-5 w-5" />
                        </motion.div>
                        <span className="text-lg font-bold tracking-tight text-text-primary font-display">
                            Smart Session
                        </span>
                    </motion.button>
                </div>

                <div className="flex items-center gap-3">
                    {/* Network Badge */}
                    <NetworkBadge />

                    {/* Network Switch Button */}
                    {isConnected && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => open({ view: 'Networks' })}
                            className="hidden sm:flex"
                        >
                            Switch
                        </Button>
                    )}

                    {/* Wallet Connect Button */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button
                            onClick={() => open()}
                            variant={isConnected ? 'secondary' : 'primary'}
                            size="sm"
                            style={isConnected ? {
                                borderColor: `${theme.primary}40`,
                            } : {}}
                        >
                            {isConnected ? 'Account' : 'Connect Wallet'}
                        </Button>
                    </motion.div>
                </div>
            </div>
        </motion.header>
    );
}
