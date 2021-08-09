import React from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Header from '../components/Header'
import { Footer } from '../components/Footer'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import {
  createTheme,
  makeStyles,
  ThemeProvider
} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import axios from 'axios'
import { API_URL } from '../CONSTANT'
import { Link, useHistory } from 'react-router-dom'
import { db } from '../firebase'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  table: {
    minWidth: 700
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
      main: '#000A52'
    }
  }
})

function ProjectPage () {
  const classes = useStyles()
  const [startup, setStartUp] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const myParam = urlParams.get('project-id')
    axios
      .post(API_URL + '/getStartup', {
        data: myParam,
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(res => res.data)
      .then(doc => setStartUp(doc))
  },[])

  const handleCloseStartup = () =>{
    const urlParams = new URLSearchParams(window.location.search)
    const myParam = urlParams.get('project-id')
    db.collection('startups').doc(myParam).delete().then(()=>{
      history.push('/')
    })
  }

  if (!startup) return <h1>Loading....</h1>

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
            <b>Investments for {startup.title}</b>
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8} style={{ marginBottom: 70 }}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>ID</b>
                      </TableCell>
                      <TableCell align='left'>
                        <b>First Name</b>
                      </TableCell>
         
                      <TableCell align='left'>
                        <b>Email</b>
                      </TableCell>
                      <TableCell align='left'>
                        <b>Invested</b>
                      </TableCell>
                      <TableCell align='left'>
                      <b>Return</b>
                    </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {startup.investments.map(row => (
                      <TableRow key={row.id}>
                        <TableCell component='th' scope='row'>
                          {row.id}
                        </TableCell>
                        <TableCell align='left'>{row.firstName}</TableCell>
                        <TableCell align='left'>{row.userEmail}</TableCell>
                        <TableCell align='left'>{row.investment}</TableCell>
                        <TableCell align='left'><Link to="/return-investment">Return Profits</Link></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Paper
                className={classes.paper}
                style={{ padding: 20 }}
                position='fixed'
                elevation={10}
              >
             
                
                <Button
                  className={classes.button}
                  style={{
                    width: '100%',
                    padding: 10,
                    marginTop: '14%',
                    backgroundColor: '#fdb72f'
                  }}
                  variant='contained'
                >
                  <b>Archive</b>{' '}
                </Button>
                <Button
                  className={classes.button}
                  variant='contained'
                  style={{
                    width: '100%',
                    padding: 10,
                    marginTop: 30,
                    marginBottom: '12%',
                    backgroundColor: '#EF5350'
                  }}
                  onClick={handleCloseStartup}
                >
                  {' '}
                  <b>Close Your Project</b>{' '}
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        <Footer />
      </ThemeProvider>
    </div>
  )
}

export default ProjectPage
