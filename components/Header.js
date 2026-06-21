// components/Header.js
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { categorias } from '@/lib/mockData';

export default function Header() {
  const [busca, setBusca] = useState('');
  const [qtdCarrinho, setQtdCarrinho] = useState(0);
  const [totalCarrinho, setTotalCarrinho] = useState('0,00');

  useEffect(() => {
    const atualizarCarrinho = () => {
      try {
        const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
        const qtd = carrinho.reduce((acc, item) => acc + (item.quantidade || 1), 0);
        const total = carrinho.reduce((acc, item) => acc + (item.preco_total || 0), 0);
        setQtdCarrinho(qtd);
        setTotalCarrinho(total.toFixed(2).replace('.', ','));
      } catch {}
    };
    atualizarCarrinho();
    window.addEventListener('carrinho-atualizado', atualizarCarrinho);
    return () => window.removeEventListener('carrinho-atualizado', atualizarCarrinho);
  }, []);

  const handleBusca = (e) => {
    e.preventDefault();
    if (busca.trim().length >= 2) {
      window.location.href = `/?b=${encodeURIComponent(busca)}`;
    }
  };

  const categoriasPrincipais = categorias.filter(c => c.parent_id === null).slice(0, 8);

  return (
    <>
      <header id="cabecalho-geral">
        {/* Topo com links de conta */}
        <div className="cabecalho-topo">
          <div className="conteudo">
            <span>📞 (71) 2102-6000</span>
            <nav className="cabecalho-topo-menu">
              <li>
                <Link href="/conta/pedidos">📋 Meus Pedidos</Link>
              </li>
              <span className="divisor">|</span>
              <li>
                <Link href="/conta/login">👤 Login</Link>
              </li>
              <span className="divisor">|</span>
              <li>
                <Link href="/conta/cadastro">📝 Cadastre-se</Link>
              </li>
            </nav>
          </div>
        </div>

        {/* Linha principal: Logo + Busca + Carrinho */}
        <div className="cabecalho-conteudo-linha">
          {/* Logo */}
          <div className="cabecalho-logotipo">
            <Link href="/" style={{ display: 'flex', alignItems: 'center', background: '#fff', padding: '6px 12px', borderRadius: '8px' }}>
              <img src="/logo-rei.png" alt="Rei das Impressões" style={{ maxHeight: '70px', objectFit: 'contain' }} />
            </Link>
          </div>

          {/* Busca */}
          <form className="cabecalho-barra-busca" onSubmit={handleBusca}>
            <input
              type="text"
              placeholder="Buscar produto..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              minLength={2}
              autoComplete="off"
            />
            <button type="submit" aria-label="Buscar">
              🔍
            </button>
          </form>

          {/* Ações */}
          <div className="cabecalho-acoes">
            <Link href="/conta/login" className="cabecalho-btn-conta">
              👤 <span className="conta-texto">Minha Conta</span>
            </Link>

            <Link href="/carrinho" className="cabecalho-btn-carrinho">
              <div className="carrinho-icone-wrap">
                🛒
                {qtdCarrinho > 0 && (
                  <span className="carrinho-badge">{qtdCarrinho}</span>
                )}
              </div>
              <div className="carrinho-texto">
                <p>Meu Carrinho</p>
                <span>{qtdCarrinho} itens / R$ {totalCarrinho}</span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Menu de categorias */}
      <nav id="menu-navegacao">
        <ul className="menu-nav-lista">
          <li><Link href="/">Início</Link></li>
          {categoriasPrincipais.map(cat => (
            <li key={cat.id}>
              <Link href={`/categoria/${cat.slug}`}>
                {cat.nome}
              </Link>
            </li>
          ))}
          <li><Link href="/contato">Contato</Link></li>
        </ul>
      </nav>
    </>
  );
}
