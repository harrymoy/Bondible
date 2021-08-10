import React, { createRef, Component } from 'react'
import { useState } from 'react'
import ConnectBondFactory from '../helpers/ConnectBondFactory'
import { Contract } from 'ethers'
interface bondData {
  contractAddress: string
  walletAddress?: string
}

function BondForm(props: bondData) {
  const [subscriptionValue, setSubscriptionValue] = useState<string>('')
  const [rateValue, setRateValue] = useState<string>('')
  const [descriptionValue, setDescriptionValue] = useState<string>('')

  async function issueBond() {
    console.log('Creating bond')
    console.log('The max subscription is: ', subscriptionValue)
    console.log('The rate is: ', rateValue)
    console.log('The description is: ', descriptionValue)
    const bondFactoryContract: Contract = ConnectBondFactory(
      props.contractAddress,
    )

    bondFactoryContract.issueBond(rateValue!, subscriptionValue!)
    bondFactoryContract.once('IssueBond', (_bondId) => {
      const bondInfo: {} = {
        bondId: parseInt(_bondId),
        maxSubscription: subscriptionValue,
        rate: rateValue,
      }
      console.log(bondInfo)
    })
  }

  return (
    <form>
      <label>Total Subscription Value</label>
      <input
        name="subscription"
        id="subscription"
        type="number"
        value={subscriptionValue}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
          setSubscriptionValue(ev.target.value)
        }
        required
      />
      <label>Percentage Rate</label>
      <input
        name="rate"
        id="rate"
        type="number"
        value={rateValue}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
          setRateValue(ev.target.value)
        }
        required
      />
      <label>Description of Bond</label>
      <input
        name="description"
        id="description"
        type="text"
        value={descriptionValue}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
          setDescriptionValue(ev.target.value)
        }
        required
        placeholder="Enter a description about this bond"
      />
      <input type="button" title="Submit" onClick={issueBond} />
    </form>
  )
}

export default BondForm
