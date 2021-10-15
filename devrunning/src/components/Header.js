import React from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import ActionCreators from '../redux/actionsCreators';

export default connect(mapStateToProps, mapDispatchToProps)(
  function ({ items, account, logout, auth, location, logo }) {

    const RenderAccount = () => (
      <Menu.Menu position="right">
        { auth.isAuth 
          ? 
          <Dropdown item text={auth.user.name}>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to={`${location}/account`}>Minha Conta</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to={`${location}/change-pass`}>Alterar Senha</Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={logout}>Sair</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          :
          <Menu.Item>
            <Link to='/login'>Entrar</Link>
          </Menu.Item>
        }
      </Menu.Menu>
    );

    return (
      <Menu>
        { logo && <Menu.Item as={Link} to={logo.to}><Image src={logo.src} size={logo.size} /></Menu.Item> }
        {
          items.map((item, index) => {
            return <Menu.Item key={index} as={Link} to={item.to}>{item.text}</Menu.Item>
          })
        }
        { 
          account ? <RenderAccount /> : null
        }
      </Menu>
    );
  });

function mapStateToProps(state) {
  return { auth: state.auth }
}

function mapDispatchToProps(dispatch) {
  return {
    signin: (email, passwd) => dispatch(ActionCreators.signinRequest(email, passwd)),
    logout: () => dispatch(ActionCreators.destroyAuthRequest())
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Header);
