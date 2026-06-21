// app/page.js — Homepage
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  getCategoriasRaiz,
  getProdutosDestaque,
  getProdutosRecentes,
} from '@/lib/mockData';

// ─── HERO SLIDER ─────────────────────────────────────────────
const slides = [
  {
    classe: 'slide-placeholder-1',
    titulo: 'Impressão <em>DTF Transfer</em>',
    subtitulo: 'Alta resolução para tecidos — do simples ao complexo',
    cta: { texto: '🎨 Ver produtos DTF', href: '/categoria/dtf' },
  },
  {
    classe: 'slide-placeholder-2',
    titulo: '<em>Banners e Lonas</em> com qualidade',
    subtitulo: 'Para eventos, fachadas e promoções — entrega rápida',
    cta: { texto: '🖼️ Ver Banners', href: '/categoria/banners' },
  },
  {
    classe: 'slide-placeholder-3',
    titulo: 'Adesivos <em>sob medida</em>',
    subtitulo: 'Vinil, VOID, com recorte eletrônico e muito mais',
    cta: { texto: '🏷️ Ver Adesivos', href: '/categoria/adesivos' },
  },
  {
    classe: 'slide-placeholder-4',
    titulo: '<em>Sublimação</em> de alta definição',
    subtitulo: 'Papéis e tecidos para sublimação profissional',
    cta: { texto: '🎨 Ver Sublimação', href: '/categoria/sublimacao' },
  },
];

