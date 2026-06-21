// app/categoria/[slug]/page.js
import Link from 'next/link';
import { getCategoriaBySlug, getProdutosByCategoria, getCategoriasRaiz } from '@/lib/mockData';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cat = getCategoriaBySlug(slug);
  if (!cat) return { title: 'Categoria não encontrada' };
  return {
    title: `${cat.nome} — SiteDiego`,
    description: `Produtos na categoria ${cat.nome}. Impressão digital de qualidade com entrega rápida.`,
  };
}

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
      <h3 className="vitrine-produto-titulo texto-cor-primaria">{produto.nome}</h3>
      <div className="vitrine-produto-descricao">
        {produto.material && <span>📦 {produto.material}</span>}
        {produto.formato && <span>📐 {produto.formato}</span>}
        {produto.acabamento && <span>🔧 {produto.acabamento}</span>}
      </div>
      {produto.prazo && <p className="vitrine-produto-prazo">⏱️ {produto.prazo}</p>}
      <div className="vitrine-produto-preco">
        {produto.disponivel ? (
          <>
            <p className="vitrine-produto-preco-info">A partir de</p>
            <p className="vitrine-produto-preco-atual texto-cor-primaria">
              R$ {produto.preco_m2?.toFixed(2).replace('.', ',')}
              <sup>/{produto.formato || 'un'}</sup>
            </p>
          </>
        ) : (
          <div className="produto-indisponivel">
            <p>⚠️ Indisponível</p>
            <p>Sem estoque</p>
          </div>
        )}
      </div>
      <div className="vitrine-produto-comprar">＋ Detalhes</div>
    </Link>
  );
}

export default async function CategoriaPage({ params }) {
  const { slug } = await params;
  const categoria = getCategoriaBySlug(slug);
  if (!categoria) notFound();

  const produtos = getProdutosByCategoria(slug);
  const categorias = getCategoriasRaiz();

  return (
    <section id="conteudo-corpo">
      <div className="vitrine-layout">
        {/* Sidebar */}
        <aside className="vitrine-coluna-esquerda">
          <nav className="vitrine-categorias">
            <div className="vitrine-categorias-titulo">
              <h2>Categorias</h2>
            </div>
            <ul>
              {categorias.map((cat) => (
                <li key={cat.id} className={cat.slug === slug ? 'ativo' : ''}>
                  <Link href={`/categoria/${cat.slug}`}>
                    {cat.icone} {cat.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Conteúdo */}
        <div className="vitrine-coluna-direita">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link href="/">Início</Link>
            <span className="breadcrumb-sep">›</span>
            <span>{categoria.nome}</span>
          </nav>

          <h1 className="pagina-titulo">{categoria.icone} {categoria.nome}</h1>

          {produtos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#888' }}>
              <div style={{ fontSize: '60px', marginBottom: '16px' }}>📦</div>
              <h2 style={{ marginBottom: '8px' }}>Nenhum produto nesta categoria</h2>
              <p style={{ marginBottom: '20px' }}>Em breve novos produtos serão adicionados.</p>
              <Link href="/" className="btn btn-primario">← Voltar ao início</Link>
            </div>
          ) : (
            <>
              <p style={{ marginBottom: '20px', color: '#888', fontSize: '13px' }}>
                {produtos.length} produto{produtos.length !== 1 ? 's' : ''} encontrado{produtos.length !== 1 ? 's' : ''}
              </p>
              <div className="vitrine-grid">
                {produtos.map((p) => (
                  <ProdutoCard key={p.id} produto={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
