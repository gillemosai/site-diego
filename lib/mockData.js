// lib/mockData.js
// Dados de demonstração para desenvolvimento local (sem banco de dados)

export const categorias = [
  { id: 1, nome: 'Banners', slug: 'banners', icone: '🖼️', parent_id: null },
  { id: 2, nome: 'Adesivos', slug: 'adesivos', icone: '🏷️', parent_id: null },
  { id: 3, nome: 'Lonas', slug: 'lonas', icone: '🟩', parent_id: null },
  { id: 4, nome: 'DTF', slug: 'dtf', icone: '👕', parent_id: null },
  { id: 5, nome: 'Sublimação', slug: 'sublimacao', icone: '🎨', parent_id: null },
  { id: 6, nome: 'Suprimentos', slug: 'suprimentos', icone: '🛒', parent_id: null },
  { id: 7, nome: 'Papéis', slug: 'papeis', icone: '📄', parent_id: null },
  { id: 8, nome: 'Display LED', slug: 'display-led', icone: '💡', parent_id: null },
  { id: 9, nome: 'Balcão PDV', slug: 'balcao-pdv', icone: '🏪', parent_id: null },
  { id: 10, nome: 'Faixas', slug: 'faixas', icone: '📌', parent_id: null },
  // Subcategorias de Adesivos
  { id: 11, nome: 'Adesivos Especiais', slug: 'adesivos-especiais', icone: '⭐', parent_id: 2 },
  { id: 12, nome: 'Adesivo com Recorte', slug: 'adesivo-com-recorte', icone: '✂️', parent_id: 2 },
];

export const produtos = [
  {
    id: 1,
    nome: 'Banner em Lona 440g',
    slug: 'banner-lona-440g',
    categoria_id: 1,
    descricao: 'Banner de alta qualidade em Lona 440g com impressão digital. Ideal para uso externo e interno.',
    material: 'Lona 440g',
    formato: 'M²',
    cores: '4x0',
    revestimento: '',
    acabamento: 'Madeira e cordinha',
    extras: 'Resistente a intempéries',
    prazo: '2 dias Úteis',
    preco_m2: 50.00,
    preco_minimo: 50.00,
    disponivel: true,
    imagem: null,
    destaque: true,
  },
  {
    id: 2,
    nome: 'Adesivo Vinil Branco Brilho',
    slug: 'adesivo-vinil-branco-brilho',
    categoria_id: 2,
    descricao: 'Adesivo em vinil branco brilho de alta durabilidade. Perfeito para uso em ambientes externos e internos.',
    material: 'Vinil Adesivo',
    formato: 'M²',
    cores: '4x0',
    revestimento: 'Brilho ou Fosco',
    acabamento: 'Sem acabamento',
    extras: 'Adesivo promocional',
    prazo: '1 dia Útil',
    preco_m2: 32.00,
    preco_minimo: 32.00,
    disponivel: true,
    imagem: null,
    destaque: true,
  },
  {
    id: 3,
    nome: 'Lona Impressa 280g',
    slug: 'lona-impressa-280g',
    categoria_id: 3,
    descricao: 'Lona para impressão de curta duração. Excelente custo-benefício para eventos e promoções.',
    material: 'Lona 280g',
    formato: 'M²',
    cores: '4x0',
    revestimento: '',
    acabamento: 'Sem acabamento',
    extras: 'Usada para impressão de curta duração',
    prazo: '1 dia Útil',
    preco_m2: 30.00,
    preco_minimo: 30.00,
    disponivel: true,
    imagem: null,
    destaque: false,
  },
  {
    id: 4,
    nome: 'DTF Transfer 27cm',
    slug: 'dtf-transfer-27cm',
    categoria_id: 4,
    descricao: 'Impressão DTF de alta resolução para transfer em tecidos. Não desbota e é extremamente durável.',
    material: 'Filme DTF',
    formato: 'ML',
    cores: '4x0',
    revestimento: 'Brilho',
    acabamento: 'Transfer',
    extras: 'Compatível com algodão e sintéticos',
    prazo: '1 dia Útil',
    preco_m2: 12.90,
    preco_minimo: 12.90,
    disponivel: true,
    imagem: null,
    destaque: true,
  },
  {
    id: 5,
    nome: 'Papel Sublimático 60gr',
    slug: 'papel-sublimatico-60gr',
    categoria_id: 5,
    descricao: 'Papel sublimático de alta qualidade para impressão por sublimação. Excelente fixação da tinta.',
    material: 'Papel Monolúcido',
    formato: 'M²',
    cores: '',
    revestimento: 'Impressão Sublimação',
    acabamento: '',
    extras: '',
    prazo: '1 dia Útil',
    preco_m2: 8.90,
    preco_minimo: 8.90,
    disponivel: true,
    imagem: null,
    destaque: false,
  },
  {
    id: 6,
    nome: 'Adesivo VOID Anti-Violação com Recorte',
    slug: 'adesivo-void-anti-violacao-recorte',
    categoria_id: 11,
    descricao: 'Adesivo VOID que evidencia tentativa de violação. Com recorte eletrônico a laser.',
    material: 'Vinil Adesivo',
    formato: 'M²',
    cores: '4x0',
    revestimento: 'Brilho ou Fosco',
    acabamento: 'Sem acabamento',
    extras: 'Adesivo de segurança',
    prazo: '1 dia Útil',
    preco_m2: 65.00,
    preco_minimo: 65.00,
    disponivel: true,
    imagem: null,
    destaque: true,
  },
  {
    id: 7,
    nome: 'Lona com Bainha e Ilhós',
    slug: 'lona-com-bainha-ilhos',
    categoria_id: 3,
    descricao: 'Lona 440g com acabamento profissional em bainha e ilhós. Ideal para fachadas e eventos.',
    material: 'Lona 440g',
    formato: 'M²',
    cores: '4x0',
    revestimento: '',
    acabamento: 'Bainha e Ilhós',
    extras: '',
    prazo: '2 dias Úteis',
    preco_m2: 55.00,
    preco_minimo: 55.00,
    disponivel: true,
    imagem: null,
    destaque: false,
  },
  {
    id: 8,
    nome: 'Faixa em Lona 440g',
    slug: 'faixa-lona-440g',
    categoria_id: 10,
    descricao: 'Faixa de lona para uso externo. Alta resistência e cores vivas.',
    material: 'Lona 440g',
    formato: 'M²',
    cores: '4x0',
    revestimento: '',
    acabamento: 'Sem acabamento',
    extras: '',
    prazo: '1 dia Útil',
    preco_m2: 40.00,
    preco_minimo: 40.00,
    disponivel: true,
    imagem: null,
    destaque: false,
  },
];

export function getProdutoBySlug(slug) {
  return produtos.find(p => p.slug === slug) || null;
}

export function getProdutosByCategoria(slug) {
  const cat = categorias.find(c => c.slug === slug);
  if (!cat) return [];
  return produtos.filter(p => p.categoria_id === cat.id);
}

export function getCategoriaBySlug(slug) {
  return categorias.find(c => c.slug === slug) || null;
}

export function getProdutosDestaque() {
  return produtos.filter(p => p.destaque);
}

export function getProdutosRecentes() {
  return produtos.slice(0, 8);
}

export function getCategoriasRaiz() {
  return categorias.filter(c => c.parent_id === null);
}

export function getSubcategorias(parentId) {
  return categorias.filter(c => c.parent_id === parentId);
}
