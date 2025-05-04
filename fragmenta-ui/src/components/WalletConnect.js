import React, { useEffect, useState } from "react";
import { SmartWallet } from "../lib/wallet/SmartWallet";

const wallet = new SmartWallet({
  appDomain: "fragmenta.art", // Cambia por tu dominio real cuando lo tengas
  walletUrl: "https://launchtube.stellar.org", // URL oficial de smart wallet relayer
});

export default function WalletConnect({ onConnected }) {
  const [publicKey, setPublicKey] = useState(null);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    try {
      const user = await wallet.connect();
      if (user && user.publicKey) {
        setPublicKey(user.publicKey);
        onConnected && onConnected(user.publicKey);
      }
    } catch (err) {
      console.error("Wallet connection failed:", err);
      setError("Could not connect to wallet.");
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div style={{ marginTop: "2em" }}>
      {publicKey ? (
        <div>
          <p>✅ Connected as:</p>
          <code style={{ wordBreak: "break-all" }}>{publicKey}</code>
        </div>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p>Connecting to Stellar Smart Wallet...</p>
      )}
    </div>
  );
}

