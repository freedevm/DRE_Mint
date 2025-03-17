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

  const checkNetwork = async (provider) => {
    const { chainId } = await provider.getNetwork();
    if (chainId !== 11155111) { // Sepolia chain ID
      alert("Please connect to the Sepolia network.");
      throw new Error("Network not supported");
    }
  };

  useEffect(() => {
    const connectContract = async () => {
      try {
        if (!window.ethereum) {
          alert('Please install MetaMask!');
          return;
        }

        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (accounts.length === 0) {
          alert('No account found. Please connect to a MetaMask account.');
          return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);  // Use Web3Provider with MetaMask
        await checkNetwork(provider); // Check if on the right network
        
        const signer = provider.getSigner(); // Obtain signer after confirming accounts
        const account = await signer.getAddress(); // Get the user's connected address

        if (!account) {
          alert('No account found. Please connect to MetaMask account.');
          return;
        }

        const contract = new ethers.Contract('0x8530Ff0c480e899E6e4fbB0152f8f432c515e3bb', DREABI.abi, signer);
        setContract(contract);

      } catch (error) {
        console.error('Error connecting to contract:', error); // Handle errors properly
        alert('Error connecting to contract: ' + error.message);
      }
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