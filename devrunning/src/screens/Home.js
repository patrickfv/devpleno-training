import React from 'react';
import Header from '../Header';
import { Image } from 'semantic-ui-react';

class Home extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <h1>Seja Bem-Vindo!</h1>
        <Image src="/logo-home.png" size="medium"/>
      </div>
    );
  }
}

export default Home;
