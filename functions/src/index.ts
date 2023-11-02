import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import express, { Express } from 'express'
const app: Express = express()

admin.initializeApp()

const firebaseConfig = {
  apiKey: 'AIzaSyD1yV--rl-qJiyvwju2K9jz_jkhvr8sTHw',
  authDomain: 'ofast-e6866.firebaseapp.com',
  projectId: 'ofast-e6866',
  storageBucket: 'ofast-e6866.appspot.com',
  messagingSenderId: '660869453090',
  appId: '1:660869453090:web:b919fe7e93c35a77a5417b',
  measurementId: 'G-3B0LRWZFH5',
}

import cors from 'cors'

const allowedOriginsList = [
  'http://localhost:3000',
  'https://ofast.io',
  'https://ofast-e6866.web.app',
  'https://ofast-e6866.firebaseapp.com',
]

const allowedMethodsList = ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']

const allowedHeadersList = [
  'Origin',
  'X-Requested-With',
  'Content-Type',
  'Accept',
  'Authorization',
]

app.use(
  cors({
    origin: allowedOriginsList,
    methods: allowedMethodsList,
    allowedHeaders: allowedHeadersList,
  }),
)

import * as firebase from 'firebase/app'
firebase.initializeApp(firebaseConfig)

app.get('/helloWorld', (req, res) => {
  console.log('Hello!')
  res.json({ str: 'Hello World!' })
})

exports.api = functions.https.onRequest(app)
