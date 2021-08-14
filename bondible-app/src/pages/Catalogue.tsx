import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { Contract } from 'ethers'
import ConnectBondFactory from '../helpers/ConnectBondFactory'
import BondTile from '../components/BondTile'
import { getUserWalletAddress } from '../helpers/ConnectMetaMask'

const useStyles = makeStyles((theme: Theme) => {
  createStyles({
  })  
})

interface catalogue {
    contractAddress: string
}

const Catalogue = (props: catalogue) => {

    //const getBondData = () => {
    //   const bondFactoryContract: Contract = ConnectBondFactory(props.contractAddress)

     //   bondFactoryContract.queryBondData()
    //}

    return(
        <div>
            <div>

            </div>
            <header>

            </header>
            <body>
            </body>
            <footer>

            </footer>
        </div>

    )
}

export default Catalogue