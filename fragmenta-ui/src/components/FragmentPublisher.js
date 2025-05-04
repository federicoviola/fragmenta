// src/components/FragmentPublisher.js
import React, { useState } from 'react';
import { sha256 } from '../lib/itty/hash';
import { compress } from '../lib/itty/compressor';

export default function FragmentPublisher() {
  const [text, setText] = useState('');
  const [ittyUrl, setIttyUrl] = useState('');
  const [hash, setHash] = useState('');
  const [txLink, setTxLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePublish = async () => {
    setLoading(true);
    setError('');
    setIttyUrl('');
    setHash('');
    setTxLink('');

    try {
      const digest = await sha256(text);
      setHash(digest);

      const compressedUrl = compress(text);
      setIttyUrl(compressedUrl);

      const res = await fetch('http://localhost:5000/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hash: digest, url: compressedUrl }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to publish');

      setTxLink(data.explorer_url);
    } catch (err) {
      setError(err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">✍️ Fragment Publisher</h2>
      <textarea
        className="w-full border p-2 rounded mb-4"
        rows="6"
        placeholder="Write your fragment here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handlePublish}
        disabled={loading || !text.trim()}
      >
        {loading ? 'Publishing...' : 'Sign & Publish'}
      </button>
    {hash && (
        <div className="mt-4">
            <p><strong>SHA256:</strong> {hash}</p>
        </div>
    )}
      {error && <p className="text-red-500 mt-4">⚠️ {error}</p>}
      {ittyUrl && (
        <div className="mt-4">
          <p><strong>itty.bitty URL:</strong></p>
          <a href={ittyUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
            {ittyUrl}
          </a>
        </div>
      )}
      {txLink && (
        <div className="mt-4">
          <p><strong>Stellar TX:</strong></p>
          <a href={txLink} target="_blank" rel="noopener noreferrer" className="text-green-700 underline">
            {txLink}
          </a>
        </div>
      )}
    </div>
  );
}

