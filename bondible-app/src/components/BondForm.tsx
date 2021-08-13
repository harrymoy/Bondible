import React, { createRef, Component } from 'react'
import { useState } from 'react'
import CreateBond from '../helpers/CreateBond'
import ConnectBondFactory from '../helpers/ConnectBondFactory'
import { Contract } from 'ethers'
import { makeStyles, createStyles, Theme, FormControl, FormHelperText } from '@material-ui/core'

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

  async function issueBond() {
    console.log('Creating bond')
    console.log('The max subscription is: ', subscriptionValue)
    console.log('The rate is: ', rateValue)
    console.log('The description is: ', descriptionValue)
    const bondFactoryContract: Contract = ConnectBondFactory(
      props.contractAddress,
    )
    console.log(bondFactoryContract)
    CreateBond(
      parseInt(rateValue!),
      parseInt(subscriptionValue!),
      bondFactoryContract,
    )
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
        <input className={classes.submit} onClick={issueBond} type="submit" value="Submit"/>
      </div>
    </div>
  )
}

export default BondForm