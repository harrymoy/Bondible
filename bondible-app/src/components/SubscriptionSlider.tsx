import { useState } from 'react'
import { Slider, Typography, Grid, Input, makeStyles, createStyles, Theme, Button } from '@material-ui/core'
import { subscribeToBondHelper } from '../helpers/BondFactoryHelper';
import ApproveButton from './ApprovalButton';

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
    submit: {
      width: '30%',
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '14px 20px',
      margin: '8px 0',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '2rem'
    }
  })
);
interface subscriptionSlider {
  maxSubscription: number,
  currentMaxSubscription?: number,
  contractAddress?: string,
  bondId: number
}

const SubscriptionSlider = (props: subscriptionSlider) => {
  const classes = useStyles()
  const [subscriptionAmount, setSubscriptionAmount] = useState<number>(0)

  const handleSliderChange = (event: React.ChangeEvent<{}>,
    newValue: number,
  ) => {
    setSubscriptionAmount(newValue)
  }

  const handleInputChange = (event: any) => {
    setSubscriptionAmount(parseInt(event.target.value))
  }

  console.log("Contract address", props.contractAddress!)

  const handleMinMax = () => {
    if (subscriptionAmount < 0) {
      setSubscriptionAmount(0)
    }
  }

  const subscribeToBond = async (bondId: number, amount: number) => {
    await subscribeToBondHelper(bondId, amount!);
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
              onChange={() => (handleSliderChange)}
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
        <ApproveButton contractAddress={props.contractAddress!} amount={subscriptionAmount} />
        <Button className={classes.submit} variant='contained' onClick={() => (subscribeToBond(props.bondId!, subscriptionAmount))}>Subscribe</Button>
      </div>
    </div>
  )
}

export default SubscriptionSlider
