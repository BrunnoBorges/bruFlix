import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home'
import CadastroVideo from './pages/Cadastro/Videos';
import jogo404 from './components/Error404/jogo';
import CadastroCategoria from './pages/Cadastro/Categoria';
import './index.css';


ReactDOM.render(
 <BrowserRouter>
  <Switch>
    <Route path="/" component={Home} exact/>
    <Route path="/cadastro/video" component={CadastroVideo} />
    <Route path="/cadastro/categoria" component={CadastroCategoria} />
    <Route component={jogo404} />
  </Switch>
 </BrowserRouter>,
  document.getElementById('root')
);

