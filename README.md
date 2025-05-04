# 🌐 Fragmenta

**Fragmenta** is a minimalist, decentralized application that allows users to create short text fragments, sign them, compress them into `itty.bitty` URLs, and publish their fingerprint on the Stellar blockchain.

The project follows the KISS philosophy — *Keep It Simple, Stupid* — combining browser-based compression, blockchain anchoring, and emerging smart wallet authentication.

---

## ✨ Features

- ✍️ Create and sign short text fragments (ASCII / HTML)
- 🔐 Sign with passkey-based Smart Wallets (WebAuthn-compatible)
- 📦 Compress into self-contained `itty.bitty` URLs
- 🌍 Anchor the fragment hash and URL on Stellar Testnet
- 🔗 View immutable proof on [Stellar Expert](https://stellar.expert/explorer/testnet)

---

## 🛠️ Tech Stack

- **Frontend**: React, PNPM, Vite
- **Backend**: Flask + Flask-CORS
- **Blockchain**: Stellar SDK, Horizon Testnet
- **Compression**: [itty.bitty](https://itty.bitty.site) + lz-string
- **Wallets**: Smart Wallet SDK (passkey-kit)
- **Signing**: SHA-256 (Web Crypto API)

---

## 🚀 Getting Started

### 1. Backend Setup

```bash
cd fragmenta
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python api.py
```

The Flask backend will run on: [http://localhost:5000](http://localhost:5000)

---

### 2. Frontend Setup

```bash
cd fragmenta-ui
pnpm install
pnpm dev
```

The React frontend will be served at: [http://localhost:3000](http://localhost:3000)

---

## 📤 How It Works

1. The user writes a text fragment (ASCII or markup)
2. The app computes a SHA-256 hash of the text
3. A Smart Wallet signs the hash (simulated in this MVP)
4. The signed text is embedded into an HTML document
5. The HTML is compressed into a data URL using `itty.bitty`
6. The fragment’s hash + URL are published on Stellar via `manageData` ops
7. The transaction is viewable on [Stellar Expert](https://stellar.expert/explorer/testnet)

---

## 📚 Roadmap

- [ ] Sign with live passkey wallet (PasskeyKit)
- [ ] IPFS integration for storing full HTML
- [ ] NFT minting from signed fragments
- [ ] Public fragment feed by account
- [ ] Verification UI (proof-of-origin tool)
- [ ] Mainnet publishing (optional)

---

## 📦 Project Structure

```
fragmenta/
├── fragmenta-ui/          # React frontend
├── itty-bitty/            # Custom fork of itty.bitty
├── store_to_stellar.py    # Python module to write to Stellar
├── api.py                 # Flask backend (API)
└── README.md              # This file
```

---

## 🧑‍💻 Contributing

Contributions are welcome! Fork the repo, open an issue, or submit a PR.

If you want to collaborate on future phases (NFTs, IPFS, DAO governance), reach out directly.

---

## 🪪 License

MIT License – feel free to fork, remix, and use commercially with attribution.

---

## 👤 Author

**Federico Viola** – [github.com/federicoviola](https://github.com/federicoviola)  
Santa Fe, Argentina 🇦🇷
