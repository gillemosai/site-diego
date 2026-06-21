// app/api/pedidos/route.js
import { NextResponse } from 'next/server';

// ── GET — listar pedidos do usuário ──────────────────────────────
export async function GET(request) {
  const userId = request.headers.get('x-user-id');

  // Em produção: buscar no banco
  // const { rows } = await query(
  //   `SELECT p.*, json_agg(pi.*) as itens FROM pedidos p
  //    LEFT JOIN pedido_itens pi ON pi.pedido_id = p.id
  //    WHERE p.usuario_id = $1
  //    GROUP BY p.id ORDER BY p.created_at DESC`,
  //   [userId]
  // );

  // Dados mock para demonstração
  const pedidosMock = [
    {
      id: 1001,
      status: 'entregue',
      total: 250.00,
      created_at: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
      itens: [
        { nome: 'Banner em Lona 440g', quantidade: 2, preco_total: 100.00 },
        { nome: 'Adesivo Vinil Branco', quantidade: 5, preco_total: 150.00 },
      ],
    },
    {
      id: 1002,
      status: 'producao',
      total: 180.00,
      created_at: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
      itens: [
        { nome: 'DTF Transfer 27cm', quantidade: 10, preco_total: 180.00 },
      ],
    },
  ];

  return NextResponse.json({ pedidos: pedidosMock, total: pedidosMock.length });
}

// ── POST — criar pedido ──────────────────────────────────────────
export async function POST(request) {
  const userId = request.headers.get('x-user-id');

  try {
    const body = await request.json();
    const { itens, endereco_id, observacoes } = body;

    if (!itens || itens.length === 0) {
      return NextResponse.json({ erro: 'O pedido deve ter pelo menos um item' }, { status: 400 });
    }

    // Calcular total
    const subtotal = itens.reduce((acc, item) => acc + (item.preco_total || 0), 0);
    const frete = subtotal >= 500 ? 0 : 30;
    const total = subtotal + frete;

    // Em produção: inserir no banco em transação
    // const client = await getPool().connect();
    // try {
    //   await client.query('BEGIN');
    //   const { rows: [pedido] } = await client.query(
    //     'INSERT INTO pedidos (usuario_id, status, subtotal, frete, total, observacoes) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
    //     [userId, 'pendente', subtotal, frete, total, observacoes]
    //   );
    //   for (const item of itens) {
    //     await client.query(
    //       'INSERT INTO pedido_itens (pedido_id, produto_id, nome_produto, largura, altura, quantidade, preco_unit, preco_total) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
    //       [pedido.id, item.produto_id, item.nome, item.largura, item.altura, item.quantidade, item.preco_m2, item.preco_total]
    //     );
    //   }
    //   await client.query('COMMIT');
    //   return NextResponse.json({ pedido, mensagem: 'Pedido criado com sucesso!' }, { status: 201 });
    // } catch (e) {
    //   await client.query('ROLLBACK');
    //   throw e;
    // } finally { client.release(); }

    // Simulação
    const pedido = {
      id: Date.now(),
      usuario_id: userId,
      status: 'pendente',
      subtotal,
      frete,
      total,
      itens,
      observacoes,
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({ pedido, mensagem: 'Pedido criado com sucesso!' }, { status: 201 });

  } catch (err) {
    console.error('Erro ao criar pedido:', err);
    return NextResponse.json({ erro: 'Erro ao criar pedido' }, { status: 500 });
  }
}
