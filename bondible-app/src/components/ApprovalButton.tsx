import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { getUserWalletAddress } from "../helpers/ConnectMetaMask";
import getApprovalToSpend from "../helpers/GetApproval";
import bondInfo from '../helpers/bonds.json';

interface approvalButtonProps {
    contractAddress?: string;
    amount?: number;
}

interface CompanyData {
    companyName: string
    companyBlurb: string
    bondDescription: string
    bondId: string
    contractAddress: string
}

const ApproveButton = (props: approvalButtonProps) => {

    const [isShown, setIsShown] = useState<boolean>(false);
    const [address, setAddress] = useState<string>('');
    const getApproval = async () => {
        console.log("getting approval", props.contractAddress!);
        await getApprovalToSpend(bondInfo[0].contractAddress, props.amount!);
    }

    const fetchWallet = async () => {
        const walletAddress = await getUserWalletAddress();
        setAddress(walletAddress!);
        console.log("Wallet address", address);
    }

    useEffect(() => {
        fetchWallet();
    }, [address]);

    return(
        <div>
            <Button onClick={getApproval} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
                Approve Contract
            </Button>
            {isShown && (
                <div>
                    You need to approve for each subscribe.
                </div>
            )}
            {typeof(address) === 'undefined' &&(
                <div style={{color: 'red'}}>
                    Please connect to Metamask.
                </div>
            )}
        </div>
    )
}

export default ApproveButton;