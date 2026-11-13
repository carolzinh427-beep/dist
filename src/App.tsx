import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QuoteProvider } from './context/QuoteContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { QuoteListPage } from './pages/QuoteListPage';
import { AboutPage } from './pages/AboutPage';
import { DeliveryPage } from './pages/DeliveryPage';
import { SupportPage } from './pages/SupportPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <QuoteProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalogo" element={<CatalogPage />} />
            <Route path="/categoria/:slug" element={<CategoryPage />} />
            <Route path="/produto/:code" element={<ProductDetailPage />} />
            <Route path="/orcamento" element={<QuoteListPage />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/entregas" element={<DeliveryPage />} />
            <Route path="/atendimento" element={<SupportPage />} />
            <Route path="/privacidade" element={<PrivacyPage />} />
            <Route path="/termos" element={<TermsPage />} />
            <Route path="*" element={<CatalogPage />} />
          </Routes>
        </Layout>
      </QuoteProvider>
    </BrowserRouter>
  );
};

export default App;