function HeroSlider() {
  const [atual, setAtual] = useState(0);
  const timerRef = useRef(null);

  const ir = (idx) => {
    setAtual((idx + slides.length) % slides.length);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => ir(atual + 1), 5000);
    return () => clearInterval(timerRef.current);
  }, [atual]);

  return (
    <div className="slide-principal">
      <div className="slide-track" style={{ transform: `translateX(-${atual * 100}%)` }}>
        {slides.map((s, i) => (
          <div key={i} className={`slide-item slide-placeholder ${s.classe}`}>
            <div className="slide-conteudo">
              <h2 dangerouslySetInnerHTML={{ __html: s.titulo }} />
              <p>{s.subtitulo}</p>
              <Link href={s.cta.href} className="btn btn-primario">
                {s.cta.texto}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button className="slide-seta slide-seta-esq" onClick={() => ir(atual - 1)} aria-label="Anterior">
        ‹
      </button>
      <button className="slide-seta slide-seta-dir" onClick={() => ir(atual + 1)} aria-label="Próximo">
        ›
      </button>

      <div className="slide-pontos">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`slide-ponto ${i === atual ? 'ativo' : ''}`}
            onClick={() => ir(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── CARD DE PRODUTO ─────────────────────────────────────────
function ProdutoCard({ produto }) {
  return (
    <Link href={`/produto/${produto.slug}`} className="vitrine-produto">
      <div className="vitrine-produto-imagem">
        {produto.imagem ? (
          <img src={produto.imagem} alt={produto.nome} />
        ) : (
          <div className="vitrine-produto-img-placeholder">🖨️</div>
        )}
      </div>

      <h3 className="vitrine-produto-titulo texto-cor-primaria">
        {produto.nome}
      </h3>

      <div className="vitrine-produto-descricao">
        {produto.formato && <span>📐 {produto.formato}</span>}
        {produto.cores && <span>🎨 {produto.cores}</span>}
        {produto.material && <span>📦 {produto.material}</span>}
        {produto.revestimento && <span>✨ {produto.revestimento}</span>}
        {produto.acabamento && <span>🔧 {produto.acabamento}</span>}
      </div>

      {produto.prazo && (
        <p className="vitrine-produto-prazo">⏱️ Produção: {produto.prazo}</p>
      )}

      <div className="vitrine-produto-preco">
        {produto.disponivel ? (
          <>
            <p className="vitrine-produto-preco-info">A partir de</p>
            <p className="vitrine-produto-preco-atual texto-cor-primaria">
              R$ {produto.preco_m2?.toFixed(2).replace('.', ',')}
              <sup className="vitrine-produto-preco-texto">/{produto.formato || 'un'}</sup>
            </p>
          </>
        ) : (
          <div className="produto-indisponivel">
            <p>⚠️ Indisponível</p>
            <p>Produto sem estoque</p>
          </div>
        )}
      </div>

      <div className="vitrine-produto-comprar">
        <span>＋</span> Detalhes
      </div>
    </Link>
  );
}

// ─── SIDEBAR CATEGORIAS ───────────────────────────────────────
function SidebarCategorias() {
  const cats = getCategoriasRaiz();
  return (
    <nav className="vitrine-categorias">
      <div className="vitrine-categorias-titulo">
        <h2>Linha de produtos</h2>
      </div>
      <ul>
        {cats.map((cat) => (
          <li key={cat.id}>
            <Link href={`/categoria/${cat.slug}`}>
              {cat.icone} {cat.nome}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── HOMEPAGE ─────────────────────────────────────────────────
export default function HomePage() {
  const destaques = getProdutosDestaque();
  const recentes = getProdutosRecentes();

  return (
    <>
      <HeroSlider />

      <section id="conteudo-corpo">
        <header style={{ display: 'none' }}>
          <h1>SiteDiego — Impressão Digital</h1>
        </header>

        <div className="vitrine-layout">
          {/* Sidebar esquerda */}
          <aside className="vitrine-coluna-esquerda">
            <SidebarCategorias />

            {/* Banner lateral de destaque */}
            <div style={{
              background: 'linear-gradient(135deg, var(--cor-primaria), var(--cor-primaria-hover))',
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center',
              color: '#fff',
              marginTop: '12px',
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>💬</div>
              <p style={{ fontWeight: 700, marginBottom: '4px' }}>Fale conosco!</p>
              <p style={{ fontSize: '12px', opacity: 0.9, marginBottom: '12px' }}>
                Tire suas dúvidas pelo WhatsApp
              </p>
              <a
                href="https://wa.me/5571999111640"
                target="_blank"
                rel="noopener"
                style={{
                  display: 'inline-block',
                  background: '#fff',
                  color: 'var(--cor-primaria)',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontWeight: 700,
                  fontSize: '13px',
                  textDecoration: 'none',
                }}
              >
                WhatsApp
              </a>
            </div>
          </aside>

          {/* Conteúdo principal */}
          <div className="vitrine-coluna-direita">
            {/* Banner de boas-vindas */}
            <div style={{
              background: 'linear-gradient(135deg, #0f0f0f, #1a472a)',
              borderRadius: '8px',
              padding: '28px 32px',
              marginBottom: '24px',
              color: '#fff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
            }}>
              <div>
                <h2 style={{ fontSize: '22px', marginBottom: '6px' }}>
                  🖨️ Terceirize sua <span style={{ color: 'var(--cor-primaria)' }}>impressão digital</span>
                </h2>
                <p style={{ color: '#aaa', fontSize: '14px' }}>
                  Agilidade, qualidade e preço justo para seu negócio crescer
                </p>
              </div>
              <Link href="/conta/cadastro" className="btn btn-primario">
                📝 Criar conta grátis
              </Link>
            </div>

            {/* Vantagens */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '12px',
              marginBottom: '24px',
            }}>
              {[
                { icone: '⚡', titulo: 'Entrega Rápida', desc: 'Prazo a partir de 1 dia útil' },
                { icone: '🔒', titulo: 'Compra Segura', desc: 'Pagamento 100% protegido' },
                { icone: '📦', titulo: 'Frete Grátis', desc: 'Para pedidos acima de R$500' },
                { icone: '🎨', titulo: 'Alta Qualidade', desc: 'Equipamentos de última geração' },
              ].map((v, i) => (
                <div key={i} style={{
                  background: '#fff', border: '1px solid #ddd', borderRadius: '6px',
                  padding: '14px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '6px' }}>{v.icone}</div>
                  <p style={{ fontWeight: 700, fontSize: '13px', marginBottom: '2px' }}>{v.titulo}</p>
                  <p style={{ fontSize: '11px', color: '#888' }}>{v.desc}</p>
                </div>
              ))}
            </div>

            {/* Ofertas especiais */}
            {destaques.length > 0 && (
              <>
                <div className="vitrine-secao-titulo">
                  <span>⏰</span> Ofertas especiais
                </div>
                <div className="vitrine-carrossel-wrap mb-20">
                  <div className="vitrine-carrossel">
                    {destaques.map((p) => (
                      <ProdutoCard key={p.id} produto={p} />
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Veja também */}
            <div className="vitrine-secao-titulo">
              <span>⭐</span> Veja também
            </div>
            <div className="vitrine-grid">
              {recentes.map((p) => (
                <ProdutoCard key={p.id} produto={p} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
