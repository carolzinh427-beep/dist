import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_CONFIG } from '../config/company';
import { CATEGORIES, FAQ_ITEMS } from '../data/products';
import { PageMeta } from '../components/PageMeta';

export const AboutPage: React.FC = () => {
  return (
    <>
      <PageMeta
        title="Sobre a Vértice"
        description="Conheça a proposta comercial da Vértice Distribuidora em Serra, Espírito Santo Organização de pedidos de bebidas, alimentos, limpeza e descartáveis para negócios"
      />

      <section className="page-hero-band">
        <div className="container">
          <nav aria-label="Navegação estrutural" className="breadcrumb-nav">
            <Link to="/">Início</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Sobre a Vértice</span>
          </nav>
          <h1 className="page-hero-title">Sobre a {COMPANY_CONFIG.name}</h1>
          <p className="page-hero-lead">
            Uma proposta comercial voltada para simplificar o abastecimento de bebidas, alimentos, produtos de limpeza e itens de apoio para empresas da Grande Vitória
          </p>
        </div>
      </section>

      <section className="section-block section-white">
        <div className="container">
          <div className="about-main-grid">
            <div className="about-narrative-col">
              <span className="section-kicker">Nossa proposta de trabalho</span>
              <h2 className="section-title">
                Organização de pedidos e variedade em um único canal empresarial
              </h2>
              <p className="about-paragraph">
                A {COMPANY_CONFIG.name} foi concebida em {COMPANY_CONFIG.location.city}, {COMPANY_CONFIG.location.state}, com o objetivo de concentrar categorias essenciais para a rotina de comércios, serviços de alimentação, escritórios e condomínios em uma jornada clara de cotação
              </p>
              <p className="about-paragraph">
                Em vez de fragmentar as compras do mês entre múltiplos catálogos avulsos, o comprador empresarial encontra bebidas não alcoólicas, cervejas, itens básicos de mercearia seca, linha de limpeza, higiene institucional e descartáveis identificados pelas suas respectivas unidades comerciais de fardo, caixa, pacote ou galão
              </p>
              <p className="about-paragraph">
                O modelo de atendimento prioriza a clareza antes do fechamento do pedido: o cliente monta sua lista de orçamento com as quantidades desejadas, registra observações específicas para cada item e recebe o retorno da equipe com confirmação de disponibilidade, condições de pagamento e programação de entrega para o seu município
              </p>

              <div className="about-pillars-grid">
                <div className="about-pillar-box">
                  <h3>Padronização de embalagens</h3>
                  <p>
                    Indicação transparente do conteúdo unitário e da quantidade de unidades dentro de cada fardo, caixa ou pacote
                  </p>
                </div>
                <div className="about-pillar-box">
                  <h3>Foco no comprador empresarial</h3>
                  <p>
                    Navegação direta por categoria, marca ou código do produto, pensada para quem precisa repor estoque com agilidade
                  </p>
                </div>
                <div className="about-pillar-box">
                  <h3>Atendimento regional próximo</h3>
                  <p>
                    Atuação direcionada aos municípios de Serra, Vitória, Vila Velha, Cariacica e Viana
                  </p>
                </div>
              </div>
            </div>

            <div className="about-side-col">
              <figure className="about-operation-figure">
                <img
                  src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80"
                  alt="Organização de caixas e mercadorias em prateleiras de operação logística"
                  width={520}
                  height={380}
                  loading="lazy"
                  className="about-photo-img"
                />
                <figcaption className="hero-figcaption">
                  Imagem meramente ilustrativa de operação de separação de mercadorias
                </figcaption>
              </figure>

              <div className="about-summary-card">
                <h3>Resumo institucional</h3>
                <dl className="regional-summary-dl">
                  <div>
                    <dt>Nome comercial</dt>
                    <dd>{COMPANY_CONFIG.name}</dd>
                  </div>
                  <div>
                    <dt>Localização base</dt>
                    <dd>{COMPANY_CONFIG.location.city}, {COMPANY_CONFIG.location.state}</dd>
                  </div>
                  <div>
                    <dt>Municípios de atendimento</dt>
                    <dd>{COMPANY_CONFIG.coverageAreas.join(', ')}</dd>
                  </div>
                  <div>
                    <dt>Público atendido</dt>
                    <dd>{COMPANY_CONFIG.targetAudience}</dd>
                  </div>
                  <div>
                    <dt>Horário ilustrativo</dt>
                    <dd>{COMPANY_CONFIG.businessHours.summary}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Linhas de produtos trabalhadas */}
      <section className="section-block section-warm">
        <div className="container">
          <span className="section-kicker">Escopo de fornecimento</span>
          <h2 className="section-title">Categorias reunidas na operação</h2>
          <div className="about-categories-list">
            {CATEGORIES.map((cat) => (
              <div key={cat.slug} className="about-cat-item">
                <h3>{cat.name}</h3>
                <p>{cat.fullDescription}</p>
                <Link to={`/categoria/${cat.slug}`} className="segment-link">
                  Conferir produtos da linha
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perguntas Frequentes Úteis (Substituindo depoimentos fictícios) */}
      <section className="section-block section-white">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="section-kicker">Esclarecimentos práticos</span>
              <h2 className="section-title">Perguntas frequentes sobre nossa operação</h2>
              <p className="section-subtitle">
                Respostas diretas sobre como cotar produtos, entender as embalagens coletivas e consultar condições de entrega
              </p>
            </div>
            <Link to="/atendimento" className="btn btn-secondary">
              Ir para a página de atendimento
            </Link>
          </div>

          <div className="faq-grid">
            {FAQ_ITEMS.map((faq) => (
              <article key={faq.id} className="faq-card">
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

