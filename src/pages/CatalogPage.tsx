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
import GlassIcons, { GlassIconsItem } from '../components/GlassIcons';

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
  const [activeUnitModal, setActiveUnitModal] = useState<string>('fardo');
  const [sortBy, setSortBy] = useState<SortOption>('relevancia');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const unitsGuideDetails: Record<string, { title: string; subtitle: string; explanation: string; example: string; tag: string }> = {
    fardo: {
      title: 'Fardo Fechado',
      subtitle: 'Agrupamento em filme termoencolhível',
      explanation: 'Conjunto de embalagens primárias mantidas juntas por plástico de alta densidade termoencolhível ou cinta protetora, ideal para transporte, empilhamento em estoque e revenda sem danos',
      example: 'Água mineral 500 ml em fardo com 12 garrafas ou arroz 5 kg em fardo reforçado com 6 pacotes',
      tag: 'Bebidas e grãos'
    },
    caixa: {
      title: 'Caixa Coletiva de Embarque',
      subtitle: 'Proteção em papelão ondulado',
      explanation: 'Embalagem externa coletiva de papelão estruturado projetada para absorver impactos e proteger frascos de vidro, latas de alumínio, óleos ou sachês durante o transporte e armazenagem',
      example: 'Óleo de soja 900 ml em caixa com 20 unidades ou detergente 500 ml em caixa fechada com 24 frascos',
      tag: 'Químicos, óleos e latas'
    },
    pacote: {
      title: 'Pacote Institucional',
      subtitle: 'Agrupamento compacto pronto para uso',
      explanation: 'Embalagem compacta de itens consumíveis ou descartáveis, organizada para abastecimento direto de dispensers em banheiros, copas, recepções ou balcões sem necessidade de fracionamento',
      example: 'Copo descartável 200 ml em pacote com 100 copos ou papel toalha interfolhado em pacotes de folhas duplas',
      tag: 'Copas e dispensers'
    },
    unidade: {
      title: 'Unidade de Grande Volume',
      subtitle: 'Recipiente profissional independente',
      explanation: 'Item comercializado de forma avulsa quando a própria embalagem já contém um volume expressivo e suficiente para a operação profissional, sem necessidade de embalagem coletiva',
      example: 'Sabonete líquido concentrado ou desinfetante hospitalar em galão individual de 5 litros',
      tag: 'Galões de 5 L'
    }
  };

  const currentUnitInfo = unitsGuideDetails[activeUnitModal] || unitsGuideDetails.fardo;

  const catalogGlassItems: GlassIconsItem[] = [
    {
      id: 'fardo',
      label: 'Fardo',
      color: 'green',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
          <path d="M2 12h20" />
        </svg>
      ),
      onClick: () => setActiveUnitModal('fardo')
    },
    {
      id: 'caixa',
      label: 'Caixa',
      color: 'orange',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 8l-9-5-9 5 9 5 9-5z" />
          <path d="M3 8v8l9 5 9-5V8" />
          <path d="M12 13v8" />
        </svg>
      ),
      onClick: () => setActiveUnitModal('caixa')
    },
    {
      id: 'pacote',
      label: 'Pacote',
      color: 'teal',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      ),
      onClick: () => setActiveUnitModal('pacote')
    },
    {
      id: 'unidade',
      label: 'Unidade',
      color: 'green',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 3h12l2 6v11a2 2 0 01-2 2H6a2 2 0 01-2-2V9l2-6z" />
          <path d="M10 13h4M10 3v6" />
        </svg>
      ),
      onClick: () => setActiveUnitModal('unidade')
    }
  ];

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

      {/* Guia de Unidades de Comercialização com GlassIcons interativo */}
      <section className="units-guide-section" aria-label="Entenda as unidades de comercialização">
        <div className="container">
          <div className="units-guide-header">
            <div>
              <h2 className="units-guide-title">
                Diferença entre unidade, pacote, caixa e fardo
              </h2>
              <span className="units-guide-note">
                Clique nos ícones em vidro verde e transparente para ver a informação de cada modalidade
              </span>
            </div>
          </div>

          <div className="glass-units-showcase">
            <div className="glass-units-icons-holder">
              <GlassIcons
                items={catalogGlassItems}
                size={86}
                gap={32}
                columns={4}
                roundness={0.5}
                refraction={0.85}
                bevel={0.65}
                dispersion={0.05}
                frost={0.25}
                shine={0.9}
                tint="#123D32"
                tintOpacity={0.28}
                iconColor="#FFFFFF"
                plate="tilt"
                tilt={24}
                spread={0.45}
                hover="press"
                parallax={0.8}
                labels="always"
                intro={true}
                theme="dark"
              />
            </div>

            <div className="glass-unit-info-card" key={activeUnitModal}>
              <div className="glass-unit-info-header">
                <div className="glass-unit-info-pill">
                  <span className="badge-unit">{currentUnitInfo.tag}</span>
                </div>
                <h3 className="glass-unit-info-title">{currentUnitInfo.title}</h3>
                <span className="glass-unit-info-subtitle">{currentUnitInfo.subtitle}</span>
              </div>

              <div className="glass-unit-info-body">
                <p className="glass-unit-info-desc">{currentUnitInfo.explanation}</p>
                <div className="glass-unit-info-example">
                  <strong>Exemplo prático de embalagem:</strong>
                  <span>{currentUnitInfo.example}</span>
                </div>
              </div>
            </div>
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

