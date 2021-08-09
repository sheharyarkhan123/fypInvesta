import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../CONSTANT'
import StartUpCard from './StartupCard'


function TopStartUps () {
  const [startsUp, setStartsUp] = React.useState([])
  React.useEffect(() => {
    axios
      .get(API_URL + '/allStartups')
      .then(res => res.data)
      .then(doc => setStartsUp(doc))
  }, [])

  return (
    <div>
      <Container maxWidth='lg'>
          <Typography
            variant='h4'
            align='left'
            style={{ padding: 40, color: '#333333' }}
          >
            <b>Top Startups</b>
          </Typography>
          <Grid container item md={12} direction='row' alignItems='center'>
            {startsUp.length > 0 ? (
              startsUp.map(item => (
                <StartUpCard key={item.__id} data={item.data} id={item.__id} />
              ))
            ) : (
              <h1>Loading......</h1>
            )}
          </Grid>
        <Link to='/discover' style={{ color: '#666666' }}>
          <Typography variant='body2' align='right' style={{ padding: 50 }}>
            {' '}
            See more{' '}
            <ChevronRightIcon
              fontSize='large'
              style={{ margin: -11, color: '#666666' }}
            ></ChevronRightIcon>
          </Typography>
        </Link>
      </Container>
    </div>
  )
}

export default TopStartUps 
