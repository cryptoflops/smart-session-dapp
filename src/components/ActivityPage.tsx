import React, { useState } from 'react';
import { History, Filter, ExternalLink, Shield, Clock, Trash2, RefreshCw, Zap } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

export interface ActivityLogItem {
    id: string;
    sessionId: string;
    sessionName?: string;
    action: 'created' | 'executed' | 'revoked' | 'expired' | 'refreshed';
    timestamp: string;
    txHash?: string;
    details?: string;
    chainId?: number;
}

interface ActivityPageProps {
    activities?: ActivityLogItem[];
}

// Mock data for demonstration
const MOCK_ACTIVITIES: ActivityLogItem[] = [
    {
        id: '1',
        sessionId: 'session-1',
        sessionName: 'Uniswap V3 Router',
        action: 'executed',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        details: 'swapExactTokensForTokens',
        txHash: '0x1234...5678',
        chainId: 8453
    },
    {
        id: '2',
        sessionId: 'session-1',
        sessionName: 'Uniswap V3 Router',
        action: 'created',
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        chainId: 8453
    },
    {
        id: '3',
        sessionId: 'session-2',
        sessionName: 'Aave V3',
        action: 'revoked',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        chainId: 10
    },
    {
        id: '4',
        sessionId: 'session-3',
        sessionName: 'OpenSea',
        action: 'expired',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        chainId: 8453
    }
];

export function ActivityPage({ activities = MOCK_ACTIVITIES }: ActivityPageProps) {
    const [filter, setFilter] = useState<'all' | 'created' | 'executed' | 'revoked'>('all');

    const filteredActivities = filter === 'all'
        ? activities
        : activities.filter(a => a.action === filter);

    const getActionIcon = (action: ActivityLogItem['action']) => {
        switch (action) {
            case 'created': return <Shield className="h-4 w-4" />;
            case 'executed': return <Zap className="h-4 w-4" />;
            case 'revoked': return <Trash2 className="h-4 w-4" />;
            case 'expired': return <Clock className="h-4 w-4" />;
            case 'refreshed': return <RefreshCw className="h-4 w-4" />;
        }
    };

    const getActionColor = (action: ActivityLogItem['action']) => {
        switch (action) {
            case 'created': return 'text-success bg-success/10';
            case 'executed': return 'text-primary bg-primary/10';
            case 'revoked': return 'text-danger bg-danger/10';
            case 'expired': return 'text-warning bg-warning/10';
            case 'refreshed': return 'text-primary bg-primary/10';
        }
    };

    const getExplorerUrl = (txHash: string, chainId: number = 8453) => {
        const explorers: Record<number, string> = {
            8453: 'https://basescan.org/tx/',
            10: 'https://optimistic.etherscan.io/tx/',
            42220: 'https://celoscan.io/tx/'
        };
        return `${explorers[chainId] || explorers[8453]}${txHash}`;
    };

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now.getTime() - date.getTime();

        if (diff < 60 * 1000) return 'Just now';
        if (diff < 60 * 60 * 1000) return `${Math.floor(diff / (60 * 1000))}m ago`;
        if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / (60 * 60 * 1000))}h ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary font-display">Activity</h1>
                    <p className="text-text-secondary mt-1">Track all session actions and transactions</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap">
                <Filter className="h-4 w-4 text-text-muted" />
                <Button
                    variant={filter === 'all' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setFilter('all')}
                >
                    All
                </Button>
                <Button
                    variant={filter === 'created' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setFilter('created')}
                >
                    Created
                </Button>
                <Button
                    variant={filter === 'executed' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setFilter('executed')}
                >
                    Executed
                </Button>
                <Button
                    variant={filter === 'revoked' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setFilter('revoked')}
                >
                    Revoked
                </Button>
            </div>

            {/* Activity List */}
            {filteredActivities.length === 0 ? (
                <Card variant="bordered\" className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="rounded-full bg-white/5 p-5 mb-6">
                        <History className="h-10 w-10 text-text-muted" />
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">No Activity</h3>
                    <p className="text-text-secondary">Your session activity will appear here</p>
                </Card>
            ) : (
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />

                    <div className="space-y-4">
                        {filteredActivities.map((activity, index) => (
                            <div
                                key={activity.id}
                                className="relative pl-14 animate-slide-up"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {/* Timeline Dot */}
                                <div className={`absolute left-4 top-4 h-5 w-5 rounded-full flex items-center justify-center ${getActionColor(activity.action)}`}>
                                    {getActionIcon(activity.action)}
                                </div>

                                <Card variant="glass" className="glass-card-hover">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-semibold">{activity.sessionName || 'Unknown Session'}</span>
                                                <Badge variant={activity.action === 'executed' ? 'success' : 'default'}>
                                                    {activity.action}
                                                </Badge>
                                            </div>
                                            {activity.details && (
                                                <p className="text-sm text-text-secondary mt-1 font-mono">
                                                    {activity.details}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-4 text-sm text-text-muted">
                                            <span>{formatTime(activity.timestamp)}</span>
                                            {activity.txHash && (
                                                <a
                                                    href={getExplorerUrl(activity.txHash, activity.chainId)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1 text-primary hover:underline"
                                                >
                                                    View TX
                                                    <ExternalLink className="h-3 w-3" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
