import React from 'react';
import { Shield, Zap, Lock, Clock, ArrowRight, CheckCircle2, Layers, Fingerprint } from 'lucide-react';
import { AppKitButton } from "@reown/appkit/react";
import { Card } from './ui/Card';
import { Button } from './ui/Button';

export function LandingPage() {
    return (
        <div className="flex flex-col items-center min-h-[90vh]">
            {/* Hero Section */}
            <section className="relative w-full flex flex-col items-center justify-center text-center pt-12 pb-20 px-4">
                {/* Background Effects */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-pulse" />
                    <div className="absolute top-40 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[128px] animate-pulse animation-delay-500" />
                </div>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-8 animate-fade-in">
                    <Zap className="h-4 w-4" />
                    <span>Next Gen Web3 UX</span>
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    <span className="text-text-secondary">Smart Sessions</span>
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight mb-6 animate-slide-up">
                    <span className="text-text-primary">Secure </span>
                    <span className="gradient-text">Sessions</span>
                    <br />
                    <span className="text-text-primary">Zero </span>
                    <span className="gradient-text-primary">Friction</span>
                </h1>

                {/* Subheadline */}
                <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-10 animate-slide-up animation-delay-100">
                    Grant temporary, granular permissions to Dapps.
                    <br className="hidden md:block" />
                    No more signing every transaction.
                </p>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 items-center animate-slide-up animation-delay-200">
                    <AppKitButton />
                    <a
                        href="https://github.com/cryptoflops/smart-session-dapp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
                    >
                        View on GitHub
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center gap-6 mt-12 text-sm text-text-muted animate-fade-in animation-delay-300">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <span>Audited Contracts</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <span>Base Mainnet</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <span>Reown AppKit</span>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="w-full max-w-6xl px-4 pb-20">
                <div className="grid md:grid-cols-3 gap-6">
                    <Card variant="glass" className="text-left space-y-4 group glass-card-hover">
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                            <Lock className="h-7 w-7" />
                        </div>
                        <h3 className="text-xl font-semibold font-display">Granular Control</h3>
                        <p className="text-text-secondary leading-relaxed">
                            Define exactly what an app can do. Limit by contract, function, and transaction value.
                        </p>
                    </Card>

                    <Card variant="glass" className="text-left space-y-4 group glass-card-hover">
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-warning/20 to-warning/5 flex items-center justify-center text-warning group-hover:scale-110 transition-transform duration-300">
                            <Clock className="h-7 w-7" />
                        </div>
                        <h3 className="text-xl font-semibold font-display">Auto-Expiry</h3>
                        <p className="text-text-secondary leading-relaxed">
                            Sessions expire automatically. Set for 1 hour, 1 day, or 1 week—your choice.
                        </p>
                    </Card>

                    <Card variant="glass" className="text-left space-y-4 group glass-card-hover">
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-success/20 to-success/5 flex items-center justify-center text-success group-hover:scale-110 transition-transform duration-300">
                            <Shield className="h-7 w-7" />
                        </div>
                        <h3 className="text-xl font-semibold font-display">Instant Revocation</h3>
                        <p className="text-text-secondary leading-relaxed">
                            Kill any session instantly from your dashboard. You are always in control.
                        </p>
                    </Card>
                </div>
            </section>

            {/* How It Works */}
            <section className="w-full max-w-4xl px-4 pb-24">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">How It Works</h2>
                    <p className="text-text-secondary text-lg">Three simple steps to frictionless Web3</p>
                </div>

                <div className="relative">
                    {/* Connection Line */}
                    <div className="absolute top-8 left-1/2 w-[calc(100%-8rem)] h-0.5 bg-gradient-to-r from-primary via-secondary to-success -translate-x-1/2 hidden md:block" />

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="relative text-center group">
                            <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary font-bold text-xl group-hover:bg-primary group-hover:text-background transition-colors duration-300">
                                1
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Connect Wallet</h3>
                            <p className="text-text-secondary text-sm">
                                Link your wallet using WalletConnect or browser extension
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="relative text-center group">
                            <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-full bg-secondary/10 border-2 border-secondary flex items-center justify-center text-secondary font-bold text-xl group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                                2
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Grant Session</h3>
                            <p className="text-text-secondary text-sm">
                                Choose permissions, set expiry, and sign once
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="relative text-center group">
                            <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-full bg-success/10 border-2 border-success flex items-center justify-center text-success font-bold text-xl group-hover:bg-success group-hover:text-background transition-colors duration-300">
                                3
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Enjoy UX</h3>
                            <p className="text-text-secondary text-sm">
                                Dapp executes actions seamlessly—no more popups
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Security Section */}
            <section className="w-full bg-surface/50 border-y border-glass py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold font-display mb-4">
                                Built for <span className="text-primary">Security</span>
                            </h2>
                            <p className="text-text-secondary mb-6 leading-relaxed">
                                Smart Sessions use cryptographic signatures and on-chain verification.
                                Your keys never leave your wallet. Sessions are scoped, time-bound, and revocable.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-text-secondary">
                                    <Fingerprint className="h-5 w-5 text-primary" />
                                    <span>Non-custodial design</span>
                                </li>
                                <li className="flex items-center gap-3 text-text-secondary">
                                    <Layers className="h-5 w-5 text-primary" />
                                    <span>Multi-chain support (Base, Optimism, Celo)</span>
                                </li>
                                <li className="flex items-center gap-3 text-text-secondary">
                                    <Shield className="h-5 w-5 text-primary" />
                                    <span>Open source & audited</span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl" />
                            <Card variant="glass" className="relative space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center text-success">
                                        <Shield className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="font-semibold">Session Active</div>
                                        <div className="text-sm text-text-secondary">Uniswap V3 • 55m remaining</div>
                                    </div>
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    <span className="permission-badge">swapExactTokensForTokens</span>
                                    <span className="permission-badge">approve</span>
                                </div>
                                <div className="text-xs text-text-muted font-mono">
                                    0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="w-full py-20 px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                    Ready to get started?
                </h2>
                <p className="text-text-secondary text-lg mb-8">
                    Connect your wallet and experience frictionless Web3
                </p>
                <AppKitButton />
            </section>
        </div>
    );
}
