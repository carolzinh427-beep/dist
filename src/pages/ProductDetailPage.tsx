import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useQuote } from '../context/QuoteContext';
import { PageMeta } from '../components/PageMeta';
import { ProductVisual } from '../components/ProductVisual';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const decodedCode = decodeURIComponent(code ?? '');

  const product = PRODUCTS.find(
    (p) =>
      p.code.toLowerCase() === decodedCode.toLowerCase() ||
      p.slug.toLowerCase() === decodedCode.toLowerCase()
  );

  const { addItem, getItemQuantity } = useQuote();
  const [quantity, setQuantity] = useState<number>(1);
  const [itemNote, setItemNote] = useState<string>('');

  useEffect(() => {
    setQuantity(1);
    setItemNote('');
  }, [decodedCode]);

  if (!product) {
    return (
      <section className="section-block section-warm">
        <PageMeta
          title="Produto não encontrado"
          description="O item consultado não foi localizado no catálogo da Vértice Distribuidora"
        />
        <div className="container">
          <div className="empty-state-box">
            <h1 className="empty-state-title">Produto não encontrado</h1>
            <p className="empty-state-desc">
              Verifique o código informado ou retorne ao catálogo completo para consultar os itens disponíveis
            </p>
            <Link to="/catalogo" className="btn btn-primary">
              Voltar ao catálogo
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const inQuoteQty = getItemQuantity(product.code);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.code !== product.code
  ).slice(0, 3);

  const handleAddToQuote = (e: React.FormEvent) => {
    e.preventDefault();
    addItem(product.code, quantity, itemNote);
    setQuantity(1);
    setItemNote('');
  };

  return (
    <>
      <PageMeta
        title={`${product.name} (${product.code})`}
        description={`${product.name} comercializado por ${product.commercialUnit} (${product.packQuantityDescription}) na Vértice Distribuidora em Serra, ES`}
      />

      <section className="page-hero-band">
        <div className="container">
          <nav aria-label="Navegação estrutural" className="breadcrumb-nav">
            <Link to="/">Início</Link>
            <span aria-hidden="true">/</span>
            <Link to="/catalogo">Catálogo</Link>
            <span aria-hidden="true">/</span>
            <Link to={`/categoria/${product.categorySlug}`}>{product.categoryName}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="section-block section-white">
        <div className="container">
          <div className="product-detail-grid">
            {/* Coluna da Imagem Ampliada */}
            <div className="product-detail-visual-col">
              <div className="product-detail-visual-frame">
                <ProductVisual product={product} size="detail" />
                <div className="product-detail-visual-caption">
                  Representação ilustrativa correspondente à embalagem de {product.packQuantityDescription.toLowerCase()}
                </div>
              </div>
            </div>

            {/* Coluna de Informações e Adição ao Orçamento */}
            <div className="product-detail-info-col">
              <div className="product-detail-meta-row">
                <span className="badge-code">Código demonstrativo: {product.code}</span>
                <Link to={`/categoria/${product.categorySlug}`} className="detail-category-link">
                  {product.categoryName}
                </Link>
              </div>

              <h1 className="product-detail-title">{product.name}</h1>
              <p className="product-detail-brand">{product.brand}</p>

              <p className="product-detail-description">{product.shortDescription}</p>

              {product.isAlcoholic && (
                <div className="alcoholic-warning-box" role="alert">
                  <strong>Aviso legal sobre bebida alcoólica</strong>
                  <span>
                    Venda e fornecimento proibidos para menores de 18 anos Aprecie com moderação
                  </span>
                </div>
              )}

              {/* Destaque de Unidade de Venda e Quantidade por Embalagem antes da seleção */}
              <div className="packaging-highlight-panel" aria-label="Configuração de comercialização">
                <h2 className="packaging-highlight-title">
                  Formato de comercialização antes de informar a quantidade
                </h2>
                <div className="packaging-highlight-grid">
                  <div className="packaging-highlight-item">
                    <span className="packaging-label">Unidade de venda</span>
                    <strong className="packaging-value">{product.commercialUnit}</strong>
                  </div>
                  <div className="packaging-highlight-item">
                    <span className="packaging-label">Quantidade por embalagem</span>
                    <strong className="packaging-value">{product.packQuantityDescription}</strong>
                  </div>
                  <div className="packaging-highlight-item">
                    <span className="packaging-label">Conteúdo unitário</span>
                    <strong className="packaging-value">{product.unitContent}</strong>
                  </div>
                  <div className="packaging-highlight-item">
                    <span className="packaging-label">Tipo de recipiente</span>
                    <strong className="packaging-value">{product.packagingType}</strong>
                  </div>
                </div>
              </div>

              <div className="detail-availability-line">
                Status do item: <strong>Disponibilidade sujeita à confirmação</strong>
              </div>

              {/* Formulário de Adição ao Orçamento */}
              <form className="detail-quote-form" onSubmit={handleAddToQuote}>
                <div className="detail-qty-row">
                  <div className="detail-qty-group">
                    <label htmlFor="detail-qty-input" className="filter-label">
                      Quantidade de {product.commercialUnit.toLowerCase()}s ({product.packQuantityDescription})
                    </label>
                    <div className="qty-control qty-control-lg">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="qty-step-btn"
                        aria-label="Diminuir quantidade"
                      >
                        -
                      </button>
                      <input
                        id="detail-qty-input"
                        type="number"
                        min={1}
                        step={1}
                        value={quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          setQuantity(Number.isNaN(val) || val < 1 ? 1 : val);
                        }}
                        className="qty-number-input"
                      />
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="qty-step-btn"
                        aria-label="Aumentar quantidade"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="detail-units-conversion">
                    <span>Volume equivalente selecionado</span>
                    <strong>
                      {quantity} {product.commercialUnit.toLowerCase()}
                      {quantity > 1 ? 's' : ''} ({quantity * product.unitsPerPack}{' '}
                      {product.unitsPerPack === 1 ? 'volume' : 'unidades internas'})
                    </strong>
                  </div>
                </div>

                <div className="detail-note-group">
                  <label htmlFor="detail-item-note" className="filter-label">
                    Observação opcional para este produto
                  </label>
                  <input
                    id="detail-item-note"
                    type="text"
                    value={itemNote}
                    onChange={(e) => setItemNote(e.target.value)}
                    placeholder="Ex: Preferência de entrega pela manhã ou dúvida sobre lote"
                    className="filter-input"
                  />
                </div>

                <div className="detail-submit-row">
                  <button type="submit" className="btn btn-accent btn-lg">
                    Adicionar ao orçamento
                  </button>
                  <Link to="/orcamento" className="btn btn-secondary btn-lg">
                    Ir para minha lista ({inQuoteQty} deste item)
                  </Link>
                </div>
              </form>

              <div className="detail-storage-box">
                <h3>Armazenamento e movimentação</h3>
                <p>{product.storageNote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Produtos Relacionados de Forma Contextual */}
      <section className="section-block section-warm">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="section-kicker">Compra complementar</span>
              <h2 className="section-title">Produtos relacionados em {product.categoryName}</h2>
              <p className="section-subtitle">
                Outros itens da mesma categoria para complementar o abastecimento do seu negócio
              </p>
            </div>
            <Link to={`/categoria/${product.categorySlug}`} className="btn btn-secondary">
              Ver toda a categoria
            </Link>
          </div>

          <div className="products-grid">
            {relatedProducts.map((related) => (
              <ProductCard key={related.code} product={related} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

