import React, { useMemo } from 'react';
import { Search, ExternalLink } from 'lucide-react';
import { useChainId } from 'wagmi';
import { getChainMetadata } from '../../lib/contracts';

interface StepTargetProps {
    value: string;
    onChange: (value: string) => void;
    onSelectDapp?: (name: string, address: string) => void;
}

interface DappInfo {
    name: string;
    address: string;
    icon: string;
    color: string;
    description: string;
}

// Popular dapps by network
const NETWORK_DAPPS: Record<number, DappInfo[]> = {
    // Base (8453)
    8453: [
        {
            name: 'Uniswap V3',
            address: '0x2626664c2603336E57B271c5C0b26F421741e481',
            icon: '🦄',
            color: 'from-pink-500/20 to-purple-500/20',
            description: 'Swap Router'
        },
        {
            name: 'Aave V3',
            address: '0xA238Dd80C259a72e81d7e4664a9801593F98d1c5',
            icon: '👻',
            color: 'from-purple-500/20 to-blue-500/20',
            description: 'Lending Pool'
        },
        {
            name: 'Aerodrome',
            address: '0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43',
            icon: '✈️',
            color: 'from-blue-500/20 to-cyan-500/20',
            description: 'DEX Router'
        },
        {
            name: 'BaseSwap',
            address: '0x327Df1E6de05895d2ab08513aaDD9313Fe505d86',
            icon: '🔵',
            color: 'from-blue-600/20 to-indigo-500/20',
            description: 'DEX Router'
        }
    ],
    // Optimism (10)
    10: [
        {
            name: 'Uniswap V3',
            address: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
            icon: '🦄',
            color: 'from-pink-500/20 to-purple-500/20',
            description: 'Swap Router'
        },
        {
            name: 'Aave V3',
            address: '0x794a61358D6845594F94dc1DB02A252b5b4814aD',
            icon: '👻',
            color: 'from-purple-500/20 to-blue-500/20',
            description: 'Lending Pool'
        },
        {
            name: 'Velodrome',
            address: '0xa062aE8A9c5e11aaA026fc2670B0D65cCc8B2858',
            icon: '🚴',
            color: 'from-red-500/20 to-orange-500/20',
            description: 'DEX Router'
        },
        {
            name: 'Synthetix',
            address: '0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4',
            icon: '⚡',
            color: 'from-cyan-500/20 to-blue-500/20',
            description: 'SNX Token'
        }
    ],
    // Celo (42220)
    42220: [
        {
            name: 'Ubeswap',
            address: '0xE3D8bd6Aed4F159bc8000a9cD47CffDb95F96121',
            icon: '🐂',
            color: 'from-green-500/20 to-yellow-500/20',
            description: 'DEX Router'
        },
        {
            name: 'Moola Market',
            address: '0x970b12522CA9b4054807a2c5B736149a5BE6f670',
            icon: '🌾',
            color: 'from-yellow-500/20 to-green-500/20',
            description: 'Lending Pool'
        },
        {
            name: 'Curve',
            address: '0x0000000022D53366457F9d5E68Ec105046FC4383',
            icon: '〰️',
            color: 'from-blue-500/20 to-indigo-500/20',
            description: 'Stableswap'
        },
        {
            name: 'SushiSwap',
            address: '0x1421bDe4B10e8dd459b3BCb598810B1337D56842',
            icon: '🍣',
            color: 'from-pink-500/20 to-red-500/20',
            description: 'DEX Router'
        }
    ],
};

const NETWORK_NAMES: Record<number, string> = {
    8453: 'Base',
    10: 'Optimism',
    42220: 'Celo',
};

export function StepTarget({ value, onChange, onSelectDapp }: StepTargetProps) {
    const chainId = useChainId();

    const dapps = useMemo(() => {
        return NETWORK_DAPPS[chainId] || NETWORK_DAPPS[8453]; // Default to Base
    }, [chainId]);

    const networkName = NETWORK_NAMES[chainId] || 'Base';
    const chainMetadata = getChainMetadata(chainId);
    const explorerUrl = chainMetadata?.addressExplorer || 'https://basescan.org/address/';

    const handleSelectDapp = (dapp: DappInfo) => {
        onChange(dapp.address);
        onSelectDapp?.(dapp.name, dapp.address);
    };

    const isValidAddress = value.match(/^0x[a-fA-F0-9]{40}$/);

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-xl font-semibold font-display">Select Target Application</h3>
                <p className="text-text-secondary">
                    Enter the contract address of the Dapp you want to create a session for on <span className="text-primary font-medium">{networkName}</span>.
                </p>
            </div>

            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-text-secondary" />
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="0x..."
                    className={`block w-full rounded-lg border bg-surface py-3 pl-10 pr-4 text-text-primary placeholder-text-muted font-mono text-sm focus:ring-1 transition-colors ${value && !isValidAddress
                        ? 'border-danger focus:border-danger focus:ring-danger'
                        : value && isValidAddress
                            ? 'border-success focus:border-success focus:ring-success'
                            : 'border-white/10 focus:border-primary focus:ring-primary'
                        }`}
                />
                {value && isValidAddress && (
                    <a
                        href={`${explorerUrl}${value}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-primary transition-colors"
                    >
                        <ExternalLink className="h-4 w-4" />
                    </a>
                )}
            </div>
            {value && !isValidAddress && (
                <p className="text-sm text-danger">Please enter a valid Ethereum address (0x...42 characters)</p>
            )}

            <div className="space-y-4">
                <h4 className="text-sm font-medium text-text-secondary uppercase tracking-wider">
                    Popular Dapps on {networkName}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {dapps.map((dapp) => (
                        <button
                            key={dapp.name}
                            onClick={() => handleSelectDapp(dapp)}
                            className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left group ${value === dapp.address
                                ? 'border-primary bg-primary/10 shadow-glow-sm'
                                : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                                }`}
                        >
                            <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${dapp.color} flex items-center justify-center text-xl shrink-0`}>
                                {dapp.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-text-primary">{dapp.name}</div>
                                <div className="text-xs text-text-muted truncate font-mono">
                                    {dapp.description}
                                </div>
                            </div>
                            {value === dapp.address && (
                                <div className="h-2 w-2 rounded-full bg-primary" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Custom Contract Option */}
            <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-text-muted">
                    Don't see your Dapp? Paste any {networkName} contract address above to create a custom session.
                </p>
            </div>
        </div>
    );
}
