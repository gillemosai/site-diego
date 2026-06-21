// app/api/pagamento/route.js — Integração MercadoPago
import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

function getMPClient() {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!token) return null;
  return new MercadoPagoConfig({ accessToken: token });
}

// POST — criar preferência de pagamento
export async function POST(request) {
  const userId = request.headers.get('x-user-id');
  const userEmail = request.headers.get('x-user-email');

  try {
    const { pedido_id, itens, total, metodo } = await request.json();

    if (!itens || itens.length === 0) {
      return NextResponse.json({ erro: 'Itens do pedido são obrigatórios' }, { status: 400 });
    }

    // ── Modo simulação (sem chaves MP configuradas) ─────────────
    const client = getMPClient();
    if (!client) {
      return NextResponse.json({
        simulacao: true,
        mensagem: 'MercadoPago não configurado — modo de teste',
        pedido_id,
        total,
        metodos_disponiveis: ['pix', 'cartao_credito', 'cartao_debito', 'boleto'],
        pix: {
          chave: '71999111640',
          tipo: 'telefone',
          valor: total,
          qrcode_texto: `00020126580014BR.GOV.BCB.PIX0136${pedido_id}520400005303986540${total?.toFixed(2)}5802BR5999SiteDiego6009SAO PAULO62070503***6304`,
        },
        instrucoes: 'Configure MERCADOPAGO_ACCESS_TOKEN no .env.local para ativar pagamentos reais',
      });
    }

    // ── Produção: criar preferência real ────────────────────────
    const preference = new Preference(client);

    const items = itens.map(item => ({
      id: String(item.produto_id || item.id),
      title: item.nome,
      quantity: item.quantidade || 1,
      unit_price: Number((item.preco_total / (item.quantidade || 1)).toFixed(2)),
      currency_id: 'BRL',
    }));

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const pref = await preference.create({
      body: {
        items,
        payer: { email: userEmail },
        external_reference: String(pedido_id),
        back_urls: {
          success: `${siteUrl}/checkout/sucesso?pedido=${pedido_id}`,
          failure: `${siteUrl}/checkout/falha?pedido=${pedido_id}`,
          pending: `${siteUrl}/checkout/pendente?pedido=${pedido_id}`,
        },
        auto_return: 'approved',
        notification_url: `${siteUrl}/api/webhook/mercadopago`,
        payment_methods: {
          excluded_payment_types: [],
          installments: 12,
        },
        statement_descriptor: 'SITEDIEGO',
      },
    });

    return NextResponse.json({
      preference_id: pref.id,
      init_point: pref.init_point,       // Checkout Pro (redirect)
      sandbox_init_point: pref.sandbox_init_point,
    });

  } catch (err) {
    console.error('Erro MercadoPago:', err);
    return NextResponse.json({ erro: 'Erro ao criar pagamento: ' + err.message }, { status: 500 });
  }
}
