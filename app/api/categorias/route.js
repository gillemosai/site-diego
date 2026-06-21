// app/api/categorias/route.js
import { NextResponse } from 'next/server';
import { getPool, query } from '@/lib/db';
import { categorias } from '@/lib/mockData';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const raiz = searchParams.get('raiz'); // só categorias pai
  const parentId = searchParams.get('parent_id');

  const pool = getPool();

  if (pool) {
    try {
      if (slug) {
        const res = await query('SELECT * FROM categorias WHERE slug = $1 LIMIT 1', [slug]);
        if (res.rows.length > 0) {
          return NextResponse.json({ categoria: res.rows[0] });
        }
        return NextResponse.json({ erro: 'Categoria não encontrada' }, { status: 404 });
      }

      let sql = 'SELECT * FROM categorias WHERE 1=1';
      let params = [];
      let paramCount = 1;

      if (raiz === '1') {
        sql += ` AND parent_id IS NULL`;
      }
      if (parentId) {
        sql += ` AND parent_id = $${paramCount++}`;
        params.push(parentId);
      }

      sql += ' ORDER BY ordem ASC, nome ASC';

      const res = await query(sql, params);
      return NextResponse.json({ categorias: res.rows, total: res.rows.length });
    } catch (error) {
      console.error('Erro na consulta de categorias no DB:', error);
      return NextResponse.json({ erro: 'Erro no banco de dados' }, { status: 500 });
    }
  } else {
    // Fallback Mock
    let resultado = [...categorias];

    if (slug) {
      const cat = resultado.find(c => c.slug === slug);
      return cat
        ? NextResponse.json({ categoria: cat })
        : NextResponse.json({ erro: 'Categoria não encontrada' }, { status: 404 });
    }

    if (raiz === '1') resultado = resultado.filter(c => !c.parent_id);
    if (parentId) resultado = resultado.filter(c => c.parent_id === parseInt(parentId));

    return NextResponse.json({ categorias: resultado, total: resultado.length });
  }
}
