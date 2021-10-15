import React, { useState, useContext } from 'react'
import { useDatabasePush, AuthContext } from '../auth'
import firebase from '../firebase'
import { TextArea, Form, Button, Container, Grid } from 'semantic-ui-react'

function NewComment() {
    const [, save] = useDatabasePush('comments')
    const [comment, setComment] = useState('')
    const auth = useContext(AuthContext)

    if(auth.user === null) return null

    const { displayName } = auth.user
    const [alternativeDisplayName] = auth.user.email.split('@')
    const onChange = evt => setComment(evt.target.value)
    const onClick = () => {
      if (comment !== '') {
        save({
            content: comment,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            user: {
              id: auth.user.uid,
              name: displayName || alternativeDisplayName,
            },
        })
        setComment('')
      }
    }

    return (
      <Container style={{ width: '40vh' }}>
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column>
            <Form>
              <TextArea placeholder="Digite um novo comentario..." style={{ minHeight: 100 }} value={comment} {...{ onChange }} />
            </Form>
            <Button inverted color="blue" style={{ margin: 5 }} {...{ onClick }}>Comentar</Button>
          </Grid.Column>
        </Grid>
      </Container>
    )
}

export default NewComment
