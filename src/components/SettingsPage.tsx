import React from 'react';
import { Settings as SettingsIcon, Bell, Clock, Shield, Palette, Globe } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

export function SettingsPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-text-primary font-display">Settings</h1>
                <p className="text-text-secondary mt-1">Configure your smart session preferences</p>
            </div>

            <div className="grid gap-6">
                {/* Default Expiry */}
                <Card variant="glass">
                    <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <Clock className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-1">Default Session Duration</h3>
                            <p className="text-text-secondary text-sm mb-4">
                                Set the default expiry time for new sessions
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                <Button variant="secondary" size="sm">1 Hour</Button>
                                <Button variant="primary" size="sm">6 Hours</Button>
                                <Button variant="secondary" size="sm">24 Hours</Button>
                                <Button variant="secondary" size="sm">7 Days</Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Auto-Revoke */}
                <Card variant="glass">
                    <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center text-warning shrink-0">
                            <Shield className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="text-lg font-semibold">Auto-Revoke Idle Sessions</h3>
                                <Badge variant="success">Enabled</Badge>
                            </div>
                            <p className="text-text-secondary text-sm mb-4">
                                Automatically revoke sessions that haven't been used for a period of time
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                <Button variant="secondary" size="sm">After 1 Hour</Button>
                                <Button variant="secondary" size="sm">After 24 Hours</Button>
                                <Button variant="primary" size="sm">After 7 Days</Button>
                                <Button variant="secondary" size="sm">Never</Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Notifications */}
                <Card variant="glass">
                    <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center text-success shrink-0">
                            <Bell className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-1">Notifications</h3>
                            <p className="text-text-secondary text-sm mb-4">
                                Get notified about session activity and expirations
                            </p>
                            <div className="space-y-3">
                                <label className="flex items-center justify-between">
                                    <span className="text-sm">Session expiry warnings (10 min before)</span>
                                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary rounded" />
                                </label>
                                <label className="flex items-center justify-between">
                                    <span className="text-sm">Session execution alerts</span>
                                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary rounded" />
                                </label>
                                <label className="flex items-center justify-between">
                                    <span className="text-sm">Security alerts</span>
                                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary rounded" />
                                </label>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Networks */}
                <Card variant="glass">
                    <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                            <Globe className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-1">Supported Networks</h3>
                            <p className="text-text-secondary text-sm mb-4">
                                Networks where smart sessions are enabled
                            </p>
                            <div className="flex gap-3 flex-wrap">
                                <div className="network-badge">
                                    <span className="h-2 w-2 rounded-full bg-[#0052FF]" />
                                    <span>Base</span>
                                </div>
                                <div className="network-badge">
                                    <span className="h-2 w-2 rounded-full bg-[#FF0420]" />
                                    <span>Optimism</span>
                                </div>
                                <div className="network-badge">
                                    <span className="h-2 w-2 rounded-full bg-[#35D07F]" />
                                    <span>Celo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Theme */}
                <Card variant="glass">
                    <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <Palette className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-1">Theme</h3>
                            <p className="text-text-secondary text-sm mb-4">
                                Customize the appearance of your dashboard
                            </p>
                            <div className="flex gap-2">
                                <Button variant="primary" size="sm">Dark</Button>
                                <Button variant="secondary" size="sm" disabled>Light (Coming Soon)</Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Footer */}
            <Card variant="bordered" className="text-center">
                <p className="text-text-muted text-sm">
                    Smart Session Dapp v1.0.0 • Built with Reown AppKit
                </p>
            </Card>
        </div>
    );
}
