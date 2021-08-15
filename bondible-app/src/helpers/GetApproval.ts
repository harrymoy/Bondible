import { ethers } from "ethers";
import IERC20 from '../abis/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json';

declare let window: any;

const connectContract = async (contractAddress: string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log("Signer is: ", signer)
    var erc20Contract = new ethers.Contract(
            contractAddress,
            IERC20,
            signer,
          )
    console.log("contract is:", erc20Contract);
    return erc20Contract
}

const getApprovalToSpend = async (spender: string, amount: number) => { 
    if(window.ethereum) {
        const contractToCall = await connectContract("0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1");
        const approval = await contractToCall.approve(spender, amount);
        console.log("Approval given", approval);
        return approval;
    }
}
export default getApprovalToSpend;