import React, { useEffect, useState } from 'react';
import { getContract } from '../utils/ethers';

const DisplayNFTs = () => {
    const [tokenId, setTokenID] = useState(0);
    // const [nfts, setNFTs] = useState([]);

    // const fetchNFTs = async () => {
    //     const contract = await getContract();
    //     const balance = await contract.balanceOf(await window.ethereum.selectedAddress);
    //     const tokenIds = []; // Array to hold tokenID and Metadata URI

    //     for (let i = 0; i < balance; i++) {
    //         const tokenId = await contract.tokensOfOwner(await window.ethereum.selectedAddress, i); // Replace with the correct method
    //         const uri = await contract.uri(tokenId);
    //         tokenIds.push({ tokenId, uri });
    //     }

    //     setNFTs(tokenIds);
    // };

    const fetchTokenID = async () => {
        const contract = await getContract();
        const tokenID = await contract.tokenIdCounter();

        setTokenID(tokenID);
    };

    useEffect(() => {
        // fetchNFTs();
        fetchTokenID();
    }, []);

    return (
        <div>
            <h2 className="text-lg font-bold">Your NFTs</h2>
            <ul className="mt-4">
                {/* {nfts.map((nft, index) => ( */}
                    <li className="border p-2 mt-2">
                        Token Counter: {tokenId}
                    </li>
                {/* ))} */}
            </ul>
        </div>
    );
};

export default DisplayNFTs;