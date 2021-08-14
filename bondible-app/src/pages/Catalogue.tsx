import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Contract, Wallet } from 'ethers'
import ConnectBondFactory from '../helpers/ConnectBondFactory'
import BondTile from '../components/BondTile'
import { getUserWalletAddress } from '../helpers/ConnectMetaMask'
import rootStyles from '../helpers/rootStyles';
import bondInfo from '../helpers/bonds.json'

const useStyles = makeStyles((theme: Theme) => {
  createStyles({
  })  
})

interface catalogue {
    contractAddress: string
}


const Catalogue = (props: catalogue) => {
    const rootClasses = rootStyles();
    const classes = useStyles();

    const [userWallet, setUserWallet] = useState<string>('')

    useEffect(() => {
        const wallet = getUserWalletAddress()
        setUserWallet(wallet.toString())
    })


    /** 
     * 1. GRAB DATA FROM JSON FILE AND PASS INTO AN ARRAY - bonds.json
     * 2. USE array.map() TO RENDER TILE COMPONENT FOR AS MANY ITEMS IN ARRAY.
     * 3. QUERY BOND DATA FROM THIS FILE - CALL THE QUERY BOND FUNCTION AND CAPTURE MAXSUBSCRIPTION, CURRENTLY SUBSCRIBED
     * 4. CALCULATE THE CURRENT MAX SUBSCRIPTION AMOUNT AND PARSE THAT TO THE TILE COMPONENT, THE TILE COMPONENT THEN PARSES THAT TO THE SLIDER
     */
    
    //const getBondData = () => {
    //   const bondFactoryContract: Contract = ConnectBondFactory(props.contractAddress)

     //   bondFactoryContract.queryBondData()
    //}

    return(
        <div>
            <div>

            </div>
            <header>
                <Typography variant="h1" component="h3">
                    Bond 1
                </Typography>
            </header>
            <body>
                <Paper 
                    elevation={1}
                    square={false}
                >            
                    <BondTile
                        userWallet={userWallet}
                    />
                </Paper>
            </body>
            <footer>

            </footer>
        </div>

    )
}

export default Catalogue