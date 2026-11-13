import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_CONFIG, MUNICIPALITIES_COVERAGE } from '../config/company';
import { PRODUCTS } from '../data/products';
import { useQuote } from '../context/QuoteContext';
import { PageMeta } from '../components/PageMeta';
import { ProductVisual } from '../components/ProductVisual';

interface FormErrors {
  requesterName?: string;
  companyName?: string;
  commercialPhone?: string;
  municipality?: string;
}

export const QuoteListPage: React.FC = () => {
  const {
    detailedItems,
    totalDistinctItems,
    totalVolumes,
    addItem,
    updateQuantity,
    updateNote,
    removeItem,
    clearList,
  } = useQuote();

  const [confirmClearOpen, setConfirmClearOpen] = useState(false);
  const [quickAddCode, setQuickAddCode] = useState(PRODUCTS[0].code);

  // Campos do formulário de solicitação (sem armazenar em localStorage)
  const [requesterName, setRequesterName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [commercialPhone, setCommercialPhone] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const isWhatsappConfigured = Boolean(
    COMPANY_CONFIG.contacts.whatsappNumber &&
      /^\d{10,15}$/.test(COMPANY_CONFIG.contacts.whatsappNumber)
  );

  const validateForm = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!requesterName.trim() || requesterName.trim().length < 2) {
      nextErrors.requesterName = 'Informe o seu nome para identificação comercial';
    }
    if (!companyName.trim() || companyName.trim().length < 2) {
      nextErrors.companyName = 'Informe o nome do estabelecimento ou empresa';
    }
    const digits = commercialPhone.replace(/\D/g, '');
    if (digits.length < 10) {
      nextErrors.commercialPhone = 'Informe um telefone comercial válido com DDD';
    }
    if (!municipality) {
      nextErrors.municipality = 'Selecione o município do estabelecimento';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildQuoteSummaryText = (): string => {
    const lines: string[] = [
      `RESUMO DE SOLICITAÇÃO DE ORÇAMENTO (${COMPANY_CONFIG.name.toUpperCase()})`,
      `Status: Solicitação de cotação sujeita à confirmação de disponibilidade, frete e condições comerciais`,
      ``,
      `DADOS DO SOLICITANTE`,
      `Nome: ${requesterName.trim()}`,
      `Empresa: ${companyName.trim()}`,
      `Telefone comercial: ${commercialPhone.trim()}`,
      `Município: ${municipality}`,
    ];

    if (generalNotes.trim()) {
      lines.push(`Observações gerais: ${generalNotes.trim()}`);
    }

    lines.push(``, `ITENS SOLICITADOS (${totalDistinctItems} itens | ${totalVolumes} volumes totais)`);

    detailedItems.forEach((entry, index) => {
      const notePart = entry.note.trim() ? ` | Obs do item: ${entry.note.trim()}` : '';
      lines.push(
        `${index + 1}) [${entry.product.code}] ${entry.product.name} | Quantidade: ${entry.quantity} ${entry.product.commercialUnit}(s) (${entry.product.packQuantityDescription})${notePart}`
      );
    });

    return lines.join('\n');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCopyStatus(null);

    if (detailedItems.length === 0) return;
    if (!validateForm()) return;

    setIsGenerating(true);
    window.setTimeout(() => {
      const summary = buildQuoteSummaryText();
      setGeneratedSummary(summary);
      setIsGenerating(false);
    }, 300);
  };

  const handleCopySummary = async () => {
    const textToCopy = generatedSummary ?? buildQuoteSummaryText();
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopyStatus('Resumo copiado para a área de transferência');
    } catch {
      setCopyStatus('Não foi possível copiar automaticamente, selecione o texto abaixo manualmente');
    }
  };

  const handleWhatsappShare = () => {
    if (!isWhatsappConfigured || !COMPANY_CONFIG.contacts.whatsappNumber) return;
    if (!validateForm()) return;
    const text = buildQuoteSummaryText();
    const url = `https://wa.me/${COMPANY_CONFIG.contacts.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <PageMeta
        title="Lista de Orçamento"
        description="Monte e revise sua lista de orçamento de bebidas, alimentos, produtos de limpeza e descartáveis na Vértice Distribuidora em Serra, ES"
      />

      <section className="page-hero-band">
        <div className="container">
          <nav aria-label="Navegação estrutural" className="breadcrumb-nav">
            <Link to="/">Início</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Lista de orçamento</span>
          </nav>
          <h1 className="page-hero-title">Lista de orçamento empresarial</h1>
          <p className="page-hero-lead">
            Revise as quantidades por embalagem coletiva, inclua observações por produto e gere o resumo da sua cotação
          </p>
        </div>
      </section>

      <section className="section-block section-warm">
        <div className="container">
          {/* Aviso de não conclusão de compra */}
          <div className="commercial-disclaimer-banner" role="note">
            <strong>Importante sobre esta etapa</strong>
            <span>
              A solicitação de orçamento não representa compra concluída, reserva de estoque ou confirmação automática de entrega Os itens permanecem salvos apenas neste navegador sem coleta de documentos ou CNPJ
            </span>
          </div>

          {detailedItems.length === 0 ? (
            <div className="empty-state-box" role="region" aria-label="Lista de orçamento vazia">
              <h2 className="empty-state-title">Sua lista de orçamento está vazia</h2>
              <p className="empty-state-desc">
                Adicione produtos diretamente pelo catálogo ou selecione um item abaixo para iniciar sua lista
              </p>

              <div className="quick-add-bar">
                <label htmlFor="empty-quick-add" className="sr-only">
                  Selecionar um produto para adicionar
                </label>
                <select
                  id="empty-quick-add"
                  value={quickAddCode}
                  onChange={(e) => setQuickAddCode(e.target.value)}
                  className="filter-select"
                >
                  {PRODUCTS.map((p) => (
                    <option key={p.code} value={p.code}>
                      {p.code} | {p.name} ({p.packQuantityDescription})
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => addItem(quickAddCode, 1)}
                  className="btn btn-secondary"
                >
                  Incluir item selecionado
                </button>
              </div>

              <div style={{ marginTop: '20px' }}>
                <Link to="/catalogo" className="btn btn-accent btn-lg">
                  Explorar catálogo de produtos
                </Link>
              </div>
            </div>
          ) : (
            <div className="quote-page-layout">
              {/* Coluna Esquerda: Itens da Lista */}
              <div className="quote-items-col">
                <div className="quote-list-header">
                  <div>
                    <h2 className="quote-section-heading">
                      Produtos selecionados ({totalDistinctItems} {totalDistinctItems === 1 ? 'item' : 'itens'} | {totalVolumes} volumes)
                    </h2>
                  </div>

                  <div className="quote-list-header-actions">
                    <Link to="/catalogo" className="btn btn-secondary">
                      Continuar explorando o catálogo
                    </Link>
                    {!confirmClearOpen ? (
                      <button
                        type="button"
                        onClick={() => setConfirmClearOpen(true)}
                        className="btn btn-danger-outline"
                      >
                        Limpar lista
                      </button>
                    ) : (
                      <div className="confirm-clear-inline" role="alertdialog" aria-label="Confirmar limpeza da lista">
                        <span>Confirmar exclusão de todos os itens?</span>
                        <button
                          type="button"
                          onClick={() => {
                            clearList();
                            setGeneratedSummary(null);
                            setConfirmClearOpen(false);
                          }}
                          className="btn btn-danger-solid"
                        >
                          Sim, limpar
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmClearOpen(false)}
                          className="btn btn-secondary"
                        >
                          Cancelar
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Inclusão rápida de produto extra */}
                <div className="quote-quick-add-box">
                  <label htmlFor="quote-quick-add-select" className="filter-label">
                    Adicionar outro produto rapidamente à lista
                  </label>
                  <div className="quote-quick-add-row">
                    <select
                      id="quote-quick-add-select"
                      value={quickAddCode}
                      onChange={(e) => setQuickAddCode(e.target.value)}
                      className="filter-select"
                    >
                      {PRODUCTS.map((p) => (
                        <option key={p.code} value={p.code}>
                          {p.code} | {p.name} ({p.packQuantityDescription})
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => addItem(quickAddCode, 1)}
                      className="btn btn-primary"
                    >
                      Adicionar item
                    </button>
                  </div>
                </div>

                {/* Lista de Itens */}
                <div className="quote-cards-stack">
                  {detailedItems.map(({ product, quantity, note }) => {
                    const encodedCode = encodeURIComponent(product.code);
                    return (
                      <article key={product.code} className="quote-item-card">
                        <div className="quote-item-main">
                          <Link to={`/produto/${encodedCode}`} className="quote-item-thumb">
                            <ProductVisual product={product} size="card" />
                          </Link>

                          <div className="quote-item-details">
                            <div className="quote-item-top-row">
                              <div>
                                <span className="badge-code">{product.code}</span>
                                <h3 className="quote-item-title">
                                  <Link to={`/produto/${encodedCode}`}>{product.name}</Link>
                                </h3>
                                <p className="quote-item-pack">
                                  Unidade comercial: <strong>{product.commercialUnit}</strong> ({product.packQuantityDescription})
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeItem(product.code)}
                                className="quote-remove-btn"
                                aria-label={`Remover ${product.name} da lista`}
                              >
                                Remover item
                              </button>
                            </div>

                            <div className="quote-item-controls-row">
                              <div className="quote-qty-block">
                                <label
                                  htmlFor={`quote-qty-${product.code}`}
                                  className="quote-control-label"
                                >
                                  Quantidade de {product.commercialUnit.toLowerCase()}s
                                </label>
                                <div className="qty-control">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateQuantity(product.code, Math.max(1, quantity - 1))
                                    }
                                    className="qty-step-btn"
                                    aria-label={`Diminuir quantidade de ${product.name}`}
                                  >
                                    -
                                  </button>
                                  <input
                                    id={`quote-qty-${product.code}`}
                                    type="number"
                                    min={1}
                                    step={1}
                                    value={quantity}
                                    onChange={(e) => {
                                      const parsed = parseInt(e.target.value, 10);
                                      updateQuantity(
                                        product.code,
                                        Number.isNaN(parsed) || parsed < 1 ? 1 : parsed
                                      );
                                    }}
                                    className="qty-number-input"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(product.code, quantity + 1)}
                                    className="qty-step-btn"
                                    aria-label={`Aumentar quantidade de ${product.name}`}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>

                              <div className="quote-note-block">
                                <label
                                  htmlFor={`quote-note-${product.code}`}
                                  className="quote-control-label"
                                >
                                  Observação específica deste produto
                                </label>
                                <input
                                  id={`quote-note-${product.code}`}
                                  type="text"
                                  value={note}
                                  onChange={(e) => updateNote(product.code, e.target.value)}
                                  placeholder="Ex: Entregar separado ou confirmar marca equivalente"
                                  className="filter-input"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>

              {/* Coluna Direita: Formulário de Solicitação */}
              <aside className="quote-form-col" aria-label="Dados para solicitação de orçamento">
                <div className="quote-form-card">
                  <h2 className="quote-form-heading">Solicitar orçamento</h2>
                  <p className="quote-form-sub">
                    Preencha apenas os dados essenciais de contato Não pedimos CNPJ nem documentos nesta primeira etapa
                  </p>

                  <form onSubmit={handleFormSubmit} noValidate>
                    <div className="form-field">
                      <label htmlFor="req-name" className="filter-label">
                        Seu nome *
                      </label>
                      <input
                        id="req-name"
                        type="text"
                        value={requesterName}
                        onChange={(e) => setRequesterName(e.target.value)}
                        aria-invalid={Boolean(errors.requesterName)}
                        aria-describedby={errors.requesterName ? 'err-req-name' : undefined}
                        className="filter-input"
                        placeholder="Nome do comprador ou responsável"
                      />
                      {errors.requesterName && (
                        <span id="err-req-name" className="field-error" role="alert">
                          {errors.requesterName}
                        </span>
                      )}
                    </div>

                    <div className="form-field">
                      <label htmlFor="req-company" className="filter-label">
                        Nome da empresa ou comércio *
                      </label>
                      <input
                        id="req-company"
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        aria-invalid={Boolean(errors.companyName)}
                        aria-describedby={errors.companyName ? 'err-req-company' : undefined}
                        className="filter-input"
                        placeholder="Ex: Mercado Central ou Restaurante Bom Sabor"
                      />
                      {errors.companyName && (
                        <span id="err-req-company" className="field-error" role="alert">
                          {errors.companyName}
                        </span>
                      )}
                    </div>

                    <div className="form-field">
                      <label htmlFor="req-phone" className="filter-label">
                        Telefone comercial com DDD *
                      </label>
                      <input
                        id="req-phone"
                        type="tel"
                        value={commercialPhone}
                        onChange={(e) => setCommercialPhone(e.target.value)}
                        aria-invalid={Boolean(errors.commercialPhone)}
                        aria-describedby={errors.commercialPhone ? 'err-req-phone' : undefined}
                        className="filter-input"
                        placeholder="(27) 00000 0000"
                      />
                      {errors.commercialPhone && (
                        <span id="err-req-phone" className="field-error" role="alert">
                          {errors.commercialPhone}
                        </span>
                      )}
                    </div>

                    <div className="form-field">
                      <label htmlFor="req-city" className="filter-label">
                        Município de atendimento *
                      </label>
                      <select
                        id="req-city"
                        value={municipality}
                        onChange={(e) => setMunicipality(e.target.value)}
                        aria-invalid={Boolean(errors.municipality)}
                        aria-describedby={errors.municipality ? 'err-req-city' : undefined}
                        className="filter-select"
                      >
                        <option value="">Selecione o município</option>
                        {MUNICIPALITIES_COVERAGE.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name} ({COMPANY_CONFIG.location.stateCode})
                          </option>
                        ))}
                        <option value="Outro município no Espírito Santo">
                          Outro município no Espírito Santo
                        </option>
                      </select>
                      {errors.municipality && (
                        <span id="err-req-city" className="field-error" role="alert">
                          {errors.municipality}
                        </span>
                      )}
                    </div>

                    <div className="form-field">
                      <label htmlFor="req-notes" className="filter-label">
                        Observações gerais opcionais
                      </label>
                      <textarea
                        id="req-notes"
                        rows={3}
                        value={generalNotes}
                        onChange={(e) => setGeneralNotes(e.target.value)}
                        className="filter-textarea"
                        placeholder="Horário de preferência para recebimento ou dúvidas sobre entrega"
                      />
                    </div>

                    <div className="quote-demo-mode-box" role="note">
                      <strong>Modo de demonstração transparente</strong>
                      <span>
                        {COMPANY_CONFIG.contacts.isSubmissionServiceConfigured
                          ? 'Serviço de envio ativo para recepção de solicitações'
                          : 'Este ambiente demonstrativo não realiza disparo externo automático Gere o resumo estruturado abaixo para copiar o orçamento'}
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isGenerating}
                      className="btn btn-accent btn-lg"
                      style={{ width: '100%' }}
                    >
                      {isGenerating
                        ? 'Preparando resumo do orçamento'
                        : 'Gerar resumo de demonstração'}
                    </button>

                    <div className="whatsapp-action-wrapper">
                      <button
                        type="button"
                        onClick={handleWhatsappShare}
                        disabled={!isWhatsappConfigured}
                        className="btn btn-secondary"
                        style={{ width: '100%' }}
                      >
                        {isWhatsappConfigured
                          ? 'Compartilhar resumo por WhatsApp'
                          : 'WhatsApp aguardando configuração de número comercial'}
                      </button>
                      {!isWhatsappConfigured && (
                        <span className="whatsapp-config-hint">
                          O botão de compartilhamento via WhatsApp é habilitado automaticamente após a definição de um número válido no arquivo de configuração
                        </span>
                      )}
                    </div>
                  </form>

                  {/* Resumo Gerado para Cópia */}
                  {generatedSummary && (
                    <div className="generated-summary-panel" role="region" aria-label="Resumo do orçamento gerado">
                      <div className="generated-summary-header">
                        <strong>Resumo de demonstração pronto para cópia</strong>
                        <span>
                          Nenhuma mensagem externa foi enviada automaticamente Utilize o botão abaixo para copiar o texto
                        </span>
                      </div>

                      <pre className="generated-summary-pre">{generatedSummary}</pre>

                      <button
                        type="button"
                        onClick={handleCopySummary}
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                      >
                        Copiar resumo do orçamento
                      </button>

                      {copyStatus && (
                        <div className="copy-feedback-msg" role="status">
                          {copyStatus}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
