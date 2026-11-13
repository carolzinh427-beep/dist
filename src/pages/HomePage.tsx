import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BUSINESS_SEGMENTS, COMPANY_CONFIG, MUNICIPALITIES_COVERAGE } from '../config/company';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { PageMeta } from '../components/PageMeta';
import { ProductCard } from '../components/ProductCard';
import { CircularCarousel, CarouselItem } from '../components/CircularCarousel';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const featuredProducts = PRODUCTS.filter((p) => p.featuredOnHome);

  // Mapeamento das 6 categorias com fotos temáticas de alta qualidade para o CircularCarousel
  const categoryCarouselItems: CarouselItem[] = [
    {
      src: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      alt: 'Bebidas não alcoólicas: águas minerais, sucos e refrigerantes',
      title: 'Bebidas Não Alcoólicas',
      subtitle: 'Águas, Sucos e Refrigerantes',
      slug: 'bebidas-nao-alcoolicas'
    },
    {
      src: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=800&q=80',
      alt: 'Cervejas e bebidas alcoólicas: latas e garrafas em caixas fechadas',
      title: 'Cervejas e Alcoólicas',
      subtitle: 'Latas e Garrafas em Caixas Fechadas',
      slug: 'cervejas-e-bebidas-alcoolicas'
    },
    {
      src: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
      alt: 'Alimentos e mercearia seca: grãos, cafés e óleos em fardos',
      title: 'Alimentos e Mercearia',
      subtitle: 'Arroz, Feijão, Café e Óleos em Fardos',
      slug: 'alimentos-e-mercearia'
    },
    {
      src: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80',
      alt: 'Produtos de limpeza: detergentes, desinfetantes e limpadores',
      title: 'Produtos de Limpeza',
      subtitle: 'Detergentes, Desinfetantes e Químicos',
      slug: 'produtos-de-limpeza'
    },
    {
      src: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
      alt: 'Higiene profissional: galões de sabonete e papéis institucionais',
      title: 'Higiene Profissional',
      subtitle: 'Sabonete 5 L e Papéis Institucionais',
      slug: 'higiene-profissional'
    },
    {
      src: 'https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?auto=format&fit=crop&w=800&q=80',
      alt: 'Descartáveis e embalagens: copos, mangas e sacos de lixo',
      title: 'Descartáveis e Embalagens',
      subtitle: 'Copos Plásticos e Sacos 100 L',
      slug: 'descartaveis-e-embalagens'
    }
  ];

  const handleCarouselItemClick = (item: CarouselItem) => {
    if (item.slug) {
      navigate(`/categoria/${item.slug}`);
    }
  };

  return (
    <>
      <PageMeta
        title="Início"
        description="Vértice Distribuidora em Serra, Espírito Santo Bebidas, alimentos, produtos de limpeza, higiene profissional e descartáveis para empresas da Grande Vitória"
      />

      {/* Primeira Dobra (Hero com imagem de distribuidora ao fundo e frase centralizada) */}
      <section className="hero-section" aria-label="Apresentação principal">
        <div className="hero-bg-media" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80"
            alt=""
            width={1600}
            height={720}
            fetchPriority="high"
            className="hero-bg-img"
          />
          <div className="hero-bg-overlay" />
        </div>

        <div className="container hero-centered-inner">
          <span className="hero-regional-tag">
            {COMPANY_CONFIG.regionalTagline}
          </span>
          <h1 className="hero-heading">
            O abastecimento que acompanha o ritmo do seu negócio
          </h1>
          <p className="hero-lead">
            Bebidas, alimentos e produtos de limpeza para empresas da Grande Vitória, com atendimento próximo e pedidos organizados em um só lugar
          </p>

          <div className="hero-actions">
            <Link to="/catalogo" className="btn btn-accent btn-lg">
              Explorar catálogo
            </Link>
            <Link to="/orcamento" className="btn btn-outline-light btn-lg">
              Montar meu orçamento
            </Link>
          </div>
        </div>
      </section>

      {/* Seção de Categorias com CircularCarousel */}
      <section className="section-block section-warm">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="section-kicker">Mix de distribuição</span>
              <h2 className="section-title">Categorias para abastecimento completo</h2>
              <p className="section-subtitle">
                Gire o carrossel ou clique no card para explorar bebidas, mercearia seca, produtos de limpeza, higiene e descartáveis
              </p>
            </div>
            <Link to="/catalogo" className="btn btn-secondary">
              Ver catálogo completo
            </Link>
          </div>

          <div className="carousel-wrapper-block">
            <CircularCarousel
              items={categoryCarouselItems}
              preset="cylinder"
              intro="rise"
              cardWidth={240}
              aspectRatio={1}
              gap={28}
              speed={12}
              captions={true}
              fadeColor="#F7F8F4"
              onItemClick={handleCarouselItemClick}
            />
          </div>

          <div className="categories-quick-links" aria-label="Acesso direto por categoria">
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} to={`/categoria/${cat.slug}`} className="category-quick-btn">
                <span>{cat.name}</span>
                <small>{cat.packagingFocus}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Seleção de Produtos Demonstrativos */}
      <section className="section-block section-white">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="section-kicker">Itens de giro comercial</span>
              <h2 className="section-title">Seleção de produtos demonstrativos</h2>
              <p className="section-subtitle">
                Confira exemplos do catálogo com indicação de conteúdo unitário, quantidade por embalagem coletiva e unidade de comercialização
              </p>
            </div>
            <Link to="/catalogo" className="btn btn-primary">
              Conferir todos os 20 itens
            </Link>
          </div>

          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.code} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Seção: Abastecimento para cada tipo de negócio */}
      <section id="segmentos" className="section-block section-warm">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="section-kicker">Perfil de compra empresarial</span>
              <h2 className="section-title">Abastecimento para cada tipo de negócio</h2>
              <p className="section-subtitle">
                Atendemos demandas de revenda no varejo, preparo em cozinhas, atendimento de salão e manutenção de áreas comuns
              </p>
            </div>
          </div>

          <div className="segments-grid">
            {BUSINESS_SEGMENTS.map((segment) => (
              <article key={segment.id} className="segment-card">
                <div className="segment-card-header">
                  <h3 className="segment-card-title">{segment.name}</h3>
                  <p className="segment-card-summary">{segment.summary}</p>
                </div>
                <ul className="segment-needs-list">
                  {segment.needs.map((need, idx) => (
                    <li key={idx}>{need}</li>
                  ))}
                </ul>
                <div className="segment-card-footer">
                  <Link
                    to={`/categoria/${segment.recommendedCategories[0]}`}
                    className="segment-link"
                  >
                    Ver produtos indicados para este perfil
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Seção: Do catálogo ao seu estoque */}
      <section className="section-block section-forest">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="section-kicker kicker-light">Fluxo de cotação</span>
              <h2 className="section-title text-light">Do catálogo ao seu estoque</h2>
              <p className="section-subtitle text-light-muted">
                Um processo direto para você organizar sua lista de compras sem burocracia na primeira etapa
              </p>
            </div>
          </div>

          <ol className="process-steps-grid">
            <li className="process-step-card">
              <span className="process-step-number">1</span>
              <h3 className="process-step-title">Escolha os produtos</h3>
              <p className="process-step-desc">
                Navegue pelas categorias ou utilize a busca por nome, marca e código para localizar bebidas, alimentos, itens de limpeza e descartáveis
              </p>
            </li>
            <li className="process-step-card">
              <span className="process-step-number">2</span>
              <h3 className="process-step-title">Informe as quantidades</h3>
              <p className="process-step-desc">
                Defina a quantidade de fardos, caixas, pacotes ou unidades conforme a necessidade de reposição do seu estabelecimento
              </p>
            </li>
            <li className="process-step-card">
              <span className="process-step-number">3</span>
              <h3 className="process-step-title">Envie sua solicitação</h3>
              <p className="process-step-desc">
                Preencha seus dados básicos de contato comercial sem necessidade de enviar documentos ou CNPJ nesta etapa inicial
              </p>
            </li>
            <li className="process-step-card">
              <span className="process-step-number">4</span>
              <h3 className="process-step-title">Receba a proposta da equipe</h3>
              <p className="process-step-desc">
                Nossa equipe comercial confere a disponibilidade dos itens, informa valores, condições de pagamento e programação de entrega na sua região
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* Seção Final: Atendimento Regional e Chamada para Orçamento */}
      <section className="section-block section-white">
        <div className="container">
          <div className="regional-home-panel">
            <div className="regional-home-copy">
              <span className="section-kicker">Presença na Grande Vitória</span>
              <h2 className="section-title">
                Atendimento regional a partir de Serra, Espírito Santo
              </h2>
              <p className="section-subtitle">
                Nossa operação demonstrativa é estruturada para atender comerciantes, síndicos e compradores empresariais nos principais municípios da região metropolitana
              </p>

              <div className="regional-cities-chips">
                {MUNICIPALITIES_COVERAGE.map((city) => (
                  <Link key={city.id} to="/entregas" className="city-chip">
                    <strong>{city.name}</strong>
                    <span>{city.zoneLabel}</span>
                  </Link>
                ))}
              </div>

              <div className="regional-home-actions">
                <Link to="/orcamento" className="btn btn-accent btn-lg">
                  Montar meu primeiro orçamento
                </Link>
                <Link to="/entregas" className="btn btn-secondary btn-lg">
                  Consultar entregas e regiões
                </Link>
              </div>
            </div>

            <div className="regional-home-summary">
              <h3 className="regional-summary-heading">Pronto para organizar seu pedido?</h3>
              <p className="regional-summary-text">
                Monte sua lista de produtos no catálogo e gere seu resumo de orçamento para atendimento comercial
              </p>
              <dl className="regional-summary-dl">
                <div>
                  <dt>Localização base</dt>
                  <dd>{COMPANY_CONFIG.location.city}, {COMPANY_CONFIG.location.state}</dd>
                </div>
                <div>
                  <dt>Horário de atendimento</dt>
                  <dd>{COMPANY_CONFIG.businessHours.summary}</dd>
                </div>
                <div>
                  <dt>Condições logísticas</dt>
                  <dd>{COMPANY_CONFIG.deliveryConfig.defaultStatusText}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

