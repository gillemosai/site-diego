'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [carrinho, setCarrinho] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [processando, setProcessando] = useState(false);
  const [pagamentoPix, setPagamentoPix] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('carrinho') || '[]');
    if (items.length === 0) {
      window.location.href = '/carrinho';
    }
    setCarrinho(items);
    setCarregando(false);
  }, []);

  const finalizarPedido = async () => {
    setProcessando(true);
    setErro('');
    
    try {
      // 1. Criar pedido
      const resPedido = await fetch('/api/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': '1', // Simulação de usuário logado
          'x-user-email': 'cliente@exemplo.com'
        },
        body: JSON.stringify({
          itens: carrinho,
          observacoes: 'Gerado via Checkout'
        })
      });
      
      const dataPedido = await resPedido.json();
      
      if (!resPedido.ok) throw new Error(dataPedido.erro || 'Erro ao criar pedido');
      
      const pedido = dataPedido.pedido;

      // 2. Gerar Pagamento
      const resPag = await fetch('/api/pagamento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': '1',
          'x-user-email': 'cliente@exemplo.com'
        },
        body: JSON.stringify({
          pedido_id: pedido.id,
          itens: carrinho,
          total: pedido.total,
          metodo: 'pix'
        })
      });

      const dataPag = await resPag.json();
      
      if (!resPag.ok) throw new Error(dataPag.erro || 'Erro ao gerar pagamento');

      if (dataPag.simulacao && dataPag.pix) {
        setPagamentoPix(dataPag.pix);
        // Limpa o carrinho após gerar o pedido com sucesso
        localStorage.setItem('carrinho', '[]');
        window.dispatchEvent(new Event('carrinho-atualizado'));
      } else if (dataPag.init_point) {
        // Redireciona para o checkout do MercadoPago real
        window.location.href = dataPag.init_point;
      }
      
    } catch (e) {
      setErro(e.message);
    } finally {
      setProcessando(false);
    }
  };

  const copiarPix = () => {
    navigator.clipboard.writeText(pagamentoPix.qrcode_texto);
    alert('Código PIX copiado!');
  };

  const subtotal = carrinho.reduce((acc, item) => acc + (item.preco_total || 0), 0);
  const frete = subtotal > 500 ? 0 : 30;
  const total = subtotal + frete;
  const fmt = (n) => n.toFixed(2).replace('.', ',');

  if (carregando) return <div style={{ padding: '60px', textAlign: 'center' }}>Carregando...</div>;

  return (
    <section className="conteudo" style={{ padding: '40px 16px' }}>
      <h1 className="pagina-titulo">🔒 Finalizar Compra</h1>
      
      {erro && (
        <div style={{ padding: '16px', background: '#ffebee', color: '#c62828', borderRadius: '8px', marginBottom: '24px' }}>
          <strong>Erro:</strong> {erro}
        </div>
      )}

      {pagamentoPix ? (
        <div style={{ textAlign: 'center', background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ color: '#27ae60', marginBottom: '16px' }}>Pedido Gerado com Sucesso! 🎉</h2>
          <p style={{ marginBottom: '24px' }}>Realize o pagamento via PIX para iniciarmos a produção.</p>
          
          <div style={{ background: '#f5f5f5', padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
            <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Valor: R$ {fmt(pagamentoPix.valor)}</p>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>Chave PIX (Telefone): {pagamentoPix.chave}</p>
            
            <button onClick={copiarPix} className="btn btn-primario" style={{ width: '100%' }}>
              📋 Copiar Código PIX (Copia e Cola)
            </button>
          </div>
          
          <p style={{ fontSize: '12px', color: '#888' }}>
            Após o pagamento, a confirmação ocorre em até 1 hora automaticamente.
          </p>

          <Link href="/" className="btn btn-outline" style={{ marginTop: '24px', display: 'inline-block' }}>
            Voltar para a Loja
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px', alignItems: 'start' }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>📋 Revisão do Pedido</h2>
            {carrinho.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee' }}>
                <div>
                  <p style={{ fontWeight: 'bold' }}>{item.nome}</p>
                  <p style={{ fontSize: '12px', color: '#666' }}>Qtd: {item.quantidade}</p>
                </div>
                <p style={{ fontWeight: 'bold' }}>R$ {fmt(item.preco_total)}</p>
              </div>
            ))}
          </div>

          <div className="carrinho-resumo-box">
            <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>💵 Resumo</h2>
            <div className="carrinho-resumo-linha">
              <span>Subtotal</span><span>R$ {fmt(subtotal)}</span>
            </div>
            <div className="carrinho-resumo-linha">
              <span>Frete</span><span>{frete === 0 ? 'Grátis' : `R$ ${fmt(frete)}`}</span>
            </div>
            <div className="carrinho-resumo-total">
              <span>Total a Pagar</span><span>R$ {fmt(total)}</span>
            </div>

            <button 
              onClick={finalizarPedido} 
              disabled={processando}
              className="btn btn-primario btn-block" 
              style={{ marginTop: '24px' }}
            >
              {processando ? 'Gerando Pagamento...' : '💸 Gerar PIX e Finalizar'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
