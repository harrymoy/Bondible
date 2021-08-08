import { Contract } from 'ethers'

const QueryBondData = (
  bondId: number,
  bondFactoryContract: Contract,
): Object => {
  const callContract = bondFactoryContract.queryBondData(bondId)
  const emitValues = callContract.then(
    bondFactoryContract.on(
      'BondQuery',
      (bondCurrentBalance, bondMaxSubscription, bondCurrentRate) => {
        const bondData = {
          currentBalance: bondCurrentBalance,
          maxSubscription: bondMaxSubscription,
          currentRate: bondCurrentRate,
        }
        console.log(bondCurrentBalance)
        console.log(bondMaxSubscription)
        console.log(bondCurrentRate)
        return bondData
      },
    ),
  )
  console.log(emitValues)
  return emitValues
}

export default QueryBondData
