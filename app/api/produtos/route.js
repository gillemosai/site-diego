// app/api/produtos/route.js
import { NextResponse } from 'next/server';
import { produtos, getProdutoBySlug } from '@/lib/mockData';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const categoria = searchParams.get('categoria');
  const busca = searchParams.get('b');
  const destaque = searchParams.get('destaque');

  let resultado = [...produtos];

  if (slug) {
    const produto = getProdutoBySlug(slug);
    return produto
      ? NextResponse.json({ produto })
      : NextResponse.json({ erro: 'Produto não encontrado' }, { status: 404 });
  }

  if (categoria) {
    resultado = resultado.filter(p => {
      // Busca por slug de categoria (simplificado)
      return true;
    });
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
