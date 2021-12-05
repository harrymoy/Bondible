import { useState, useEffect } from 'react'
import { useAppDispatch } from '../app/hooks'
import { setTrue } from '../helpers/isSubmittedSlice'
import { setBondData } from '../helpers/bondDataSlice'
import { makeStyles, createStyles, Theme, FormControl, FormHelperText } from '@material-ui/core'
import { issueBondHelper } from '../helpers/BondFactoryHelper'
import { getWalletData } from '../helpers/ConnectMetaMask';

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

interface bondData {
  walletAddress?: string
}

const BondForm = (props: bondData) => {
  const classes = useStyles();
  const [subscriptionValue, setSubscriptionValue] = useState<number>(0);
  const [rateValue, setRateValue] = useState<number>(0);
  const [companyValue, setCompanyValue] = useState<string>('');
  const [descriptionValue, setDescriptionValue] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [isPolygon, setPolygon] = useState<boolean>(false);

  const dispatch = useAppDispatch()

  const handleBlankValue = (val: string) => {
    return val.trim() === '' ? 0 : parseInt(val);
  }

  const getChainId = async () => {
    const walletData = await getWalletData();
    console.log("Chain id is", walletData![1]);
    if (parseInt(walletData![1], 16) === 80001) {
      setPolygon(true);
    }
  }

  useEffect(() => {
    getChainId()
  }, [isPolygon])

  type BondObject = {
    amount: number;
    rate: number;
    company: string;
    description: string;
  }

  async function issueBond() {
    if (subscriptionValue <= 0) { return false; }
    if (rateValue <= 0) { return false; }
    if (descriptionValue === '') { return false; }

    const bondDataAction: BondObject = {
      amount: subscriptionValue,
      rate: rateValue,
      company: companyValue,
      description: descriptionValue
    }

    await getChainId();
    if (isPolygon) {
      setPolygon(true);
      try {
        await issueBondHelper(rateValue, subscriptionValue);
        dispatch(setTrue())
        dispatch(setBondData(bondDataAction))
      } catch (e) {
        console.log(e)
      }

    } else {
      return false;
    }
  }

  const displayRequiredStatus = (element: JSX.Element, value: Number) => {
    return value <= 0 && element
  }

  return (
    <div>
      <br />
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
              setSubscriptionValue(handleBlankValue(ev.target.value))
            }
            className={classes.input}
          />
          {displayRequiredStatus(
            <FormHelperText className={classes.required} id="requiredText">* Required</FormHelperText>,
            subscriptionValue
          )}
        </FormControl>
        <span></span>
        <br />
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
              setRateValue(handleBlankValue(ev.target.value))
            }
            className={classes.input}
          />
          {displayRequiredStatus(
            <FormHelperText className={classes.required} id="requiredText">* Required</FormHelperText>,
            rateValue
          )}
        </FormControl>
        <span></span>
        <br />
      </div>
      <h3>Company</h3>
      <div>
        <FormControl required={true} className={classes.root}>
          <input
            name="company"
            id="company"
            type="text"
            value={companyValue}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setCompanyValue(ev.target.value)
            }
            className={classes.input}
          />
          {
            companyValue.length < 1 && <FormHelperText className={classes.required} id="requiredText">* Required</FormHelperText>
          }
        </FormControl>
        <span></span>
        <br />
      </div>
      <h3>Bond Description</h3>
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
          {
            descriptionValue.length < 1 && <FormHelperText className={classes.required} id="requiredText">* Required</FormHelperText>
          }
        </FormControl>
        <span></span>
        <input className={classes.submit} onClick={issueBond} type="submit" value="Submit" onMouseEnter={() => setShowMessage(true)} onMouseLeave={() => setShowMessage(false)} />
        {showMessage && (
          <div>
            Upon submitting, your bond will be created.
          </div>
        )}
        {subscriptionValue === 0 && (
          <div style={{ color: 'red' }}>
            Please enter a subscription amount for the bond.
          </div>
        )}
        {rateValue === 0 && (
          <div style={{ color: 'red' }}>
            Please enter a rate for the bond.
          </div>
        )}
        {descriptionValue === '' && (
          <div style={{ color: 'red' }}>
            Please enter a description for the bond.
          </div>
        )}
        {!isPolygon && (
          <div style={{ color: 'red' }}>
            Please connect to Polygon.
          </div>
        )}
      </div>
    </div>
  )
}

export default BondForm