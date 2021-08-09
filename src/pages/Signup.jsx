import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {
  createTheme,
  makeStyles,
  ThemeProvider
} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import mainlogo from '../Images/Vlogo.png'
import * as yup from 'yup'
import { useFormik } from 'formik'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { API_URL } from '../CONSTANT'
import axios from 'axios'
import { firebaseAuth } from '../firebase'
import { useHistory,Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAuthState } from '../actions'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    BackgroundCcolor: 'black'
  },
  paperStyle: {
    padding: 30,
    height: '80vh',
    width: '40%',
    margin: '30px auto'
  },
  logo: {
    maxWidth: '20%'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  signin: {
    margin: theme.spacing(3, 0, 2),
    textTransform: 'none',
    fontSize: 17
  },
  title: {
    flexGrow: 1
  },
  inputSection: {
    marginBottom: 30
  },
  formControl: {
    width: '100%'
  }
}))

const theme2 = createTheme({
  typography: {
    h3: {
      fontSize: 42,
      marginTop: -40
    },
    body2: {
      fontSize: 13
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
  firstName: yup
    .string()
    .min(2, 'First Name should be of minimum 2 characters length')
    .required('First Name is required'),
  lastName: yup
    .string()
    .min(2, 'Second should be of minimum 2 characters length')
    .required('Second Name is required'),
  email: yup
    .string()
    .email()
    .required('email is required'),
  password: yup
    .string()
    .min(2, 'Address should be of minimum 3 characters length')
    .required(),
  accountType: yup
    .string()
    .min(2, 'Number should be of minimum 3 number length')
})

function Signup (props) {
  const classes = useStyles()
  const [userType, setUserType] = React.useState('founder')
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      accountType: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      values.accountType = userType;
      axios
        .post(API_URL + '/signup', { data: values})
        .then(res => props.getAuthState())
        .then(res => {
          firebaseAuth.signInWithEmailAndPassword(values.email,values.password).then(()=>history.push('/loading'))
        })
        .catch(err => alert(err) )
    }
  })

  const handleChange = event => {
    setUserType(event.target.value)
  }
  const currentUser = firebaseAuth.currentUser;
  if(currentUser)
  return <Redirect to={'/'} />
  return (
    <div>
      <ThemeProvider theme={theme2}>
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
                    style={{ fontSize: 15 }}
                  >
                    Have an account? <Link to='/signin'>Sign in</Link>
                  </Typography>
                </Toolbar>
              </ThemeProvider>
            </Toolbar>
          </AppBar>
        </nav>
      </ThemeProvider>

      <Grid>
        <Paper
          elevation={10}
          className={classes.paperStyle}
          style={{ marginTop: 130 }}
        >
          <CssBaseline />
          <ThemeProvider>
            <div className={classes.paper}>
              <Box>
                <Typography
                  component='h1'
                  variant='h3'
                  style={{ marginBottom: 30, marginTop: -45, fontSize: 42 }}
                >
                  <b>Sign up</b>
                </Typography>
              </Box>
            </div>
          </ThemeProvider>
          <Divider style={{ marginBottom: 40 }} />
          <div>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
              <TextField
                autoComplete='fname'
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                className={classes.inputSection}
              />

              <TextField
                onChange={formik.handleChange}
                className={classes.inputSection}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
                styles={{ marginBottom: 30 }}
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
              />
              <TextField
                required
                label='Email'
                variant='outlined'
                id='email'
                name='email'
                onChange={formik.handleChange}
                className={classes.inputSection}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                fullWidth
              />

              <TextField
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                className={classes.inputSection}
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />

              <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel id='demo-simple-select-outlined-label'>
                  Account Type
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={userType}
                  onChange={handleChange}
                  label='Account Type'
                  required
                >
                  <MenuItem value='founder'>Founder</MenuItem>
                  <MenuItem value='invester'>Invester</MenuItem>
                </Select>
              </FormControl>

              <ThemeProvider theme={theme2}>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  fullWidth
                  className={classes.signin}
                  size='large'
                >
                  <b>Sign up</b>
                </Button>
              </ThemeProvider>
              <Divider style={{ marginBottom: 25 }} />
              <Typography variant='body2' style={{ fontSize: 13 }}>
                By continuing, you agree to the Investa <Link>terms</Link> and
                acknowledge receipt of our <Link>privacy policy</Link>.
              </Typography>
            </form>
          </div>
        </Paper>
      </Grid>
    </div>
  )
}
Signup.propTypes = {
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
export default connect(mapStateToProps, { getAuthState })(Signup)

