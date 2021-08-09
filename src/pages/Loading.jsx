import React from 'react'
import { firebaseAuth, db } from '../firebase'
import { Redirect} from 'react-router-dom'



function Loading () {
  const [isLoading, setLoading] = React.useState(true)
  
  const [userData, setUserData] = React.useState({
    uid: '',
    accountType: ''
  })
  React.useEffect(() => {
    const currentUser = firebaseAuth.currentUser
    console.log('hello')
    console.log(currentUser.uid)
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
        })
        .then(() => setLoading(false))
        .catch(e => console.log(e))
    }
  }, [])

  if (isLoading) {
    return <h1>Loading....</h1>
  }

  return (
      <React.Fragment>
    {
        userData.accountType ==='founder'?(
            <Redirect to='/dashboard'/>
        ):(
            <Redirect to='/discover'/>
        )
    }
    </React.Fragment>
  )
}

export default Loading
