import React, { useState } from "react";
import { SmartWallet } from "../lib/wallet/SmartWallet";
import { generateHTML } from "../lib/itty/fragmentaTemplate";
import { compressToEncodedURIComponent } from "lz-string";

function sha256(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  return crypto.subtle.digest("SHA-256", data).then(buffer => {
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  });
}

export default function FragmentSigner() {
  const [fragment, setFragment] = useState("");
  const [hash, setHash] = useState("");
  const [signature, setSignature] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [link, setLink] = useState(null);

  const wallet = new SmartWallet();

  const handleSign = async () => {
    if (!fragment.trim()) return;

    const digest = await sha256(fragment);
    setHash(digest);

    const user = await wallet.connect();
    setPublicKey(user.publicKey);

    const result = await wallet.sign(digest);
    setSignature(result.signature);

    const html = generateHTML({
      fragment,
      hash: digest,
      signature: result.signature,
      publicKey: user.publicKey,
    });

    const compressed = compressToEncodedURIComponent(html);
    const url = `https://itty.bitty.site/#data:text/html,${compressed}`;
    setLink(url);
  };

  return (
    <div style={{ padding: "1.5rem", maxWidth: "700px", margin: "auto", fontFamily: "monospace" }}>
      <h2>✍️ Fragment Signer</h2>

      <textarea
        rows={8}
        style={{ width: "100%", fontFamily: "monospace", marginBottom: "1rem" }}
        placeholder="Write your ASCII fragment or message here..."
        value={fragment}
        onChange={e => setFragment(e.target.value)}
      />

      <button onClick={handleSign} disabled={!fragment.trim()}>
        Sign Fragment
      </button>

      {hash && (
        <div style={{ marginTop: "1rem" }}>
          <p><strong>SHA256:</strong><br /><code>{hash}</code></p>
          <p><strong>Public Key:</strong><br /><code>{publicKey}</code></p>
          <p><strong>Signature:</strong><br /><code>{signature}</code></p>
        </div>
      )}

      {link && (
        <div style={{ marginTop: "1.5rem" }}>
          <p><strong>itty.bitty link:</strong></p>
          <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
        </div>
      )}
    </div>
  );
}

