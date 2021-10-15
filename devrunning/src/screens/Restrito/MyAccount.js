import React from 'react';
import ActionCreators from '../../redux/actionsCreators';
import { connect } from 'react-redux';
import { Button, Segment, Form } from 'semantic-ui-react';
import { DisplayDate, DisplayTime, DisplayDistance } from '../../components';
import timezones from 'moment-timezone/data/meta/latest.json';

class MyAccount extends React.Component {
  state = {
    unit: '',
    timezone: ''
  }

  componentDidMount() {
    this.setState({
      unit: this.props.auth.user.unit,
      timezone: this.props.auth.user.timezone
    });
  }

  handleChange = fieldname => event => {
    this.setState({
      [fieldname]: event.target.value
    });
  }

  handleSave = () => {
    const { unit, timezone } = this.state;
    this.props.save({
      unit,
      timezone,
      id: this.props.auth.user.id
    });
  }

  render() {
    return (
      <div>
      { this.props.auth.saved && <Segment color='green'>Configurações Alteradas com Sucesso</Segment> }
        { !this.props.auth.saved &&
          <Form>
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
    save: (user) => dispatch(ActionCreators.updateProfileRequest(user)),
    //create: run => dispatch(ActionCreators.createRunsRequest(run))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
