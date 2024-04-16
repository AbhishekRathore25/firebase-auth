import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADSiXpuPiwcEO4IdFHpANUqsI4iWGu0vc",
  authDomain: "trynew-70d52.firebaseapp.com",
  projectId: "trynew-70d52",
  storageBucket: "trynew-70d52.appspot.com",
  messagingSenderId: "609833681981",
  appId: "1:609833681981:web:0b89e6f13586ec0c2a1654",
  measurementId: "G-H6KNLBQJPJ"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };
