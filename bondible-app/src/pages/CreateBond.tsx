import { useEffect } from 'react';
import { useAppSelector } from '../app/hooks';
import BondForm from '../components/BondForm'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import BackButton from '../components/BackButton';
import Certificate from '../components/Certificate';
import { selectIsSubmitted } from '../helpers/isSubmittedSlice';
import SubmitButton from '../components/SubmitButton';

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

  const isSubmitted = useAppSelector(selectIsSubmitted)

  useEffect(() => {
    document.title = "Create a bond";
  })

  return (
    <div className={classes.root}>
      {isSubmitted && (
        <>
          <Certificate />
          <SubmitButton />
        </>
      )}
      {!isSubmitted && (
        <>
          <BackButton />
          <Paper
            className={classes.form}
            elevation={1}
            square={false}
          >
            <Typography variant="h1" component="h3">
              Create a Bond
            </Typography>
            <BondForm />
          </Paper>
        </>
      )}
    </div>
  );
}


export default CreateBond;