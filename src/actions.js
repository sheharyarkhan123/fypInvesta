import { GET_AUTH_STATE } from './CONSTANT/types'
import { app, firebaseAuth, db } from './firebase'

export const getAuthState = () => dispatch => {
    app.auth().onAuthStateChanged((user) => {
        if (user) {
            localStorage.setItem("user", user.uid);
        }
    });  
  const currentUser = firebaseAuth.currentUser
  if (currentUser) {
    db.collection('users')
      .doc(currentUser.uid)
      .get()
      .then(doc => doc.data())
      .then(data => data.accountType)
      .then(accountType => {
        dispatch({
          type: GET_AUTH_STATE,
          payload: {
            auth: true,
            user: currentUser,
            accountType: accountType
          }
        })
      })
      .catch(() =>
        dispatch({
          type: GET_AUTH_STATE,
          payload: {
            auth: false,
            user: null
          }
        })
      )
  } else {
    dispatch({
      type: GET_AUTH_STATE,
      payload: {
        auth: false,
        user: null
      }
    })
  }
}
