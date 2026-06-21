// components/Footer.js
import Link from 'next/link';

export default function Footer() {
  const ano = new Date().getFullYear();

  return (
    <>
      <footer id="rodape-geral">
        <div className="rodape-grid">
          {/* Sobre */}
          <div>
            <div className="rodape-titulo">SiteDiego</div>
            <p style={{ color: '#888', fontSize: '13px', lineHeight: 1.7, marginBottom: '12px' }}>
              Especialistas em terceirização de impressão digital. Banners, adesivos, lonas, DTF e muito mais com qualidade e agilidade.
            </p>
            <div className="rodape-redes">
              <a href="https://wa.me/5571999111640" target="_blank" rel="noopener" aria-label="WhatsApp">
                💬
              </a>
              <a href="#" aria-label="Instagram">📸</a>
              <a href="#" aria-label="Facebook">👍</a>
              <a href="#" aria-label="YouTube">▶️</a>
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="rodape-titulo">Navegação</div>
            <ul className="rodape-menu">
              <li><Link href="/">Início</Link></li>
              <li><Link href="/categoria/banners">Banners</Link></li>
              <li><Link href="/categoria/adesivos">Adesivos</Link></li>
              <li><Link href="/categoria/lonas">Lonas</Link></li>
              <li><Link href="/categoria/dtf">DTF</Link></li>
              <li><Link href="/categoria/sublimacao">Sublimação</Link></li>
            </ul>
          </div>

          {/* Informações */}
          <div>
            <div className="rodape-titulo">Minha Conta</div>
            <ul className="rodape-menu">
              <li><Link href="/conta/login">Login</Link></li>
              <li><Link href="/conta/cadastro">Cadastre-se</Link></li>
              <li><Link href="/conta/pedidos">Meus Pedidos</Link></li>
              <li><Link href="/conta/dados">Meus Dados</Link></li>
              <li><Link href="/carrinho">Carrinho</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <div className="rodape-titulo">Contato</div>
            <ul className="rodape-info-item" style={{ listStyle: 'none' }}>
              <li className="rodape-info-item">📞 <span><strong>(71) 2102-6000</strong></span></li>
              <li className="rodape-info-item">💬 <span><a href="https://wa.me/5571999111640" style={{color:'#888'}}>WhatsApp</a></span></li>
              <li className="rodape-info-item">📧 <span>contato@sitediego.com.br</span></li>
              <li className="rodape-info-item">📍 <span>Salvador, BA — Brasil</span></li>
              <li className="rodape-info-item">🕐 <span>Seg–Sex: 8h–18h</span></li>
            </ul>

            <div className="rodape-titulo" style={{marginTop:'16px'}}>Formas de Pagamento</div>
            <div className="rodape-mp-bandeiras">
              <span>💳 Cartão</span>
              <span>📱 Pix</span>
              <span>🏦 Boleto</span>
            </div>

            <div className="rodape-selos" style={{marginTop:'12px'}}>
              <span className="rodape-selo">🔒 SSL Seguro</span>
              <span className="rodape-selo">✅ Site Verificado</span>
            </div>
          </div>
        </div>

        <div className="rodape-copyright">
          © {ano} SiteDiego — Todos os direitos reservados. CNPJ: 00.000.000/0001-00
        </div>
      </footer>

      {/* WhatsApp flutuante */}
      <div className="whatsapp-flutuante">
        <a
          href="https://wa.me/5571999111640"
          target="_blank"
          rel="noopener"
          className="whatsapp-btn"
          aria-label="Fale conosco pelo WhatsApp"
          title="Fale conosco no WhatsApp"
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </>
  );
}
