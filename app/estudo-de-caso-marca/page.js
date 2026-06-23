'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './estudo-caso.css';

export default function EstudoDeCasoPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Avoid hydration mismatch on animations

  return (
    <main className="case-body">
      
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-gradient"></div>
        <div className="hero-content">
          <h1 className="case-title fade-in-up">A Evolução do<br/>Reinado Gráfico</h1>
          <p className="case-subtitle fade-in-up delay-1">
            Conheça a essência geométrica e o poder do CMYK por trás da nova identidade visual do Rei das Impressões.
          </p>
          
          <div className="fade-in-up delay-2" style={{ marginTop: '40px' }}>
            <div className="logo-display">
              <Image 
                src="/logo-rei.png" 
                alt="Nova Logo Rei das Impressões" 
                width={300} 
                height={300} 
                style={{ display: 'block' }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. O Desafio */}
      <section className="section-padding" style={{ background: 'var(--case-navy-light)' }}>
        <div className="grid-2">
          <div className="fade-in-up">
            <h2 className="case-title" style={{ fontSize: '3rem' }}>O Desafio</h2>
            <p className="case-subtitle" style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
              O Rei das Impressões sempre foi sinônimo de agilidade e qualidade no universo B2B e varejo. No entanto, a antiga identidade gráfica precisava acompanhar o salto tecnológico e a modernização da empresa no ambiente digital.
            </p>
            <p className="case-subtitle" style={{ fontSize: '1.1rem' }}>
              Precisávamos de uma marca que não apenas estampasse fachadas, mas que dominasse telas, aplicativos e transpirasse confiança. Uma coroa que não fosse apenas um símbolo, mas a construção de um processo perfeito.
            </p>
          </div>
          <div className="glass-card fade-in-up delay-1" style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>Do Físico ao Digital</h3>
            <p style={{ color: 'var(--case-text-light)', lineHeight: 1.6 }}>
              A transição exigia que a marca fosse perfeitamente responsiva — forte em um banner de 5 metros e igualmente legível no ícone de um aplicativo mobile.
            </p>
          </div>
        </div>
      </section>

      {/* 3. A Solução e o Conceito */}
      <section className="section-padding">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 className="case-title">A Anatomia da Marca</h2>
          <p className="case-subtitle" style={{ margin: '0 auto' }}>
            Desconstruímos a coroa para reconstruí-la com as cores que dão vida à indústria gráfica.
          </p>
        </div>

        <div className="grid-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
          
          <div className="glass-card fade-in-up">
            <div className="cmyk-dot dot-c">C</div>
            <h3 className="cmyk-title">Ciano</h3>
            <p className="cmyk-text">A base da coroa. Representa a inovação, a clareza e a tecnologia digital empregada nos equipamentos de alta precisão da gráfica.</p>
          </div>

          <div className="glass-card fade-in-up delay-1">
            <div className="cmyk-dot dot-m">M</div>
            <h3 className="cmyk-title">Magenta</h3>
            <p className="cmyk-text">O pico central. Pulsa energia, criatividade e a paixão por entregar resultados que realmente saltam aos olhos do cliente final.</p>
          </div>

          <div className="glass-card fade-in-up delay-2">
            <div className="cmyk-dot dot-y">Y</div>
            <h3 className="cmyk-title">Amarelo</h3>
            <p className="cmyk-text">A luz e o calor. Simboliza a rapidez nas entregas, o otimismo e a comunicação clara em cada etapa do atendimento.</p>
          </div>

          <div className="glass-card fade-in-up delay-3">
            <div className="cmyk-dot dot-k">K</div>
            <h3 className="cmyk-title">Key (Azul Marinho)</h3>
            <p className="cmyk-text">O elemento chave. Substituímos o preto tradicional pelo Azul Marinho Profundo, conferindo muito mais elegância, confiança e autoridade.</p>
          </div>

        </div>
      </section>

      {/* 4. A Geometria */}
      <section className="section-padding light-section">
        <div className="grid-2">
          <div>
            <h2 className="case-title" style={{ fontSize: '3rem' }}>Geometria & Precisão</h2>
            <p className="case-subtitle" style={{ color: '#555', fontSize: '1.1rem' }}>
              A sobreposição translúcida das cores CMYK na coroa não é acidental. Ela representa literalmente o processo de impressão (retículas e camadas de tinta) formando uma imagem perfeita.
            </p>
            <p className="case-subtitle" style={{ color: '#555', fontSize: '1.1rem', marginTop: '16px' }}>
              A tipografia utiliza a família 'Inter', garantindo legibilidade extrema e um visual limpo e contemporâneo.
            </p>
          </div>
          <div style={{ background: '#f5f5f5', borderRadius: '24px', padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '40px', background: 'var(--case-cyan)', mixBlendMode: 'multiply' }}></div>
              <div style={{ width: '80px', height: '80px', borderRadius: '40px', background: 'var(--case-magenta)', mixBlendMode: 'multiply', marginLeft: '-40px' }}></div>
              <div style={{ width: '80px', height: '80px', borderRadius: '40px', background: 'var(--case-yellow)', mixBlendMode: 'multiply', marginLeft: '-40px' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Call to Action */}
      <section className="cta-section">
        <h2 className="case-title fade-in-up">Imprima o seu Sucesso</h2>
        <p className="case-subtitle fade-in-up delay-1" style={{ margin: '0 auto 20px' }}>
          O Rei das Impressões está de cara nova, mas a majestade na qualidade de entrega continua a mesma.
        </p>
        <Link href="/" className="btn-case fade-in-up delay-2">
          Explorar a Loja Oficial
        </Link>
      </section>
      
    </main>
  );
}
