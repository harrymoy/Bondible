import { Contract } from 'ethers'

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
        console.log(msgSender)
        console.log(subscriptionValue)
      },
    ),
  )
  return 0
}

export default SubscribeToBond
