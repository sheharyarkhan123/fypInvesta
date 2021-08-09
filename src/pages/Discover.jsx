import React from 'react'
import Typography from '@material-ui/core/Typography'
import {
  makeStyles,
} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import  Header  from '../components/Header'
import { Footer } from '../components/Footer'
import Button from '@material-ui/core/Button'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import axios from 'axios'
import { API_URL } from '../CONSTANT'
import StartUpCard from '../components/StartupCard'

const useStyles = makeStyles({
  root: {
    maxWidth: 330
  },
  media: {
    height: 200
  },
  button: {
    width: 'auto',
    textTransform: 'none',
    fontSize: 18,
    color: '#666666',
    backgroundColor: '#fbf8f6'
  }
})


function Discover () {
  const classes = useStyles()
  const [startsUp, setStartsUp] = React.useState([])
  React.useEffect(() => {
    axios
      .get(API_URL + '/allStartups')
      .then(res => res.data)
      .then(doc => setStartsUp(doc))
  }, [])



  return (
    <div>
      <Header />
      <Container maxWidth='lg'>
        <Button
          to='/'
          className={classes.button}
          style={{ margin: '150px 0px 16px', marginRight: '82%' }}
        >
          {' '}
          <ChevronLeftIcon
            fontSize='medium'
            style={{ color: '#666666' }}
          ></ChevronLeftIcon>{' '}
          Home{' '}
        </Button>
        <Typography
          variant='h4'
          align='left'
          style={{
            margin: '0px 0px 16px',
            padding: '0px 65px 0px',
            color: '#333333',
            fontSize: 40
          }}
        >
          <b>Browse Start ups</b>
        </Typography>
        <Typography
          variant='body2'
          align='left'
          style={{ padding: '0px 65px 60px', color: '#333333', fontSize: 24 }}
        >
          People around the world are raising money for what they are passionate
          about.
        </Typography>
      </Container>
      <div style={{ backgroundColor: '#fbf8f6' }}>
        <Container maxWidth='lg' style={{ padding: 50 }}>
        <Grid container item md={12} direction="row"  alignItems="center">
        { startsUp.length > 0 ? (
            startsUp.map(item => (
                <StartUpCard key={item.__id} data={item.data} id={item.__id}/>
            ))):(
                <h1>Loading......</h1>
            )
        }
        </Grid>

         </Container>
      </div>
      <Footer />
    </div>
  )
}

export { Discover }
