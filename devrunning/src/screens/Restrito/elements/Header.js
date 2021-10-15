import React from 'react';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ActionCreators from '../../../redux/actionsCreators';

const Header = props => {
  return (
    <Menu>
      <Menu.Item><Image src="/logo.png" size="small"/></Menu.Item>
      <Menu.Item as={Link} to="/restrito">Home</Menu.Item>
      <Menu.Item as={Link} to="/restrito/runs">Corridas</Menu.Item>
      <Menu.Item position="right">
        <Dropdown item text={props.auth.user.name}>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/restrito/my-account">Minha Conta</Dropdown.Item>
            <Dropdown.Item as={Link} to="/restrito/Change-pass">Alterar Senha</Dropdown.Item>
            <Dropdown.Item onClick={props.logout}>Sair</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </Menu>
  );
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const matchDispatchToProps = dispatch => {
  return {
    signin: (email, passwd) => ActionCreators.signinRequest(email, passwd),
    logout: () => dispatch(ActionCreators.destroyAuthRequest())
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(Header);
