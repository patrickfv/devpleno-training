import React, { useContext, useState } from 'react'
import { AuthContext } from '../auth'
import { Message, Form, Button, Grid, Header, Segment } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom'

function CreateUser() {
    const auth = useContext(AuthContext)
    const [form, setForm] = useState({ email: '', passwd: '', repeatPasswd: '', isInvalid: false })
    const onClick = () =>{
        if(form.passwd === form.repeatPasswd) {
            auth.createUser.createUser(form.email, form.passwd)
        } else {
            setForm({
                ...form,
                isInvalid: true
            })
        }
    }
    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value,
        });
    }

    if(auth.user !== null) return <Redirect to="/" />

    return (
        <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h3" color="teal" textAlign="center">
                    Criar nova conta
                </Header>
                {
                    (auth.signinUser.signinUserState.error !== '' || form.isInvalid) &&
                    <Message
                        error
                        header='Action Forbidden'
                        content={auth.signinUser.signinUserState.error || 'password not matched'} />
                }
                <Form size="large">
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail' value={form.email} onChange={onChange('email')} />
                        <Form.Input fluid icon='lock' iconPosition='left' placeholder='Senha' type='password' value={form.passwd} onChange={onChange('passwd')}/>
                        <Form.Input fluid icon='lock' iconPosition='left' placeholder='Confirmar Senha' type='password' value={form.repeatPasswd} onChange={onChange('repeatPasswd')}/>
                        <Button color="teal" type="submit" {...{ onClick }}>Criar Conta</Button>
                    </Segment>
                </Form>
                <Message>
                    Já tem uma conta? <Link to="/login">Entrar</Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default CreateUser
