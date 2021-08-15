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

interface CompanyDataHolder {
    [key: string]: CompanyData
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
    const [companyData, setCompanyData] = useState<{}>({})
    
    useEffect(() => {
        const wallet = getUserWalletAddress()
        setUserWallet(wallet.toString())

        const bondInfoString = JSON.stringify(bondInfo)
        setCompanyData(JSON.parse(bondInfoString))
    },[])

    const createArray = (obj: CompanyDataHolder) => {
        if(obj){
            var array = []
            for(const bondId in obj){
                array.push("{" + obj[bondId].companyName + "," + obj[bondId].companyBlurb + "," + obj[bondId].bondDescription + "}")
                return array
            }
        }
    }


    const getBonds = () => {
        const newArray = createArray(companyData)
        if (newArray){
            const bonds = newArray.map((company, index) => {
                return(
                    <div>
                        <div>
            
                        </div>
                        <header>
                            <Typography variant="h3" component="h3">
                                {company}
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