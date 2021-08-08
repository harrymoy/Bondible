import React, { useState } from 'react'
import { Contract } from 'ethers'
import ConnectBondFactory from '../helpers/ConnectBondFactory'
import SubscribeBond from '../helpers/SubscribeBond'
import QueryBondData from '../helpers/QueryBondData'
import { Slider, Typography, Grid, Input, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
})
interface subscription {
  contractAddress: string
  maxSubscription: number
}

const Subscribe = (props: subscription) => {
  const classes = useStyles()
  const [bondId, setBondId] = useState<number>()
  const [subscriptionAmount, setSubscriptionAmount] = useState<number>(0)
  const [currentMaxSubscription, setCurrentMaxSubscription] = useState<number>(
    props.maxSubscription,
  )

  const handleSliderChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue: number,
  ) => {
    setSubscriptionAmount(newValue)
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSubscriptionAmount(parseInt(event.currentTarget.value))
  }

  const handleMinMax = () => {
    if (subscriptionAmount < 0) {
      setSubscriptionAmount(0)
    } else if (subscriptionAmount > props.maxSubscription) {
    }
  }

  const currentSubscriptionAmount = () => {
    const bondFactoryContract: Contract = ConnectBondFactory(
      props.contractAddress,
    )

    const bondStatus = QueryBondData(bondId!, bondFactoryContract)

    console.log(bondStatus)
  }

  const subscribeToBond = () => {
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
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        Volume
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={
              typeof setSubscriptionAmount === 'number'
                ? setSubscriptionAmount
                : 0
            }
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={setSubscriptionAmount}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleMinMax}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}
