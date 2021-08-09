import React from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Header  from '../components/Header'
import { Footer } from '../components/Footer'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Paper from '@material-ui/core/Paper'
import {
  createTheme,
  makeStyles,
  ThemeProvider
} from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'
import LanguageIcon from '@material-ui/icons/Language'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import UpdateIcon from '@material-ui/icons/Update'
import {Link} from 'react-router-dom'
import LinearProgress from '@material-ui/core/LinearProgress'
import axios from 'axios'
import { API_URL } from '../CONSTANT'
import { CardMedia } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  media: {
    height: '50vh',
    marginRight: '30px'
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  button: {
    width: 'auto',
    textTransform: 'none',
    fontSize: 16
  }
}))

const theme = createTheme({
  palette: {
    primary: {
      main: '#02A95C'
    }
  }
})

function CardPage () {
  const classes = useStyles()
  const [startup, setStartUp] = React.useState();
  const [id, setStartUpId] = React.useState();
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const myParam = urlParams.get('start-up-id')
    setStartUpId(myParam)
    axios
      .post(API_URL + '/getStartup', {
        data: myParam,  
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(res => res.data)
      .then(doc => setStartUp(doc))
  }, [])

 if(!startup)
  return<h1>Loading....</h1>

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header />
        <Container maxWidth='lg'>
          <Typography
            variant='h4'
            align='left'
            style={{ padding: '10% 0% 2%', color: '#333333' }}
          >
            <b>{startup.title}</b>
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <Paper className={classes.media}>
              <CardMedia
              image={startup.imageURL}
              className={classes.media}
              ></CardMedia>
              </Paper>
              <Typography
                align='left'
                variant='body2'
                style={{ paddingTop: 20, marginBottom: 20, fontSize: 17 }}
              >
                {' '}
                <AccountCircleIcon
                  color='primary'
                  fontSize='large'
                  style={{ marginBottom: -10, marginRight: 10 }}
                ></AccountCircleIcon>
                {startup.city}
              </Typography>
              <Divider></Divider>
              <Typography
                align='left'
                variant='body2'
                style={{ paddingTop: 20, marginBottom: 20, fontSize: 17 }}
              >
                {' '}
                Created on
              </Typography>
              <Divider></Divider>
              <Typography
                align='left'
                variant='body2'
                style={{ margin: '25px 0px 25px', fontSize: 16 }}
              >
               {startup.story}
              </Typography>

              <Typography
                variant='h4'
                align='left'
                style={{ fontSize: 22, margin: '40px 0px 15px' }}
              >
                <b>Organizer</b>
              </Typography>

              <Divider></Divider>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    align='left'
                    variant='body2'
                    style={{
                      paddingTop: 20,
                      marginBottom: 5,
                      fontSize: 16,
                      color: '#333333'
                    }}
                  >
                    {' '}
                    <AccountCircleIcon
                      color='primary'
                      fontSize='large'
                      style={{ marginBottom: -13, marginRight: 10 }}
                    ></AccountCircleIcon>
                    {startup.userName}
                  </Typography>
                  <Typography
                    align='left'
                    variant='body2'
                    style={{
                      marginLeft: 45,
                      marginBottom: 5,
                      fontSize: 14,
                      color: '#333333'
                    }}
                  >
                    {' '}
                    Organizer
                  </Typography>
                  <Typography
                    align='left'
                    variant='body2'
                    style={{
                      marginLeft: 45,
                      marginBottom: 0,
                      fontSize: 14,
                      color: '#333333'
                    }}
                  >
                    {startup.city}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    className={classes.button}
                    style={{ margin: '40px 0px 0px 70%' }}
                    size='large'
                    align='right'
                    color='primary'
                    variant='outlined'
                  >
                    <b>Contact</b>
                  </Button>
                </Grid>
              </Grid>
            </Grid>


        {
            // Card
        }

            <Grid item xs={12} sm={4}>
              <Paper
                className={classes.paper}
                style={{ padding: 20 }}
                position='fixed'
                elevation={10}
              >
                <Typography
                  variant='body1'
                  align='left'
                  style={{ fontSize: 20, marginBottom: 20 }}
                >
                  Per Share Price: <b>PKR {startup.perSharePrice}</b>
                </Typography>
                <LinearProgress variant='determinate'></LinearProgress>
                <Link to={`/PaymentPage?id=${id}`}>
                <Button
                  className={classes.button}
                  variant='contained'
                  style={{
                    width: '100%',
                    padding: 10,
                    marginTop: 20,
                    backgroundColor: '#fdb72f'
                  }}
                >
                  
                  <b>Buy Now</b>{' '}
                </Button>
                </Link>
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={0} style={{ margin: '55px -40px 55px' }}>
            <Grid item sm={4}>
              <Card className={classes.root} elevation={0}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant='h3'
                    component='h2'
                    align='left'
                    style={{ fontSize: 17, color: '#333333', padding: 20 }}
                  >
                    <LanguageIcon
                      fontSize='large'
                      style={{
                        fontSize: 40,
                        marginBottom: -13,
                        marginRight: 15
                      }}
                    ></LanguageIcon>
                    <b>#1 fundraising platform</b>
                  </Typography>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                    align='left'
                    style={{ marginLeft: 75, fontSize: 17 }}
                  >
                    More people start Projects on Investa than on any other
                    platform. <Link href='/'> Learn more</Link>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item sm={4}>
              <Card className={classes.root} elevation={0}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant='h3'
                    component='h2'
                    align='left'
                    style={{ fontSize: 17, color: '#333333', padding: 20 }}
                  >
                    <CheckCircleIcon
                      fontSize='large'
                      style={{
                        fontSize: 40,
                        marginBottom: -13,
                        marginRight: 15
                      }}
                    ></CheckCircleIcon>
                    <b>Investa Guarantee</b>
                  </Typography>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                    align='left'
                    style={{ marginLeft: 75, fontSize: 17 }}
                  >
                    In the rare case something isn’t right, we will work with
                    you to determine if misuse occurred.{' '}
                    <Link href='/'> Learn more</Link>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item sm={4}>
              <Card className={classes.root} elevation={0}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant='h3'
                    component='h2'
                    align='left'
                    style={{ fontSize: 17, color: '#333333', padding: 20 }}
                  >
                    <UpdateIcon
                      fontSize='large'
                      style={{
                        fontSize: 40,
                        marginBottom: -13,
                        marginRight: 15
                      }}
                    ></UpdateIcon>
                    <b>Expert advice, 24/7</b>
                  </Typography>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                    align='left'
                    style={{ marginLeft: 75, fontSize: 17 }}
                  >
                    Contact us with your questions and we’ll answer, day or
                    night. <Link href='/'> Learn more</Link>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        <Footer />
      </ThemeProvider>
    </div>
  )
}

export { CardPage }
