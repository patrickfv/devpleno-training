import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import ActionCreators from '../../redux/actionsCreators';
import Home from './Home';
import Runs from './Runs';
import Header from './elements/Header';
import MyAccount from './MyAccount';
import ChangePass from './ChangePass';
import CreateRuns from './CreateRuns';

class Restrito extends React.Component {

  render() {
    if(this.props.auth.isSigning) {
			return <p>Loading...</p>
		}
    if(!this.props.auth.isAuth) {
      return <Redirect to="/login" />
    }

    return (
      <div>
        <h1>Restrito</h1>
        <Header />
        <div>
          <Route exact path={`${this.props.match.path}/`} component={Home} />
          <Route path={`${this.props.match.path}/runs`} component={Runs} />
          <Route path={`${this.props.match.path}/my-account`} component={MyAccount} />
          <Route path={`${this.props.match.path}/change-pass`} component={ChangePass} />
          <Route path={`${this.props.match.path}/create-run`} component={CreateRuns} />
        </div>
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

export default connect(mapStateToProps, matchDispatchToProps)(Restrito);
