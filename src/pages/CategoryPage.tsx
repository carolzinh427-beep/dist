import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CATEGORIES, CommercialUnit, PRODUCTS } from '../data/products';
import { PageMeta } from '../components/PageMeta';
import { ProductCard } from '../components/ProductCard';
import { CategoryVisual } from '../components/ProductVisual';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [unitFilter, setUnitFilter] = useState<string>('todas');

  const category = CATEGORIES.find((c) => c.slug === slug);

  const categoryProducts = useMemo(() => {
    if (!category) return [];
    return PRODUCTS.filter(
      (p) =>
        p.categorySlug === category.slug &&
        (unitFilter === 'todas' || p.commercialUnit === unitFilter)
    );
  }, [category, unitFilter]);

  const availableUnits = useMemo(() => {
    if (!category) return [] as CommercialUnit[];
    const set = new Set(
      PRODUCTS.filter((p) => p.categorySlug === category.slug).map(
        (p) => p.commercialUnit
      )
    );
    return Array.from(set);
  }, [category]);

  if (!category) {
    return (
      <section className="section-block section-warm">
        <PageMeta
          title="Categoria não encontrada"
          description="A categoria solicitada não foi localizada no catálogo da Vértice Distribuidora"
        />
        <div className="container">
          <div className="empty-state-box">
            <h1 className="empty-state-title">Categoria não encontrada</h1>
            <p className="empty-state-desc">
              A linha de produtos que você tentou acessar não existe ou teve o endereço alterado
            </p>
            <Link to="/catalogo" className="btn btn-primary">
              Voltar para o catálogo completo
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageMeta
        title={`${category.name} no Catálogo`}
        description={`${category.name} na Vértice Distribuidora em Serra, Espírito Santo ${category.shortDescription}`}
      />

      <section className="page-hero-band">
        <div className="container category-hero-grid">
          <div>
            <nav aria-label="Navegação estrutural" className="breadcrumb-nav">
              <Link to="/">Início</Link>
              <span aria-hidden="true">/</span>
              <Link to="/catalogo">Catálogo</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{category.name}</span>
            </nav>
            <h1 className="page-hero-title">{category.name}</h1>
            <p className="page-hero-lead">{category.fullDescription}</p>
            <div className="category-hero-meta">
              <span>Indicada para: {category.typicalBuyers}</span>
              <span>Formato predominante: {category.packagingFocus}</span>
            </div>
          </div>
          <div className="category-hero-visual-box">
            <CategoryVisual slug={category.slug} />
          </div>
        </div>
      </section>

      <section className="section-block section-warm">
        <div className="container">
          <div className="category-filter-bar">
            <div className="category-unit-pills" role="group" aria-label="Filtrar por unidade de venda">
              <button
                type="button"
                className={unitFilter === 'todas' ? 'unit-pill active' : 'unit-pill'}
                onClick={() => setUnitFilter('todas')}
              >
                Todas as embalagens
              </button>
              {availableUnits.map((unit) => (
                <button
                  key={unit}
                  type="button"
                  className={unitFilter === unit ? 'unit-pill active' : 'unit-pill'}
                  onClick={() => setUnitFilter(unit)}
                >
                  Venda por {unit}
                </button>
              ))}
            </div>

            <Link to="/catalogo" className="btn btn-secondary">
              Ver todas as categorias
            </Link>
          </div>

          <div className="products-grid">
            {categoryProducts.map((product) => (
              <ProductCard key={product.code} product={product} />
            ))}
          </div>

          {/* Navegação entre outras categorias */}
          <div className="other-categories-panel">
            <h2 className="other-categories-heading">Explorar outras categorias do catálogo</h2>
            <div className="other-categories-links">
              {CATEGORIES.filter((c) => c.slug !== category.slug).map((c) => (
                <Link key={c.slug} to={`/categoria/${c.slug}`} className="other-category-chip">
                  <strong>{c.name}</strong>
                  <span>{c.packagingFocus}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

