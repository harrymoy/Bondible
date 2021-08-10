import React from 'react'
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Logo from '../images/bondibleSmall.png'

const useStyles = makeStyles((theme) => ({
  root: {
    displayFlex: 1,
  },
  img: {
    maxHeight: '100%',
    maxWidth: '100%'
  },
  toolbar: {
    height: 80,
    backgroundColor: '#1F1B24'
  },
  hover: {
    cursor: 'pointer'
  }
}))

const MenuAppBar: React.FC = (): any => {
  const classes = useStyles()

  return (
    <div className={classes.toolbar}>
      <AppBar className={classes.toolbar} position="static">
        <Toolbar>
        <img 
          className={classes.img} 
          src={Logo} 
          alt="Bondible Logo"
        />
        <IconButton
            edge="end"
            aria-label="MetaMask"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default MenuAppBar
