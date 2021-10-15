import React, { useContext, useState } from 'react'
import { AuthContext } from '../auth'
import { Message, Form, Button, Grid, Header, Segment } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom'

function SigninUser() {
    const auth = useContext(AuthContext)
    const [form, setForm] = useState({ email: '', passwd: '' })
    const onClick = () => auth.signinUser.signinUser(form.email, form.passwd)
    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value,
        })
    }

    if(auth.user !== null) return <Redirect to="/" />

    return (
        <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h3" color="teal" textAlign="center">
                    Entrar na sua conta
                </Header>
                {
                    auth.signinUser.signinUserState.error !== '' &&
                    <Message
                    error
                    header='Action Forbidden'
                    content={auth.signinUser.signinUserState.error} />
                }
                <Form size="large">
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail' value={form.email} onChange={onChange('email')} />
                        <Form.Input fluid icon='lock' iconPosition='left' placeholder='Senha' type='password' value={form.passwd} onChange={onChange('passwd')}/>
                        <Button color="teal" type="submit" {...{ onClick }}>Entrar</Button>
                    </Segment>
                </Form>
                <Message>
                    Não tem conta? <Link to="/creatuser">Criar Conta</Link>
                </Message>
            </Grid.Column>
        </Grid>
        )
    }

export default SigninUser
