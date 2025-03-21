// src/components/TokenCounter.js
import React, { useEffect, useState } from 'react';

const TokenCounter = ({ contract }) => {
  const [tokenCounter, setTokenCounter] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTokenCounter = async () => {
    try {
      const count = await contract.tokenIdCounter();
      setTokenCounter(count.toString());
    } catch (error) {
      console.error("Error fetching token counter:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch token counter initially
    fetchTokenCounter();
    
    // Set up interval to fetch the token counter every second
    const intervalId = setInterval(fetchTokenCounter, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [contract]);

  if (loading) {
    return <div className="text-gray-700">Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Current Token ID Counter</h2>
      <p className="text-gray-700">Token Count: <span className="font-bold">{tokenCounter}</span></p>
    </div>
  );
};

export default TokenCounter;