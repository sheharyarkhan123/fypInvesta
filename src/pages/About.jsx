import React from 'react'
import Header from '../components/Header'
import { Footer } from '../components/Footer'

import {
  createTheme,
  makeStyles,
  ThemeProvider
} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Container from '@material-ui/core/Container'
import { CardMedia } from '@material-ui/core'
import sherry from '../Images/sherry.jpeg'
import waseem from '../Images/waseem.jpeg'
import uzair from '../Images/uzair.jpeg'
import umair from '../Images/umair.jpeg'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  media: {
    height: 200,
    width: 200,
    borderRadius: '50%'
  },
  logo: {
    margin: 'auto',
    textAlign: 'center',
    maxWidth: '15%',
    maxHeight: '70%'
  },
  button: {
    margin: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: '6px 12px',
    textTransform: 'none'
  },
  paper: {
    padding: 70,
    width: '30%',
    backgroundColor: '#bdd7ef'
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  paperStyle: {
    padding: 30,
    height: '100%',
    width: '40%',
    margin: '30px auto',
    marginTop: '5%'
  },
  heading: {
    color: '#000A52',
    paddingBottom: 10
  },
  card: {
    backgroundColor: '#bdd7ef'
  }
}))

const theme = createTheme({
  palette: {
    primary: {
      main: '#000A52'
    },
    secondary: {
      main: '#000A52'
    }
  }
})

function About () {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Header />
      {/* Body */}

      <Paper className={classes.paperStyle} elevation={'none'}>
        <ThemeProvider theme={theme}>
          <Typography
            className={classes.heading}
            variant='h2'
            align='center'
            style={{ fontSize: 45 }}
          >
            Company
          </Typography>
          <Typography
            className={classes.heading}
            variant='h3'
            align='left'
            style={{ fontSize: 30, paddingTop: 30 }}
          >
            About Us
          </Typography>
          <Typography align='left'>
            Investa is a web application solely based upon advanced web
            technologies. This project objective is to gather funds from a large
            number of investors to finance multiple startups. Our aim is to
            provide handsome capital for entrepreneurs to launch their startup
            and provide investors with an opportunity to invest money in
            exchange for a portion of their equity.
          </Typography>
          <br></br>
          <Typography align='left'>
            Investa is the first attempt to make an online advanced web-based
            platform to cater multiple investors and startups. Our aims are:
          </Typography>
          <Typography align='left'>
            ● Increase in employment rate and business rate
          </Typography>
          <Typography align='left'>
            ● To support and flourish more entrepreneur in Pakistan.
          </Typography>
          <Typography align='left'>
            ● To extend our finest expert’s help and consultancy to young minds
            in Pakistan..
          </Typography>
          <Typography align='left'>
            ● Analysis of entrepreneur’s business success rate.
          </Typography>
          <Typography align='left'>
            ● To create multiple business opportunities.
          </Typography>
          <Typography
            className={classes.heading}
            align='center'
            variant='h2'
            style={{ fontSize: 45, paddingTop: 60, marginBottom: 40 }}
          >
            Our Team
          </Typography>
        </ThemeProvider>
      </Paper>

      <Container maxWidth='auto' style={{ backgroundColor: '#bdd7ef' }}>
        <Grid
          container
          spacing={0}
          align='center'
          style={{ padding: 20, backgroundColor: '#bdd7ef' }}
        >
          <Grid item sm={6}>
            <Card className={classes.card} elevation={0}>
              <CardActionArea>
                <CardMedia image={sherry} className={classes.media} />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant='h3'
                    component='h2'
                    align='center'
                    style={{ fontSize: 17, color: '#333333', padding: 20 }}
                  >
                    <b>Muhammad Sheharyar Khan</b>
                  </Typography>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                    align='center'
                    style={{ fontSize: 17 }}
                  >
                    Investa Co-Founder and CEO
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item sm={6}>
            <Card className={classes.card} elevation={0}>
              <CardActionArea>
                <CardMedia image={umair} className={classes.media} />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant='h3'
                    component='h2'
                    align='center'
                    style={{ fontSize: 17, color: '#333333', padding: 20 }}
                  >
                    <b>Muhammad Umair Naseer</b>
                  </Typography>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                    align='center'
                    style={{ fontSize: 17 }}
                  >
                    Investa Co-Founder and President
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={0}
          align='center'
          style={{ padding: 20, paddingBottom: '8%' }}
        >
          <Grid item sm={6}>
            <Card className={classes.card} elevation={0}>
              <CardActionArea>
                <CardMedia image={waseem} className={classes.media} />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant='h3'
                    component='h2'
                    align='center'
                    style={{ fontSize: 17, color: '#333333', padding: 20 }}
                  >
                    <b>Waseem Bashir</b>
                  </Typography>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                    align='center'
                    style={{ fontSize: 17 }}
                  >
                    Investa Co-Founder and Chairman of the Board
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item sm={6}>
            <Card className={classes.card} elevation={0}>
              <CardActionArea>
                <CardMedia image={uzair} className={classes.media} />

                <CardContent>
                  <Typography
                    gutterBottom
                    variant='h3'
                    component='h2'
                    align='center'
                    style={{ fontSize: 17, color: '#333333', padding: 20 }}
                  >
                    <b>Uzair Ahmad</b>
                  </Typography>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                    align='center'
                    style={{ fontSize: 17 }}
                  >
                    Investa Co-Founder Strategic Advisor
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Paper className={classes.paperStyle} elevation={'none'}>
        <ThemeProvider theme={theme}>
          <Typography
            className={classes.heading}
            variant='h2'
            align='left'
            style={{ fontSize: 40, marginTop: '-10%' }}
          >
            HOW IT WORKS
          </Typography>
          <Typography
            className={classes.heading}
            variant='h3'
            align='left'
            style={{ fontSize: 30, paddingTop: 30 }}
          >
            Investment
          </Typography>
          <Typography align='left'>
            {' '}
            Investor can start investing in the startups using by simply making
            an account on Investa and following the guide. Investor shall search
            through all the startup listing and invest in the most potential
            idea he believes in. In the beginning of a startup the investor is
            at higher risk of getting liquidated and the investor will lose the
            entire money is highly likely for any single investment however if
            the idea has potential and succeeds then the investor shall get
            equal percentage of the profit generated by the company depending
            upon the share taken. Investor should diversify its portfolio as
            much as it can to manage the risk management and hold onto to share
            as long as he can. The percentage of the share is set by the
            entrepreneur and so is the raising capital whereas Investa only
            manages the accredited entrepreneur only.{' '}
          </Typography>
          <Typography
            className={classes.heading}
            align='left'
            variant='h3'
            style={{ fontSize: 30, paddingTop: 30 }}
          >
            Raising Funds
          </Typography>
          <Typography align='left'>
            Entrepreneur can raise funding for their project by submitting the
            request to Investa team
          </Typography>
        </ThemeProvider>
      </Paper>

      {/* Footer */}

      <Footer />
    </div>
  )
}
export { About }
