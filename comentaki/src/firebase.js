import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBIPJ0sUPS7ASA6OUCnwfESgYYoXTPEuvM",
  authDomain: "comentaki-3b81f.firebaseapp.com",
  projectId: "comentaki-3b81f",
  storageBucket: "comentaki-3b81f.appspot.com",
  messagingSenderId: "154216474684",
  appId: "1:154216474684:web:03559966ec1a9f81703b39"
}

firebase.initializeApp(firebaseConfig)

export default firebase
