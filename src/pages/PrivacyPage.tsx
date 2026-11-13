import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_CONFIG } from '../config/company';
import { PageMeta } from '../components/PageMeta';

export const PrivacyPage: React.FC = () => {
  return (
    <>
      <PageMeta
        title="Política de Privacidade"
        description="Diretrizes de privacidade e tratamento de dados do portal demonstrativo da Vértice Distribuidora em Serra, Espírito Santo"
      />

      <section className="page-hero-band">
        <div className="container">
          <nav aria-label="Navegação estrutural" className="breadcrumb-nav">
            <Link to="/">Início</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Privacidade</span>
          </nav>
          <h1 className="page-hero-title">Política de privacidade</h1>
          <p className="page-hero-lead">
            Informações transparentes sobre o funcionamento deste ambiente demonstrativo e os dados manipulados durante a navegação
          </p>
        </div>
      </section>

      <section className="section-block section-white">
        <div className="container legal-container">
          <div className="legal-notice-banner" role="note">
            <strong>Documento preparado para revisão jurídica antes da publicação comercial</strong>
            <span>
              Este texto descreve exclusivamente o comportamento técnico atual do projeto demonstrativo da {COMPANY_CONFIG.name} e deve ser revisado com os dados empresariais definitivos antes de eventual entrada em operação comercial
            </span>
          </div>

          <article className="legal-article">
            <h2>1 Escopo e finalidade</h2>
            <p>
              Esta página descreve como as informações inseridas pelo visitante são tratadas durante o uso do catálogo e da lista de orçamento da {COMPANY_CONFIG.name}
            </p>

            <h2>2 Armazenamento local da lista de orçamento</h2>
            <p>
              Para preservar sua seleção de produtos durante a navegação entre páginas, o site utiliza o recurso de armazenamento local do navegador apenas para registrar o código demonstrativo do item, a quantidade selecionada e a observação vinculada ao produto
            </p>
            <p>
              Nenhum dado pessoal como nome, telefone, e-mail ou nome da empresa é gravado no armazenamento permanente do navegador
            </p>

            <h2>3 Dados informados nos formulários de orçamento e atendimento</h2>
            <p>
              Nos formulários de solicitação de orçamento e de atendimento comercial são solicitados apenas nome, nome da empresa, telefone comercial ou e-mail, município e observações opcionais
            </p>
            <p>
              Não solicitamos número de CNPJ, documentos societários ou dados bancários na etapa inicial de cotação pelo site
            </p>
            <p>
              Enquanto um serviço de envio externo não estiver configurado, os dados preenchidos nos formulários permanecem restritos à sessão ativa do seu navegador para geração do resumo em tela e cópia manual pelo próprio usuário
            </p>

            <h2>4 Ausência de rastreadores não essenciais</h2>
            <p>
              Este projeto não carrega scripts publicitários, pixels de remarketing ou rastreadores comportamentais de terceiros sem o consentimento prévio do visitante
            </p>

            <h2>5 Canal de esclarecimentos</h2>
            <p>
              Em caso de publicação comercial futura, o controlador responsável pelo tratamento de dados deverá indicar nesta seção o encarregado pelo tratamento de dados pessoais e o canal oficial de contato
            </p>
          </article>
        </div>
      </section>
    </>
  );
};
