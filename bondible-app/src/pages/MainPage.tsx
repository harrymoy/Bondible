import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import homePage from '../images/homePage.png'
import { Link } from "react-router-dom";
import { useEffect } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imgWrapper: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      width: 'auto'
    },
    img: {
      position: 'relative',
      marginTop: 50,
      maxWidth: '100%',
      height: "700 auto" 
    }
  })
);

const MainPage = () => {
  const classes = useStyles();

  //const handleOnClick = (event: React.MouseEvent<HTMLAreaElement, MouseEvent>): void => {
  //  if (!route.enabled) e.preventDefault();
  //}

  useEffect(() => {
    document.title = "Bondible";
  })

  return (
      <div className={classes.imgWrapper}>
        <img src={homePage} alt="Home Page" useMap="#map" className={classes.img}></img>
        <map name="map">
          <Link
            to="/bondform"
          >
            <area 
              shape="rect" 
              coords="76,14,162,449" 
              alt="Create" 
              href=""
            />
          </Link>
          <Link
            to="/browse"
          >
            <area
              shape="rect"
              coords="1207,13,1292,447"
              alt="Browse"
              href=""
            />
          </Link>
        </map>
      </div>
  )
}

export default MainPage