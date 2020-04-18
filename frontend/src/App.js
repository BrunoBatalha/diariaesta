import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { isAutenticado } from './services/auth';

import Index from './pages/Index';
import Cadastro from './pages/Cadastro';
import Inicio from './pages/Inicio';


const RotaPrivada = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAutenticado() ? (
        <Component {...props} />
      ) :
        (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
    }
  />
);

function App() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Index} />
      <Route path='/cadastro' component={Cadastro} />
      <RotaPrivada path='/inicio' component={Inicio} />
    </BrowserRouter>
  );
}

export default App;
