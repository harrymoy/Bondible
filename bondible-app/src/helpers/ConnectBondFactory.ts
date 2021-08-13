import { ethers, Contract } from 'ethers'
import BondFactory from '../abis/contracts/BondFactory.sol/BondFactory.json'
import { getUserWalletAddress } from './ConnectMetaMask'

const ConnectBondFactory = (contractAddress: string): Contract => {
  getUserWalletAddress()
  const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
  const signer = provider.getSigner()
  var bondFactoryContract = new ethers.Contract(
    contractAddress,
    BondFactory,
    signer,
  )

  return bondFactoryContract
}

export default ConnectBondFactory
