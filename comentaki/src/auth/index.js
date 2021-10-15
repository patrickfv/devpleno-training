import React, { useState, useEffect } from 'react'
import firebase from '../firebase'

export const AuthContext = React.createContext()

function useIsAuth() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(currentUser => {
            if(currentUser) {
                setUser(currentUser)
            } else {
                setUser(null)
            }
        })
    }, [])
    return user
}

function useCreateUser() {
    const [state, setState] = useState({
        error: '',
        success: '',
    })
    const createUser = (email, passwd) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, passwd)
            .then(user => {
                if(user) {
                   setState({
                       ...state,
                       success: 'OK',
                   })
                }
            })
            .catch(err => {
                setState({
                    ...state,
                    error: err.message,
                })
            })
    }

    return [state, createUser]
}

function useSigninUser() {
    const [state, setState] = useState({
        error: '',
        success: '',
    })
    const signinUser = (email, passwd) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, passwd)
            .catch(err => {
                setState({
                    ...state,
                    error: err.message,
                })
            })
    }

    return [state, signinUser]
}

export function useDatabase(endpoint) {
    const [data, setData] = useState({})
  
    useEffect(() => {
      const ref = firebase.database().ref('comments')
      ref.on('value', snapshot => {
        setData(snapshot.val())
      })
  
      return () => {
        ref.off()
      }
    }, [endpoint])
  
    return data
}
  

export function useDatabasePush(endpoint) {
    const [status, setStatus] = useState('')

    const save = data => {
      const ref = firebase.database().ref(endpoint)
      ref.push(data, err => {
        if (err) {
          setStatus('ERROR')
        } else {
          setStatus('SUCCESS')
        }
      })
    }
  
    return [status, save]
}  

function signout() {
    firebase.auth()
        .signOut()
        .then(() => {
            console.log('signout')
        })
}

export function AuthProvider({ children }) {
    const user = useIsAuth()
    const [createUserState, createUser] = useCreateUser()
    const [signinUserState, signinUser] = useSigninUser()
    
    return (
        <AuthContext.Provider value={{ 
                user,
                createUser: {
                    createUserState,
                    createUser,
                },
                signinUser: {
                    signinUser,
                    signinUserState
                },
                signout,
            }}>
            { children }
        </AuthContext.Provider>
    )
}
