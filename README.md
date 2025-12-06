# 🚀 Smart Session Dapp

<p align="center">
  <img src="https://img.shields.io/badge/chain-base-blue.svg" />
  <img src="https://img.shields.io/badge/chain-optimism-red.svg" />
  <img src="https://img.shields.io/badge/chain-celo-green.svg" />
  <img src="https://img.shields.io/badge/appkit-reown-orange.svg" />
  <img src="https://img.shields.io/badge/smart--sessions-enabled-brightgreen.svg" />
  <img src="https://img.shields.io/github/license/cryptoflops/smart-session-dapp" />
</p>

<p align="center">
  <strong>Secure, temporary, revocable on-chain session permissions for Web3 applications.</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## Overview

Smart Session Dapp enables users to grant **temporary, granular permissions** to decentralized applications without signing every transaction. Built with **Reown AppKit** and **WalletConnect Smart Sessions**, this production-ready dApp demonstrates the future of frictionless Web3 UX.

### The Problem

Traditional Web3 interactions require users to sign every transaction, creating:
- Constant interruptions during gameplay or DeFi interactions
- Poor user experience compared to Web2 applications
- Security fatigue leading to blind signing

### The Solution

Smart Sessions allow users to:
- Grant temporary permissions to specific contracts and functions
- Set automatic expiration times (1 hour, 1 day, 7 days)
- Revoke access instantly at any time
- Maintain full custody and control

---

## Features

### 🔐 Granular Permission Control
Define exactly what an app can do—limit by contract address, function selector, and value.

### ⏱️ Auto-Expiry Sessions
Sessions expire automatically. No forgotten approvals, no lingering risks.

### 🛡️ Instant Revocation
Kill any session instantly from the dashboard. You are always in control.

### 🌐 Multi-Chain Support
Deploy and manage sessions across Base, Optimism, and Celo.

### 🎨 Premium UI/UX
Modern glassmorphism design with real-time timers, animations, and toast notifications.

---

## Architecture

```
smart-session-dapp/
├── src/                    # React + Wagmi + AppKit frontend
│   ├── components/         # UI components
│   │   ├── ui/            # Design system (Button, Card, Modal, Timer, Toast)
│   │   ├── layout/        # Layout, Navbar, Sidebar
│   │   ├── create-session/# Session creation wizard
│   │   └── dashboard/     # Session list and management
│   ├── hooks/             # Custom React hooks (useSession)
│   └── lib/               # Config (wagmi, appkit, contracts)
├── server/                # Smart Session executor backend
├── contracts/             # Solidity contracts
└── scripts/               # Hardhat deployment scripts
```

---

## Live Contracts

| Network   | Address                                      | Explorer |
|-----------|----------------------------------------------|----------|
| Base      | `0x1363FfBE6e5280c2a310BE7b50Eaad4d3Bc57644` | [View](https://basescan.org/address/0x1363FfBE6e5280c2a310BE7b50Eaad4d3Bc57644) |
| Optimism  | `0xC19c0602d25e26f496037c42E6A103074d2CBd85` | [View](https://optimistic.etherscan.io/address/0xC19c0602d25e26f496037c42E6A103074d2CBd85) |
| Celo      | `0xC19c0602d25e26f496037c42E6A103074d2CBd85` | [View](https://celoscan.io/address/0xC19c0602d25e26f496037c42E6A103074d2CBd85) |

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- A [Reown Cloud](https://cloud.reown.io/) project ID

### Installation

```bash
# Clone the repository
git clone https://github.com/cryptoflops/smart-session-dapp.git
cd smart-session-dapp

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### Configuration

Edit `.env` with your credentials:

```env
VITE_REOWN_PROJECT_ID=your_project_id
VITE_SMART_SESSION_TARGET_ADDRESS=0x1363FfBE6e5280c2a310BE7b50Eaad4d3Bc57644
```

### Development

```bash
# Start frontend
npm run dev

# Start backend (separate terminal)
npm run dev:server
```

Open [http://localhost:5173](http://localhost:5173)

---

## Deployment

### Frontend (Vercel)

1. Push to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Add environment variables:
   - `VITE_REOWN_PROJECT_ID`
   - `VITE_SMART_SESSION_TARGET_ADDRESS`
4. Deploy

### Smart Contract

```bash
# Compile
npm run compile

# Deploy to Base
npm run deploy

# Verify
npx hardhat verify --network base <DEPLOYED_ADDRESS>
```

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React, Vite, TypeScript |
| Styling | Tailwind CSS, Glassmorphism |
| Web3 | wagmi, viem, Reown AppKit |
| Contracts | Solidity, Hardhat |
| Backend | Express.js, TypeScript |

---

## Security

Smart Sessions delegate capabilities to backend signers. Always:
- Audit session scopes and permissions
- Use short expiration times
- Monitor session activity
- Revoke unused sessions

See [SECURITY.md](SECURITY.md) for vulnerability reporting.

---

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

## Author

**cryptoflops.base.eth** | **psyhodivka.eth**

Address: `0x0Cf485F4c6b2a6087B4D5d4A590cAe8d22D7FA9a`

---

<p align="center">
  Built with ❤️ using <a href="https://reown.com">Reown AppKit</a> and <a href="https://base.org">Base</a>
</p>
