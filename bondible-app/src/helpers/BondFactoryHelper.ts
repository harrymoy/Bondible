import { ethers } from 'ethers';
import BondFactory from '../abis/contracts/BondFactory.sol/BondFactory.json';

declare let window: any;

const contractAddress = "0xdE08633aBb017FAfbc43fd1fBf9CA8BC661fc688";

const connectContract = async (contractAddress: string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    var bondFactoryContract = new ethers.Contract(
            contractAddress,
            BondFactory,
            signer,
          )
        
    return bondFactoryContract
}

const issueBondHelper = async (rate: number, amount: number) => {
    const bondFactoryContract = await connectContract(contractAddress);
    const issueBondResult = await bondFactoryContract.issueBond(rate, amount);
    console.log("Bond result is", issueBondResult);
    return issueBondResult;
}

const subscribeToBondHelper = async (bondId: number, amount: number) => {
    const bondFactoryContract = await connectContract(contractAddress);
    const subscribeToBondResult = await bondFactoryContract.subscribeToBond(bondId, amount);
    console.log("subscription result is", subscribeToBondResult);
    return subscribeToBondResult;
}

export {issueBondHelper, subscribeToBondHelper};

