import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import ActionCreators from '../../redux/actionsCreators';
import Header from './elements/Header';
import Runs from './Runs';
import Users from './Users';
import EditUser from './EditUser';

const Home = () => (<h1>Home Admin</h1>);

class Admin extends React.Component {

  render() {
    if(!this.props.auth.isAuth) {
      return <Redirect to="/login"/>
    }
    if(this.props.auth.user.role !== 'admin') {
      return <Redirect to="/restrito"/>
    }

    return (
      <div>
        <Header />
        <Route exact path={`${this.props.match.path}/`} component={Home} />
        <Route exact path={`${this.props.match.path}/users/:id/edit`} component={EditUser} />
        <Route exact path={`${this.props.match.path}/users`} component={Users} />
        <Route path={`${this.props.match.path}/runs`} component={Runs} />
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

export default connect(mapStateToProps, matchDispatchToProps)(Admin);
