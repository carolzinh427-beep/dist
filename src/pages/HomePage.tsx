import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BUSINESS_SEGMENTS, COMPANY_CONFIG, MUNICIPALITIES_COVERAGE } from '../config/company';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { PageMeta } from '../components/PageMeta';
import { ProductCard } from '../components/ProductCard';
import { CircularCarousel, CarouselItem } from '../components/CircularCarousel';
import Carousel, { CarouselItem as TiltCarouselItem } from '../components/Carousel';
import Stepper, { Step } from '../components/Stepper';
import GlassIcons, { GlassIconsItem } from '../components/GlassIcons';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [featuredStartIndex, setFeaturedStartIndex] = useState<number>(0);
  const [activePopupUnit, setActivePopupUnit] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : false));

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!activePopupUnit) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePopupUnit(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePopupUnit]);

  // Informações detalhadas das unidades de comercialização
  const unitsInfo: Record<string, { title: string; subtitle: string; explanation: string; example: string; tag: string }> = {
    fardo: {
      title: 'Fardo Fechado',
      subtitle: 'Agrupamento em filme termoencolhível',
      explanation: 'Conjunto de embalagens primárias mantidas juntas por plástico de alta densidade termoencolhível ou cinta protetora, ideal para transporte, empilhamento em estoque e revenda sem danos',
      example: 'Água mineral 500 ml em fardo com 12 garrafas ou arroz 5 kg em fardo reforçado com 6 pacotes',
      tag: 'Mais comum em bebidas e grãos'
    },
    caixa: {
      title: 'Caixa Coletiva de Embarque',
      subtitle: 'Proteção em papelão ondulado',
      explanation: 'Embalagem externa coletiva de papelão estruturado projetada para absorver impactos e proteger frascos de vidro, latas de alumínio, óleos ou sachês durante o transporte e armazenagem',
      example: 'Óleo de soja 900 ml em caixa com 20 unidades ou detergente 500 ml em caixa fechada com 24 frascos',
      tag: 'Padrão para químicos, óleos e latas'
    },
    pacote: {
      title: 'Pacote Institucional',
      subtitle: 'Agrupamento compacto pronto para uso',
      explanation: 'Embalagem compacta de itens consumíveis ou descartáveis, organizada para abastecimento direto de dispensers em banheiros, copas, recepções ou balcões sem necessidade de fracionamento',
      example: 'Copo descartável 200 ml em pacote com 100 copos ou papel toalha interfolhado em pacotes de folhas duplas',
      tag: 'Ideal para copas, descartáveis e dispensers'
    },
    unidade: {
      title: 'Unidade de Grande Volume',
      subtitle: 'Recipiente profissional independente',
      explanation: 'Item comercializado de forma avulsa quando a própria embalagem já contém um volume expressivo e suficiente para a operação profissional, sem necessidade de embalagem coletiva',
      example: 'Sabonete líquido concentrado ou desinfetante hospitalar em galão individual de 5 litros',
      tag: 'Galões de 5 L e produtos concentrados'
    }
  };

  const glassUnitItems: GlassIconsItem[] = [
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
      onClick: () => setActivePopupUnit('fardo')
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
      onClick: () => setActivePopupUnit('caixa')
    },
    {
      id: 'pacote',
      label: 'Pacote',
      color: 'green',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      ),
      onClick: () => setActivePopupUnit('pacote')
    },
    {
      id: 'unidade',
      label: 'Unidade',
      color: 'orange',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 3h12l2 6v11a2 2 0 01-2 2H6a2 2 0 01-2-2V9l2-6z" />
          <path d="M10 13h4M10 3v6" />
        </svg>
      ),
      onClick: () => setActivePopupUnit('unidade')
    }
  ];

  // Exibição de produtos demonstrativos com paginação/navegação por setas (4 por linha no desktop / 3 no mobile)
  const allProducts = PRODUCTS;
  const totalProducts = allProducts.length;

  const handlePrevProducts = () => {
    setFeaturedStartIndex((prev) => (prev - 4 < 0 ? Math.max(0, totalProducts - 4) : prev - 4));
  };

  const handleNextProducts = () => {
    setFeaturedStartIndex((prev) => (prev + 4 >= totalProducts ? 0 : prev + 4));
  };

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
              preset={isMobile ? 'wheel' : 'orbit'}
              intro="rise"
              cardWidth={isMobile ? 280 : 340}
              aspectRatio={isMobile ? 1.55 : 1.38}
              gap={isMobile ? 22 : 32}
              speed={10}
              curve={0}
              captions={false}
              fadeColor="#F7F8F4"
              onItemClick={handleCarouselItemClick}
            />
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
            <div className="featured-heading-controls">
              <div className="featured-nav-arrows" aria-label="Navegar entre produtos">
                <button
                  type="button"
                  onClick={handlePrevProducts}
                  className="featured-arrow-btn"
                  aria-label="Ver produtos anteriores"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleNextProducts}
                  className="featured-arrow-btn"
                  aria-label="Ver mais produtos ao lado"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
              <Link to="/catalogo" className="btn btn-primary">
                Conferir todos os 20 itens
              </Link>
            </div>
          </div>

          <div className="featured-showcase-wrapper">
            <button
              type="button"
              onClick={handlePrevProducts}
              className="featured-side-arrow featured-side-arrow-prev"
              aria-label="Ver produtos anteriores"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="products-grid featured-products-grid">
              {allProducts.slice(featuredStartIndex, featuredStartIndex + 4).map((product) => (
                <ProductCard key={product.code} product={product} />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNextProducts}
              className="featured-side-arrow featured-side-arrow-next"
              aria-label="Ver mais produtos ao lado"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
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
            />
          </div>
        </div>
      </section>

      {/* Seção: Diferença entre unidade, caixa, fardo e pacote com GlassIcons */}
      <section className="section-block section-warm packaging-units-section" aria-label="Entenda as embalagens de comercialização">
        <div className="container">
          <div className="section-heading-row text-center-block">
            <div>
              <span className="section-kicker">Guia de embalagens</span>
              <h2 className="section-title">Diferença entre unidade, caixa, fardo e pacote</h2>
              <p className="section-subtitle">
                Clique nos ícones em vidro verde para conferir as características e entender como cada produto é faturado e despachado
              </p>
            </div>
          </div>

          <div className="glass-units-showcase">
            <div className="glass-units-icons-holder">
              <GlassIcons
                items={glassUnitItems}
                size={isMobile ? 86 : 92}
                gap={isMobile ? 32 : 36}
                columns={isMobile ? 2 : 4}
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
                theme="light"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pop-up Modal explicativo para a embalagem selecionada */}
      {activePopupUnit && unitsInfo[activePopupUnit] && (
        <div
          className="unit-popup-backdrop"
          onClick={() => setActivePopupUnit(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="unit-popup-title"
        >
          <div
            className="unit-popup-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="unit-popup-close-btn"
              onClick={() => setActivePopupUnit(null)}
              aria-label="Fechar janela"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="unit-popup-header">
              <div className="unit-popup-badge-wrapper">
                <span className="badge-unit">{unitsInfo[activePopupUnit].tag}</span>
              </div>
              <h3 id="unit-popup-title" className="unit-popup-title">
                {unitsInfo[activePopupUnit].title}
              </h3>
              <span className="unit-popup-subtitle">
                {unitsInfo[activePopupUnit].subtitle}
              </span>
            </div>

            <div className="unit-popup-body">
              <p className="unit-popup-desc">
                {unitsInfo[activePopupUnit].explanation}
              </p>
              <div className="unit-popup-example">
                <strong>Exemplo prático de reposição:</strong>
                <span>{unitsInfo[activePopupUnit].example}</span>
              </div>
            </div>

            <div className="unit-popup-footer">
              <Link
                to="/catalogo"
                className="btn btn-secondary btn-sm"
                onClick={() => setActivePopupUnit(null)}
              >
                Ver produtos nesta modalidade
              </Link>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => setActivePopupUnit(null)}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Seção: Do catálogo ao seu estoque com Stepper */}
      <section className="section-block section-forest">
        <div className="container">
          <div className="section-heading-row text-center-block">
            <div>
              <span className="section-kicker kicker-light">Fluxo de cotação</span>
              <h2 className="section-title text-light">Do catálogo ao seu estoque</h2>
              <p className="section-subtitle text-light-muted">
                Um processo direto para você organizar sua lista de compras sem burocracia na primeira etapa
              </p>
            </div>
          </div>

          <div className="stepper-home-wrapper">
            <Stepper
              initialStep={1}
              theme="dark"
              width={760}
              radius={20}
              backButtonText="Passo anterior"
              nextButtonText="Próximo passo"
              completeButtonText="Ir para o catálogo"
              onFinalStepCompleted={() => navigate('/catalogo')}
              completedContent={
                <div className="stepper-completed-card">
                  <div className="stepper-completed-badge">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="stepper-completed-title">Tudo pronto para começar</h3>
                  <p className="stepper-completed-desc">
                    Navegue pelas categorias e adicione os fardos e caixas que sua empresa precisa repor nesta semana
                  </p>
                  <Link to="/catalogo" className="btn btn-primary">
                    Explorar catálogo completo
                  </Link>
                </div>
              }
            >
              <Step title="Escolha dos itens" description="Seleção no catálogo">
                <div className="stepper-pane-content">
                  <span className="stepper-pane-step-tag">Etapa 1 de 4</span>
                  <h3 className="stepper-pane-title">Localize os produtos ideais</h3>
                  <p className="stepper-pane-desc">
                    Navegue pelas 6 categorias principais ou utilize a barra de busca por nome, marca e código SKU para encontrar bebidas, grãos, químicos e descartáveis
                  </p>
                  <div className="stepper-pane-highlight">
                    <span className="badge-code">Dica de compra</span>
                    <span>Consulte o fardo e a quantidade mínima indicada em cada card do catálogo</span>
                  </div>
                </div>
              </Step>

              <Step title="Quantidades" description="Fardos e caixas">
                <div className="stepper-pane-content">
                  <span className="stepper-pane-step-tag">Etapa 2 de 4</span>
                  <h3 className="stepper-pane-title">Defina o volume para sua reposição</h3>
                  <p className="stepper-pane-desc">
                    Adicione à lista a quantidade de fardos, caixas fechadas ou galões de 5 litros conforme a demanda planejada para o seu estabelecimento
                  </p>
                  <div className="stepper-pane-highlight">
                    <span className="badge-unit">Embalagens fechadas</span>
                    <span>Todos os itens são distribuídos em caixas e fardos reforçados para transporte seguro</span>
                  </div>
                </div>
              </Step>

              <Step title="Envio da lista" description="Dados básicos">
                <div className="stepper-pane-content">
                  <span className="stepper-pane-step-tag">Etapa 3 de 4</span>
                  <h3 className="stepper-pane-title">Envie sem burocracia cadastral</h3>
                  <p className="stepper-pane-desc">
                    Informe nome da empresa, contato e cidade de entrega na Grande Vitória para receber a cotação, sem envio obrigatório de documentos na primeira etapa
                  </p>
                  <div className="stepper-pane-highlight">
                    <span className="badge-code">Agilidade comercial</span>
                    <span>Sua lista é organizada diretamente para a nossa central de atendimento</span>
                  </div>
                </div>
              </Step>

              <Step title="Proposta e entrega" description="Atendimento comercial">
                <div className="stepper-pane-content">
                  <span className="stepper-pane-step-tag">Etapa 4 de 4</span>
                  <h3 className="stepper-pane-title">Receba valores e agendamento de rota</h3>
                  <p className="stepper-pane-desc">
                    Nossa equipe confere o estoque no centro de distribuição em Serra e envia a proposta com prazos de entrega e condições comerciais para sua aprovação
                  </p>
                  <div className="stepper-pane-highlight">
                    <span className="badge-unit">Entrega regional</span>
                    <span>Rotas dedicadas para Serra, Vitória, Vila Velha, Cariacica e Viana</span>
                  </div>
                </div>
              </Step>
            </Stepper>
          </div>
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
          </div>
        </div>
      </section>
    </>
  );
};

