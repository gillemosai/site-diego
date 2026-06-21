// app/produto/[slug]/page.js
'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { getProdutoBySlug } from '@/lib/mockData';
import { notFound } from 'next/navigation';

// Calculadora de preço por m²
function Calculadora({ precoPorM2, formatoUnidade }) {
  const [largura, setLargura] = useState('');
  const [altura, setAltura] = useState('');
  const [quantidade, setQtd] = useState(1);

  const area = parseFloat(largura || 0) * parseFloat(altura || 0);
  const precoPorUnidade = area * precoPorM2;
  const precoTotal = precoPorUnidade * quantidade;
  const temDimensoes = area > 0;

  return (
    <div className="calculadora">
      <h3>📐 Calculadora de Preço</h3>

      <div className="calculadora-linha">
        <div className="calculadora-campo">
          <label>Largura (metros)</label>
          <input
            type="number"
            placeholder="Ex: 1.00"
            value={largura}
            onChange={(e) => setLargura(e.target.value)}
            min="0.01"
            step="0.01"
          />
        </div>
        <div className="calculadora-campo">
          <label>Altura (metros)</label>
          <input
            type="number"
            placeholder="Ex: 0.50"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            min="0.01"
            step="0.01"
          />
        </div>
        <div className="calculadora-campo">
          <label>Quantidade</label>
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQtd(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
          />
        </div>
      </div>

      {temDimensoes ? (
        <div className="calculadora-resultado">
          <p className="preco-label">
            Área: {area.toFixed(2)}m² × {quantidade} un = {(area * quantidade).toFixed(2)}m² total
          </p>
          <p className="preco-total">
            R$ {precoTotal.toFixed(2).replace('.', ',')}
          </p>
          <p className="preco-label">
            R$ {precoPorM2.toFixed(2).replace('.', ',')}/{formatoUnidade || 'm²'} por unidade
          </p>
        </div>
      ) : (
        <div style={{
          background: '#f0f0f0', borderRadius: '4px', padding: '12px',
          textAlign: 'center', color: '#888', fontSize: '13px', marginTop: '12px',
        }}>
          👆 Informe as dimensões para calcular o preço
        </div>
      )}

      {temDimensoes && (
        <div style={{ marginTop: '12px', fontSize: '12px', color: '#888' }}>
          ℹ️ Preço estimado. O valor final pode variar conforme configurações adicionais.
        </div>
      )}
    </div>
  );
}

export default function ProdutoPage({ params }) {
  const { slug } = use(params);
  const produto = getProdutoBySlug(slug);

  if (!produto) notFound();

  const adicionarCarrinho = () => {
    try {
      const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
      const item = {
        id: Date.now(),
        produto_id: produto.id,
        nome: produto.nome,
        slug: produto.slug,
        preco_m2: produto.preco_m2,
        quantidade: 1,
        preco_total: produto.preco_minimo,
      };
      carrinho.push(item);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      window.dispatchEvent(new Event('carrinho-atualizado'));
      alert('✅ Produto adicionado ao carrinho!');
    } catch {
      alert('Erro ao adicionar ao carrinho.');
    }
  };

  return (
    <section id="conteudo-corpo">
      <div className="conteudo">
        {/* Breadcrumb */}
        <nav className="breadcrumb" style={{ marginBottom: '20px' }}>
          <Link href="/">Início</Link>
          <span>›</span>
          <Link href="/categoria/banners">Categoria</Link>
          <span>›</span>
          <span>{produto.nome}</span>
        </nav>

        {/* Layout do produto */}
        <div className="produto-pagina">
          {/* Imagem */}
          <div className="produto-pagina-imagens">
            <div className="produto-imagem-principal">
              {produto.imagem ? (
                <img src={produto.imagem} alt={produto.nome} />
              ) : (
                <div style={{
                  width: '100%', aspectRatio: '1',
                  background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '100px',
                }}>
                  🖨️
                </div>
              )}
            </div>
          </div>

          {/* Detalhes */}
          <div className="produto-pagina-detalhes">
            <h1 className="produto-pagina-titulo">{produto.nome}</h1>

            <div className="produto-pagina-preco">
              <span className="produto-pagina-preco-info" style={{ fontSize: '14px', color: '#888', display: 'block', marginBottom: '4px' }}>
                A partir de
              </span>
              R$ {produto.preco_m2?.toFixed(2).replace('.', ',')}
              <sup style={{ fontSize: '14px' }}>/{produto.formato || 'm²'}</sup>
            </div>

            {/* Especificações */}
            <div style={{
              background: '#f8f9fa', borderRadius: '6px', padding: '16px',
              marginBottom: '20px', fontSize: '13px',
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {produto.material && (
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '6px 0', color: '#888', width: '40%' }}>📦 Material</td>
                      <td style={{ padding: '6px 0', fontWeight: 700 }}>{produto.material}</td>
                    </tr>
                  )}
                  {produto.formato && (
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '6px 0', color: '#888' }}>📐 Formato</td>
                      <td style={{ padding: '6px 0', fontWeight: 700 }}>{produto.formato}</td>
                    </tr>
                  )}
                  {produto.cores && (
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '6px 0', color: '#888' }}>🎨 Cores</td>
                      <td style={{ padding: '6px 0', fontWeight: 700 }}>{produto.cores}</td>
                    </tr>
                  )}
                  {produto.revestimento && (
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '6px 0', color: '#888' }}>✨ Revestimento</td>
                      <td style={{ padding: '6px 0', fontWeight: 700 }}>{produto.revestimento}</td>
                    </tr>
                  )}
                  {produto.acabamento && (
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '6px 0', color: '#888' }}>🔧 Acabamento</td>
                      <td style={{ padding: '6px 0', fontWeight: 700 }}>{produto.acabamento}</td>
                    </tr>
                  )}
                  {produto.prazo && (
                    <tr>
                      <td style={{ padding: '6px 0', color: '#888' }}>⏱️ Prazo</td>
                      <td style={{ padding: '6px 0', fontWeight: 700, color: '#56B544' }}>{produto.prazo}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Calculadora */}
            {produto.formato === 'M²' && (
              <Calculadora
                precoPorM2={produto.preco_m2}
                formatoUnidade={produto.formato}
              />
            )}

            {/* Botão comprar */}
            {produto.disponivel ? (
              <button className="produto-botao-comprar" onClick={adicionarCarrinho}>
                🛒 Adicionar ao Carrinho
              </button>
            ) : (
              <div style={{
                padding: '14px', background: '#f5f5f5', borderRadius: '4px',
                textAlign: 'center', color: '#e74c3c', fontWeight: 700,
              }}>
                ⚠️ Produto indisponível
              </div>
            )}

            <Link
              href="https://wa.me/5571999111640"
              target="_blank"
              className="btn btn-outline btn-block mt-10"
            >
              💬 Tirar dúvidas pelo WhatsApp
            </Link>

            {/* Segurança */}
            <div style={{
              display: 'flex', gap: '16px', marginTop: '20px',
              padding: '12px', background: '#f8f9fa', borderRadius: '6px',
              fontSize: '12px', color: '#888',
            }}>
              <span>🔒 Compra segura</span>
              <span>💳 Pix / Cartão / Boleto</span>
              <span>📦 Embalagem protegida</span>
            </div>
          </div>
        </div>

        {/* Descrição completa */}
        {produto.descricao && (
          <div style={{
            background: '#fff', border: '1px solid #ddd', borderRadius: '8px',
            padding: '24px', marginTop: '32px',
          }}>
            <h2 style={{ fontSize: '18px', marginBottom: '12px', borderBottom: '2px solid #56B544', paddingBottom: '8px' }}>
              📋 Descrição do produto
            </h2>
            <p style={{ lineHeight: 1.8, color: '#444' }}>{produto.descricao}</p>
          </div>
        )}

        <div style={{ marginTop: '24px' }}>
          <Link href="/" className="btn btn-outline">
            ← Continuar comprando
          </Link>
        </div>
      </div>
    </section>
  );
}
