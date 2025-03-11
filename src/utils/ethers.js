import { ethers } from "ethers";
import DRE from "../artifacts/contracts/DRE.json"; // Ensure this path is correct

const CONTRACT_ADDRESS = "https://sepolia.etherscan.io/address/0x7C2a827254B7a6b8dE57F1547409c8677188A1dd"; // Replace with your deployed contract address

export const getContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, DRE.abi, signer);
    return contract;
};