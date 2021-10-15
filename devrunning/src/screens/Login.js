import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import Header from '../Header';

import ActionCreators from '../redux/actionsCreators';

class Login extends React.Component {
  state = {
    form: {
      email: '',
      passwd: ''
    }
  }

  handleChange = fieldname => event => {
    const form = {
      ...this.state.form
    }
    form[fieldname] = event.target.value;
    this.setState({ form });
  }

  login = () => {
    const { email, passwd } = this.state.form;
    this.props.login(email, passwd);
  }

  render() {
    if(this.props.auth.isAuth) {
      if(this.props.auth.user.role === 'admin') {
        return <Redirect to="/admin"/>
      }
      return <Redirect to="/restrito"/>
    }
    return (
      <div>
      <Header />
        <h1>Entrar</h1>
        <Form>
          <Form.Field>
            <label>Email</label>
            <input type="email" onChange={this.handleChange('email')} />
          </Form.Field>
          <Form.Field>
            <label>Senha</label>
            <input type="password" onChange={this.handleChange('passwd')} />
          </Form.Field>
          <Button onClick={this.login}>Login</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const matchDispatchToProps = dispatch => {
  return {
    login: (email, passwd) => dispatch(ActionCreators.signinRequest(email, passwd))
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);
