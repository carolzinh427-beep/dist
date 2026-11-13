import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_CONFIG, MUNICIPALITIES_COVERAGE } from '../config/company';
import { FAQ_ITEMS } from '../data/products';
import { PageMeta } from '../components/PageMeta';

interface ContactErrors {
  name?: string;
  company?: string;
  contactChannel?: string;
  subject?: string;
  message?: string;
}

export const SupportPage: React.FC = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [contactChannel, setContactChannel] = useState('');
  const [municipality, setMunicipality] = useState('Serra');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedPreview, setSubmittedPreview] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const validate = (): boolean => {
    const next: ContactErrors = {};
    if (!name.trim() || name.trim().length < 2) {
      next.name = 'Informe seu nome completo';
    }
    if (!company.trim() || company.trim().length < 2) {
      next.company = 'Informe o nome da sua empresa ou estabelecimento';
    }
    if (!contactChannel.trim() || contactChannel.trim().length < 6) {
      next.contactChannel = 'Informe um telefone comercial ou e-mail válido para retorno';
    }
    if (!subject) {
      next.subject = 'Selecione o assunto do atendimento';
    }
    if (!message.trim() || message.trim().length < 10) {
      next.message = 'Escreva sua dúvida ou solicitação com pelo menos 10 caracteres';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCopyFeedback(null);
    if (!validate()) return;

    setSubmitting(true);
    window.setTimeout(() => {
      const preview = [
        `REGISTRO DEMONSTRATIVO DE ATENDIMENTO (${COMPANY_CONFIG.name.toUpperCase()})`,
        `Nome: ${name.trim()}`,
        `Empresa: ${company.trim()}`,
        `Contato para retorno: ${contactChannel.trim()}`,
        `Município: ${municipality}`,
        `Assunto: ${subject}`,
        `Mensagem: ${message.trim()}`,
      ].join('\n');
      setSubmittedPreview(preview);
      setSubmitting(false);
    }, 300);
  };

  const handleCopyMessage = async () => {
    if (!submittedPreview) return;
    try {
      await navigator.clipboard.writeText(submittedPreview);
      setCopyFeedback('Texto da solicitação copiado para a área de transferência');
    } catch {
      setCopyFeedback('Selecione o texto exibido abaixo para copiar manualmente');
    }
  };

  return (
    <>
      <PageMeta
        title="Atendimento Comercial"
        description="Atendimento comercial e dúvidas frequentes da Vértice Distribuidora em Serra, Espírito Santo Informações sobre orçamento, embalagens, entregas e pagamento"
      />

      <section className="page-hero-band">
        <div className="container">
          <nav aria-label="Navegação estrutural" className="breadcrumb-nav">
            <Link to="/">Início</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Atendimento</span>
          </nav>
          <h1 className="page-hero-title">Atendimento comercial e esclarecimento de dúvidas</h1>
          <p className="page-hero-lead">
            Confira informações sobre funcionamento, condições comerciais e registre sua mensagem para nossa equipe
          </p>
        </div>
      </section>

      <section className="section-block section-white">
        <div className="container">
          <div className="support-layout-grid">
            {/* Coluna Esquerda: Formulário Acessível de Atendimento */}
            <div className="support-form-card">
              <h2 className="quote-form-heading">Formulário de atendimento empresarial</h2>
              <p className="quote-form-sub">
                Utilize o formulário abaixo para dúvidas sobre linhas de produtos, atendimento na Grande Vitória ou pedidos recorrentes
              </p>

              <div className="quote-demo-mode-box" role="note" style={{ marginBottom: '20px' }}>
                <strong>Informação transparente sobre o serviço de envio</strong>
                <span>
                  {COMPANY_CONFIG.contacts.isSubmissionServiceConfigured
                    ? 'Serviço de recepção de mensagens ativo'
                    : 'Nenhum servidor de disparo de mensagens foi configurado neste ambiente demonstrativo Ao enviar o formulário, o sistema valida seus dados e gera o registro na tela para cópia sem transmitir dados para terceiros'}
                </span>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-grid-two">
                  <div className="form-field">
                    <label htmlFor="sup-name" className="filter-label">
                      Seu nome *
                    </label>
                    <input
                      id="sup-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'err-sup-name' : undefined}
                      className="filter-input"
                      placeholder="Nome completo"
                    />
                    {errors.name && (
                      <span id="err-sup-name" className="field-error" role="alert">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="form-field">
                    <label htmlFor="sup-company" className="filter-label">
                      Empresa ou comércio *
                    </label>
                    <input
                      id="sup-company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      aria-invalid={Boolean(errors.company)}
                      aria-describedby={errors.company ? 'err-sup-company' : undefined}
                      className="filter-input"
                      placeholder="Nome do estabelecimento"
                    />
                    {errors.company && (
                      <span id="err-sup-company" className="field-error" role="alert">
                        {errors.company}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-grid-two">
                  <div className="form-field">
                    <label htmlFor="sup-contact" className="filter-label">
                      Telefone comercial ou e-mail *
                    </label>
                    <input
                      id="sup-contact"
                      type="text"
                      value={contactChannel}
                      onChange={(e) => setContactChannel(e.target.value)}
                      aria-invalid={Boolean(errors.contactChannel)}
                      aria-describedby={errors.contactChannel ? 'err-sup-contact' : undefined}
                      className="filter-input"
                      placeholder="(27) 00000 0000 ou e-mail"
                    />
                    {errors.contactChannel && (
                      <span id="err-sup-contact" className="field-error" role="alert">
                        {errors.contactChannel}
                      </span>
                    )}
                  </div>

                  <div className="form-field">
                    <label htmlFor="sup-city" className="filter-label">
                      Município
                    </label>
                    <select
                      id="sup-city"
                      value={municipality}
                      onChange={(e) => setMunicipality(e.target.value)}
                      className="filter-select"
                    >
                      {MUNICIPALITIES_COVERAGE.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name} ({COMPANY_CONFIG.location.stateCode})
                        </option>
                      ))}
                      <option value="Outro município no Espírito Santo">
                        Outro município no Espírito Santo
                      </option>
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="sup-subject" className="filter-label">
                    Assunto da solicitação *
                  </label>
                  <select
                    id="sup-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? 'err-sup-subject' : undefined}
                    className="filter-select"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="Dúvida sobre catálogo e embalagens">
                      Dúvida sobre catálogo e embalagens
                    </option>
                    <option value="Consulta de entrega e rota regional">
                      Consulta de entrega e rota regional
                    </option>
                    <option value="Condições comerciais e pagamento">
                      Condições comerciais e pagamento
                    </option>
                    <option value="Outro assunto comercial">
                      Outro assunto comercial
                    </option>
                  </select>
                  {errors.subject && (
                    <span id="err-sup-subject" className="field-error" role="alert">
                      {errors.subject}
                    </span>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="sup-message" className="filter-label">
                    Mensagem *
                  </label>
                  <textarea
                    id="sup-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'err-sup-message' : undefined}
                    className="filter-textarea"
                    placeholder="Descreva sua necessidade de abastecimento ou dúvida"
                  />
                  {errors.message && (
                    <span id="err-sup-message" className="field-error" role="alert">
                      {errors.message}
                    </span>
                  )}
                </div>

                <button type="submit" disabled={submitting} className="btn btn-accent btn-lg">
                  {submitting ? 'Processando solicitação' : 'Registrar solicitação de atendimento'}
                </button>
              </form>

              {submittedPreview && (
                <div className="generated-summary-panel" role="status">
                  <div className="generated-summary-header">
                    <strong>Solicitação validada em modo demonstrativo</strong>
                    <span>
                      Como não há serviço de envio externo configurado, nenhuma mensagem foi transmitida automaticamente Você pode copiar o registro abaixo
                    </span>
                  </div>
                  <pre className="generated-summary-pre">{submittedPreview}</pre>
                  <button type="button" onClick={handleCopyMessage} className="btn btn-primary">
                    Copiar texto da solicitação
                  </button>
                  {copyFeedback && <div className="copy-feedback-msg">{copyFeedback}</div>}
                </div>
              )}
            </div>

            {/* Coluna Direita: Informações de Atendimento e Pagamento */}
            <aside className="support-info-col">
              <div className="support-info-box">
                <h3>Horário e localização demonstrativa</h3>
                <dl className="regional-summary-dl">
                  <div>
                    <dt>Município base</dt>
                    <dd>{COMPANY_CONFIG.location.city}, {COMPANY_CONFIG.location.state}</dd>
                  </div>
                  <div>
                    <dt>Atendimento de segunda a sexta</dt>
                    <dd>{COMPANY_CONFIG.businessHours.weekdays}</dd>
                  </div>
                  <div>
                    <dt>Atendimento aos sábados</dt>
                    <dd>{COMPANY_CONFIG.businessHours.saturday}</dd>
                  </div>
                  <div>
                    <dt>Canais diretos (telefone, WhatsApp e e-mail)</dt>
                    <dd>
                      {COMPANY_CONFIG.contacts.phone ??
                        'Preparados no arquivo de configuração para preenchimento antes da publicação comercial'}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="support-info-box">
                <h3>Condições de pagamento</h3>
                <p className="support-payment-status">{COMPANY_CONFIG.paymentConfig.statusText}</p>
                <p className="support-payment-notes">{COMPANY_CONFIG.paymentConfig.notes}</p>
              </div>

              <div className="support-info-box">
                <h3>Deseja cotar itens agora?</h3>
                <p style={{ marginBottom: '14px' }}>
                  Se você já sabe quais produtos precisa repor, utilize diretamente nossa lista de orçamento
                </p>
                <Link to="/orcamento" className="btn btn-primary" style={{ width: '100%' }}>
                  Acessar lista de orçamento
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Dúvidas Frequentes Completas */}
      <section className="section-block section-warm">
        <div className="container">
          <span className="section-kicker">Base de conhecimento</span>
          <h2 className="section-title">
            Dúvidas frequentes sobre orçamento, embalagens, entregas e pagamento
          </h2>

          <div className="faq-grid" style={{ marginTop: '24px' }}>
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
