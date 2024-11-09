// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';  // Importando o Font Awesome
import './Header.css'; // Importando o CSS para o Header

function Header() {
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);  // Alterna a visibilidade da barra de pesquisa
  };

  return (
    <header className="header">
      <div className="logo">
        {/* Ícone de livro com link para página de obras */}
        <Link to="/obras">
          <i className="fa fa-book"></i>  {/* Ícone de livro */}
        </Link>
      </div>
      <div className="nav">
        {/* Links de navegação */}
        <Link to="/patrocinio" className="nav-item">Patrocínio</Link>
        <Link to="/login" className="nav-item">Login</Link> {/* Link para a página de login */}
        <Link to="/login/leitor" className="nav-item">Login Leitor</Link>
        <Link to="/login/autor" className="nav-item">Login Autor</Link>
      </div>

      {/* Barra de pesquisa */}
      <div className="search-container">
        <button onClick={toggleSearch} className="search-icon">
          <i className="fa fa-search"></i> {/* Ícone de pesquisa */}
        </button>
        {searchVisible && (
          <input type="text" placeholder="Pesquisar..." className="search-input" />
        )}
      </div>
    </header>
  );
}

export default Header;
