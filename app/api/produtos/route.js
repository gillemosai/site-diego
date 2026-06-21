// app/api/produtos/route.js
import { NextResponse } from 'next/server';
import { getPool, query } from '@/lib/db';
import { produtos, getProdutoBySlug } from '@/lib/mockData';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const categoria = searchParams.get('categoria');
  const busca = searchParams.get('b');
  const destaque = searchParams.get('destaque');

  const pool = getPool();

  if (pool) {
    // Usar PostgreSQL
    try {
      if (slug) {
        const res = await query('SELECT * FROM produtos WHERE slug = $1 LIMIT 1', [slug]);
        if (res.rows.length > 0) {
          return NextResponse.json({ produto: res.rows[0] });
        }
        return NextResponse.json({ erro: 'Produto não encontrado' }, { status: 404 });
      }

      let sql = 'SELECT * FROM produtos WHERE 1=1';
      let params = [];
      let paramCount = 1;

      if (categoria) {
        // Obter id da categoria
        const catRes = await query('SELECT id FROM categorias WHERE slug = $1 LIMIT 1', [categoria]);
        if (catRes.rows.length > 0) {
          sql += ` AND categoria_id = $${paramCount++}`;
          params.push(catRes.rows[0].id);
        } else {
          return NextResponse.json({ produtos: [], total: 0 });
        }
      }

      if (destaque === '1') {
        sql += ` AND destaque = true`;
      }

      if (busca) {
        sql += ` AND (nome ILIKE $${paramCount} OR descricao ILIKE $${paramCount} OR material ILIKE $${paramCount})`;
        params.push(`%${busca}%`);
        paramCount++;
      }

      sql += ' ORDER BY created_at DESC';

      const res = await query(sql, params);
      return NextResponse.json({ produtos: res.rows, total: res.rows.length });
    } catch (error) {
      console.error('Erro na consulta de produtos no DB:', error);
      return NextResponse.json({ erro: 'Erro no banco de dados' }, { status: 500 });
    }
  } else {
    // Fallback para Mock
    let resultado = [...produtos];

    if (slug) {
      const produto = getProdutoBySlug(slug);
      return produto
        ? NextResponse.json({ produto })
        : NextResponse.json({ erro: 'Produto não encontrado' }, { status: 404 });
    }

    if (categoria) {
      resultado = resultado.filter(p => true); // simplificado no mock
    }

    if (destaque === '1') {
      resultado = resultado.filter(p => p.destaque);
    }

    if (busca) {
      const termo = busca.toLowerCase();
      resultado = resultado.filter(p =>
        p.nome.toLowerCase().includes(termo) ||
        (p.descricao && p.descricao.toLowerCase().includes(termo)) ||
        (p.material && p.material.toLowerCase().includes(termo))
      );
    }

    return NextResponse.json({
      produtos: resultado,
      total: resultado.length,
    });
  }
}
