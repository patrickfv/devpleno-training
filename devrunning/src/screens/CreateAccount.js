import React from 'react';
import ActionCreators from '../redux/actionsCreators';
import { connect } from 'react-redux';
import { Button, Segment, Form } from 'semantic-ui-react';
import { DisplayDate, DisplayTime, DisplayDistance } from '../components';
import timezones from 'moment-timezone/data/meta/latest.json';

class CreateAccount extends React.Component {
  state = {
    passwd: '',
    passwd2: '',
    name: '',
    email: '',
    timezone: 'America/Sao_Paulo',
    unit: 'metric',
    error: ''
  }

  componentDidMount() {
    this.props.reset();
  }

  handleChange = fieldname => event => {
    this.setState({
      [fieldname]: event.target.value
    });
  }

  handleSave = () => {
    const { passwd, email, timezone, unit, name } = this.state;
    this.props.save({
      passwd,
      email,
      timezone,
      unit,
      name
    });
  }

  render() {
    return (
      <div>
        <h1>Alterar Senha</h1>
        { this.props.auth.saved && <Segment color='green'>Conta criada com sucesso</Segment> }
        { !this.props.auth.saved &&
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
              <label>Nova Senha:</label>
              <input type="password" value={this.state.passwd} onChange={this.handleChange('passwd')}/>
            </Form.Field>
            <Form.Field>
              <label>Confirmar Senha:</label>
              <input type="password" value={this.state.passwd2} onChange={this.handleChange('passwd2')}/>
            </Form.Field>
            <select value={this.state.unit} onChange={this.handleChange('unit')}>
              <option value="metric">Métrico (Km)</option>
              <option value="imperial">Imperial (mi)</option>
            </select>
            <select value={this.state.timezone} onChange={this.handleChange('timezone')}>
              { Object.keys(timezones.zones).map(tz => <option key={tz} value={tz}>{tz}</option>) }
            </select>
            <Button onClick={this.handleSave}>Salvar</Button>
          </Form>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    save: (user) => dispatch(ActionCreators.createProfileRequest(user)),
    reset: () => dispatch(ActionCreators.createProfileReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
