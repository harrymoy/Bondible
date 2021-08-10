import React, { useState, useEffect } from "react";
import { Contract } from "ethers";
import ConnectBondFactory from "../helpers/ConnectBondFactory";
import { Slider, Typography, Grid, Input, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});
interface subscription {
  contractAddress: string;
  maxSubscription: number;
  bondId: number;
}

const SubscribeSlider = (props: subscription) => {
  const classes = useStyles();
  const [subscriptionAmount, setSubscriptionAmount] = useState<number | number[]>(0);
  const [currentMaxSubscription, setCurrentMaxSubscription] = useState<number>(props.maxSubscription);
  const [currentBalance, setCurrentBalance] = useState<number>(0);
  const [currentRate, setCurrentRate] = useState<number>(0);
  const [maxPossibleSubscription, setMaxPossibleSubscription] = useState<number>(100);

  const handleSliderChange = (event: React.ChangeEvent<{}>, newValue: number | number[]) => {
    setSubscriptionAmount(newValue);
  };

  const handleInputChange = (event: any) => {
    setSubscriptionAmount(parseInt(event.target.value));
  };

  const handleMinMax = () => {
    if (subscriptionAmount < 0) {
      setSubscriptionAmount(0);
    }// else if (subscriptionAmount > maxPossibleSubscription) {
      //setSubscriptionAmount(maxPossibleSubscription)
   //}
  };

  const currentSubscriptionAmount = () => {
    //bondFactoryContract.queryBondData(props.bondId)
    /**bondFactoryContract.once(
      "BondQuery",
      (bondCurrentBalance, bondMaxSubscription, bondCurrentRate) => {
        setCurrentBalance(bondCurrentBalance)
        setCurrentMaxSubscription(bondMaxSubscription)
        setCurrentRate(bondCurrentRate)
        setMaxPossibleSubscription(currentMaxSubscription - currentBalance)
      }
    );*/
  };

  useEffect(() => {
    currentSubscriptionAmount();
  }, [])

  const subscribeToBond = () => {
    const bondFactoryContract: Contract = ConnectBondFactory(
      props.contractAddress
    );
    if (typeof subscriptionAmount === "number") {
      setSubscriptionAmount(10)
      bondFactoryContract.subscribeToBond(props.bondId!, subscriptionAmount!);
    }
  };

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
              max:{maxPossibleSubscription},
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
      <input type="button" title="Submit" onClick={subscribeToBond} />
    </div>
  );
};

export default SubscribeSlider;
