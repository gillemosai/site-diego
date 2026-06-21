// app/conta/login/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', senha: '' });
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setErro(data.erro || 'Credenciais inválidas');
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        window.location.href = '/conta/pedidos';
      }
    } catch {
      setErro('Erro de conexão. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-titulo">👤 Entrar</h1>
        <p className="auth-subtitulo">Acesse sua conta para ver seus pedidos</p>

        <form onSubmit={handleSubmit}>
          {erro && (
            <div style={{
              background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px',
              padding: '10px 14px', color: '#dc2626', fontSize: '13px', marginBottom: '16px',
            }}>
              ⚠️ {erro}
            </div>
          )}

          <div className="form-grupo">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-grupo">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="••••••••"
              value={form.senha}
              onChange={(e) => setForm({ ...form, senha: e.target.value })}
              required
              autoComplete="current-password"
            />
          </div>

          <div style={{ textAlign: 'right', marginBottom: '16px' }}>
            <Link href="/conta/esqueci-senha" style={{ fontSize: '13px', color: 'var(--cor-primaria)' }}>
              Esqueci minha senha
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-primario btn-block"
            disabled={carregando}
          >
            {carregando ? '⏳ Entrando...' : '🔓 Entrar'}
          </button>
        </form>

        <div className="auth-divider">
          <span>ou</span>
        </div>

        <p style={{ textAlign: 'center', fontSize: '14px' }}>
          Não tem conta?{' '}
          <Link href="/conta/cadastro" className="auth-link">
            Cadastre-se grátis
          </Link>
        </p>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link href="/" style={{ fontSize: '13px', color: '#888' }}>
            ← Continuar comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
