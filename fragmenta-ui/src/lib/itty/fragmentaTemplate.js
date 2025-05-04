export function generateHTML({ fragment, hash, signature, publicKey }) {
  return `
  <html>
    <head><title>Fragmenta · Signed Fragment</title></head>
    <body style="font-family: monospace; padding: 2em;">
      <h2>✏️ Fragmenta</h2>
      <p><strong>Fragment:</strong><br/>${fragment.replace(/\n/g, "<br/>")}</p>
      <p><strong>SHA256:</strong><br/>${hash}</p>
      <p><strong>Signature:</strong><br/>${signature}</p>
      <p><strong>Public Key:</strong><br/>${publicKey}</p>
    </body>
  </html>
  `;
}

