import React, { useState } from 'react';
import { Shield, Clock, Globe, Trash2, RefreshCw, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Timer } from '../ui/Timer';
import { ConfirmModal } from '../ui/Modal';
import { Tooltip } from '../ui/Tooltip';

export interface Session {
    id: string;
    targetAddress: string;
    targetName?: string;
    permissions: string[];
    expiry: string; // ISO timestamp
    status: 'active' | 'expired' | 'revoked';
    createdAt: string;
    chainId?: number;
}

interface SessionListProps {
    sessions: Session[];
    onRevoke: (id: string) => void;
    onRefresh?: (id: string) => void;
    isRevoking?: boolean;
}

export function SessionList({ sessions, onRevoke, onRefresh, isRevoking }: SessionListProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [revokeModalOpen, setRevokeModalOpen] = useState(false);
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

    const handleRevokeClick = (id: string) => {
        setSelectedSessionId(id);
        setRevokeModalOpen(true);
    };

    const handleConfirmRevoke = () => {
        if (selectedSessionId) {
            onRevoke(selectedSessionId);
            setRevokeModalOpen(false);
            setSelectedSessionId(null);
        }
    };

    const selectedSession = sessions.find(s => s.id === selectedSessionId);

    if (sessions.length === 0) {
        return (
            <Card variant="bordered" className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-white/5 p-5 mb-6">
                    <Shield className="h-10 w-10 text-text-muted" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">No Active Sessions</h3>
                <p className="text-text-secondary max-w-md mb-8">
                    Create your first smart session to grant temporary, secure permissions to Dapps.
                </p>
            </Card>
        );
    }

    return (
        <>
            <div className="space-y-4">
                {sessions.map((session) => (
                    <SessionCard
                        key={session.id}
                        session={session}
                        isExpanded={expandedId === session.id}
                        onToggleExpand={() => setExpandedId(expandedId === session.id ? null : session.id)}
                        onRevoke={() => handleRevokeClick(session.id)}
                        onRefresh={onRefresh ? () => onRefresh(session.id) : undefined}
                    />
                ))}
            </div>

            <ConfirmModal
                isOpen={revokeModalOpen}
                onClose={() => setRevokeModalOpen(false)}
                onConfirm={handleConfirmRevoke}
                title="Revoke Session"
                message={`Are you sure you want to revoke the session for ${selectedSession?.targetName || 'this Dapp'}? This action cannot be undone.`}
                confirmLabel="Revoke Session"
                variant="danger"
                isLoading={isRevoking}
            />
        </>
    );
}

interface SessionCardProps {
    session: Session;
    isExpanded: boolean;
    onToggleExpand: () => void;
    onRevoke: () => void;
    onRefresh?: () => void;
}

function SessionCard({ session, isExpanded, onToggleExpand, onRevoke, onRefresh }: SessionCardProps) {
    const expiryDate = new Date(session.expiry);
    const isExpiringSoon = expiryDate.getTime() - Date.now() < 10 * 60 * 1000;
    const isExpired = expiryDate.getTime() < Date.now();

    const getExplorerUrl = (address: string, chainId?: number) => {
        const explorers: Record<number, string> = {
            8453: 'https://basescan.org/address/',
            10: 'https://optimistic.etherscan.io/address/',
            42220: 'https://celoscan.io/address/'
        };
        return chainId ? `${explorers[chainId] || explorers[8453]}${address}` : `https://basescan.org/address/${address}`;
    };

    return (
        <Card
            variant="glass"
            className={`group transition-all duration-300 ${isExpanded ? 'ring-1 ring-primary/30' : ''} ${isExpired ? 'opacity-60' : ''}`}
        >
            <div className="flex flex-col gap-4">
                {/* Main Row */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* Left: Info */}
                    <div className="flex items-start gap-4 flex-1">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isExpired
                                ? 'bg-danger/10 text-danger'
                                : isExpiringSoon
                                    ? 'bg-warning/10 text-warning'
                                    : 'bg-primary/10 text-primary'
                            }`}>
                            <Globe className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h4 className="font-semibold text-lg truncate">
                                    {session.targetName || 'Unknown Dapp'}
                                </h4>
                                <Badge variant={isExpired ? 'destructive' : session.status === 'active' ? 'success' : 'default'}>
                                    {isExpired ? 'expired' : session.status}
                                </Badge>
                            </div>
                            <a
                                href={getExplorerUrl(session.targetAddress, session.chainId)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-text-secondary mt-1 font-mono hover:text-primary transition-colors group/link"
                            >
                                <span className="truncate">{session.targetAddress}</span>
                                <ExternalLink className="h-3 w-3 opacity-50 group-hover/link:opacity-100" />
                            </a>
                        </div>
                    </div>

                    {/* Middle: Timer */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-text-muted" />
                            <Timer expiry={session.expiry} size="md" />
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2">
                        {onRefresh && !isExpired && (
                            <Tooltip content="Extend by 1 hour">
                                <Button variant="ghost" size="sm" onClick={onRefresh}>
                                    <RefreshCw className="h-4 w-4" />
                                </Button>
                            </Tooltip>
                        )}
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={onRevoke}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Revoke
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onToggleExpand}
                            className="ml-2"
                        >
                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                    <div className="pt-4 border-t border-white/10 animate-slide-up">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <h5 className="text-sm font-medium text-text-secondary mb-2">Permissions</h5>
                                <div className="flex flex-wrap gap-2">
                                    {session.permissions.map((perm, i) => (
                                        <span key={i} className="permission-badge">
                                            {perm}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h5 className="text-sm font-medium text-text-secondary mb-2">Details</h5>
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-text-muted">Created</span>
                                        <span className="text-text-secondary">
                                            {new Date(session.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-muted">Expires</span>
                                        <span className="text-text-secondary">
                                            {expiryDate.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-muted">Session ID</span>
                                        <span className="text-text-secondary font-mono text-xs">
                                            {session.id.slice(0, 16)}...
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
}
