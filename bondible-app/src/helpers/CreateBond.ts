import { ethers } from 'ethers'
import BondFactory from '../abis/BondFactory.json'

const CreateBond = (rate: number, amount: number, contractAddress: string): number => {
  const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
  const signer = provider.getSigner()
  var bondFactoryContract = new ethers.Contract(
    contractAddress,
    BondFactory,
    signer,
  )
  bondFactoryContract.issueBond(rate, amount).then(
    bondFactoryContract.on('IssueBond', (_bondId) => {
      const bondId: number = _bondId.toNumber()
      console.log(bondId)
      return bondId;
    }),
  )
  return 0;
}

export default CreateBond