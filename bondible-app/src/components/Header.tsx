import React from 'react'
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}))

const MenuAppBar: React.FC = (): any => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Bondible
          </Typography>
          <IconButton
            edge="end"
            aria-label="MetaMask"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>{' '}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default MenuAppBar
