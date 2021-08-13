import React from 'react';
import BondForm from '../components/BondForm'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import BackButton from '../components/BackButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        maxWidth: "75%",
        margin: "0 auto"
    },
    form: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(2),
        textAlign: 'center'
      }
  })
);

const CreateBond = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BackButton/>
      <Paper 
      className={classes.form} 
      elevation={1}
      square={false}
      >
        <Typography variant="h1" component="h3">
          Create a Bond
        </Typography>
        <BondForm
          contractAddress="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
        />
      </Paper>
    </div>
  );
}

export default CreateBond;