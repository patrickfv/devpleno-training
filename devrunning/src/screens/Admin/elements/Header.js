import { connect } from 'react-redux';
import ActionCreators from '../../../redux/actionsCreators';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Header = props => {
  return (
    <Menu>
      <Menu.Item><Image src="/logo.png" size="small"/></Menu.Item>
      <Menu.Item as={Link} to="/admin">Home</Menu.Item>
      <Menu.Item as={Link} to="/admin/users">Usuários</Menu.Item>
      <Menu.Item as={Link} to="/admin/runs">Corridas</Menu.Item>
      <Menu.Item position="right">
        <Dropdown item text={props.auth.user.name}>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/restrito" >Modo: usuário</Dropdown.Item>
            <Dropdown.Item>Minha Conta</Dropdown.Item>
            <Dropdown.Item>Alterar Senha</Dropdown.Item>
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
