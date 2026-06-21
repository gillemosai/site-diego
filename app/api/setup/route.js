import { NextResponse } from 'next/server';
import { query, SQL_SCHEMA, getPool } from '@/lib/db';
import { categorias, produtos } from '@/lib/mockData';

export async function GET() {
  const pool = getPool();
  if (!pool) {
    return NextResponse.json(
      { error: 'Banco de dados não configurado. Defina DATABASE_URL.' },
      { status: 500 }
    );
  }

  try {
    // 1. Criar tabelas
    await query(SQL_SCHEMA);

    // 2. Popular categorias se estiver vazio
    const checkCats = await query('SELECT COUNT(*) FROM categorias');
    let categoriasInseridas = 0;
    if (parseInt(checkCats.rows[0].count) === 0) {
      for (const cat of categorias) {
        await query(
          'INSERT INTO categorias (id, nome, slug, icone, parent_id) VALUES ($1, $2, $3, $4, $5)',
          [cat.id, cat.nome, cat.slug, cat.icone, cat.parent_id]
        );
        categoriasInseridas++;
      }
      // Atualizar sequence
      await query('SELECT setval(\'categorias_id_seq\', (SELECT MAX(id) FROM categorias))');
    }

    // 3. Popular produtos se estiver vazio
    const checkProds = await query('SELECT COUNT(*) FROM produtos');
    let produtosInseridos = 0;
    if (parseInt(checkProds.rows[0].count) === 0) {
      for (const p of produtos) {
        await query(
          `INSERT INTO produtos 
          (id, nome, slug, categoria_id, descricao, material, formato, cores, revestimento, acabamento, extras, prazo, preco_m2, preco_minimo, disponivel, destaque) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
          [p.id, p.nome, p.slug, p.categoria_id, p.descricao, p.material, p.formato, p.cores, p.revestimento, p.acabamento, p.extras, p.prazo, p.preco_m2, p.preco_minimo, p.disponivel, p.destaque]
        );
        produtosInseridos++;
      }
      // Atualizar sequence
      await query('SELECT setval(\'produtos_id_seq\', (SELECT MAX(id) FROM produtos))');
    }

    return NextResponse.json({
      success: true,
      message: 'Setup concluído com sucesso.',
      detalhes: {
        tabelas_criadas: true,
        categorias_inseridas: categoriasInseridas,
        produtos_inseridos: produtosInseridos
      }
    });
  } catch (error) {
    console.error('Erro no setup do banco:', error);
    return NextResponse.json(
      { error: 'Falha no setup.', detalhes: error.message },
      { status: 500 }
    );
  }
}
