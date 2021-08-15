import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import BondTile from '../components/BondTile'
import { getUserWalletAddress } from '../helpers/ConnectMetaMask'
import rootStyles from '../helpers/rootStyles';
import bondInfo from '../helpers/bonds.json'
import BackButton from '../components/BackButton'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
        maxWidth: "75%",
        margin: "0 auto"
    },
    catalogueTopbar: {},       
    catalogueHeader: {
        textAlign: "center",
        color: "white"
    },
    catalogueBody: {
        paddingTop: "10px"
    },
    catalogueFooter: {
        maxWidth: "75%",
        margin: "0 auto"
    },
    hide: {
        visibility: "hidden"
    },
  })  
);

interface catalogue {
    contractAddress: string
}

interface CompanyData {
    companyName: string
    companyBlurb: string
    bondDescription: string
    bondId: string
    contractAddress: string
}

const Catalogue = (props: catalogue) => {
    const classes = useStyles();
    const [userWallet, setUserWallet] = useState<string>('')
    const [companyData, setCompanyData] = useState<CompanyData[]>([])
    
    useEffect(() => {
        document.title = "Bond Catalogue";
        const wallet = getUserWalletAddress()
        setUserWallet(wallet.toString())
        setCompanyData(bondInfo)
        console.log("contract address");
    },[])

    const getBonds = () => {
        if (companyData) {
            const bonds = companyData.map((company) => {
                return(
                    <>
                        <div className={classes.hide}>
                            {company.bondId}
                        </div>
                        <header className={classes.catalogueHeader}>
                            <Typography variant="h3" component="h3">
                                {company.companyName}
                            </Typography>
                        </header>
                        <div className={classes.catalogueBody}>
                            <Paper
                                elevation={1}
                                square={false}
                            >            
                                <BondTile
                                    userWallet={userWallet}
                                    bondDescription={company.bondDescription}
                                    companyBlurb={company.companyBlurb}
                                    bondId={parseInt(company.bondId)}
                                    contractAddress={company.contractAddress}
                                />
                            </Paper>
                        </div>
                        <footer>
            
                        </footer>
                    </>
                )
            })
            return bonds
        } else {
            console.log("nothing")
        }
    }

    return(
        <div className={classes.root}>
            <BackButton/>
            {getBonds()}
        </div>
    )
}

export default Catalogue