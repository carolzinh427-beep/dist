import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductItem } from '../data/products';
import { useQuote } from '../context/QuoteContext';
import { ProductVisual } from './ProductVisual';

interface ProductCardProps {
  product: ProductItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, getItemQuantity } = useQuote();
  const [showSpecs, setShowSpecs] = useState<boolean>(false);
  const inQuoteQty = getItemQuantity(product.code);

  const encodedCode = encodeURIComponent(product.code);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product.code, 1);
  };

  const toggleSpecs = () => {
    setShowSpecs((prev) => !prev);
  };

  return (
    <article className={`product-card ${showSpecs ? 'specs-expanded' : ''}`}>
      <div className="product-card-top" onClick={toggleSpecs}>
        <div className="product-card-badges">
          <span className="badge-code">Código {product.code}</span>
          <span className="badge-unit">Venda por {product.commercialUnit}</span>
        </div>
        <div className="product-card-visual-link">
          <ProductVisual product={product} size="card" />
        </div>
      </div>

      <div className="product-card-body">
        <div className="product-card-category">{product.categoryName}</div>
        <h3 className="product-card-title">
          <Link to={`/produto/${encodedCode}`}>{product.name}</Link>
        </h3>
        <div className="product-card-brand">{product.brand}</div>

        <button
          type="button"
          onClick={toggleSpecs}
          className="product-specs-toggle-btn"
          aria-expanded={showSpecs}
          aria-label={`Ver informações detalhadas de ${product.name}`}
        >
          <span>{showSpecs ? 'Ocultar especificações' : 'Ver informações'}</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`specs-chevron ${showSpecs ? 'rotated' : ''}`}
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {showSpecs && (
          <div className="product-card-specs-popdown">
            <dl className="product-card-specs">
              <div className="spec-pair">
                <dt>Conteúdo unitário</dt>
                <dd>{product.unitContent}</dd>
              </div>
              <div className="spec-pair">
                <dt>Embalagem coletiva</dt>
                <dd>{product.packQuantityDescription}</dd>
              </div>
              <div className="spec-pair">
                <dt>Unidade comercial</dt>
                <dd>{product.commercialUnit}</dd>
              </div>
            </dl>

            {product.isAlcoholic && (
              <div className="product-age-notice" role="note">
                Venda proibida para menores de 18 anos
              </div>
            )}

            <div className="product-availability-note">
              Disponibilidade sujeita à confirmação
            </div>
          </div>
        )}

        <div className="product-card-footer-row">
          <Link to={`/produto/${encodedCode}`} className="product-view-link">
            Ver detalhes
          </Link>

          <button
            type="button"
            onClick={handleAdd}
            className="product-quick-add-btn"
            aria-label={`Adicionar mais um ${product.name} ao orçamento`}
            title="Adicionar ao orçamento"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>

        {inQuoteQty > 0 && (
          <div className="product-in-quote-indicator">
            Na lista: {inQuoteQty} {product.commercialUnit.toLowerCase()}{inQuoteQty > 1 ? 's' : ''}
          </div>
        )}
      </div>
    </article>
  );
};

