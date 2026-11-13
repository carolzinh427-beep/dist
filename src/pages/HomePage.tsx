import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BUSINESS_SEGMENTS, COMPANY_CONFIG, MUNICIPALITIES_COVERAGE } from '../config/company';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { PageMeta } from '../components/PageMeta';
import { ProductCard } from '../components/ProductCard';
import { CircularCarousel, CarouselItem } from '../components/CircularCarousel';
import Carousel, { CarouselItem as TiltCarouselItem } from '../components/Carousel';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const featuredProducts = PRODUCTS.filter((p) => p.featuredOnHome);
  const [activeSegmentIndex, setActiveSegmentIndex] = useState<number>(0);

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

  const segmentCarouselItems: TiltCarouselItem[] = [
    {
      id: 'mercados',
      title: 'Mercados e mercearias',
      description: 'Reposição de grãos, bebidas e produtos de limpeza em fardos e caixas fechadas para revenda direta',
      image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
      alt: 'Prateleiras abastecidas em mercado e mercearia',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
        </svg>
      )
    },
    {
      id: 'bares',
      title: 'Bares e casas noturnas',
      description: 'Bebidas geladas, copos descartáveis e insumos de higienização rápida para salão e balcão',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
      alt: 'Balcão de bar e atendimento com bebidas',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M8 21h8M12 15v6M5 3l7 8 7-8H5z" />
        </svg>
      )
    },
    {
      id: 'restaurantes',
      title: 'Restaurantes e cozinhas',
      description: 'Insumos secos de cozinha, bebidas de acompanhamento e linha pesada de limpeza alimentar',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      alt: 'Cozinha profissional de restaurante',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
        </svg>
      )
    },
    {
      id: 'lanchonetes',
      title: 'Lanchonetes e padarias',
      description: 'Bebidas individuais em lata e garrafa, embalagens descartáveis para viagem e higiene de balcão',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      alt: 'Atendimento e balcão de lanchonete e padaria',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 2a5 5 0 015 5c0 2.76-2.24 5-5 5s-5-2.24-5-5a5 5 0 015-5zM4 22v-2a6 6 0 0112 0v2" />
        </svg>
      )
    },
    {
      id: 'escritorios',
      title: 'Escritórios e clínicas',
      description: 'Café moído, açúcar, água mineral, copos descartáveis e linha de papel institucional para recepção e copa',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      alt: 'Ambiente corporativo de escritório e recepção',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
        </svg>
      )
    },
    {
      id: 'condominios',
      title: 'Condomínios e conservação',
      description: 'Água sanitária, desinfetantes e sabonete em galões de 5 litros, além de sacos de lixo de 100 litros',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      alt: 'Fachada e áreas comuns de condomínio residencial e comercial',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9h1M9 13h1M9 17h1M15 13h1M15 17h1" />
        </svg>
      )
    }
  ];

  const currentSegment = BUSINESS_SEGMENTS[activeSegmentIndex] || BUSINESS_SEGMENTS[0];

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
          <div className="section-heading-row text-center-block">
            <div>
              <span className="section-kicker">Perfil de compra empresarial</span>
              <h2 className="section-title">Abastecimento para cada tipo de negócio</h2>
              <p className="section-subtitle">
                Atendemos demandas de revenda no varejo, preparo em cozinhas, atendimento de salão e manutenção de áreas comuns
              </p>
            </div>
          </div>

          {/* Carrossel interativo React Bits com suporte a arrasto, setas, dots e efeito tilt */}
          <div className="business-carousel-wrapper">
            <Carousel
              items={segmentCarouselItems}
              baseWidth={380}
              aspectRatio={1.22}
              effect="tilt"
              indicator="dots"
              frame={true}
              arrows={true}
              loop={true}
              autoplay={true}
              autoplayDelay={3800}
              pauseOnHover={true}
              theme="dark"
              onChange={(index) => setActiveSegmentIndex(index)}
            />
          </div>

          {/* Detalhes interativos do segmento ativo */}
          <div className="business-segment-active-detail">
            <div className="business-segment-detail-header">
              <div>
                <span className="badge-unit">Perfil selecionado no carrossel</span>
                <h3 className="business-segment-detail-title">{currentSegment.name}</h3>
                <p className="business-segment-detail-summary">{currentSegment.summary}</p>
              </div>
              <Link
                to={`/categoria/${currentSegment.recommendedCategories[0]}`}
                className="btn btn-primary"
              >
                Ver catálogo para este perfil
              </Link>
            </div>

            <div className="business-segment-needs-block">
              <h4 className="business-segment-needs-title">Demandas frequentes de reposição</h4>
              <ul className="segment-needs-list">
                {currentSegment.needs.map((need, idx) => (
                  <li key={idx}>{need}</li>
                ))}
              </ul>
            </div>
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

