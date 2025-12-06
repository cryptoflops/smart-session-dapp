import { useState, useCallback } from 'react';
import { useAccount, useChainId, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { getContractAddressByChainId, SMART_SESSION_ABI } from '../lib/contracts';

export interface Session {
    id: string;
    targetAddress: string;
    targetName?: string;
    permissions: string[];
    expiry: string; // ISO timestamp
    expiryMs: number;
    status: 'active' | 'expired' | 'revoked';
    createdAt: string;
    chainId: number;
}

interface UseSessionReturn {
    sessions: Session[];
    isLoading: boolean;
    error: string | null;
    createSession: (params: CreateSessionParams) => Promise<void>;
    revokeSession: (sessionId: string) => Promise<void>;
    refreshSession: (sessionId: string) => Promise<void>;
    isCreating: boolean;
    isRevoking: boolean;
}

interface CreateSessionParams {
    targetAddress: string;
    targetName?: string;
    permissions: string[];
    expiryDuration: string; // '1h', '6h', '24h', '7d'
}

// Calculate expiry timestamp from duration string
function calculateExpiry(duration: string): { expiryMs: number; expiry: string } {
    const now = Date.now();
    let ms = 0;

    if (duration.endsWith('m')) {
        ms = parseInt(duration) * 60 * 1000;
    } else if (duration.endsWith('h')) {
        ms = parseInt(duration) * 60 * 60 * 1000;
    } else if (duration.endsWith('d')) {
        ms = parseInt(duration) * 24 * 60 * 60 * 1000;
    } else if (duration.endsWith('w')) {
        ms = parseInt(duration) * 7 * 24 * 60 * 60 * 1000;
    }

    const expiryMs = now + ms;
    return {
        expiryMs,
        expiry: new Date(expiryMs).toISOString()
    };
}

// Generate unique session ID
function generateSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function useSession(): UseSessionReturn {
    const { address } = useAccount();
    const chainId = useChainId();

    const [sessions, setSessions] = useState<Session[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [isRevoking, setIsRevoking] = useState(false);

    const createSession = useCallback(async (params: CreateSessionParams) => {
        if (!address) {
            setError('Wallet not connected');
            return;
        }

        setIsCreating(true);
        setError(null);

        try {
            const { expiryMs, expiry } = calculateExpiry(params.expiryDuration);

            // In a real implementation, this would:
            // 1. Call the smart contract to register the session
            // 2. Sign the session grant with the wallet
            // 3. Store session data on-chain or in backend

            const newSession: Session = {
                id: generateSessionId(),
                targetAddress: params.targetAddress,
                targetName: params.targetName,
                permissions: params.permissions,
                expiry,
                expiryMs,
                status: 'active',
                createdAt: new Date().toISOString(),
                chainId
            };

            setSessions(prev => [newSession, ...prev]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create session');
            throw err;
        } finally {
            setIsCreating(false);
        }
    }, [address, chainId]);

    const revokeSession = useCallback(async (sessionId: string) => {
        setIsRevoking(true);
        setError(null);

        try {
            // In a real implementation, this would call the contract to revoke
            // For now, update local state
            setSessions(prev => prev.map(s =>
                s.id === sessionId ? { ...s, status: 'revoked' as const } : s
            ));

            // Remove revoked session after animation
            setTimeout(() => {
                setSessions(prev => prev.filter(s => s.id !== sessionId));
            }, 300);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to revoke session');
            throw err;
        } finally {
            setIsRevoking(false);
        }
    }, []);

    const refreshSession = useCallback(async (sessionId: string) => {
        try {
            // Extend session by 1 hour
            const { expiryMs, expiry } = calculateExpiry('1h');

            setSessions(prev => prev.map(s =>
                s.id === sessionId ? { ...s, expiry, expiryMs } : s
            ));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to refresh session');
            throw err;
        }
    }, []);

    return {
        sessions,
        isLoading,
        error,
        createSession,
        revokeSession,
        refreshSession,
        isCreating,
        isRevoking
    };
}

// Hook for session activity log
export interface ActivityLog {
    id: string;
    sessionId: string;
    action: 'created' | 'executed' | 'revoked' | 'expired' | 'refreshed';
    timestamp: string;
    txHash?: string;
    details?: string;
}

export function useActivityLog() {
    const [logs, setLogs] = useState<ActivityLog[]>([]);

    const addLog = useCallback((log: Omit<ActivityLog, 'id' | 'timestamp'>) => {
        setLogs(prev => [{
            ...log,
            id: `log-${Date.now()}`,
            timestamp: new Date().toISOString()
        }, ...prev]);
    }, []);

    return { logs, addLog };
}
