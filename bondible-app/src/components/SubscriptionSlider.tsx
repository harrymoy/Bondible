import React, { useState } from 'react'
import { Contract } from 'ethers'
import ConnectBondFactory from '../helpers/ConnectBondFactory'
import SubscribeBond from '../helpers/SubscribeBond'
import { Slider, Typography, Grid, Input, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
})
interface subscriptionSlider {
  maxSubscription: number,
  currentMaxSubscription?: number
}

const SubscriptionSlider = (props: subscriptionSlider) => {
  const classes = useStyles()
  const [bondId, setBondId] = useState<number>(1)
  const [subscriptionAmount, setSubscriptionAmount] = useState<number | number[]>(0)

  const handleSliderChange = (event: React.ChangeEvent<{}>,
    newValue: number | number[],
  ) => {
    setSubscriptionAmount(newValue)
  }

  const handleInputChange = (event: any) => {
    setSubscriptionAmount(parseInt(event.target.value))
  }

  const handleMinMax = () => {
    if (subscriptionAmount < 0) {
      setSubscriptionAmount(0)
    }
  }

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        Subscribe to bond.
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={subscriptionAmount}
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

export default SubscriptionSlider
