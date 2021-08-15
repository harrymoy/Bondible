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
    bondId: string
}
const Catalogue = (props: catalogue) => {
    const rootClasses = rootStyles();
    const classes = useStyles();

    const [userWallet, setUserWallet] = useState<string>('')
    const [companyData, setCompanyData] = useState<CompanyData[]>([])
    
    useEffect(() => {
        const wallet = getUserWalletAddress()
        setUserWallet(wallet.toString())
    //   const bondInfoString = JSON.stringify(bondInfo)
    //     setCompanyData(JSON.parse(bondInfoString))
        setCompanyData(bondInfo)
    },[])

    // const createArray = (obj: CompanyDataHolder) => {
    //     if(obj){
    //         var array = []
    //         for(const bondId in obj){
    //             array.push("{" + obj[bondId].companyName + "," + obj[bondId].companyBlurb + "," + obj[bondId].bondDescription + "}")
    //             return array
    //         }
    //     }
    // }


    const getBonds = () => {
        if (companyData){
            const bonds = companyData.map((company) => {
                return(
                    <div>
                        <div>
                            {company.bondId}
                        </div>
                        <header>
                            <Typography variant="h3" component="h3">
                                {company.companyName}
                            </Typography>
                        </header>
                        <div>
                            <Paper 
                                elevation={1}
                                square={false}
                            >            
                                <BondTile
                                    userWallet={userWallet}
                                    bondDescription={company.bondDescription}
                                    companyBlurb={company.companyBlurb}
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

    return(
        <div>
            {getBonds()}
        </div>

    )
}

export default Catalogue