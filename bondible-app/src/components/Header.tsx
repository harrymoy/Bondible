import React from 'react'
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Logo from '../images/bondibleSmall.png'
import {getUserWalletAddress, getUserChainId} from '../helpers/ConnectMetaMask'

const useStyles = makeStyles((theme) => ({
  img: {
    maxHeight: '100%',
    maxWidth: '100%'
  },
  toolbar: {
    height: 80,
    backgroundColor: '#1F1B24',
    position: 'fixed'
  },
  icon: {
    align: 'right !important',
    right: '30px',
    position: 'absolute'
  }  
}))

const callMetamask = async () => {
  var wallet = await getUserWalletAddress();
  var chainId = await getUserChainId();
  return {wallet, chainId};
}

const MenuAppBar = () => {
  const classes = useStyles()

  return (
    <div>
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
