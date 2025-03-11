// src/components/TokenURI.js
import React, { useEffect, useState } from 'react';

const TokenURI = ({ contract }) => {
  const [tokenId, setTokenId] = useState('');
  const [metadataURI, setMetadataURI] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTokenURI = async () => {
    if (!tokenId) return;

    setLoading(true);
    try {
      const uri = await contract.uri(tokenId);
      setMetadataURI(uri);
    } catch (error) {
      console.error("Error fetching token URI:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Get Token Metadata URI</h2>
      <input
        type="text"
        placeholder="Enter token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 mb-3 w-full"
      />
      <button
        onClick={fetchTokenURI}
        disabled={loading}
        className={`bg-blue-500 text-white py-2 px-4 rounded-lg w-full transition-transform ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-400'}`}
      >
        {loading ? 'Loading...' : 'Get Token URI'}
      </button>
      {metadataURI && <div className="mt-4 text-gray-700">Token Metadata URI: <span className="font-bold">{metadataURI}</span></div>}
    </div>
  );
};

export default TokenURI;