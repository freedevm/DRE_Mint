// src/components/MintNFT.js
import React, { useState } from 'react';

const MintNFT = ({ contract }) => {
  const [amount, setAmount] = useState(1);
  const [collectionType, setCollectionType] = useState(0); // Assuming 0 is Music, 1 is Artwork
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const mintNFT = async () => {
    setLoading(true);
    setErrorMessage(""); // Reset previous error message
    try {
      const transaction = await contract.mint(window.ethereum.selectedAddress, amount, collectionType);
      await transaction.wait();
      alert('NFT Minted!');
    } catch (error) {
      console.error("Minting error:", error);

      // Custom error handling based on error message
      // if (error.code === 'ACTION_REJECTED') {
        setErrorMessage("Transaction was rejected. Please try again.");
      // } else if (error.message.includes("Only the owner can mint")) {
      //   setErrorMessage("You are not authorized to mint this NFT. Please check your account.");
      // } else if (error.message.includes("Amount must be greater than zero")) {
      //   setErrorMessage("Please enter a valid amount greater than zero.");
      // } else {
      //   setErrorMessage("Minting failed: " + error.message);
      // }
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
        className="border border-gray-300 rounded-lg p-2 mb-3 w-full"
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
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>} {/* Display error message */}
    </div>
  );
};

export default MintNFT;