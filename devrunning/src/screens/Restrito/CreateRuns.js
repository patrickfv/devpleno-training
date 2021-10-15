import React from 'react';
import ActionCreators from '../../redux/actionsCreators';
import { connect } from 'react-redux';
import { Button, Segment, Form } from 'semantic-ui-react';
import { DisplayDate, DisplayTime, DisplayDistance } from '../../components';
import timezones from 'moment-timezone/data/meta/latest.json';
import InputMoment from 'input-moment';
import moment from 'moment';
import 'input-moment/dist/input-moment.css';
//import momentTz from 'moment-timezone';

class CreateRun extends React.Component {
  state = {
    friendly_name: '',
    duration: 0,
    distance: 0,
    created: moment(),
    error: ''
  }

  componentDidMount() {
    this.props.reset();
  }

  saveDatePicker(m) {
  this.setState({
    created: m
  });
  }

  handleChange = fieldname => event => {
    if(event instanceof moment) {
      this.saveDatePicker(event);
      return
    }
    this.setState({
      [fieldname]: event.target.value
    });
  }

  handleSave = () => {
    const { friendly_name, duration, distance, created } = this.state;
    const d = moment.tz(this.state.created, this.props.auth.user.timezone);
    const d2 = d.clone().utc().format('YYYY-MM-DD H:mm');
    this.props.create({
      friendly_name,
      duration,
      distance,
      created: d2,
      id: this.props.auth.user.id
    });
  }

  render() {
    return (
      <div>
        <h1>Criar Corrida</h1>
        { this.props.runs.saved && <Segment color='green'>Senha Alterada com Sucesso</Segment> }
        { !this.props.runs.saved &&
          <Form>
            <Form.Field>
              <label>Nome:</label>
              <input type="text" value={this.state.friendly_name} onChange={this.handleChange('friendly_name')}/>
            </Form.Field>
            <Form.Field>
              <label>Duração:</label>
              <input type="number" value={this.state.duration} onChange={this.handleChange('duration')}/>
            </Form.Field>
            <Form.Field>
              <label>Distancia:</label>
              <input type="number" value={this.state.distance} onChange={this.handleChange('distance')}/>
            </Form.Field>
            <Form.Field>
              <label>Criação:</label>
              <InputMoment moment={this.state.created} onChange={this.handleChange('created')}/>
            </Form.Field>
            <Button color="green" basic onClick={this.handleSave}>Criar</Button>
          </Form>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    runs: state.runs
  }
}

function mapDispatchToProps(dispatch) {
  return {
    create: (run) => dispatch(ActionCreators.createRunsRequest(run)),
    reset: () => dispatch(ActionCreators.createRunsReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRun);
