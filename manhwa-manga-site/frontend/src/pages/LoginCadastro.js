import React, { useState, useEffect } from 'react';
import './LoginCadastro.css';

function LoginCadastro() {
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre login e cadastro
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });

  // Verifica se já existe um usuário admin, se não, esse será o admin
  const [isFirstUser, setIsFirstUser] = useState(false);

  useEffect(() => {
    // Verifique se é o primeiro usuário, carregando do backend
    // Aqui você faria uma requisição para verificar se já existe um admin
    fetch('/api/verificar-admin')
      .then(response => response.json())
      .then(data => setIsFirstUser(data.isFirstUser));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      // Lógica para login
      console.log('Fazendo login com:', formData);
    } else {
      // Verificando se a senha e a confirmação da senha são iguais
      if (formData.senha !== formData.confirmarSenha) {
        alert('As senhas não coincidem.');
        return;
      }

      // Lógica para cadastro - Definir o usuário admin se for o primeiro
      const tipoUsuario = isFirstUser ? 'admin' : 'comum';
      console.log('Fazendo cadastro com:', { ...formData, tipoUsuario });

      // Chamar o backend para cadastrar o usuário
      fetch('/api/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, tipoUsuario }),
      })
        .then(response => {
          if (response.ok) {
            alert('Cadastro realizado com sucesso');
          } else {
            alert('Erro ao cadastrar');
          }
        })
        .catch(error => alert('Erro ao cadastrar'));
    }
  };

  return (
    <div className="login-cadastro-page">
      <div className="form-container">
        <h1>{isLogin ? 'Login' : 'Cadastro'}</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="nickname">Nickname</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="Digite seu nickname"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Digite sua senha"
              required
            />
          </div>

          {!isLogin && (
            <div className="input-group">
              <label htmlFor="confirmarSenha">Confirmar Senha</label>
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                placeholder="Confirme sua senha"
                required
              />
            </div>
          )}

          <button type="submit">{isLogin ? 'Entrar' : 'Cadastrar'}</button>
        </form>

        {isLogin ? (
          <p onClick={() => setIsLogin(false)} className="toggle-link">
            Não tem uma conta? Cadastre-se
          </p>
        ) : (
          <p onClick={() => setIsLogin(true)} className="toggle-link">
            Já tem uma conta? Faça login
          </p>
        )}
      </div>
    </div>
  );
}

export default LoginCadastro;
