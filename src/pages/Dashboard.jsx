import React from 'react'
import Header from '../components/Header'
import { Footer } from '../components/Footer'
import {
  createTheme,
  makeStyles,
  ThemeProvider
} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { firebaseAuth, db } from '../firebase'
import { Link as div, useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  button: {
    width: 'auto',
    textTransform: 'none',
    fontSize: 16
  },
  root: {
    maxWidth: 330
  },
  media: {
    height: 200
  }
}))

const theme = createTheme({
  palette: {
    primary: {
      main: '#000A52'
    }
  }
})

function Dashboard () {
  const classes = useStyles()
  const history = useHistory()
  const [isLoading, setLoading] = React.useState(true)
  const [startUps, setStartUps] = React.useState([])
  const [userData, setUserData] = React.useState({
    uid: '',
    accountType: ''
  })
  React.useEffect(() => {
    let tempArr = []
    const currentUser = firebaseAuth.currentUser
    if (currentUser) {
      db.collection('users')
        .doc(currentUser.uid)
        .get()
        .then(doc => doc.data())
        .then(data => {
          setUserData({
            uid: currentUser.uid,
            accountType: data.accountType
          })
          if (data.accountType === 'founder') {
            db.collection('startups')
              .where('userID', '==', `${currentUser.uid}`)
              .get()
              .then(docs => {
                docs.forEach(doc => tempArr.push({data:doc.data(),
                  id:doc.id}))
              })
              .then(() => setStartUps(tempArr))
              .catch(e => console.log(e))
          } else if (data.accountType === 'invester') {
            db.collection('startups')
            .where('investor', 'array-contains', `${currentUser.uid}`)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  tempArr.push({data:doc.data(),
                  id:doc.id})
                })
              })
              .then(() => setStartUps(tempArr))
              .then(() => console.log(tempArr))
              .catch(e => console.log(e))
          }
        })
        .then(() => setLoading(false))
        .catch(e => console.log(e))
    }
  }, [])

  if (isLoading) {
    return <h1>Loading....</h1>
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header />

        <Container maxWidth='lg' style={{ marginTop: '8%' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant='h5'
                align='left'
                style={{ color: '#333333' }}
              >
                <b>Your Projects</b>
              </Typography>
            </Grid>
            {userData.accountType === 'invester' ? (
              <React.Fragment></React.Fragment>
            ) : (
              <Grid item xs={12} sm={6}>
                <Button
                  className={classes.button}
                  variant='contained'
                  color='primary'
                  style={{ marginLeft: '6%' }}
                  onClick={() => history.push('/CreateStartUp')}
                  disabled={startUps.length>0}
                >
                  <AddIcon style={{ margin: 3 }} />
                  <b>Start a Start up</b>
                </Button>
              </Grid>
            )}
          </Grid>
        </Container>

        <Grid container spacing={0} align='center' style={{ padding: '5%' }}>
          <ThemeProvider theme={theme}>
         
         
         
         
          
          {
            startUps.map(item=> (
              <Grid item sm={3} style={{ marginLeft: '8%' }}>
              <div 
              onClick={() =>{
                if(userData.accountType==="founder"){
                  history.push(`/ProjectPage?project-id=${item.id}`)
                }
              }}
              >
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia className={classes.media} 
                    image={item.data.imageURL}/>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant='h3'
                        component='h2'
                        align='left'
                        color='primary'
                        style={{ fontSize: 17 }}
                      >
                        <b>{item.data.city}</b>
                      </Typography>
                      <Typography
                        gutterBottom
                        variant='h3'
                        component='h2'
                        align='left'
                        style={{ fontSize: 17 }}
                      >
                        <b>{item.data.title}</b>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            </Grid>
        
            ))
          }
          </ThemeProvider>
        </Grid>
        <Footer />
      </ThemeProvider>
    </div>
  )
}

export default Dashboard
