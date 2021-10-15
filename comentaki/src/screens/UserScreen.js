import React, { useContext } from 'react'
import { AuthContext } from '../auth'
import { Container } from 'semantic-ui-react'
import NewComment from '../components/NewComment'
import Comments from '../components/Comments'
import UserInfo from '../components/UserInfo'
import { Redirect } from 'react-router-dom'

function UserScreen({  }) {
  const auth = useContext(AuthContext)

  if(auth.user === null) return <Redirect to="/login" />

  return (
    <Container>
      <UserInfo />
      <NewComment />
      <Comments />
    </Container>
  )
}

export default UserScreen
