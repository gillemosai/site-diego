// app/conta/cadastro/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CadastroPage() {
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', senha: '', confirmar: '' });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const set = (campo) => (e) => setForm({ ...form, [campo]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (form.senha !== form.confirmar) {
      return setErro('As senhas não coincidem.');
    }
    if (form.senha.length < 6) {
      return setErro('A senha deve ter pelo menos 6 caracteres.');
    }

    setCarregando(true);
    try {
      const res = await fetch('/api/auth/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: form.nome, email: form.email, telefone: form.telefone, senha: form.senha }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErro(data.erro || 'Erro ao cadastrar. Tente novamente.');
      } else {
        setSucesso(true);
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        setTimeout(() => { window.location.href = '/'; }, 2000);
      }
    } catch {
      setErro('Erro de conexão. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  if (sucesso) return (
    <div className="auth-page">
      <div className="auth-card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '60px', marginBottom: '16px' }}>✅</div>
        <h1 className="auth-titulo">Cadastro realizado!</h1>
        <p style={{ color: '#888' }}>Bem-vindo(a)! Redirecionando...</p>
      </div>
    </div>
  );

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: '480px' }}>
        <h1 className="auth-titulo">📝 Criar Conta</h1>
        <p className="auth-subtitulo">Cadastre-se para acompanhar seus pedidos</p>

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
            <label>Nome completo *</label>
            <input type="text" placeholder="Seu nome" value={form.nome} onChange={set('nome')} required />
          </div>

          <div className="form-grupo">
            <label>E-mail *</label>
            <input type="email" placeholder="seu@email.com" value={form.email} onChange={set('email')} required />
          </div>

          <div className="form-grupo">
            <label>Telefone / WhatsApp</label>
            <input type="tel" placeholder="(71) 99999-9999" value={form.telefone} onChange={set('telefone')} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-grupo">
              <label>Senha *</label>
              <input type="password" placeholder="Mínimo 6 caracteres" value={form.senha} onChange={set('senha')} required minLength={6} />
            </div>
            <div className="form-grupo">
              <label>Confirmar senha *</label>
              <input type="password" placeholder="Repita a senha" value={form.confirmar} onChange={set('confirmar')} required />
            </div>
          </div>

          <p style={{ fontSize: '12px', color: '#888', marginBottom: '16px' }}>
            Ao se cadastrar, você concorda com nossos{' '}
            <Link href="/termos" style={{ color: 'var(--cor-primaria)' }}>Termos de Uso</Link> e{' '}
            <Link href="/privacidade" style={{ color: 'var(--cor-primaria)' }}>Política de Privacidade</Link>.
          </p>

          <button type="submit" className="btn btn-primario btn-block" disabled={carregando}>
            {carregando ? '⏳ Cadastrando...' : '✅ Criar minha conta'}
          </button>
        </form>

        <div className="auth-divider"><span>ou</span></div>

        <p style={{ textAlign: 'center', fontSize: '14px' }}>
          Já tem conta?{' '}
          <Link href="/conta/login" className="auth-link">Fazer login</Link>
        </p>
      </div>
    </div>
  );
}
