import React from 'react'

import { AuthProvider } from './auth'
import CreateUser from './screens/CreateUser'
import SigninUser from './screens/SigninUser'
import UserScreen from './screens/UserScreen'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Route } from 'react-router-dom'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <Route path="/" exact component={UserScreen}/>
          <Route path="/login" exact component={SigninUser}/>
          <Route path="/creatuser" exact component={CreateUser}/>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
