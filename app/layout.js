// app/layout.js
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'SiteDiego — Impressão Digital e Terceirização Gráfica',
  description: 'Especialistas em terceirização de impressão digital. Banners, adesivos, lonas, DTF, sublimação e muito mais com qualidade e agilidade.',
  keywords: 'impressão digital, banner, adesivo, lona, dtf, sublimação, gráfica, terceirização',
  openGraph: {
    title: 'SiteDiego — Impressão Digital',
    description: 'Terceirização de impressão digital com qualidade e rapidez.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#56B544',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="site">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
