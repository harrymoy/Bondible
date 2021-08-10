import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import homePage from '../images/homePage.png'

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },
  });

  const MainPage: React.FC = (): any => {
    const handleOnClick = (event: React.MouseEvent<HTMLAreaElement, MouseEvent>) => {
        event.preventDefault();
        console.log("You have clicked in the specified area")
    }

    // MAP WORKS, LINK TO ANOTHER PAGE NEEDS TO BE DONE - REACT ROUTER????

    return (
        <div>
          <img src={homePage} alt="Home Page" useMap="#map"></img>
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