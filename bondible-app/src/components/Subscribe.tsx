import React, { useState } from 'react'
import { Contract } from 'ethers'
import ConnectBondFactory from '../helpers/ConnectBondFactory'
import SubscribeBond from '../helpers/SubscribeBond'

interface subscription {
  contractAddress: string
}
const Subscribe = (props: subscription) => {
  const [bondId, setBondId] = useState<number>()
  const [subscriptionAmount, setSubscriptionAmount] = useState<number>()

  function subscribeToBond() {
    const bondFactoryContract: Contract = ConnectBondFactory(
      props.contractAddress,
    )

    SubscribeBond(bondId!, subscriptionAmount!, bondFactoryContract)
  }

  /** TO DO:
   * CREATE A PANEL WITH SLIDER WHICH SETS SUBSCRIPTION AMOUNT
   * BOND ID NEEDS TO BE MAPPED TO AN ACTUAL NAME OF SOME SORT, MAYBE COMPANY
   * STYLE OF PANEL NEEDS TO BE DONE
   * NEED TO IMPLEMENT PAGES:
   * HOME PAGE (HANDSHAKE IDEA
   * CREATE BOND PAGE
   * VIEW BONDS TO SUBSCRIBE TO PAGE WITH THIS COMPONENT AS A POP UP
   * */

  return (
    <div>
      <div>Panel Header</div>
      <div>Panel Body</div>
      <div>Panel Footer</div>
    </div>
  )
}
