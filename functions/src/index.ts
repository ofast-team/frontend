// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import express, {Express} from "express";
const app : Express = express();

import cors from "cors"
app.use(cors());

admin.initializeApp();

const firebaseConfig = {
  apiKey: "AIzaSyD1yV--rl-qJiyvwju2K9jz_jkhvr8sTHw",
  authDomain: "ofast-e6866.firebaseapp.com",
  projectId: "ofast-e6866",
  storageBucket: "ofast-e6866.appspot.com",
  messagingSenderId: "660869453090",
  appId: "1:660869453090:web:b919fe7e93c35a77a5417b",
  measurementId: "G-3B0LRWZFH5",
};

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

import * as firebase from "firebase/app";
firebase.initializeApp(firebaseConfig);

app.get("/helloWorld", (req, res) => {
  res.json({str: "Hello World!"});
});

exports.api = functions.https.onRequest(app);
