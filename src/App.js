import React from 'react';
import Mint from './components/Mint';
import DisplayNFTs from './components/DisplayNFTs';
import './index.css'; // Tailwind CSS

const App = () => {
    return (
        <div className="App p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6">NFT Minting DApp</h1>
            <Mint />
            {/* <DisplayNFTs /> */}
        </div>
    );
};

export default App;