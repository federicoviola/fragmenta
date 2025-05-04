import React, { useState } from "react";
import WalletConnect from "./components/WalletConnect";

function App() {
  const [walletPublicKey, setWalletPublicKey] = useState(null);

  return (
    <div style={{ padding: "2em", fontFamily: "monospace", background: "#111", color: "#0f0" }}>
      <h1>Fragmenta ✍️</h1>
      <WalletConnect onConnected={(key) => setWalletPublicKey(key)} />

      {walletPublicKey && (
        <div style={{ marginTop: "2em" }}>
          <p>🎉 Your wallet is ready to sign fragments.</p>
        </div>
      )}
    </div>
  );
}

export default App;
