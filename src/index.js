import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import jogo404 from './components/Error404/jogo';

function CadastroVideo() {
  return(
    <div>
      Página de Cadastro de Video
    </div>
  )
}
 
ReactDOM.render(
 <BrowserRouter>
  <Switch>
    <Route path="/cadastro/video" component={CadastroVideo} />
    <Route path="/" component={App} exact/>
    <Route component={jogo404} />
  </Switch>
 </BrowserRouter>,
  document.getElementById('root')
);

