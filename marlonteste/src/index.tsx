import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import Cadastro from './pages/Cadastro';
import Formulario from './pages/Formulario';
import CadastroEndereco from './pages/CadastroEndereco';
import Teste from './pages/teste';

ReactDOM.render(
  <React.StrictMode>
    <Cadastro />
  </React.StrictMode>,
  document.getElementById('root')
);
