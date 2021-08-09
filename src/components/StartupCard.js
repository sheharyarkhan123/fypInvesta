import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import {  makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
    root: {
        maxWidth: 330,
    },
    media: {
        height: 200,
    },
    button: {
        width: 'auto',
        textTransform:'none',
        fontSize: 18,
        color: '#666666',
        backgroundColor: '#fbf8f6',

      },
});

const StartUpCard = (props) => {
    const classes = useStyles();
    const {data} = props;
    const history = useHistory();
  return (
    <Grid item sm={4} onClick={()=>history.push(`/cardpage?start-up-id=${props.id}`)}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={data.imageURL}
            />
          <CardContent>
            <Typography
              gutterBottom
              variant='h3'
              component='h2'
              align='left'
              color='primary'
              style={{ fontSize: 17 }}
            >
              <b>{data.city}</b>
            </Typography>
            <Typography
              gutterBottom
              variant='h3'
              component='h2'
              align='left'
              style={{ fontSize: 17 }}
            >
              <b>{data.title}</b>
            </Typography>
            <Typography variant='body2' align='left'>
              Total Investment: <b>{data.totalPrice}</b>
            </Typography>
            <Typography variant='body2' align='left'>
              Price Per Share <b>{data.perSharePrice}</b>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export default StartUpCard;