import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import LanguageIcon from '@material-ui/icons/Language';
import MobileFriendlyIcon from '@material-ui/icons/MobileFriendly';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PeopleIcon from '@material-ui/icons/People';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SecurityIcon from '@material-ui/icons/Security';

const useStyles = makeStyles({
    root: {
        maxWidth: 330,
        backgroundColor: '#fbf8f6'
    },
    media: {
        height: 250,
    },
});

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

function Leader() {
    const classes = useStyles();

    return (
        <div style={{ backgroundColor: '#fbf8f6' }}>
            <Container maxWidth="lg">
                <ThemeProvider theme={theme}>
                    <Typography variant="h4" align="center" style={{ padding: 45, color: '#333333', fontSize: 30 }}><b>The leader in online fundraising</b></Typography>
                    <Grid container spacing={0} align="center" style={{ padding: 10 }}>
                        <Grid item sm={4}>

                            <Card className={classes.root} elevation={0}>

                                <CardContent>

                                    <Typography gutterBottom variant="h3" component="h2" align="left" style={{ fontSize: 17, color: '#333333', padding: 20 }}><LanguageIcon color='primary' fontSize='large' style={{ fontSize: 40, marginBottom: -13, marginRight: 15 }}></LanguageIcon>
                                        <b>Worldwide leader</b>
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" align="left" style={{ marginLeft: 75, fontSize: 17 }}>
                                        Investa is trusted around the world for its simple, reliable fundraising platform.</Typography>
                                </CardContent>

                            </Card>

                        </Grid>


                        <Grid item sm={4}>

                            <Card className={classes.root} elevation={0}>

                                <CardContent>

                                    <Typography gutterBottom variant="h3" component="h2" align="left" style={{ fontSize: 17, color: '#333333', padding: 20 }}><CheckCircleIcon color='primary' fontSize='large' style={{ fontSize: 40, marginBottom: -13, marginRight: 15 }}></CheckCircleIcon>
                                        <b>Simple Setup</b>
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" align="left" style={{ marginLeft: 75, fontSize: 17 }}>
                                    You can personalize and share your Investa in just a few minutes.</Typography>
                                </CardContent>

                            </Card>

                        </Grid>


                        <Grid item sm={4}>

                            <Card className={classes.root} elevation={0}>

                                <CardContent>

                                    <Typography gutterBottom variant="h3" component="h2" align="left" style={{ fontSize: 17, color: '#333333', padding: 20 }}><SecurityIcon color='primary' fontSize='large' style={{ fontSize: 40, marginBottom: -13, marginRight: 15 }}></SecurityIcon>
                                        <b>Secure</b>
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" align="left" style={{ marginLeft: 75, fontSize: 17 }}>
                                    Our Trust & Safety team works around the clock to protect against fraud.</Typography>
                                </CardContent>

                            </Card>
                        </Grid>
                    </Grid>
                </ThemeProvider>




                <Grid container spacing={0} align="center" style={{ padding: 10, paddingBottom: '8%' }}>
                    <Grid item sm={4}>

                        <Card className={classes.root} elevation={0}>

                            <CardContent>

                                <Typography gutterBottom variant="h3" component="h2" align="left" style={{ fontSize: 17, color: '#333333', padding: 20 }}><MobileFriendlyIcon color='primary' fontSize='large' style={{ fontSize: 40, marginBottom: -13, marginRight: 15 }}></MobileFriendlyIcon>
                                    <b>Mobile app</b>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" align="left" style={{ marginLeft: 75, fontSize: 17 }}>
                                    The Investa app makes it simple to launch and manage your fundraiser on the go.</Typography>
                            </CardContent>

                        </Card>

                    </Grid>


                    <Grid item sm={4}>

                        <Card className={classes.root} elevation={0}>

                            <CardContent>

                                <Typography gutterBottom variant="h3" component="h2" align="left" style={{ fontSize: 17, color: '#333333', padding: 20 }}><TrendingUpIcon color='primary' fontSize='large' style={{ fontSize: 40, marginBottom: -13, marginRight: 15 }}></TrendingUpIcon>
                                    <b>Social reach</b>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" align="left" style={{ marginLeft: 75, fontSize: 17 }}>
                                Harness the power of social media to spread your story and get more support.</Typography>
                            </CardContent>

                        </Card>

                    </Grid>


                    <Grid item sm={4}>

                        <Card className={classes.root} elevation={0}>

                            <CardContent>

                                <Typography gutterBottom variant="h3" component="h2" align="left" style={{ fontSize: 17, color: '#333333', padding: 20 }}><PeopleIcon color='primary' fontSize='large' style={{ fontSize: 40, marginBottom: -13, marginRight: 15 }}></PeopleIcon>
                                    <b>24/7 expert advice</b>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" align="left" style={{ marginLeft: 75, fontSize: 17 }}>
                                Our best-in-class Customer Happiness agents will answer your questions, day or night.</Typography>
                            </CardContent>

                        </Card>
                    </Grid>
                </Grid>









            </Container>
        </div>
    );
}

export { Leader };