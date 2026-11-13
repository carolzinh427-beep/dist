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
  const [qty, setQty] = useState<number>(1);
  const inQuoteQty = getItemQuantity(product.code);

  const encodedCode = encodeURIComponent(product.code);

  const handleDecrement = () => {
    setQty((prev) => Math.max(1, prev - 1));
  };

  const handleIncrement = () => {
    setQty((prev) => prev + 1);
  };

  const handleAdd = () => {
    addItem(product.code, qty);
    setQty(1);
  };

  return (
    <article className="product-card">
      <div className="product-card-top">
        <div className="product-card-badges">
          <span className="badge-code">Código {product.code}</span>
          <span className="badge-unit">Venda por {product.commercialUnit}</span>
        </div>
        <Link
          to={`/produto/${encodedCode}`}
          className="product-card-visual-link"
          aria-label={`Ver detalhes de ${product.name}`}
        >
          <ProductVisual product={product} size="card" />
        </Link>
      </div>

      <div className="product-card-body">
        <div className="product-card-category">{product.categoryName}</div>
        <h3 className="product-card-title">
          <Link to={`/produto/${encodedCode}`}>{product.name}</Link>
        </h3>
        <div className="product-card-brand">{product.brand}</div>

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

        <div className="product-card-actions">
          <div className="qty-control" aria-label={`Quantidade de ${product.commercialUnit} para ${product.name}`}>
            <button
              type="button"
              onClick={handleDecrement}
              className="qty-step-btn"
              aria-label="Diminuir quantidade"
            >
              -
            </button>
            <input
              type="number"
              min={1}
              step={1}
              value={qty}
              onChange={(e) => {
                const parsed = parseInt(e.target.value, 10);
                setQty(Number.isNaN(parsed) || parsed < 1 ? 1 : parsed);
              }}
              className="qty-number-input"
              aria-label={`Quantidade em ${product.commercialUnit}`}
            />
            <button
              type="button"
              onClick={handleIncrement}
              className="qty-step-btn"
              aria-label="Aumentar quantidade"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="btn btn-accent product-add-btn"
          >
            Adicionar ao orçamento
          </button>
        </div>

        {inQuoteQty > 0 && (
          <div className="product-in-quote-indicator">
            Na sua lista de orçamento: {inQuoteQty} {product.commercialUnit.toLowerCase()}
            {inQuoteQty > 1 ? 's' : ''}
          </div>
        )}
      </div>
    </article>
  );
};
