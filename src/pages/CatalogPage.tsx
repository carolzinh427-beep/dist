import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  CATEGORIES,
  COMMERCIAL_UNIT_GUIDE,
  CommercialUnit,
  PRODUCTS,
  PackagingType,
} from '../data/products';
import { PageMeta } from '../components/PageMeta';
import { ProductCard } from '../components/ProductCard';

type SortOption = 'relevancia' | 'nome-asc' | 'nome-desc';

export const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get('busca') ?? '';
  const initialCategory = searchParams.get('categoria') ?? 'todas';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState('todas');
  const [selectedPackaging, setSelectedPackaging] = useState('todas');
  const [selectedUnit, setSelectedUnit] = useState('todas');
  const [sortBy, setSortBy] = useState<SortOption>('relevancia');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    setSearchQuery(searchParams.get('busca') ?? '');
    const catParam = searchParams.get('categoria');
    if (catParam) {
      setSelectedCategory(catParam);
    }
  }, [searchParams]);

  const brands = useMemo(
    () => Array.from(new Set(PRODUCTS.map((p) => p.brand))).sort(),
    []
  );

  const packagingTypes = useMemo(
    () => Array.from(new Set(PRODUCTS.map((p) => p.packagingType))).sort() as PackagingType[],
    []
  );

  const commercialUnits: CommercialUnit[] = ['Fardo', 'Caixa', 'Pacote', 'Unidade'];

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = PRODUCTS.filter((product) => {
      const matchesQuery =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.code.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.categoryName.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === 'todas' || product.categorySlug === selectedCategory;

      const matchesBrand =
        selectedBrand === 'todas' || product.brand === selectedBrand;

      const matchesPackaging =
        selectedPackaging === 'todas' || product.packagingType === selectedPackaging;

      const matchesUnit =
        selectedUnit === 'todas' || product.commercialUnit === selectedUnit;

      return (
        matchesQuery &&
        matchesCategory &&
        matchesBrand &&
        matchesPackaging &&
        matchesUnit
      );
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'nome-asc') {
        return a.name.localeCompare(b.name, 'pt-BR');
      }
      if (sortBy === 'nome-desc') {
        return b.name.localeCompare(a.name, 'pt-BR');
      }
      return a.relevanceRank - b.relevanceRank;
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedBrand,
    selectedPackaging,
    selectedUnit,
    sortBy,
  ]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('todas');
    setSelectedBrand('todas');
    setSelectedPackaging('todas');
    setSelectedUnit('todas');
    setSortBy('relevancia');
    setSearchParams({});
  };

  const activeFiltersCount = [
    searchQuery.trim() !== '',
    selectedCategory !== 'todas',
    selectedBrand !== 'todas',
    selectedPackaging !== 'todas',
    selectedUnit !== 'todas',
  ].filter(Boolean).length;

  return (
    <>
      <PageMeta
        title="Catálogo de Produtos"
        description="Catálogo completo da Vértice Distribuidora com bebidas, alimentos, produtos de limpeza, higiene profissional e descartáveis para empresas na Grande Vitória"
      />

      <section className="page-hero-band">
        <div className="container">
          <nav aria-label="Navegação estrutural" className="breadcrumb-nav">
            <Link to="/">Início</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Catálogo</span>
          </nav>
          <h1 className="page-hero-title">Catálogo de produtos para abastecimento empresarial</h1>
          <p className="page-hero-lead">
            Explore os itens demonstrativos por categoria, marca, tipo de embalagem e unidade de comercialização e monte sua solicitação de orçamento
          </p>
        </div>
      </section>

      {/* Guia de Unidades de Comercialização */}
      <section className="units-guide-section" aria-label="Entenda as unidades de comercialização">
        <div className="container">
          <div className="units-guide-header">
            <h2 className="units-guide-title">
              Diferença entre unidade, pacote, caixa e fardo
            </h2>
            <span className="units-guide-note">
              Verifique a unidade comercial indicada em cada item antes de informar a quantidade
            </span>
          </div>
          <div className="units-guide-grid">
            {COMMERCIAL_UNIT_GUIDE.map((item) => (
              <div key={item.unit} className="unit-guide-card">
                <div className="unit-guide-badge">{item.unit}</div>
                <h3 className="unit-guide-heading">{item.title}</h3>
                <p className="unit-guide-text">{item.explanation}</p>
                <p className="unit-guide-example">Exemplo: {item.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corpo do Catálogo com Filtros Laterais e Grade */}
      <section className="section-block section-warm">
        <div className="container">
          {/* Barra de Controle Mobile e Ordenação */}
          <div className="catalog-toolbar">
            <div className="catalog-toolbar-left">
              <button
                type="button"
                className="btn btn-secondary mobile-filter-open-btn"
                onClick={() => setMobileFilterOpen(true)}
                aria-expanded={mobileFilterOpen}
                aria-controls="catalog-filters-aside"
              >
                Filtrar produtos {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}
              </button>
              <span className="catalog-results-count" role="status">
                Exibindo {filteredProducts.length} de {PRODUCTS.length} produtos demonstrativos
              </span>
            </div>

            <div className="catalog-sort-group">
              <label htmlFor="catalog-sort-select" className="sort-label">
                Ordenar por
              </label>
              <select
                id="catalog-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="filter-select sort-select"
              >
                <option value="relevancia">Relevância comercial</option>
                <option value="nome-asc">Nome de A a Z</option>
                <option value="nome-desc">Nome de Z a A</option>
              </select>
            </div>
          </div>

          <div className="catalog-layout">
            {/* Painel de Filtros (Lateral no Desktop / Painel Modal no Celular) */}
            <aside
              id="catalog-filters-aside"
              className={`catalog-sidebar ${mobileFilterOpen ? 'open' : ''}`}
              aria-label="Filtros do catálogo"
            >
              <div className="sidebar-mobile-header">
                <h2 className="sidebar-heading">Filtros do catálogo</h2>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="sidebar-close-btn"
                  aria-label="Fechar painel de filtros"
                >
                  Fechar
                </button>
              </div>

              <div className="sidebar-filters-body">
                <div className="filter-field">
                  <label htmlFor="filter-search" className="filter-label">
                    Busca por nome ou código
                  </label>
                  <input
                    id="filter-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ex: Água, Arroz, VRT 101"
                    className="filter-input"
                  />
                </div>

                <div className="filter-field">
                  <label htmlFor="filter-category" className="filter-label">
                    Categoria
                  </label>
                  <select
                    id="filter-category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="filter-select"
                  >
                    <option value="todas">Todas as categorias</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-field">
                  <label htmlFor="filter-unit" className="filter-label">
                    Unidade de comercialização
                  </label>
                  <select
                    id="filter-unit"
                    value={selectedUnit}
                    onChange={(e) => setSelectedUnit(e.target.value)}
                    className="filter-select"
                  >
                    <option value="todas">Todas as unidades</option>
                    {commercialUnits.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-field">
                  <label htmlFor="filter-packaging" className="filter-label">
                    Tipo de embalagem
                  </label>
                  <select
                    id="filter-packaging"
                    value={selectedPackaging}
                    onChange={(e) => setSelectedPackaging(e.target.value)}
                    className="filter-select"
                  >
                    <option value="todas">Todos os tipos de embalagem</option>
                    {packagingTypes.map((pkg) => (
                      <option key={pkg} value={pkg}>
                        {pkg}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-field">
                  <label htmlFor="filter-brand" className="filter-label">
                    Marca demonstrativa
                  </label>
                  <select
                    id="filter-brand"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="filter-select"
                  >
                    <option value="todas">Todas as marcas</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sidebar-actions">
                  <button
                    type="button"
                    onClick={() => setMobileFilterOpen(false)}
                    className="btn btn-primary sidebar-apply-btn"
                  >
                    Aplicar filtros
                  </button>
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="btn btn-secondary sidebar-clear-btn"
                  >
                    Limpar filtros
                  </button>
                </div>
              </div>

              <div className="sidebar-category-links">
                <h3 className="sidebar-subheading">Páginas de categoria</h3>
                <ul>
                  {CATEGORIES.map((cat) => (
                    <li key={cat.slug}>
                      <Link to={`/categoria/${cat.slug}`}>{cat.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Grade Principal de Produtos */}
            <div className="catalog-main-area">
              {filteredProducts.length === 0 ? (
                <div className="empty-state-box" role="region" aria-label="Nenhum resultado encontrado">
                  <h2 className="empty-state-title">
                    Nenhum produto encontrado para os filtros selecionados
                  </h2>
                  <p className="empty-state-desc">
                    Experimente limpar os filtros ativos ou buscar por outro termo como Água, Arroz, Café, Detergente ou Copo descartável
                  </p>
                  <button type="button" onClick={handleClearFilters} className="btn btn-primary">
                    Limpar todos os filtros
                  </button>
                </div>
              ) : (
                <div className="products-grid catalog-products-grid">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.code} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
