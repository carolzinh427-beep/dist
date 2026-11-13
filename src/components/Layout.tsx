import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { COMPANY_CONFIG } from '../config/company';
import { CATEGORIES } from '../data/products';
import { useQuote } from '../context/QuoteContext';
import { BrandLogo } from './BrandLogo';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { totalDistinctItems, lastFeedback, dismissFeedback } = useQuote();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const queryParam = searchParams.get('busca') ?? '';
    setSearchTerm(queryParam);
  }, [searchParams]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (trimmed) {
      navigate(`/catalogo?busca=${encodeURIComponent(trimmed)}`);
    } else {
      navigate('/catalogo');
    }
    setMobileSearchOpen(false);
  };

  return (
    <div className="site-shell">
      <a href="#conteudo-principal" className="skip-link">
        Pular para o conteúdo principal
      </a>

      {/* Barra Institucional Superior */}
      <div className="utility-bar">
        <div className="container utility-bar-inner">
          <span className="utility-location">
            Operação em {COMPANY_CONFIG.location.city}, {COMPANY_CONFIG.location.state} | Cobertura na {COMPANY_CONFIG.location.regionName}
          </span>
          <span className="utility-hours">
            Atendimento comercial: {COMPANY_CONFIG.businessHours.summary}
          </span>
        </div>
      </div>

      {/* Cabeçalho Principal */}
      <header className="site-header">
        <div className="container header-primary-row">
          <Link to="/" className="header-brand-link" aria-label="Vértice Distribuidora Página Inicial">
            <BrandLogo variant="default" size="md" />
          </Link>

          {/* Busca Desktop */}
          <form className="header-search-form" onSubmit={handleSearchSubmit} role="search">
            <label htmlFor="header-search-input" className="sr-only">
              Buscar por nome, categoria, marca ou código do produto
            </label>
            <input
              id="header-search-input"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome, categoria, marca ou código VRT"
              className="header-search-input"
            />
            <button type="submit" className="header-search-btn" aria-label="Executar busca no catálogo">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20L16.5 16.5" strokeLinecap="round" />
              </svg>
              <span>Buscar</span>
            </button>
          </form>

          {/* Ações Rápidas do Cabeçalho */}
          <div className="header-actions">
            <button
              type="button"
              className="mobile-search-trigger"
              onClick={() => {
                setMobileSearchOpen((prev) => !prev);
                setMobileMenuOpen(false);
              }}
              aria-expanded={mobileSearchOpen}
              aria-controls="mobile-search-panel"
              aria-label="Alternar barra de busca"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20L16.5 16.5" strokeLinecap="round" />
              </svg>
            </button>

            <Link
              to="/orcamento"
              className="header-quote-list-link"
              aria-label={`Lista de orçamento com ${totalDistinctItems} itens`}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <path d="M9 12H15M9 16H13" strokeLinecap="round" />
              </svg>
              <span className="quote-link-label">Lista</span>
              <span className="quote-count-pill">{totalDistinctItems}</span>
            </Link>

            <Link to="/orcamento" className="btn btn-accent header-cta-btn">
              Solicitar orçamento
            </Link>

            <button
              type="button"
              className="mobile-menu-trigger"
              onClick={() => {
                setMobileMenuOpen((prev) => !prev);
                setMobileSearchOpen(false);
              }}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label="Menu de navegação"
            >
              {mobileMenuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M6 6L18 18M6 18L18 6" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M4 7H20M4 12H20M4 17H20" strokeLinecap="round" />
                </svg>
              )}
              <span className="mobile-menu-label">Menu</span>
            </button>
          </div>
        </div>

        {/* Barra de Navegação Desktop */}
        <nav className="header-nav-bar" aria-label="Navegação principal">
          <div className="container header-nav-inner">
            <ul className="nav-list">
              <li>
                <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
                  Início
                </NavLink>
              </li>
              <li>
                <NavLink to="/catalogo" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
                  Catálogo
                </NavLink>
              </li>
              <li>
                <a href="/#segmentos" className="nav-item">
                  Segmentos atendidos
                </a>
              </li>
              <li>
                <NavLink to="/entregas" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
                  Regiões de entrega
                </NavLink>
              </li>
              <li>
                <NavLink to="/sobre" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
                  Sobre
                </NavLink>
              </li>
              <li>
                <NavLink to="/atendimento" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
                  Atendimento
                </NavLink>
              </li>
            </ul>

            <div className="header-category-shortcuts" aria-label="Atalhos de categorias">
              {CATEGORIES.slice(0, 4).map((cat) => (
                <Link key={cat.slug} to={`/categoria/${cat.slug}`} className="category-shortcut-link">
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Painel de Busca Mobile */}
        {mobileSearchOpen && (
          <div id="mobile-search-panel" className="mobile-search-panel">
            <div className="container">
              <form className="mobile-search-form" onSubmit={handleSearchSubmit} role="search">
                <label htmlFor="mobile-search-input" className="sr-only">
                  Buscar produtos por nome, categoria, marca ou código
                </label>
                <input
                  id="mobile-search-input"
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nome, marca, categoria ou código VRT"
                  className="mobile-search-input"
                  autoFocus
                />
                <button type="submit" className="btn btn-primary">
                  Buscar
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Menu Compacto Mobile */}
        {mobileMenuOpen && (
          <nav id="mobile-nav-drawer" className="mobile-nav-drawer" aria-label="Menu móvel">
            <div className="container">
              <ul className="mobile-nav-links">
                <li>
                  <Link to="/">Início</Link>
                </li>
                <li>
                  <Link to="/catalogo">Catálogo completo</Link>
                </li>
                <li>
                  <a href="/#segmentos" onClick={() => setMobileMenuOpen(false)}>
                    Segmentos atendidos
                  </a>
                </li>
                <li>
                  <Link to="/entregas">Entregas e regiões atendidas</Link>
                </li>
                <li>
                  <Link to="/sobre">Sobre a Vértice</Link>
                </li>
                <li>
                  <Link to="/atendimento">Atendimento</Link>
                </li>
                <li>
                  <Link to="/orcamento">Lista de orçamento ({totalDistinctItems})</Link>
                </li>
              </ul>

              <div className="mobile-nav-categories">
                <div className="mobile-nav-section-label">Categorias de produtos</div>
                <div className="mobile-category-grid">
                  {CATEGORIES.map((cat) => (
                    <Link key={cat.slug} to={`/categoria/${cat.slug}`} className="mobile-cat-chip">
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* Conteúdo Principal da Página */}
      <main id="conteudo-principal" className="site-main">
        {children}
      </main>

      {/* Notificação Acessível de Alteração na Lista de Orçamento */}
      <div aria-live="polite" aria-atomic="true" className="toast-region">
        {lastFeedback && (
          <div className="quote-feedback-banner">
            <span>{lastFeedback}</span>
            <div className="quote-feedback-actions">
              <Link to="/orcamento" className="feedback-view-link">
                Ver orçamento
              </Link>
              <button
                type="button"
                onClick={dismissFeedback}
                className="feedback-close-btn"
                aria-label="Fechar aviso"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Rodapé Institucional */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand-col">
              <BrandLogo variant="light" size="md" />
              <p className="footer-slogan">{COMPANY_CONFIG.slogan}</p>
              <p className="footer-meta-line">
                Base operacional demonstrativa: {COMPANY_CONFIG.location.city}, {COMPANY_CONFIG.location.state}
              </p>
              <p className="footer-meta-line">
                Região de cobertura ilustrativa: {COMPANY_CONFIG.coverageAreas.join(', ')}
              </p>
              <p className="footer-meta-line">
                Horário ilustrativo: {COMPANY_CONFIG.businessHours.summary}
              </p>
            </div>

            <div>
              <h2 className="footer-heading">Navegação</h2>
              <ul className="footer-links">
                <li>
                  <Link to="/">Início</Link>
                </li>
                <li>
                  <Link to="/catalogo">Catálogo de produtos</Link>
                </li>
                <li>
                  <Link to="/orcamento">Lista de orçamento</Link>
                </li>
                <li>
                  <Link to="/entregas">Entregas e regiões atendidas</Link>
                </li>
                <li>
                  <Link to="/sobre">Sobre a Vértice</Link>
                </li>
                <li>
                  <Link to="/atendimento">Atendimento e dúvidas</Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="footer-heading">Categorias</h2>
              <ul className="footer-links">
                {CATEGORIES.map((cat) => (
                  <li key={cat.slug}>
                    <Link to={`/categoria/${cat.slug}`}>{cat.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="footer-heading">Atendimento e configuração</h2>
              <p className="footer-config-status">
                {COMPANY_CONFIG.contacts.phone
                  ? `Telefone: ${COMPANY_CONFIG.contacts.phone}`
                  : 'Canais de telefone, WhatsApp, endereço físico e e-mail preparados para configuração antes da publicação comercial'}
              </p>
              <div className="footer-cta-stack">
                <Link to="/orcamento" className="btn btn-accent">
                  Montar meu orçamento
                </Link>
                <Link to="/atendimento" className="btn btn-outline-light">
                  Canal de atendimento
                </Link>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-demo-disclaimer">{COMPANY_CONFIG.demoNotice}</p>
            <div className="footer-legal-links">
              <Link to="/privacidade">Privacidade</Link>
              <Link to="/termos">Termos de uso</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Barra Inferior Mobile (Início, Catálogo e Orçamento) */}
      <nav className="mobile-bottom-bar" aria-label="Acesso rápido móvel">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? 'bottom-bar-item active' : 'bottom-bar-item')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V10.5Z" />
          </svg>
          <span>Início</span>
        </NavLink>

        <NavLink
          to="/catalogo"
          className={({ isActive }) => (isActive ? 'bottom-bar-item active' : 'bottom-bar-item')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="3" y="4" width="7" height="7" rx="1" />
            <rect x="14" y="4" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          <span>Catálogo</span>
        </NavLink>

        <NavLink
          to="/orcamento"
          className={({ isActive }) => (isActive ? 'bottom-bar-item active' : 'bottom-bar-item')}
        >
          <div className="bottom-bar-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
            </svg>
            {totalDistinctItems > 0 && (
              <span className="bottom-bar-badge">{totalDistinctItems}</span>
            )}
          </div>
          <span>Orçamento</span>
        </NavLink>
      </nav>
    </div>
  );
};
