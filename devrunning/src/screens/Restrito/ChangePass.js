import React from 'react';
import ActionCreators from '../../redux/actionsCreators';
import { connect } from 'react-redux';
import { Button, Segment, Form } from 'semantic-ui-react';
import { DisplayDate, DisplayTime, DisplayDistance } from '../../components';
import timezones from 'moment-timezone/data/meta/latest.json';

class ChangePass extends React.Component {
  state = {
    passwd: '',
    passwd2: ''
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
    const { passwd } = this.state;
    this.props.save({
      passwd,
      id: this.props.auth.user.id
    });
  }

  render() {
    return (
      <div>
        <h1>Alterar Senha</h1>
        { this.props.auth.saved && <Segment color='green'>Senha Alterada com Sucesso</Segment> }
        { !this.props.auth.saved &&
          <Form>
            <Form.Field>
              <label>Nova Senha:</label>
              <input type="password" value={this.state.passwd} onChange={this.handleChange('passwd')}/>
            </Form.Field>
            <Form.Field>
              <label>Confirmar Senha:</label>
              <input type="password" value={this.state.passwd2} onChange={this.handleChange('passwd2')}/>
            </Form.Field>
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
    save: (user) => dispatch(ActionCreators.updateProfileRequest(user)),
    reset: () => dispatch(ActionCreators.updateProfileReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePass);
