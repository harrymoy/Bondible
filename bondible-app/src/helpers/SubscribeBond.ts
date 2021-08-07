import { ethers, Contract } from 'ethers'
import BondFactory from '../../../Protocol/abis/contracts/BondFactory.sol/BondFactory.json'

const SubscribeToBond = (
  bondId: number,
  amount: number,
  bondFactoryContract: Contract,
): number => {
  bondFactoryContract.subscribeToBond(bondId, amount).then(
    bondFactoryContract.on(
      'SubscribedToBond',
      (_bondId, msgSender, subscriptionValue) => {
        const bondId: number = _bondId.toNumber()
        console.log(bondId)
        return bondId
      },
    ),
  )
  return 0
}

export default SubscribeToBond
