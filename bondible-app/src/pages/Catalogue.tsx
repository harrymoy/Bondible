import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Contract, Wallet } from 'ethers'
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

interface CompanyData {
    companyName: string
    companyBlurb: string
    bondDescription: string

}
const Catalogue = (props: catalogue) => {
    const rootClasses = rootStyles();
    const classes = useStyles();

    const [userWallet, setUserWallet] = useState<string>('')
    const [companyData, setCompanyData] = useState<CompanyData[] | Array<CompanyData>>()
    
    useEffect(() => {
        const wallet = getUserWalletAddress()
        setUserWallet(wallet.toString())
        console.log(bondInfo)
        //var resultArray = Object.keys(bondInfo).map(function(bondInfoName){
        //    let bond = bondInfo[bondInfoName];
            // do something with person
        //    return bond;
        //});
    
    },[])

    const getBonds = () => {
        console.log(companyData)
        console.log(companyData instanceof Object)
        if (companyData){
            const bonds = companyData.map((company, index) => {
                return(
                    <div>
                        <div>
            
                        </div>
                        <header>
                            <Typography variant="h3" component="h3">
                                {company.companyName[0]}
                            </Typography>
                        </header>
                        <div>
                            <Paper 
                                elevation={1}
                                square={false}
                            >            
                                <BondTile
                                    userWallet={userWallet}
                                />
                            </Paper>
                        </div>
                        <footer>
            
                        </footer>
                    </div>
                )
            })
            console.log(bonds)
            return bonds
        } else {
            console.log("nothing")
        }
    }

    /** 
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
            {getBonds()}
        </div>

    )
}

export default Catalogue