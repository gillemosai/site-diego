// app/api/categorias/route.js
import { NextResponse } from 'next/server';
import { categorias } from '@/lib/mockData';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const raiz = searchParams.get('raiz'); // só categorias pai
  const parentId = searchParams.get('parent_id');

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
