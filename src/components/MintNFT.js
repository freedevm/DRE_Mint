// src/components/MintNFT.js
import React, { useState } from 'react';

const MintNFT = ({ contract }) => {
  const [amount, setAmount] = useState(1);
  const [collectionType, setCollectionType] = useState(0); // Assuming 0 is Music, 1 is Artwork
  const [loading, setLoading] = useState(false);

  const mintNFT = async () => {
    setLoading(true);
    try {
      const transaction = await contract.mint(window.ethereum.selectedAddress, amount, collectionType);
      await transaction.wait();
      alert('NFT Minted!');
    } catch (error) {
      console.error("Minting error:", error);
      alert('Minting failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Mint a New NFT</h2>
      <input
        type="number"
        min="1"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 mb-3 w-full hidden"
      />
      <select
        value={collectionType}
        onChange={(e) => setCollectionType(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 mb-3 w-full"
      >
        <option value={0}>Music</option>
        <option value={1}>Artwork</option>
      </select>
      <button
        onClick={mintNFT}
        disabled={loading}
        className={`bg-blue-500 text-white py-2 px-4 rounded-lg w-full transition-transform ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-400'}`}
      >
        {loading ? 'Minting...' : 'Mint NFT'}
      </button>
    </div>
  );
};

export default MintNFT;