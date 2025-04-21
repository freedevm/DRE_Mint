import { ethers } from "ethers";
import DRE from "../artifacts/contracts/DRE.json"; // Ensure this path is correct

const CONTRACT_ADDRESS = "https://eth-mainnet.g.alchemy.com/v2/hra0WS7LQz4cQfdKoscbvfEFBDB54ELk"; // Replace with your deployed contract address

export const getContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, DRE.abi, signer);
    return contract;
};