// lib/db.js
// Conexão com PostgreSQL - usa dados reais se DATABASE_URL existir,
// senão usa os dados mock (para desenvolvimento local sem banco)

import { Pool } from 'pg';

let pool = null;

export function getPool() {
  if (!process.env.DATABASE_URL) {
    return null; // Sem banco configurado — usar mockData
  }
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
    });
  }
  return pool;
}

export async function query(text, params) {
  const client = getPool();
  if (!client) {
    throw new Error('Banco de dados não configurado. Use as variáveis de ambiente.');
  }
  const start = Date.now();
  const res = await client.query(text, params);
  const duration = Date.now() - start;
  if (process.env.NODE_ENV === 'development') {
    console.log('Query executada:', { text, duration, rows: res.rowCount });
  }
  return res;
}

// SQL para criar as tabelas (executar uma vez no banco)
export const SQL_SCHEMA = `
-- Usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(200) NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  telefone VARCHAR(20),
  cpf VARCHAR(14),
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Endereços
CREATE TABLE IF NOT EXISTS enderecos (
  id SERIAL PRIMARY KEY,
  usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
  nome_destinatario VARCHAR(200),
  cep VARCHAR(9) NOT NULL,
  logradouro VARCHAR(300),
  numero VARCHAR(20),
  complemento VARCHAR(100),
  bairro VARCHAR(100),
  cidade VARCHAR(100),
  estado CHAR(2),
  principal BOOLEAN DEFAULT false
);

-- Categorias
CREATE TABLE IF NOT EXISTS categorias (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  descricao TEXT,
  icone VARCHAR(10),
  parent_id INT REFERENCES categorias(id),
  ordem INT DEFAULT 0,
  ativo BOOLEAN DEFAULT true
);

-- Produtos
CREATE TABLE IF NOT EXISTS produtos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(300) NOT NULL,
  slug VARCHAR(300) UNIQUE NOT NULL,
  categoria_id INT REFERENCES categorias(id),
  descricao TEXT,
  material VARCHAR(100),
  formato VARCHAR(50),
  cores VARCHAR(50),
  revestimento VARCHAR(100),
  acabamento VARCHAR(100),
  extras TEXT,
  prazo VARCHAR(100),
  preco_m2 DECIMAL(10,2),
  preco_minimo DECIMAL(10,2),
  disponivel BOOLEAN DEFAULT true,
  destaque BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Imagens dos produtos
CREATE TABLE IF NOT EXISTS produto_imagens (
  id SERIAL PRIMARY KEY,
  produto_id INT REFERENCES produtos(id) ON DELETE CASCADE,
  url VARCHAR(500) NOT NULL,
  alt VARCHAR(200),
  ordem INT DEFAULT 0,
  principal BOOLEAN DEFAULT false
);

-- Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id SERIAL PRIMARY KEY,
  usuario_id INT REFERENCES usuarios(id),
  status VARCHAR(50) DEFAULT 'pendente',
  subtotal DECIMAL(10,2),
  frete DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2),
  observacoes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Itens do pedido
CREATE TABLE IF NOT EXISTS pedido_itens (
  id SERIAL PRIMARY KEY,
  pedido_id INT REFERENCES pedidos(id) ON DELETE CASCADE,
  produto_id INT REFERENCES produtos(id),
  nome_produto VARCHAR(300),
  largura DECIMAL(10,3),
  altura DECIMAL(10,3),
  quantidade INT DEFAULT 1,
  preco_unit DECIMAL(10,2),
  preco_total DECIMAL(10,2),
  arquivo_arte VARCHAR(500),
  observacoes TEXT
);

-- Pagamentos
CREATE TABLE IF NOT EXISTS pagamentos (
  id SERIAL PRIMARY KEY,
  pedido_id INT REFERENCES pedidos(id),
  gateway VARCHAR(50) DEFAULT 'mercadopago',
  id_externo VARCHAR(200),
  status VARCHAR(50),
  metodo VARCHAR(50),
  valor DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_produtos_slug ON produtos(slug);
CREATE INDEX IF NOT EXISTS idx_produtos_categoria ON produtos(categoria_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_usuario ON pedidos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_status ON pedidos(status);
`;
