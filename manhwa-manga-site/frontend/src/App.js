// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';  // Certifique-se de que esse caminho está correto
import Patrocinio from './pages/Patrocinio';  // Página de patrocínio
import LoginCadastro from './pages/LoginCadastro';  // Página de login e cadastro


function App() {
  const [manhwas, setManhwas] = useState([]);

  useEffect(() => {
    // Fazendo a requisição para o back-end
    axios.get('http://localhost:5000/api/obras/manhwas')
      .then(response => {
        setManhwas(response.data); // Atualiza o estado com os dados recebidos
      })
      .catch(error => {
        console.error('Erro ao buscar manhwas:', error);
      });
  }, []);

  return (
    <Router>
      <Header /> {/* Cabeçalho com navegação */}
      <Routes>
        <Route path="/patrocinio" element={<Patrocinio />} /> {/* Rota para patrocínio */}
        <Route path="/login" element={<LoginCadastro />} /> {/* Rota para login e cadastro */}
      </Routes>
    </Router>
  );
}

export default App;
