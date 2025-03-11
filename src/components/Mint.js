import React, { useState } from 'react';
import { getContract } from '../utils/ethers';

const Mint = () => {
    const [amount, setAmount] = useState(1);
    const [collectionType, setCollectionType] = useState(0); // 0 for Music, 1 for Artwork

    const mintNFT = async () => {
        const contract = await getContract();
        const tx = await contract.mint(await window.ethereum.selectedAddress, amount, collectionType);
        await tx.wait();
        alert("Minted Successfully!");
    };

    return (
        <div className="mint-container p-4 border rounded-lg shadow-lg bg-white">
            <h2 className="text-lg font-bold">Mint an NFT</h2>
            <input 
                type="number" 
                value={amount} 
                onChange={e => setAmount(e.target.value)} 
                className="border p-2 mt-2 w-full"
                placeholder="Amount"
            />
            <select 
                value={collectionType} 
                onChange={e => setCollectionType(Number(e.target.value))} 
                className="border p-2 mt-2 w-full"
            >
                <option value="0">Music</option>
                <option value="1">Artwork</option>
            </select>
            <button 
                onClick={mintNFT} 
                className="bg-blue-500 text-white p-2 mt-4 rounded"
            >
                Mint NFT
            </button>
        </div>
    );
};

export default Mint;