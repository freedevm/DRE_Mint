// src/components/TokenCounter.js
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import DRE from "../artifacts/contracts/DRE.json";

const TokenCounter = () => {
    const [tokenCounter, setTokenCounter] = useState('0');
    const [loading, setLoading] = useState(true);

    // Replace with your actual Infura or Alchemy project ID/API URL
    // const provider = new ethers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/hra0WS7LQz4cQfdKoscbvfEFBDB54ELk');
    const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/hra0WS7LQz4cQfdKoscbvfEFBDB54ELk');

    // Replace with your deployed contract's ABI and address
    const contractAddress = '0x7C2a827254B7a6b8dE57F1547409c8677188A1dd';
    const contractAbi = DRE.abi;

    const fetchTokenCounter = async () => {
        try {
            const contract = new ethers.Contract(contractAddress, contractAbi, provider);
            const count = await contract.tokenIdCounter();
            console.log("count", count)
            setTokenCounter(count.toString());
        } catch (error) {
            console.error("Error fetching token counter:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTokenCounter();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Minted DRE-NFT Count: {tokenCounter}</h2>
        </div>
    );
};

export default TokenCounter;