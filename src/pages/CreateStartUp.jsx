import React from 'react'
import  Header  from '../components/Header'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import {
  createTheme,
  makeStyles,
  ThemeProvider
} from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { DropzoneArea } from 'material-ui-dropzone'
import Divider from '@material-ui/core/Divider'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { firebaseStorage } from '../firebase'
import axios from 'axios'
import { API_URL } from '../CONSTANT'
import { firebaseAuth, db } from '../firebase'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  paperStyle: {
    padding: 30,
    height: '100%',
    width: '40%',
    margin: '30px auto'
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
    padding: 15
  },
  formControl: {
    margin: theme.spacing(1),
    width: '60%'
  },
  typography: {
    marginTop: 40
  },
  dropZone: {
    fontWeight: 20
  },
  paper: {
    height: '50vh',
    width: '52%',
    marginBottom: '5%'
  }
}))

const theme = createTheme({
  palette: {
    primary: {
      main: '#000A52'
    }
  }
})

function CreateStartUp () {
  const ref = firebaseStorage.ref()
  const classes = useStyles()
  const [isSubmit, setSubmiting] = React.useState(false)
  const histoy = useHistory();
  const [values, setValues] = React.useState({
    title: "",
    file: "",
    userID: "",
    city: "",
    totalPrice: "",
    perSharePrice: "",
    status: "",
    story: "",
    investor:[],
    investments:[],
  })

  const handleChange = ( event, value ) => {
    setValues({
      ...values,
      [value]:event.target.value
    })
  }

  const [isLoading, setLoading] = React.useState(true)
  const [userData, setUserData] = React.useState({
    uid: '',
    accountType: ''
  })

  React.useEffect(() => {
    const currentUser = firebaseAuth.currentUser
    if (currentUser) {
      db.collection('users')
        .doc(currentUser.uid)
        .get()
        .then(doc => doc.data())
        .then(data =>
          setUserData({
            uid: currentUser.uid,
            accountType: data.accountType
          })
        )
        .then(() => setLoading(false))
        .catch(e => console.log(e))
    }
  }, [])


  const handleSubmit = (values) => {
    const currentUser = firebaseAuth.currentUser;
    setSubmiting(true)  
    ref
    .child(`images/${values.file.name}`)
    .put(values.file)
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(downloadURL => {
        axios.post(API_URL+'/createStartup',{
            data: {
                ...values,
                title: values.title,
                imageURL: downloadURL,
                userID: userData.uid,
                city: values.city,
                totalPrice: values.totalPrice,
                perSharePrice: values.perSharePrice,
                status: false,
                story: values.story,
                userName: currentUser.displayName
            }
        }).catch(e=>console.error(e))
    }).then(()=> setSubmiting(false)).then(()=>histoy.push('/dashboard')).catch(e=>console.error(e))
  }
  if(isLoading)
    return <h1>loading..</h1>
  return (
    <React.Fragment>
    {isSubmit ?(<h1>Submitting..</h1>):(
      
    <div>
      <Header />
      <Typography
        align='center'
        variant='h4'
        style={{ marginTop: 120, color: 'steelblue' }}
      >
        <b>Raising Funds for a Startup</b>
      </Typography>

      <Paper className={classes.paperStyle} elevation={'none'}>
        <Typography variant='body2' align='center' style={{ fontSize: 20 }}>
          <b>Let's start with the basics</b>
        </Typography>

        <Typography
          className={classes.typography}
          style={{ marginRight: '39%' }}
        >
          Where do you live?
        </Typography>

        <FormControl
          align='center'
          variant='outlined'
          className={classes.formControl}
        >
          <Select value={values.city} displayEmpty onChange={(e)=>handleChange(e,'city')}>
            <MenuItem value='' disabled>
              Select a city
            </MenuItem>
            <MenuItem value='Lahore'>Lahore</MenuItem>
            <MenuItem value='Islamabad'>Islamabad</MenuItem>
            <MenuItem value='Karachi'>Karachi</MenuItem>
          </Select>
        </FormControl>
        <Typography
          style={{ marginRight: '29%' }}
          className={classes.typography}
        >
          What is your Startup title?
        </Typography>

        <FormControl
          align='center'
          variant='outlined'
          className={classes.formControl}
        >
          <TextField
            id='outlined-basic'
            multiline
            required
            inputProps={{ maxLength: 50 }}
            placeholder='Ex: Help Sarah Rebuild Her Home'
            variant='outlined'
            onChange={(e)=>handleChange(e,'title')}
            
          />
          <FormHelperText style={{ fontSize: 12, marginLeft: 3 }}>
            Try to include a person's name and the purpose.
          </FormHelperText>
        </FormControl>

        <Typography
          variant='body2'
          align='center'
          style={{ marginTop: 40, fontSize: 20, marginBottom: 10 }}
        >
          <b>Set your Investment goal</b>
        </Typography>

        <Typography
          style={{ marginRight: '22%', marginBottom: 5 }}
          className={classes.typography}
        >
          How much would you like to raise?
        </Typography>
        <FormControl className={classes.formControl} variant='outlined'>
          <InputLabel>Amount</InputLabel>
          <OutlinedInput
            type='number'
            onChange={(e)=>handleChange(e,'totalPrice')}
            startAdornment={
              <InputAdornment position='start'>Rs.</InputAdornment>
            }
            endAdornment={<InputAdornment position='end'>PKR</InputAdornment>}
            labelWidth={60}
          />
        </FormControl>

        <Typography
          variant='body2'
          align='center'
          style={{ marginTop: 40, fontSize: 20 }}
        >
          <b>Set your share price</b>
        </Typography>

        <Typography
          style={{ marginRight: '22%', marginBottom: 5 }}
          className={classes.typography}
        >
          For how much would you like to sell your share?
        </Typography>
        <FormControl className={classes.formControl} variant='outlined'>
          <InputLabel>Amount</InputLabel>
          <OutlinedInput
          onChange={(e)=>handleChange(e, 'perSharePrice')}
            type='number'
            startAdornment={
              <InputAdornment position='start'>Rs.</InputAdornment>
            }
            endAdornment={<InputAdornment position='end'>PKR</InputAdornment>}
            labelWidth={60}
          />
        </FormControl>

        <Typography
          variant='body2'
          align='center'
          style={{ marginTop: 40, fontSize: 20 }}
        >
          <b>Add a cover photo or video</b>
        </Typography>
        <Grid xs={7} style={{ marginLeft: '22%' }}>
          <Typography
            align='left'
            variant='body2'
            style={{ marginTop: 20, marginBottom: 20 }}
          >
            A high-quality photo or video will help your story and build trust
            with others
          </Typography>
          <DropzoneArea
            className={classes.dropZone}
            acceptedFiles={['image/*', 'video/*']}
            showFileNames
            dropzoneText='Upload a photo'
            showAlerts={false}
            onChange={(files)=>{
                setValues(
                   { ...values,
                       file: files[0]}
                )
            }}
          />
        </Grid>
      </Paper>
      <Typography variant='h5' style={{ padding: 10, marginRight: '42.5%' }}>
        <b>Tell your story</b>
      </Typography>
      <Typography
        variant='body2'
        style={{ paddingBottom: 15, fontSize: 17, marginRight: '40%' }}
      >
        {' '}
        What are you fundraising?
      </Typography>

      <ThemeProvider theme={theme}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} align='right'>
            <Paper className={classes.paper} align='center' elevation='none'>
              <TextField
                style={{ width: '100%' }}
                multiline
                rows={10}
                required
                placeholder='Ex: Help Sarah Rebuild Her Home'
                variant='outlined'
                onChange={((e)=>setValues({
                  ...values,
                  story: e.target.value
                }))}
              />
              <Button
                className={classes.button}
                variant='contained'
                color='primary'
                size='large'
                onClick={()=>handleSubmit(values)}
                style={{
                  textTransform: 'none',
                  margin: 30,
                  width: '100%',
                  marginLeft: 0
                }}
              >
                <Typography variant='h5' style={{ fontSize: 18 }}>
                  {' '}
                  <b>Submit</b>{' '}
                </Typography>
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper} elevation='10'>
              <Typography
                variant='body2'
                style={{ paddingTop: 20, marginBottom: 20, fontSize: 17 }}
              >
                {' '}
                <AccountCircleIcon
                  fontSize='large'
                  style={{ marginBottom: -10, marginRight: 10 }}
                ></AccountCircleIcon>{' '}
                Tips from Jocelyn our fundraising expert
              </Typography>
              <Divider />

              <Typography
                variant='h5'
                align='left'
                style={{ margin: 20, fontSize: 18 }}
              >
                <b>To raise the most money for a campaign, make sure you:</b>
              </Typography>
              <Typography
                variant='h5'
                align='left'
                style={{ margin: 20, fontSize: 18 }}
              >
                {' '}
                <CheckCircleOutlineIcon
                  color='primary'
                  style={{ marginBottom: -5 }}
                ></CheckCircleOutlineIcon>{' '}
                Describe who will benefit
              </Typography>
              <Typography
                variant='h5'
                align='left'
                style={{ margin: 20, fontSize: 18 }}
              >
                {' '}
                <CheckCircleOutlineIcon
                  color='primary'
                  style={{ marginBottom: -5 }}
                ></CheckCircleOutlineIcon>{' '}
                Describe what the funds will be used for
              </Typography>
              <Typography
                variant='h5'
                align='left'
                style={{ margin: 20, fontSize: 18 }}
              >
                {' '}
                <CheckCircleOutlineIcon
                  color='primary'
                  style={{ marginBottom: -5 }}
                ></CheckCircleOutlineIcon>{' '}
                Explain how soon you need the funds
              </Typography>
              <Typography
                variant='h5'
                align='left'
                style={{ margin: 20, fontSize: 18 }}
              >
                {' '}
                <CheckCircleOutlineIcon
                  color='primary'
                  style={{ marginBottom: -5 }}
                ></CheckCircleOutlineIcon>{' '}
                Talk about what the support will mean to you
              </Typography>
              <Typography
                variant='h5'
                align='left'
                style={{ margin: 20, fontSize: 18 }}
              >
                {' '}
                <CheckCircleOutlineIcon
                  color='primary'
                  style={{ marginBottom: -5 }}
                ></CheckCircleOutlineIcon>{' '}
                Share how grateful you will be for help
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  )
}
</React.Fragment>
)}

export default CreateStartUp
