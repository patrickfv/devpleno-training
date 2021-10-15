import React from 'react';
import ActionCreators from '../../redux/actionsCreators';
import { connect } from 'react-redux';
import { Link, Route} from 'react-router-dom';
import { Table, Button, Segment, Label } from 'semantic-ui-react';
import { DisplayDate, DisplayTime, DisplayDistance } from '../../components';

class Runs extends React.Component {

  componentDidMount() {
    this.props.load();
  }

  render() {

    return (
      <div>
      <Button as={Link} to="/restrito/create-run">Criar nova corrida</Button>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>№</Table.HeaderCell>
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.HeaderCell>Duração</Table.HeaderCell>
              <Table.HeaderCell>Distancia</Table.HeaderCell>
              <Table.HeaderCell>Data</Table.HeaderCell>
              <Table.HeaderCell>Ações</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              this.props.runs.data.map((item, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{ index + 1 }</Table.Cell>
                    <Table.Cell>
                      { item.friendly_name }
                      <Label>{item.name}</Label>
                    </Table.Cell>
                    <Table.Cell><DisplayTime time={item.duration}/></Table.Cell>
                    <Table.Cell><DisplayDistance distance={item.distance} metric={item.metric}/></Table.Cell>
                    <Table.Cell><DisplayDate date={item.created} timezone={this.props.auth.user.timezone} /></Table.Cell>
                    <Table.Cell><Button onClick={() => this.props.remove(item.id)} color="red" basic>Remover</Button></Table.Cell>
                  </Table.Row>
                );
              })
            }
          </Table.Body>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    runs: state.runs,
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    load: () => dispatch(ActionCreators.getRunsRequest(true)),
    create: run => dispatch(ActionCreators.createRunsRequest(run)),
    remove: id => dispatch(ActionCreators.removeRunsRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Runs);
