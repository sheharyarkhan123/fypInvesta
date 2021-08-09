import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import * as yup from 'yup'
import { useFormik } from 'formik'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import mainlogo from '../Images/Vlogo.png'
import { firebaseAuth } from '../firebase'
import { Redirect, useHistory, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getAuthState } from '../actions'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paperStyle: {
    padding: 30,
    height: '60vh',
    width: '40%',
    margin: '30px auto'
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logo: {
    maxWidth: '20%'
  },
  form: {
    width: '350px',
    marginTop: theme.spacing(1),
    align: 'center'
  },
  facebook: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#3B579D',
    textTransform: 'none',
    fontSize: 17
  },
  signin: {
    margin: theme.spacing(3, 0, 2),
    textTransform: 'none',
    fontSize: 25
  },
  title: {
    flexGrow: 1
  },

  container: {
    display: 'flex',
    alignItems: 'center'
  },
  border: {
    borderBottom: '2px solid lightgray',
    width: '100%'
  },
  content: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    fontWeight: 50,
    fontSize: 20
  }
}))

const theme2 = createTheme({
  typography: {
    h3: {
      fontSize: 42,
      marginTop: -40
    }
  },
  palette: {
    primary: {
      main: '#000A52'
    }
  }
})

// YUP Validation
const validationSchema = yup.object({
  email: yup
    .string()
    .email()
    .required('email is required'),
  password: yup
    .string()
    .min(2, 'Address should be of minimum 3 characters length')
    .required()
})

function Signin (props) {
  const classes = useStyles()
  const history = useHistory()
  const [isLoading, setLoading] = React.useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      setLoading(true)
      firebaseAuth
        .signInWithEmailAndPassword(values.email, values.password)
        .then(() => props.getAuthState())
        .then(() => history.push('/loading'))
        .catch(e => {
          alert(e)
          setLoading(false)
        })
    }
  })

  if (firebaseAuth.currentUser)
   return <Redirect to={'/loading'} />
  return (
    <div>
      <nav className={classes.root}>
        <AppBar position='fixed' color='default'>
          <Toolbar>
            <Link to='/'>
              <img
                className={classes.logo}
                src={mainlogo}
                alt='Investa'
                style={{ margin: '20px 0px 20px', padding: '5px' }}
              />
            </Link>

            <ThemeProvider theme={theme2}>
              <Toolbar style={{ flexGrow: 1 }}>
                <Typography
                  variant='body2'
                  className={classes.title}
                  align='right'
                >
                  Don't have an account? <Link to='/signup'>Sign up</Link>
                </Typography>
              </Toolbar>
            </ThemeProvider>
          </Toolbar>
        </AppBar>
      </nav>
      <Grid>
        <Paper
          elevation={10}
          className={classes.paperStyle}
          style={{ marginTop: 150 }}
        >
          <div className={classes.paper}>
            <ThemeProvider theme={theme2}>
              <Typography component='h1' variant='h3'>
                <b>Sign in</b>
              </Typography>
            </ThemeProvider>
          </div>
          <Divider style={{ margin: '20px 0px 0px' }} />
          <div className={classes.paper}>
            <Grid>
              <form className={classes.form} noValidate>
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  autoFocus
                />
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  id='password'
                  autoComplete='current-password'
                />
              </form>
            </Grid>
            <ThemeProvider theme={theme2}>
              <Button
                variant='outlined'
                color='primary'
                type='submit'
                fullWidth
                className={classes.signin}
                size='large'
                style={{
                  maxWidth: '52%',
                  maxHeight: '80px',
                  margin: '40px 0px 40px',
                  padding: '16px'
                }}
                onClick={formik.handleSubmit}
                disabled={isLoading}
              >
                <b>Sign In to Investa</b>
              </Button>
            </ThemeProvider>
          </div>
          <Divider style={{ margin: '0px 0px 20px' }} />
          <ThemeProvider theme={theme2}>
            <Box>
              <Link to='/' variant='body1'>
                {'Forgot your password?'}
              </Link>
            </Box>
          </ThemeProvider>
        </Paper>
      </Grid>
    </div>
  )
}

Signin.propTypes = {
  auth: PropTypes.object.isRequired,
  getAuthState: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default compose(connect(mapStateToProps, { getAuthState })(Signin))
