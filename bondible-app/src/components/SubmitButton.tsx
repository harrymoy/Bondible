import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import web3StorageHelper from '../helpers/Web3StorageHelper';
import { useAppSelector } from '../app/hooks';
import { getBondData } from '../helpers/bondDataSlice';
import Certificate from './Certificate';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        submit: {
            width: '30%',
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '14px 20px',
            margin: '8px 0',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: 70,
            position: 'relative',
            left: "35%"
        }
    })
);

const SubmitButton = () => {
    const bondDetails = useAppSelector(getBondData)
    const classes = useStyles();
    return (
        <button onClick={() => web3StorageHelper(bondDetails.company, <Certificate />)} className={classes.submit}>Upload Certificate to Filecoin</button>
    )
}

export default SubmitButton;