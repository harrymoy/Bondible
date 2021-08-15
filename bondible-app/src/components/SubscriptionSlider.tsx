import React, { useState } from 'react'
import { Slider, Typography, Grid, Input, makeStyles, createStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
        maxWidth: "75%",
        margin: "0 auto"
    },
    sliderTopbar: {},       
    sliderHeader: {
        textAlign: "center",
        color: "white"
    },
    sliderBody: {
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto"
    },
    sliderFooter: {
        maxWidth: "75%",
        margin: "0 auto"
    },
    hide: {
        visibility: "hidden"
    },
  })  
);
interface subscriptionSlider {
  maxSubscription: number,
  currentMaxSubscription?: number,
  bondId: number
}

const SubscriptionSlider = (props: subscriptionSlider) => {
  const classes = useStyles()
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
    <div>
      <div>
      </div>
      <header>
        <Typography id="input-slider" gutterBottom>
          Subscribe to bond.
        </Typography>      
      </header>
      <div className={classes.sliderBody}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Slider
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
            />
          </Grid>
          <Grid item>
            <Input
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
    </div>
  )
}

export default SubscriptionSlider
