// src/components/RevealingNFTs.js
import React, { useState } from 'react';

const RevealNFTs = ({ contract }) => {
  const [collectionType, setCollectionType] = useState(0);
  const [loading, setLoading] = useState(false);

  const revealNFTs = async () => {
    setLoading(true);
    try {
      const transaction = await contract.reveal(collectionType);
      await transaction.wait();
      alert('NFTs Revealed!');
    } catch (error) {
      console.error("Revealing NFTs error:", error);
      alert('Revealing NFTs failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Reveal NFTs</h2>
      <select
        value={collectionType}
        onChange={(e) => setCollectionType(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 mb-3 w-full"
      >
        <option value={0}>Music</option>
        <option value={1}>Artwork</option>
      </select>
      <button
        onClick={revealNFTs}
        disabled={loading}
        className={`bg-blue-500 text-white py-2 px-4 rounded-lg w-full transition-transform ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-400'}`}
      >
        {loading ? 'Revealing...' : 'Reveal NFTs'}
      </button>
    </div>
  );
};

export default RevealNFTs;