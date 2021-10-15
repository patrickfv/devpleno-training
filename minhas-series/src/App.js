import React from 'react'
import Header from './Header'
import Genres from './Genres'
import NewGenre from './NewGenre'
import EditGenre from './EditGenre'
import Series from './Series'
import NewSerie from './NewSerie'
import InfoSerie from './InfoSerie'
import Home from './Home'
import { 
  BrowserRouter, 
  Route,
  Switch } from 'react-router-dom'

const App = () => {

  return (
    <BrowserRouter>
    <Header/>
      <div>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/generos' exact component={Genres} />
          <Route path='/generos/novo' exact component={NewGenre} />
          <Route path='/generos/:id' exact component={EditGenre} />
          <Route path='/series' exact component={Series} />
          <Route path='/series/novo' exact component={NewSerie} />
          <Route path='/series/:id' exact component={InfoSerie} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
