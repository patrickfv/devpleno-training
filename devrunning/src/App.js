import './App.css';
import store from './redux';
import Header from './Header';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import Restrito from './screens/Restrito';
import Admin from './screens/Admin';
import CreateAccount from './screens/CreateAccount';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Container>
           <Route exact path="/" component={Home} />
           <Route path="/admin" component={Admin} />
           <Route path="/restrito" component={Restrito} />
           <Route path="/login" component={Login} />
           <Route path="/create-account" component={CreateAccount} />
        </Container>
      </Router>
    </Provider>
  );
}

export default App;
