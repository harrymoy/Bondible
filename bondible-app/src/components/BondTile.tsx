import React from "react";
import {Button} from "@material-ui/core";
import Subscribe from "./Subscribe";
import { useState } from "react";

interface BondTileProps {
    bondAddress?: string;
    bondId?: number;
    maxSubscription?: number;
    rate?: number;
    currentBalance?: number;
    userWallet: string;
}

const BondTile = (props: BondTileProps) => {
    const [shouldShowSubscribe, setShowSubscribe] = useState<boolean>(false);

    return(

        <div className='bondTile'>
            <ul>
                <li>{props.bondAddress}</li>
                <li>{props.bondId}</li>
                <li>{props.maxSubscription}</li>
                <li>{props.currentBalance}</li>
                <li>{props.rate}</li>
            </ul>
            <Button variant='contained' onClick={():void => setShowSubscribe(true) }>Subscribe</Button>
            {shouldShowSubscribe && (
                <>
                {!props.bondAddress ? (
                    <div className='error'>
                        <p>Bond not available</p>
                    </div>
                ) : (
                    <Subscribe contractAddress={props.bondAddress!} maxSubscription={props.maxSubscription!} />
                )}
                </>
            )}
        </div>
    )
}

export default BondTile;