import React from 'react';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import mainlogo from '../Images/Vlogo.png'
const useStyles = makeStyles((theme) => ({
    paper: {
        padding: 50,
    },
    formControl: {
        margin: theme.spacing(1),
        width: '90%',
    },
    logo: {
        maxWidth: '45%',
    },
}));

const theme = createTheme({
    typography: {
        body2: {
            fontSize: 18,
            marginTop: 10

        },
    },
    palette: {
        primary: {
            main: '#000A52',
        }
    }
})



function Footer() {
    const [language, setLanguage] = React.useState('1');

    const handleLanguage = (event) => {
        setLanguage(event.target.value)
    }


    const classes = useStyles();
    return (
        <div>
            <Divider style={{ marginBottom: '-6%' }} />
            <Grid container spacing={3} style={{ marginTop: '8%' }}>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper} align="left" elevation='none'>
                        <img src={mainlogo} className={classes.logo} alt="Investa"
                           
                            style={{ padding: '20px' }} />
                        <FormControl align='center' variant="outlined" className={classes.formControl}>
                            <Select value={language} displayEmpty onChange={handleLanguage}>
                                <MenuItem value={1} >English (Pakistan)</MenuItem>
                                <MenuItem value={2} >Urdu</MenuItem>
                                <MenuItem value={3} >Turkish</MenuItem>
                                <MenuItem value={4} >German</MenuItem>
                                <MenuItem value={5} >Danish</MenuItem>
                                <MenuItem value={6} >Chinese</MenuItem>
                            </Select>
                        </FormControl>
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper} align="left" elevation='none'>
                        <ThemeProvider theme={theme}>
                            <Typography variant="h5" color="primary" style={{ fontSize: 17, marginBottom: 30 }}><b>Company</b></Typography>
                            <Link to='/about' style={{ color: '#333333' }}><Typography variant="body2">About Us</Typography></Link>
                            <Link to='/about' style={{ color: '#333333' }}><Typography variant="body2">The Team</Typography></Link>
                            <Link to='/about' style={{ color: '#333333' }}><Typography variant="body2">FAQs</Typography></Link>
                        </ThemeProvider>
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper} align="left" elevation='none'>
                        <ThemeProvider theme={theme}>
                            <Typography variant="h5" color="primary" style={{ fontSize: 17, marginBottom: 30 }}><b>How it Works</b></Typography>
                            <Link to='/about' style={{ color: '#333333' }}><Typography variant="body2">Investing in a business</Typography></Link>
                            <Link to='/about' style={{ color: '#333333' }}><Typography variant="body2">Raising Funds</Typography></Link>
                            <Link to='/about' style={{ color: '#333333' }}><Typography variant="body2">FAQs</Typography></Link>
                            <Link to='/about' style={{ color: '#333333' }}><Typography variant="body2">Supported countries</Typography></Link>
                        </ThemeProvider>
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper} align="left" elevation='none'>
                        <ThemeProvider theme={theme}>
                            <Typography variant="h5" color="primary" style={{ fontSize: 17, marginBottom: 30 }}><b>Join</b></Typography>
                            <Link to='/signup' style={{ color: '#333333' }}><Typography variant="body2">As an Investor</Typography></Link>
                            <Link to='/signup' style={{ color: '#333333' }}><Typography variant="body2">As an Entreprenuer</Typography></Link>
                            <Link to='/about' style={{ color: '#333333' }}><Typography variant="body2">Investa Stories</Typography></Link>
              

                        </ThemeProvider>
                    </Paper>
                </Grid>
                </Grid>
                <Divider/>
                <Grid container spacing={3} style={{marginTop: '20px'}}>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper} elevation='none'>
                        <Typography variant="h5" align="left" style={{ fontSize: 17, marginLeft: '25%', marginBottom: 10, color: "#666666" }}>
                            © 2020-2021 Investa
                            <Link style={{ marginLeft: 15, color: "#666666" }} to="/"> Terms</Link>
                            <Link style={{ margin: 10, color: "#666666" }} to="/"> Privacy</Link>
                            <Link to="/" style={{ color: "#666666"}}> Legal</Link>
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper} elevation='none'>
                        <FacebookIcon style={{ color: '#3b5998', marginBottom: 10, marginRight: 10 }}></FacebookIcon>
                        <YouTubeIcon style={{ color: 'red', marginBottom: 10, marginLeft: 10, marginRight: 10 }}></YouTubeIcon>
                        <TwitterIcon style={{ color: 'dodgerblue', marginBottom: 10, marginLeft: 10, marginRight: 10 }}></TwitterIcon>
                        <InstagramIcon style={{ marginBottom: 10, marginLeft: 10 }}></InstagramIcon>

                    </Paper>
                </Grid>







            </Grid>
        </div>
    )
}

export { Footer };