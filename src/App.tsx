import React, { useState } from "react";
import { useAccount } from "wagmi";
import { Layout } from "./components/layout/Layout";
import { LandingPage } from "./components/LandingPage";
import { CreateSessionWizard } from "./components/create-session/CreateSessionWizard";
import { SessionList, Session } from "./components/dashboard/SessionList";
import { ActivityPage } from "./components/ActivityPage";
import { SettingsPage } from "./components/SettingsPage";
import { Card } from "./components/ui/Card";
import { Button } from "./components/ui/Button";
import { ToastProvider, useToast } from "./components/ui/Toast";
import { Shield, Plus, Clock, Activity, TrendingUp } from "lucide-react";

// Mock Data with proper expiry timestamps
const createMockSessions = (): Session[] => [
  {
    id: 'session-1',
    targetAddress: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    targetName: 'Uniswap V2 Router',
    permissions: ['swapExactTokensForTokens', 'swapTokensForExactTokens'],
    expiry: new Date(Date.now() + 55 * 60 * 1000).toISOString(), // 55 minutes
    status: 'active',
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    chainId: 8453
  },
  {
    id: 'session-2',
    targetAddress: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
    targetName: 'Uniswap V3 Router',
    permissions: ['exactInputSingle', 'exactOutputSingle'],
    expiry: new Date(Date.now() + 23 * 60 * 60 * 1000).toISOString(), // 23 hours
    status: 'active',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    chainId: 8453
  },
  {
    id: 'session-3',
    targetAddress: '0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2',
    targetName: 'Aave V3 Pool',
    permissions: ['supply', 'borrow', 'repay'],
    expiry: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days
    status: 'active',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    chainId: 10
  }
];

type View = 'dashboard' | 'create' | 'activity' | 'settings';

function AppContent() {
  const { isConnected } = useAccount();
  const { success, error } = useToast();
  const [view, setView] = useState<View>('dashboard');
  const [sessions, setSessions] = useState<Session[]>(createMockSessions);
  const [isRevoking, setIsRevoking] = useState(false);

  const handleRevoke = async (id: string) => {
    setIsRevoking(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setSessions(sessions.filter(s => s.id !== id));
      success('Session revoked successfully');
    } catch (err) {
      error('Failed to revoke session');
    } finally {
      setIsRevoking(false);
    }
  };

  const handleRefresh = async (id: string) => {
    try {
      // Extend by 1 hour
      setSessions(sessions.map(s =>
        s.id === id
          ? { ...s, expiry: new Date(new Date(s.expiry).getTime() + 60 * 60 * 1000).toISOString() }
          : s
      ));
      success('Session extended by 1 hour');
    } catch (err) {
      error('Failed to extend session');
    }
  };

  const handleCreateComplete = () => {
    const newSession: Session = {
      id: `session-${Date.now()}`,
      targetAddress: '0x1234567890123456789012345678901234567890',
      targetName: 'New Session',
      permissions: ['transfer', 'approve'],
      expiry: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      status: 'active',
      createdAt: new Date().toISOString(),
      chainId: 8453
    };
    setSessions([newSession, ...sessions]);
    setView('dashboard');
    success('Session created successfully');
  };

  const handleNavigate = (newView: View) => {
    setView(newView);
  };

  if (!isConnected) {
    return (
      <Layout onNavigate={handleNavigate} currentView={view}>
        <LandingPage />
      </Layout>
    );
  }

  if (view === 'create') {
    return (
      <Layout onNavigate={handleNavigate} currentView={view}>
        <CreateSessionWizard
          onCancel={() => setView('dashboard')}
          onComplete={handleCreateComplete}
        />
      </Layout>
    );
  }

  if (view === 'activity') {
    return (
      <Layout onNavigate={handleNavigate} currentView={view}>
        <ActivityPage />
      </Layout>
    );
  }

  if (view === 'settings') {
    return (
      <Layout onNavigate={handleNavigate} currentView={view}>
        <SettingsPage />
      </Layout>
    );
  }

  // Stats calculation
  const activeSessions = sessions.filter(s => s.status === 'active').length;
  const expiringSoon = sessions.filter(s => {
    const expiry = new Date(s.expiry).getTime();
    return expiry - Date.now() < 60 * 60 * 1000 && expiry > Date.now();
  }).length;

  return (
    <Layout onNavigate={handleNavigate} currentView={view}>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary font-display">Dashboard</h1>
            <p className="text-text-secondary mt-1">Manage your active smart sessions and permissions.</p>
          </div>
          <Button onClick={() => setView('create')} className="animate-glow">
            <Plus className="mr-2 h-4 w-4" />
            Create Session
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card variant="glass" className="space-y-2 glass-card-hover">
            <div className="flex items-center gap-2 text-primary">
              <Shield className="h-5 w-5" />
              <span className="font-medium text-sm">Active Sessions</span>
            </div>
            <div className="text-3xl font-bold">{activeSessions}</div>
          </Card>

          <Card variant="glass" className="space-y-2 glass-card-hover">
            <div className="flex items-center gap-2 text-warning">
              <Clock className="h-5 w-5" />
              <span className="font-medium text-sm">Expiring Soon</span>
            </div>
            <div className="text-3xl font-bold">{expiringSoon}</div>
          </Card>

          <Card variant="glass" className="space-y-2 glass-card-hover">
            <div className="flex items-center gap-2 text-success">
              <Activity className="h-5 w-5" />
              <span className="font-medium text-sm">Executions Today</span>
            </div>
            <div className="text-3xl font-bold">12</div>
          </Card>

          <Card variant="glass" className="space-y-2 glass-card-hover">
            <div className="flex items-center gap-2 text-secondary">
              <TrendingUp className="h-5 w-5" />
              <span className="font-medium text-sm">Total Created</span>
            </div>
            <div className="text-3xl font-bold">{sessions.length + 5}</div>
          </Card>
        </div>

        {/* Active Sessions List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">Active Sessions</h2>
            {sessions.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => setView('activity')}>
                View Activity
              </Button>
            )}
          </div>
          <SessionList
            sessions={sessions}
            onRevoke={handleRevoke}
            onRefresh={handleRefresh}
            isRevoking={isRevoking}
          />
        </div>
      </div>
    </Layout>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;
