
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { ArrowBack } from '@material-ui/icons';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backButton: {
      maxWidth: "20rem",
      maxHeight: "10rem",
      borderRadius: "5px",
      border: "2px #1f1b24 solid",
      backgroundColor: "#34ced2",
    }
  })
);

const BackButton = () => {
    const classes = useStyles();
    return(
        <Link to="/"><button className={classes.backButton}>
          <ArrowBack style={{color:"#ffffff"}}/>
        </button>
      </Link>
    )
}

export default BackButton;