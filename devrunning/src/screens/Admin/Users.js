import React from 'react';
import ActionCreators from '../../redux/actionsCreators';
import { connect } from 'react-redux';
import { Link, Route} from 'react-router-dom';
import { Table, Button, Segment, Label } from 'semantic-ui-react';
import { DisplayDate, DisplayTime, DisplayDistance } from '../../components';

class Users extends React.Component {

  componentDidMount() {
    this.props.load();
  }

  render() {

    return (
      <div>
        <h1>Usuários</h1>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Nome</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Tipo</Table.HeaderCell>
                <Table.HeaderCell>Ações</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          <Table.Body>
            { !this.props.users.isLoading &&
              this.props.users.data.map((item, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.email}</Table.Cell>
                    <Table.Cell>{item.role}</Table.Cell>
                    <Table.Cell>
                      <Button onClick={() => {}} color="blue" basic as={Link} to={`/admin/users/${item.id}/edit`}>Editar</Button>
                      <Button onClick={() => this.props.remove(item.id)} color="red" basic>Remover</Button>
                    </Table.Cell>
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
    users: state.users,
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    load: () => dispatch(ActionCreators.getUsersRequest()),
    remove: id => dispatch(ActionCreators.removeUsersRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
