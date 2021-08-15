import React from "react";
import {Button} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import SubscriptionSlider from "./SubscriptionSlider";
import { useState } from "react";


const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    bondTileTopbar: {
          padding: "20px",
          paddingTop: "30px",
          marginLeft: "20px"
    },
    bondTileHeader: {
        padding: "20px",
        marginLeft: "20px"
    },
    bondTileBody: {
        paddingTop: "10px",
        textAlign: "center",
        paddingBottom: "20px",
        marginLeft: "20px"
    }
  })
);
interface BondTileProps {
    bondAddress?: string;
    bondId: number;
    maxSubscription?: number;
    rate?: number;
    currentBalance?: number;
    userWallet: string;
    bondDescription: string;
    companyBlurb?: string;
    contractAddress?: string;
}

const BondTile = (props: BondTileProps) => {
    const classes = useStyles()
    const [shouldShowSubscribe, setShowSubscribe] = useState<boolean>(false);

    console.log("Contract address", props.contractAddress!)

    return(
        <div>
            <div className={classes.bondTileTopbar}>{props.companyBlurb}</div>
            <header id="bondTileHeader" className={classes.bondTileHeader}>{props.bondDescription}</header>
            <div id="bondTileBody" className={classes.bondTileBody}>
                <SubscriptionSlider bondId={props.bondId} maxSubscription={props.maxSubscription!} />
                {shouldShowSubscribe && (
                    <>
                    {!props.bondAddress ? (
                        <div className='error'>
                            <p>Bond not available</p>
                        </div>
                    ) : (
                        <SubscriptionSlider bondId={props.bondId} maxSubscription={props.maxSubscription!} contractAddress={props.contractAddress!} />
                    )}
                    </>
                )}
            </div>
            <footer id="footer"></footer>
        </div>    
    )
}

export default BondTile;