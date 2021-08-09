import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Header from '../components/Header'
import { Footer } from '../components/Footer'
import { useHistory } from 'react-router-dom'
import { firebaseAuth } from '../firebase'
import axios from 'axios'
import { API_URL } from '../CONSTANT'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paperStyle: {
    padding: 20,
    height: 'auto',
    width: '45%',
    margin: '5% auto',
    marginTop: '7%'
  },
  container: {
    backgroundColor: 'white',
    border: '1px solid lightgrey',
    padding: 20
  },
  logo: {
    maxWidth: '60%',
    maxHeight: '100%'
  },
  formControl: {
    width: '100%',
    marginTop: '16px'
  },
  typography: {
    marginTop: 40
  },
  button: {
    margin: theme.spacing(5, 0, 5),
    width: '50%',
    textTransform: 'none',
    fontSize: 18,
    color: 'white',
    backgroundColor: '#000A52'
  }
}))

function PaymentPage () {
  const classes = useStyles()
  const [card, setCard] = React.useState('')
  const urlParams = new URLSearchParams(window.location.search)
  const myParam = urlParams.get('id')
  const currentUser = firebaseAuth.currentUser;
  const [cardData, setCardData] = React.useState({
    id: currentUser.uid,
    userEmail: currentUser.email,
    firstName: currentUser.displayName,
    projectId:myParam
  } )
  const history = useHistory();
  const handleCard = event => {
    setCard(event.target.value)
  }



  const handleCardData = (event, value) => {
    setCardData({
      ...cardData,
      [value]:event.target.value
    })
  }

  const handleSubmit =()=>{
    axios.post(`${API_URL}/invest`, {
      data: cardData
    }).then(()=>history.push('/payment-done'))
  }

  return (
    <React.Fragment>
      <Header />

      <Paper elevation={10} className={classes.paperStyle}>
        <Container className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography
                align='left'
                variant='h5'
                gutterBottom
                style={{ marginTop: '15px', marginLeft: '15px' }}
              >
                Payment Details
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <img
                align='right'
                src='https://www.choicevs.com/wp-content/uploads/2018/09/Credit-Cards-1024x256.jpg'
                className={classes.logo}
                alt='card'
              />
            </Grid>
          </Grid>
        </Container>

        <Grid container spacing={3} style={{ marginTop: '2%' }}>
          <Grid item xs={12} md={6}>
            <FormControl align='center' className={classes.formControl}>
              <Select value={card} displayEmpty onChange={handleCard}>
                <MenuItem value='' disabled>
                  --- Select card type ---
                </MenuItem>
                <MenuItem value={1}>Visa</MenuItem>
                <MenuItem value={2}>Mastercard</MenuItem>
                <MenuItem value={3}>American Express</MenuItem>
                <MenuItem value={4}>Discover</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              required
              id='cardNumber'
              label='Card number'
              fullWidth
              autoComplete='cc-number'
              onChange={e => handleCardData(e, 'cardNumber')}
            />
          </Grid>
          <Grid item xs={12} md={6} style={{ marginTop: '2%' }}>
            <TextField
              required
              id='cardHolder'
              label='Card Holder'
              fullWidth
              autoComplete='cc-name'
              onChange={e => handleCardData(e, 'cardHolder')}
            />
          </Grid>

          <Grid item xs={12} md={6} style={{ marginTop: '2%' }}>
            <TextField
              required
              id='email'
              label='E-mail'
              fullWidth
              autoComplete='cc-email'
              onChange={e => handleCardData(e, 'email')}
            />
          </Grid>
          <Grid item xs={12} md={6} style={{ marginTop: '2%' }}>
            <form noValidate align='left' className={classes.formControl}>
              <TextField
                id='date'
                required
                label='Expiry Date'
                type='date'
                views={['year', 'month']}
                format='MM/yyyy'
                onChange={e => handleCardData(e, 'expiryDate')}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </form>
          </Grid>

          <Grid item xs={12} md={6} style={{ marginTop: '2%' }}>
            <TextField
              required
              id='cvv'
              label='CVV'
              onChange={e => handleCardData(e, 'cvv')}
              helperText='Last three digits on signature strip'
              fullWidth
              autoComplete='cc-csc'
            />
          </Grid>
          <Grid item xs={6} style={{ marginLeft: '25%' }}>
            <Typography
              style={{ marginBottom: 5 }}
              className={classes.typography}
            >
              How much would you like to donate?
            </Typography>
            <FormControl className={classes.formControl} variant='outlined'>
              <InputLabel>Amount</InputLabel>
              <OutlinedInput
                type='number'
                onChange={e => handleCardData(e, 'investment')}
                startAdornment={
                  <InputAdornment position='start'>Rs.</InputAdornment>
                }
                endAdornment={
                  <InputAdornment position='end'>PKR</InputAdornment>
                }
                labelWidth={60}
              />
            </FormControl>
          </Grid>

          <Grid container spacing={0}>
            <Grid item xs={12} md={4}>
              <Button 
              onClick={handleSubmit}
              className={classes.button}>Pay</Button>
            </Grid>

            <Grid item xs={12} md={4}>
              <Button 
                onClick={()=>{
                  history.goBack()
                }}
              className={classes.button}>Cancel</Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Footer />
    </React.Fragment>
  )
}

export { PaymentPage }
