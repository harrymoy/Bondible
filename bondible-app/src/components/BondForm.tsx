import React from 'react'
import { useState } from 'react'
import { makeStyles, createStyles, Theme, FormControl, FormHelperText } from '@material-ui/core'
import { issueBondHelper } from '../helpers/BondFactoryHelper'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '80%',
      margin: '0 auto',
      width: '-webkit-fill-available'
    },
    lastElement: {
      marginBottom: 50,
    },
    input: {
      width: '100%',
      border: '1px solid #ccc',
      borderRadius: 4,
      boxSizing: 'border-box',
      padding: '12px 20px'
    },
    required: {
      color: 'red'
    },
    submit: {
      width: '100%',
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '14px 20px',
      margin: '8px 0',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    }  
  })
);

interface bondData {
  contractAddress: string
  walletAddress?: string
}

const BondForm = (props: bondData) => {
  const classes = useStyles();

  const [subscriptionValue, setSubscriptionValue] = useState<string>('')
  const [rateValue, setRateValue] = useState<string>('')
  const [descriptionValue, setDescriptionValue] = useState<string>('')
  const [showMessage, setShowMessage] = useState<boolean>(false);

  async function issueBond() {
    if (subscriptionValue === '') {return false;}
    if (rateValue === '') {return false;}
    if (descriptionValue === '') {return false;}
    console.log('Creating bond')
    console.log('The max subscription is: ', subscriptionValue)
    console.log('The rate is: ', rateValue)
    console.log('The description is: ', descriptionValue)
    await issueBondHelper(props.contractAddress, parseInt(rateValue), parseInt(subscriptionValue));
  }

  return (
    <div>
      <br/>
      <h3>How much money would you like to raise from your bond?</h3>
      <div>
        <FormControl required={true} className={classes.root}>
          <input
            name="subscription"
            id="subscription"
            type="number"
            aria-describedby="requiredText"
            value={subscriptionValue}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setSubscriptionValue(ev.target.value)
            }
            className={classes.input}
            placeholder="Amount in DAI"
          />
          <FormHelperText className={classes.required} id="requiredText">* Required</FormHelperText>
        </FormControl>
        <span></span>
        <br/>
      </div>
      <h3>What return rate do you want to give subscribers?</h3>
      <div>
        <FormControl required={true} className={classes.root}>
          <input
            name="rate"
            id="rate"
            type="number"
            value={rateValue}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setRateValue(ev.target.value)
            }
            className={classes.input}
          />
          <FormHelperText className={classes.required} id="requiredText">* Required</FormHelperText>
        </FormControl>
        <span></span>
        <br/>
      </div>
      <h3>Bond description</h3>
      <div className={classes.lastElement}>
        <FormControl required={true} className={classes.root}>
          <input
            name="description"
            id="description"
            type="text"
            value={descriptionValue}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setDescriptionValue(ev.target.value)
            }
            placeholder="Enter a description about this bond"
            className={classes.input}
          />
          <FormHelperText className={classes.required} id="requiredText">* Required</FormHelperText>
        </FormControl>
        <span></span>
        <input className={classes.submit} onClick={issueBond} type="submit" value="Submit" onMouseEnter={() => setShowMessage(true)} onMouseLeave={() => setShowMessage(false)}/>
        {showMessage && (
          <div>
            Upon submitting, your bond will be created.
          </div>
        )}
        {subscriptionValue === '' && (
          <div style={{color: 'red'}}>
            Please enter a subscription amount for the bond.
          </div>
        )}
        {rateValue === '' && (
          <div style={{color: 'red'}}>
            Please enter a rate for the bond.
          </div>
        )}
        {descriptionValue === '' && (
          <div style={{color: 'red'}}>
            Please enter a description for the bond.
          </div>
        )}
      </div>
    </div>
  )
}

export default BondForm