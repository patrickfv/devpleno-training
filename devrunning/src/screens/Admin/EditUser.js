import React from 'react';
import ActionCreators from '../../redux/actionsCreators';
import { connect } from 'react-redux';
import { Button, Segment, Form } from 'semantic-ui-react';
import { DisplayDate, DisplayTime, DisplayDistance } from '../../components';
import timezones from 'moment-timezone/data/meta/latest.json';
import { Redirect } from 'react-router-dom';

class EditUser extends React.Component {
  state = {
    name: '',
    email: '',
    role: '',
    error: ''
  }

  componentDidMount() {
    this.props.reset();
    this.props.load(this.props.match.params.id);
    if(this.state.name === '') {
      this.setState({ name: this.props.users.user.name });
    }
    if(this.state.email === '') {
      this.setState({ email: this.props.users.user.email });
    }
    if(this.state.role === '') {
      this.setState({ role: this.props.users.user.role });
    }
  }

  handleChange = fieldname => event => {
    this.setState({
      [fieldname]: event.target.value
    });
  }

  handleSave = () => {
    const cache = {
      ...this.state,
      id: this.props.match.params.id,
    }
    delete cache.error;
    this.props.save(cache);
  }

  render() {
    if(this.props.users.saved) {
      <Redirect to="/admin/users" />
    }
    return (
      <div>
        <h1>Criar Corrida</h1>
        { this.props.users.saved && <Segment color='green'>Senha Alterada com Sucesso</Segment> }
        { !this.props.users.saved &&
          <Form>
            <Form.Field>
              <label>Nome:</label>
              <input type="text" value={this.state.name} onChange={this.handleChange('name')}/>
            </Form.Field>
            <Form.Field>
              <label>Email:</label>
              <input type="email" value={this.state.email} onChange={this.handleChange('email')}/>
            </Form.Field>
            <Form.Field>
              <select value={this.state.role} onChange={this.handleChange('role')}>
                <option value="admin">Administrador</option>
                <option value="user">Usuário</option>
              </select>
            </Form.Field>
            <Button color="green" basic onClick={this.handleSave}>Salvar</Button>
          </Form>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    load: id => dispatch(ActionCreators.getUserRequest(id)),
    reset: () => dispatch(ActionCreators.updateUserReset()),
    save: user => dispatch(ActionCreators.updateUserRequest(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
