// app/carrinho/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CarrinhoPage() {
  const [carrinho, setCarrinho] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('carrinho') || '[]');
    setCarrinho(items);
    setCarregando(false);
  }, []);

  const removerItem = (id) => {
    const novo = carrinho.filter(item => item.id !== id);
    setCarrinho(novo);
    localStorage.setItem('carrinho', JSON.stringify(novo));
    window.dispatchEvent(new Event('carrinho-atualizado'));
  };

  const limparCarrinho = () => {
    if (confirm('Deseja remover todos os itens do carrinho?')) {
      setCarrinho([]);
      localStorage.setItem('carrinho', '[]');
      window.dispatchEvent(new Event('carrinho-atualizado'));
    }
  };

  const subtotal = carrinho.reduce((acc, item) => acc + (item.preco_total || 0), 0);
  const frete = subtotal > 500 ? 0 : 30;
  const total = subtotal + frete;

  const fmt = (n) => n.toFixed(2).replace('.', ',');

  if (carregando) return (
    <div className="conteudo" style={{ padding: '60px 16px', textAlign: 'center' }}>
      <p>Carregando carrinho...</p>
    </div>
  );

  return (
    <section id="conteudo-corpo">
      <div className="conteudo">
        <nav className="breadcrumb">
          <Link href="/">Início</Link>
          <span>›</span>
          <span>Carrinho</span>
        </nav>

        <h1 className="pagina-titulo">🛒 Meu Carrinho</h1>

        {carrinho.length === 0 ? (
          <div className="carrinho-vazio">
            <div className="icone">🛒</div>
            <h2>Seu carrinho está vazio</h2>
            <p>Adicione produtos para continuar com sua compra.</p>
            <Link href="/" className="btn btn-primario">
              🔍 Ver produtos
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', alignItems: 'start' }}>
            {/* Itens */}
            <div>
              <table className="carrinho-tabela">
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th>Qtd</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {carrinho.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '60px', height: '60px', background: '#f0f0f0',
                            borderRadius: '4px', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', fontSize: '24px', flexShrink: 0,
                          }}>
                            🖨️
                          </div>
                          <div>
                            <p style={{ fontWeight: 700, fontSize: '14px' }}>{item.nome}</p>
                            {item.largura && item.altura && (
                              <p style={{ fontSize: '12px', color: '#888' }}>
                                {item.largura}m × {item.altura}m
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>R$ {fmt(item.preco_m2 || 0)}/m²</td>
                      <td>{item.quantidade}</td>
                      <td style={{ fontWeight: 700, color: 'var(--cor-primaria)' }}>
                        R$ {fmt(item.preco_total || 0)}
                      </td>
                      <td>
                        <button
                          onClick={() => removerItem(item.id)}
                          style={{
                            background: 'none', border: '1px solid #e74c3c',
                            color: '#e74c3c', padding: '4px 10px', borderRadius: '4px',
                            cursor: 'pointer', fontSize: '12px',
                          }}
                          title="Remover item"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                <Link href="/" className="btn btn-outline">← Continuar comprando</Link>
                <button
                  onClick={limparCarrinho}
                  className="btn btn-perigo"
                  style={{ background: 'none', border: '1px solid #e74c3c', color: '#e74c3c' }}
                >
                  🗑️ Limpar carrinho
                </button>
              </div>
            </div>

            {/* Resumo */}
            <div className="carrinho-resumo-box">
              <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>
                📋 Resumo do Pedido
              </h2>

              <div className="carrinho-resumo-linha">
                <span>Subtotal ({carrinho.length} item{carrinho.length !== 1 ? 's' : ''})</span>
                <span>R$ {fmt(subtotal)}</span>
              </div>

              <div className="carrinho-resumo-linha">
                <span>Frete</span>
                <span style={{ color: frete === 0 ? 'var(--cor-primaria)' : 'inherit' }}>
                  {frete === 0 ? '🎉 Grátis' : `R$ ${fmt(frete)}`}
                </span>
              </div>

              {frete > 0 && (
                <p style={{ fontSize: '11px', color: '#888', marginBottom: '8px' }}>
                  Frete grátis para pedidos acima de R$ 500,00
                </p>
              )}

              <div className="carrinho-resumo-total">
                <span>Total</span>
                <span>R$ {fmt(total)}</span>
              </div>

              <Link href="/checkout" className="btn btn-primario btn-block" style={{ marginTop: '16px' }}>
                🔒 Finalizar Pedido
              </Link>

              <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '12px', color: '#888' }}>
                <p>💳 Pix · Cartão · Boleto</p>
                <p>🔒 Pagamento 100% seguro</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
