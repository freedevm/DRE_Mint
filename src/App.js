// src/App.js
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import TokenCounter from './components/TokenCounter';
import MintNFT from './components/MintNFT';
import TokenURI from './components/TokenURI';
import SetBaseURI from './components/SetBaseURI';
import RevealNFTs from './components/RevealNFTs';
import './index.css';
import DREABI from './artifacts/contracts/DRE.json';

const App = () => {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const connectContract = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/hra0WS7LQz4cQfdKoscbvfEFBDB54ELk');
      // https://sepolia.etherscan.io/address/0x7C2a827254B7a6b8dE57F1547409c8677188A1dd#readContract

      await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request account access
      const signer = provider.getSigner();

      const contractAddress = '0x7C2a827254B7a6b8dE57F1547409c8677188A1dd';
      const contractAbi = DREABI.abi;

      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
      setContract(contractInstance);
    };

    connectContract();
  }, []);

  return (
    <div className="App flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">DRE NFT Minting DApp</h1>
      {contract ? (
        <>
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-4">
            <MintNFT contract={contract} />
          </div>
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-4">
            <SetBaseURI contract={contract} />
          </div>
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-4">
            <RevealNFTs contract={contract} />
          </div>
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-4">
            <TokenCounter contract={contract} />
          </div>
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
            <TokenURI contract={contract} />
          </div>
        </>
      ) : (
        <p className="text-gray-700">Loading contract...</p>
      )}
    </div>
  );
};

export default App;