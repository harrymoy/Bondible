import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import homePage from '../images/homePage.png'

const useStyles = makeStyles({
    imgWrapper: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      width: 'auto'
    },
    img: {
      position: 'relative',
      top: '200px',
      maxWidth: '100%',
      height: 'auto'
    }
  });

const MainPage = () => {
  const classes = useStyles();

  const handleOnClick = (event: React.MouseEvent<HTMLAreaElement, MouseEvent>) => {
      event.preventDefault();
      console.log("You have clicked in the specified area")
  }

  return (
      <div className={classes.imgWrapper}>
        <img src={homePage} alt="Home Page" useMap="#map" className={classes.img}></img>
        <map name="map">
          <area 
            shape="rect" 
            coords="76,14,162,449" 
            alt="Create" 
            href=""
            onClick={handleOnClick}/>
          <area
            shape="rect"
            coords="1207,13,1292,447"
            alt="Browse"
            href=""/>
        </map>
      </div>
  )
}

export default MainPage