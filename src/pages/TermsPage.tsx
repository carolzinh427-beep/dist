import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_CONFIG } from '../config/company';
import { PageMeta } from '../components/PageMeta';

export const TermsPage: React.FC = () => {
  return (
    <>
      <PageMeta
        title="Termos de Uso"
        description="Termos e condições de uso do catálogo e da lista de orçamento da Vértice Distribuidora em Serra, Espírito Santo"
      />

      <section className="page-hero-band">
        <div className="container">
          <nav aria-label="Navegação estrutural" className="breadcrumb-nav">
            <Link to="/">Início</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Termos de uso</span>
          </nav>
          <h1 className="page-hero-title">Termos de uso</h1>
          <p className="page-hero-lead">
            Regras de utilização do catálogo de produtos e da ferramenta de montagem de orçamento da {COMPANY_CONFIG.name}
          </p>
        </div>
      </section>

      <section className="section-block section-white">
        <div className="container legal-container">
          <div className="legal-notice-banner" role="note">
            <strong>Natureza demonstrativa do projeto</strong>
            <span>
              {COMPANY_CONFIG.demoNotice}
            </span>
          </div>

          <article className="legal-article">
            <h2>1 Função do catálogo e da lista de orçamento</h2>
            <p>
              O site da {COMPANY_CONFIG.name} tem como objetivo permitir a consulta organizada de produtos distribuídos em fardos, caixas, pacotes e unidades e facilitar a elaboração de listas de cotação por compradores empresariais
            </p>

            <h2>2 Não caracterização de venda automática ou reserva de estoque</h2>
            <p>
              A inclusão de itens na lista de orçamento ou o preenchimento dos formulários disponíveis no site não constitui pedido faturado, contrato de fornecimento, reserva automática de estoque ou compromisso de entrega
            </p>
            <p>
              Toda solicitação depende de análise comercial posterior para confirmação de disponibilidade dos produtos, definição de preços vigentes, modalidades de pagamento e programação logística para o município indicado
            </p>

            <h2>3 Identificação das embalagens e marcas demonstrativas</h2>
            <p>
              As quantidades informadas em cada ficha de produto referem-se à unidade de comercialização destacada, podendo corresponder a fardo fechado, caixa coletiva, pacote institucional ou unidade individual
            </p>
            <p>
              As marcas exibidas neste ambiente demonstrativo são fictícias e não representam vínculo comercial ou endosso de fabricantes reais
            </p>

            <h2>4 Restrição aplicável a bebidas alcoólicas</h2>
            <p>
              A cotação e a comercialização de bebidas alcoólicas destinam-se exclusivamente a maiores de 18 anos e a estabelecimentos regularmente habilitados, sendo proibida a venda ou entrega a menores de idade
            </p>

            <h2>5 Atualização das condições comerciais</h2>
            <p>
              Parâmetros de pedido mínimo, política de frete, calendário de rotas na Grande Vitória e opções de retirada permanecem sob consulta até a formalização da proposta comercial pela equipe de atendimento
            </p>
          </article>
        </div>
      </section>
    </>
  );
};
