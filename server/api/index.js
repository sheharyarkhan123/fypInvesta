const express = require('express')
const router = express.Router()
const firebase = require('../firebase')

const admin = firebase.admin
const db = firebase.db

router.get('/', (_req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  })
})

router.post('/createStartup', (req, res) => {
  const body = req.body.data
  db.collection('startups')
    .add(body)
    .then(data => res.send(data).status(201))
    .catch(err => res.send(err))
})

router.post('/signup', (req, res) => {
  const body = req.body.data
  console.log(body)
  if (body) {
    const role = body.accountType
    admin
      .auth()
      .createUser({
        email: body.email,
        emailVerified: false,
        password: body.password,
        displayName: body.firstName,
        firstName: body.firstName,
        lastName: body.lastName,
        disabled: false
      })
      .then(data =>
        db
          .collection('users')
          .doc(data.uid)
          .set({
            accountType: role,
            email: body.email,
            emailVerified: false,
            displayName: body.firstName,
            firstName: body.firstName,
            lastName: body.lastName
          })
      )
      .then(data => res.status(200).json(data))
      .catch(error => {
        res.status(409).json(error.message)
      })
  } else {
    res.status(400).send('Error with Request')
  }
})

router.get('/allStartups', (req, res) => {
  let startUps = []
  db.collection('startups')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        startUps.push({
          __id: doc.id,
          data: doc.data()
        })
      })
    })
    .then(() => res.status(200).json(startUps))
})

router.post('/getStartup', (req, res) => {
  const { data } = req.body
  console.log(data)
  db
  .collection("startups")
  .doc(data)  
    .get()
    .then(doc => doc.data())
    .then(data => res.status(200).json(data))
    .catch(e=>res.status(404).json(e))
})

router.post('/invest', (req, res) => {
  const { data } = req.body;
  console.log(data)
  db.collection('startups')
    .doc(`${data.projectId}`)
    .set(
      {
        investments: firebase.FieldValue.arrayUnion(data),
        investor:firebase.FieldValue.arrayUnion(data.id)
      },
      {merge:true}
    )
    .then(() => res.status(204).json('done'))
    .catch(e => res.status(404).json(e))
})

router.post('/getInvestedProjects', (req, res) => {
  const { data } = req.body
  let resData = []
  db.collection('startups')
    .where('investor', 'array-contains', `${data.userID}`)
    .get()
    .then(querySnapshot => {
      querySnapshot
        .forEach(doc => {
          resData.push({
            data: doc.data(),
            _id: doc.id
          })
        })
        .then(() => res.status(200).json(resData))
        .catch(e => res.status(404).json(resData))
    })
})

module.exports = router
