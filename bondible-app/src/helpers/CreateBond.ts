import { Contract } from 'ethers'

const CreateBond = (
  rate: number,
  amount: number,
  bondFactoryContract: Contract,
): number => {
  bondFactoryContract.issueBond(rate, amount).then(
    bondFactoryContract.on('IssueBond', (_bondId) => {
      const bondId: number = _bondId.toNumber()
      console.log(bondId)
      return bondId
    }),
  )
  return 0
}

export default CreateBond
