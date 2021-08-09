import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { Button, Grid } from '@material-ui/core'
import InputBase from '@material-ui/core/InputBase'
import { alpha, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAuthState } from '../actions'
import PropTypes from 'prop-types'
import { firebaseAuth } from '../firebase'
import mainlogo from '../Images/Vlogo.png'
const useStyles = makeStyles(theme => ({
  root: {
    padding: '10px 40px'
  },
  logo: {
    margin: 'auto',
    textAlign: 'center',
    maxWidth: '80%'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    margin: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: 'auto',
    width: 'auto',
    textTransform: 'none',
    fontSize: 16,
    color: '#333333'
  },
  menuButton: {
    textTransform: 'none'
  },

  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '7ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}))

function Header (props) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  console.log(props)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const history = useHistory()
  return (
    <AppBar position='fixed' color='white' elevation={6} className={classes.root}>
      <Toolbar>
        <Grid container direction='row' alignItems='center' justifyContent='center'>
          <Grid container direction='row' item xs={5}>
            <InputBase
              placeholder='Search'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              startAdornment={<SearchIcon />}
              inputProps={{ 'aria-label': 'search' }}
            />
            {props.userType === 'founder' ? (
              <React.Fragment></React.Fragment>
            ) : (
              <Link className={classes.button} to='/discover'>
                Discover
              </Link>
            )}
          </Grid>
          <Grid item xs={2}>
            <Link to='/'>
              <img
                src={mainlogo}
                className={classes.logo}
                alt='logo'
               
              />
            </Link>
          </Grid>
          <Grid container item justifyContent="flex-end" xs={5} >
            {firebaseAuth.currentUser === null ? (
              <Link className={classes.button} color='inherit' to='/signin'>
                <Button
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#000A52',
                    color: '#fff'
                  }}
                >
                  Sign in
                </Button>
              </Link>
            ) : (
              <Button
                className={classes.button}
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={handleClick}
              >
                {' '}
                <AccountCircleIcon
                  style={{ padding: 10 }}
                ></AccountCircleIcon>{' '}
                Account{' '}
              </Button>
            )}

            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link to='/dashboard' style={{ color: '#333333' }}>
                <MenuItem>Dashboard</MenuItem>
              </Link>

              <MenuItem
                onClick={() => {
                  firebaseAuth.signOut().then(() => {
                    handleClose()
                    props.getAuthState()
                    history.push('/')
                  })
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
Header.propTypes = {
  getAuthState: PropTypes.func.isRequired,
  auth: PropTypes.bool,
  user: PropTypes.object,
  userType: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  userType: state.userType
})
export default connect(mapStateToProps, { getAuthState })(Header)
