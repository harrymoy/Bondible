import React from 'react'
import {
  makeStyles,
  createStyles,
  AppBar,
  Toolbar,
  IconButton,
  Theme
} from '@material-ui/core'
import { NavLink } from "react-router-dom";
import AccountCircle from '@material-ui/icons/AccountCircle'
import Logo from '../images/bondibleSmall.png'
import {getUserWalletAddress, getUserChainId} from '../helpers/ConnectMetaMask'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      maxHeight: '100%',
      maxWidth: '63%',
    },
    anchor: {
      display: 'inline-block'
    },
    toolbar: {
      height: 80,
      backgroundColor: '#1F1B24',
      position: 'sticky',
      marginBottom: 40
    },
    icon: {
      align: 'right !important',
      right: '30px',
      position: 'absolute'
    }  
  }) 
)

const callMetamask = async () => {
  var wallet = await getUserWalletAddress();
  var chainId = await getUserChainId();
  return {wallet, chainId};
}

const MenuAppBar: React.FC = (): any => {
  const classes = useStyles()

  return (
    <div>
      <AppBar className={classes.toolbar} position="static">
        <Toolbar>
          <NavLink
            to="/"
            className={classes.anchor}
          >
            <img
              src={Logo} 
              alt="Bondible Logo"
              className={classes.img}
              />
          </NavLink>
          <IconButton
            edge="end"
            aria-label="MetaMask"
            aria-haspopup="true"
            color="inherit"
            className={classes.icon}
            onClick={() => {callMetamask()}}
          >
            <AccountCircle className={classes.icon}/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default MenuAppBar