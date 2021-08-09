import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: 40,
        height: 'auto',
        width: 'auto',
        margin: "50px"

    },
    button: {
        width: '15%',
    }
}));

const theme = createTheme({
    typography: {
        h6: {
            color: 'white'

        }
    },
    palette: {
        primary: {
            main: '#000A52',
        }
    }
})

function Tabs() {

    const classes = useStyles();

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Grid>
                    <Paper className={classes.paperStyle} elevation={'none'}>
                        <Typography style={{ fontSize: 25, color: 'gray', marginBottom: 30 }} variant="body1">
                            Ready to start fundraising?
                        </Typography>
                        <Box>
                            <Button className={classes.button} variant="contained" color="primary" size="large" style={{ textTransform: 'none' }}>
                                <Typography variant="h6"><b>Start a project</b></Typography>
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
                <Grid>
                    <Paper style={{backgroundColor: '#bdd7ef', padding: 60 }} elevation={'none'}>
                        <Typography style={{ fontSize: 25}} variant="body1">
                           <b> Are you looking to invest? </b>
                        </Typography>
                        <Typography variant="body2" style={{ fontSize: 17, paddingTop: 10, paddingBottom: 70}}><b>Investa can help you invest your money in reliable startups.</b></Typography>
                        <Box>
                            <Button className={classes.button} variant="contained" color="primary" size="large" style={{ textTransform: 'none' }}>
                                <Typography variant="h6"><b>Start Investing</b></Typography>
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
                <Grid>
                    <Paper className={classes.paperStyle} elevation={'none'}>
                        <Typography style={{ fontSize: 25}} variant="body1">
                            <b>Are you looking for funds for your startup?</b>
                        </Typography>
                        <Typography variant="body2" style={{ fontSize: 17, paddingTop: 10, paddingBottom:70}}><b>Investa can help you get investments from reliable sources.</b></Typography>

                        <Box>
                            <Button className={classes.button} variant="outlined" color="primary" size="large" style={{ textTransform: 'none' }}>
                                <Typography variant="h6" color="inherit"><b>Get Funding</b></Typography>
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </ThemeProvider>
        </div>

    )
}
export { Tabs };