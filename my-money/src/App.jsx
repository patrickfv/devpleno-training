import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Home, Movements } from './pages'
import { Header } from './elements'

const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <div className="container">
        <Route path="/" exact component={Home} />
        <Route path="/movimentacoes/:data" exact component={Movements} />
      </div>
    </BrowserRouter>
  )
}

export default App