import React, { useContext, useState } from 'react'
import { AuthContext } from '../auth'
import { Button, Input, Segment, Message, Grid, Header } from 'semantic-ui-react'

function UserInfo() {
    const auth = useContext(AuthContext)

    if(auth.user === null) return null

    const { displayName } = auth.user
    const [alternativeDisplayName] = auth.user.email.split('@')
    const dn = displayName || alternativeDisplayName
    const onClick = () => auth.signout()
    //setNewDisplayName(dn
    return (
        <Segment>
            <Segment.Inline>
                <Message floating compact content={`Olá ${ dn }!`} />
                <FormDisplayName {...{ displayName, user: auth.user}} />
                <Button color="red" {...{ onClick }}>Sair</Button>
            </Segment.Inline>
        </Segment>
    )
}

function FormDisplayName({ displayName, user }) {
    const [newDisplayName, setNewDisplayName] = useState(displayName)
    const onChange = evt => setNewDisplayName(evt.target.value)
    const onClick = () => {
        if(newDisplayName !== '') {
            user.updateProfile({ displayName: newDisplayName })
        }
    }

    return (
        <>
            <Input focus type="text" placeholder="Novo nome" value={newDisplayName} {...{ onChange }} style={{ margin: 4 }}/>
            <Button color="teal" {...{ onClick }} style={{ margin: 4 }}>Salvar Nome</Button>
        </>
    )
}

export default UserInfo
