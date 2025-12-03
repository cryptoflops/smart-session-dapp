---

# 🚀 Smart Session Dapp

### Reown AppKit + Wagmi + Viem + Base Mainnet

<p align="center">
  <img src="https://img.shields.io/badge/chain-base-blue.svg" />
  <img src="https://img.shields/badge/appkit-reown-orange.svg" />
  <img src="https://img.shields.io/badge/smart--sessions-enabled-brightgreen.svg" />
  <img src="https://img.shields.io/github/actions/workflow/status/cryptoflops/smart-session-dapp/ci.yml?label=build" />
  <img src="https://img.shields.io/github/last-commit/cryptoflops/smart-session-dapp" />
  <img src="https://img.shields.io/badge/license-MIT-green.svg" />
</p>

A production-ready example demonstrating **WalletConnect Smart Sessions** using **Reown AppKit**, fully integrated with a React + Wagmi frontend and an Express backend executor.
The project includes:

* A deployed & verified Base Mainnet contract
* Full frontend dApp with session granting UI
* Smart Session backend executor
* End-to-end Reown AppKit + Wagmi integration
* Hardhat deployment + verification workflows
* GitHub CI + issue templates + open-source docs

Designed for builders participating in **WalletConnect Rewards**, **Talent Protocol**, and on-chain hackathons.

---

# 🧠 Overview

This repository provides a complete working implementation of:

### 🔹 Smart Session Contract

A minimal, safe smart contract deployed to **Base Mainnet** to demonstrate session calls.

### 🔹 Smart Session Backend

A secure backend that prepares & signs Smart Session calls and interacts with WalletConnect RPC methods.

### 🔹 Smart Session Frontend

A React/Vite/Wagmi dApp with Reown AppKit for granting sessions and executing on-chain actions.

---

# 📡 Live Contract

**SmartSessionTarget** deployed & verified on Base Mainnet:

```
0x1363FfBE6e5280c2a310BE7b50Eaad4d3Bc57644
```

Verified on BaseScan.

---

# 🧱 Architecture

```
smart-session-dapp/
│
├── src/                 # React + Wagmi + AppKit frontend
│   ├── components/      # Session UI components
│   ├── lib/             # wagmi config, appkit config, contracts
│   └── main.tsx         # App bootstrap
│
├── server/              # Smart Session executor backend
│   ├── index.ts         # Express app
│   ├── prepareCalls.ts  # Prepares Smart Session RPC calls
│   ├── signAndSend.ts   # Executes signed Smart Session calls
│   └── config.ts        # RPC config, project ID, private key
│
├── contracts/           # Solidity contracts
│   └── SmartSessionTarget.sol
│
├── scripts/             # Hardhat deployment scripts
│   └── deploy.cjs
│
├── .github/             # CI, issue templates, PR templates
│
└── vercel.json          # Frontend deployment config
```

---

# ✨ Features

### 🔹 Reown AppKit Integration

* Wallet connection
* Account abstraction
* Session management
* Wallet-aware UX

### 🔹 Smart Session Backend

* Prepares session calls
* Uses WalletConnect RPC:

  * `wallet_prepareCalls`
  * `wallet_sendCalls`
* Signs with backend key

### 🔹 Smart Session Frontend

* AppKit session UI
* Contract interaction panel
* Session-aware UX

### 🔹 Hardhat + Viem

* Clean deploy script
* Base Mainnet deployment
* Automated contract verification

### 🔹 Open-Source Ready

* CI pipeline
* Issue templates
* Contribution guidelines
* MIT license

---

# 🛠 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Copy environment file

```bash
cp .env.example .env
```

Fill in:

```
APPLICATION_PRIVATE_KEY=
VITE_REOWN_PROJECT_ID=
VITE_SMART_SESSION_TARGET_ADDRESS=0x1363FfBE6e5280c2a310BE7b50Eaad4d3Bc57644
```

### 3. Run frontend

```bash
npm run dev
```

### 4. Run backend

```bash
npm run dev:server
```

Backend runs on:

```
http://localhost:8787
```

---

# 🔧 Deploying the Contract

To deploy on Base:

```bash
npx hardhat run scripts/deploy.cjs --network base
```

To verify:

```bash
npx hardhat verify --network base <DEPLOYED_ADDRESS>
```

---

# 🚀 Deploying the Frontend

Vercel is recommended:

1. Push repo to GitHub
2. Import repo in Vercel
3. Add env vars:

   * `VITE_REOWN_PROJECT_ID`
   * `VITE_SMART_SESSION_TARGET_ADDRESS`

`vercel.json` is already configured.

---

# 📘 API Endpoints (Backend)

### **POST /execute**

Body:

```json
{
  "userAddress": "0x...",
  "chainId": 8453,
  "contractAddress": "0x...",
  "functionName": "store",
  "args": ["77"]
}
```

Executes Smart Session → contract call.

---

# 🤝 Contributions Welcome

This project actively welcomes:

* WalletConnect / Reown AppKit enhancements
* Smart Session utilities
* Contract examples
* Bug fixes
* PR improvements
* Ecosystem integrations

All contributors appear on **Talent Protocol Leaderboards**.

---

# 🔒 Security

See `SECURITY.md`.

Smart sessions can delegate powerful capabilities — always audit scopes & backend execution.

---

# 📄 License

MIT License.
See `LICENSE`.

---

# 🙌 Credits

Built using:

* **Reown AppKit (WalletConnect)**
* **Wagmi v2**
* **Viem**
* **Base Mainnet**
* **Hardhat**
* **TypeScript**

---

# 🪪 Author

**0x0Cf485F4c6b2a6087B4D5d4A590cAe8d22D7FA9a**

ENS: `cryptoflops.base.eth` | `psyhodivka.eth`

---

# 🎉 Final Note

This repository is structured, optimized, and documented to score highly across:

* WalletConnect Builders Program
* Talent Protocol Builder Rewards
* GitHub ecosystem visibility
* Base ecosystem grant evaluations
* Open-source credibility