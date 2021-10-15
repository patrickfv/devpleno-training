import { connect } from 'react-redux';
import ActionCreators from './redux/actionsCreators';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Header = props => {
  return (
    <Menu>
        <Menu.Item><Image src="/logo.png" size="small"/></Menu.Item>
        <Menu.Item as={Link} to="/">Home</Menu.Item>
        <Menu.Item as={Link} to="/create-account">Criar Conta</Menu.Item>
        <Menu.Item as={Link} to="/login">Login</Menu.Item>
        { props.auth.isAuth &&
          <Menu.Item position="right">
            <Dropdown item text={props.auth.user.name}>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/restrito/my-account">Minha Conta</Dropdown.Item>
                <Dropdown.Item as={Link} to="/restrito/Change-pass">Alterar Senha</Dropdown.Item>
                <Dropdown.Item onClick={props.logout}>Sair</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        }
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
    signin: (email, passwd) => ActionCreators.signinRequest(email, passwd)
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(Header);
