import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/HomePage';
import About from './pages/AboutPage';
import Pokedex from './pages/PokedexPage';
import NotFound from './pages/NotFoundPage';
import Header from './components/common/Header';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/pokedex' component={Pokedex} />
          <Route component={NotFound} />
        </Switch>
      </>
    );
  }
}

export default App;
