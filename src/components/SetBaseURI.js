// src/components/SetBaseURI.js
import React, { useState } from 'react';

const SetBaseURI = ({ contract }) => {
  const [uri, setUri] = useState('');
  const [collectionType, setCollectionType] = useState(0);
  const [loading, setLoading] = useState(false);

  const setBaseURI = async () => {
    setLoading(true);
    try {
      const transaction = await contract.setBaseURI(collectionType, uri);
      await transaction.wait();
      alert('Base URI Set!');
    } catch (error) {
      console.error("Setting Base URI error:", error);
      alert('Setting Base URI failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Set Base URI for Collection</h2>
      <input
        type="text"
        placeholder="Base URI"
        value={uri}
        onChange={(e) => setUri(e.target.value)}
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
        onClick={setBaseURI}
        disabled={loading}
        className={`bg-blue-500 text-white py-2 px-4 rounded-lg w-full transition-transform ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-400'}`}
      >
        {loading ? 'Setting...' : 'Set Base URI'}
      </button>
    </div>
  );
};

export default SetBaseURI;