import React, { useEffect, useState } from 'react';
import { getContract } from '../utils/ethers';

const DisplayNFTs = () => {
    const [nfts, setNFTs] = useState([]);

    const fetchNFTs = async () => {
        const contract = await getContract();
        const balance = await contract.balanceOf(await window.ethereum.selectedAddress);
        const tokenIds = []; // Array to hold tokenID and Metadata URI

        for (let i = 0; i < balance; i++) {
            const tokenId = await contract.tokensOfOwner(await window.ethereum.selectedAddress, i); // Replace with the correct method
            const uri = await contract.uri(tokenId);
            tokenIds.push({ tokenId, uri });
        }

        setNFTs(tokenIds);
    };

    useEffect(() => {
        fetchNFTs();
    }, []);

    return (
        <div>
            <h2 className="text-lg font-bold">Your NFTs</h2>
            <ul className="mt-4">
                {nfts.map((nft, index) => (
                    <li key={index} className="border p-2 mt-2">
                        Token ID: {nft.tokenId}, Metadata URI: {nft.uri}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DisplayNFTs;