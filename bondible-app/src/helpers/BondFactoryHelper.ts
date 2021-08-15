import { ethers } from 'ethers';
import BondFactory from '../abis/contracts/BondFactory.sol/BondFactory.json';

declare let window: any;

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

const issueBondHelper = async (contractAddress: string, rate: number, amount: number) => {
    const bondFactoryContract = await connectContract(contractAddress);
    const issueBondResult = await bondFactoryContract.issueBond(rate, amount);
    console.log("Bond result is", issueBondResult);
    return issueBondResult;
}

export {issueBondHelper};

