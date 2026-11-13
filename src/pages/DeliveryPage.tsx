import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_CONFIG, MUNICIPALITIES_COVERAGE } from '../config/company';
import { PageMeta } from '../components/PageMeta';

export const DeliveryPage: React.FC = () => {
  const [selectedCityId, setSelectedCityId] = useState<string>('serra');

  const activeCity =
    MUNICIPALITIES_COVERAGE.find((c) => c.id === selectedCityId) ??
    MUNICIPALITIES_COVERAGE[0];

  const { deliveryConfig } = COMPANY_CONFIG;

  return (
    <>
      <PageMeta
        title="Entregas e Regiões Atendidas"
        description="Cobertura regional ilustrativa da Vértice Distribuidora em Serra, Vitória, Vila Velha, Cariacica e Viana na Grande Vitória, Espírito Santo"
      />

      <section className="page-hero-band">
        <div className="container">
          <nav aria-label="Navegação estrutural" className="breadcrumb-nav">
            <Link to="/">Início</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Entregas e regiões atendidas</span>
          </nav>
          <h1 className="page-hero-title">Entregas e presença na Grande Vitória</h1>
          <p className="page-hero-lead">
            Operação demonstrativa baseada em Serra, Espírito Santo, com planejamento de rotas para abastecer estabelecimentos nos cinco municípios metropolitanos
          </p>
        </div>
      </section>

      <section className="section-block section-white">
        <div className="container">
          <div className="delivery-map-layout">
            {/* Mapa Estilizado em SVG da Grande Vitória */}
            <div className="delivery-map-card">
              <div className="delivery-map-header">
                <h2 className="delivery-map-title">Mapa esquemático de cobertura regional</h2>
                <p className="delivery-map-sub">
                  Selecione um município no mapa ou na lista ao lado para visualizar o escopo de atendimento ilustrativo
                </p>
              </div>

              <div className="svg-map-container">
                <svg
                  viewBox="0 0 520 440"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Mapa estilizado dos municípios de Serra, Vitória, Vila Velha, Cariacica e Viana na Grande Vitória"
                  className="gv-stylized-map"
                >
                  {/* Oceano Atlântico a Leste */}
                  <rect width="520" height="440" rx="12" fill="#E9EFEA" />
                  <path
                    d="M360 0H520V440H300C318 360 335 280 352 190C362 120 356 50 360 0Z"
                    fill="#D7E5DE"
                  />
                  <text x="435" y="225" fill="#205B49" fontSize="12" fontWeight="700" fontFamily="Barlow, sans-serif" letterSpacing="1">
                    OCEANO ATLÂNTICO
                  </text>

                  {/* Município 1: SERRA (Norte) */}
                  <g
                    className="map-region-group"
                    onClick={() => setSelectedCityId('serra')}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedCityId('serra')}
                    tabIndex={0}
                    role="button"
                    aria-pressed={selectedCityId === 'serra'}
                    aria-label="Selecionar município de Serra"
                  >
                    <path
                      d="M170 28L348 34L356 178L240 192L168 142Z"
                      fill={selectedCityId === 'serra' ? '#123D32' : '#205B49'}
                      stroke="#F7F8F4"
                      strokeWidth="3"
                    />
                    <circle cx="268" cy="112" r="6" fill="#F47B35" />
                    <text
                      x="268"
                      y="96"
                      textAnchor="middle"
                      fill="#F7F8F4"
                      fontSize="15"
                      fontWeight="800"
                      fontFamily="Barlow, sans-serif"
                    >
                      SERRA (BASE)
                    </text>
                  </g>

                  {/* Município 2: CARIACICA (Oeste / Centro) */}
                  <g
                    className="map-region-group"
                    onClick={() => setSelectedCityId('cariacica')}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedCityId('cariacica')}
                    tabIndex={0}
                    role="button"
                    aria-pressed={selectedCityId === 'cariacica'}
                    aria-label="Selecionar município de Cariacica"
                  >
                    <path
                      d="M84 146L168 142L240 192L232 276L116 264Z"
                      fill={selectedCityId === 'cariacica' ? '#123D32' : '#336E5B'}
                      stroke="#F7F8F4"
                      strokeWidth="3"
                    />
                    <text
                      x="166"
                      y="214"
                      textAnchor="middle"
                      fill="#F7F8F4"
                      fontSize="14"
                      fontWeight="800"
                      fontFamily="Barlow, sans-serif"
                    >
                      CARIACICA
                    </text>
                  </g>

                  {/* Município 3: VITÓRIA (Ilha e Porção Continental Leste) */}
                  <g
                    className="map-region-group"
                    onClick={() => setSelectedCityId('vitoria')}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedCityId('vitoria')}
                    tabIndex={0}
                    role="button"
                    aria-pressed={selectedCityId === 'vitoria'}
                    aria-label="Selecionar município de Vitória"
                  >
                    <path
                      d="M240 192L356 178L346 258L232 256Z"
                      fill={selectedCityId === 'vitoria' ? '#123D32' : '#266350'}
                      stroke="#F7F8F4"
                      strokeWidth="3"
                    />
                    <text
                      x="296"
                      y="224"
                      textAnchor="middle"
                      fill="#F7F8F4"
                      fontSize="14"
                      fontWeight="800"
                      fontFamily="Barlow, sans-serif"
                    >
                      VITÓRIA
                    </text>
                  </g>

                  {/* Município 4: VIANA (Sudoeste) */}
                  <g
                    className="map-region-group"
                    onClick={() => setSelectedCityId('viana')}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedCityId('viana')}
                    tabIndex={0}
                    role="button"
                    aria-pressed={selectedCityId === 'viana'}
                    aria-label="Selecionar município de Viana"
                  >
                    <path
                      d="M58 264L212 274L198 394L66 376Z"
                      fill={selectedCityId === 'viana' ? '#123D32' : '#3D7865'}
                      stroke="#F7F8F4"
                      strokeWidth="3"
                    />
                    <text
                      x="136"
                      y="334"
                      textAnchor="middle"
                      fill="#F7F8F4"
                      fontSize="14"
                      fontWeight="800"
                      fontFamily="Barlow, sans-serif"
                    >
                      VIANA
                    </text>
                  </g>

                  {/* Município 5: VILA VELHA (Sul Litorâneo) */}
                  <g
                    className="map-region-group"
                    onClick={() => setSelectedCityId('vila-velha')}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedCityId('vila-velha')}
                    tabIndex={0}
                    role="button"
                    aria-pressed={selectedCityId === 'vila-velha'}
                    aria-label="Selecionar município de Vila Velha"
                  >
                    <path
                      d="M212 258L346 258L318 404L198 394Z"
                      fill={selectedCityId === 'vila-velha' ? '#123D32' : '#2C6A56'}
                      stroke="#F7F8F4"
                      strokeWidth="3"
                    />
                    <text
                      x="272"
                      y="334"
                      textAnchor="middle"
                      fill="#F7F8F4"
                      fontSize="14"
                      fontWeight="800"
                      fontFamily="Barlow, sans-serif"
                    >
                      VILA VELHA
                    </text>
                  </g>
                </svg>
              </div>

              <div className="map-city-selector-buttons" role="tablist" aria-label="Municípios atendidos">
                {MUNICIPALITIES_COVERAGE.map((city) => (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => setSelectedCityId(city.id)}
                    className={selectedCityId === city.id ? 'city-tab-btn active' : 'city-tab-btn'}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Painel de Detalhes do Município Selecionado */}
            <div className="delivery-info-col">
              <div className="city-detail-card">
                <span className="section-kicker">Cobertura ilustrativa</span>
                <h2 className="city-detail-title">
                  {activeCity.name}, {COMPANY_CONFIG.location.stateCode}
                </h2>
                <p className="city-detail-zone">{activeCity.zoneLabel}</p>
                <p className="city-detail-summary">{activeCity.summary}</p>

                <dl className="city-conditions-dl">
                  <div className="condition-row">
                    <dt>Dias de rota na região</dt>
                    <dd>{activeCity.routeSchedule}</dd>
                  </div>
                  <div className="condition-row">
                    <dt>Pedido mínimo</dt>
                    <dd>{activeCity.minimumOrder}</dd>
                  </div>
                  <div className="condition-row">
                    <dt>Política de frete</dt>
                    <dd>{activeCity.freightCondition}</dd>
                  </div>
                </dl>
              </div>

              {/* Quadro Geral de Parâmetros Logísticos Configuráveis */}
              <div className="logistics-parameters-card">
                <h3 className="logistics-parameters-title">
                  Parâmetros operacionais de entrega e retirada
                </h3>
                <p className="logistics-parameters-desc">
                  As regras logísticas são confirmadas no momento do retorno da proposta conforme o volume e o município informado
                </p>

                <dl className="logistics-grid-dl">
                  <div>
                    <dt>Valor de pedido mínimo</dt>
                    <dd>{deliveryConfig.minimumOrder ?? deliveryConfig.defaultStatusText}</dd>
                  </div>
                  <div>
                    <dt>Frete e taxa de deslocamento</dt>
                    <dd>{deliveryConfig.freightPolicy ?? deliveryConfig.defaultStatusText}</dd>
                  </div>
                  <div>
                    <dt>Prazos estimados após aprovação</dt>
                    <dd>{deliveryConfig.deliveryTimeframe ?? deliveryConfig.defaultStatusText}</dd>
                  </div>
                  <div>
                    <dt>Calendário de rotas</dt>
                    <dd>{deliveryConfig.routeDays ?? deliveryConfig.defaultStatusText}</dd>
                  </div>
                  <div>
                    <dt>Retirada pelo comprador</dt>
                    <dd>{deliveryConfig.pickupPolicy ?? deliveryConfig.defaultStatusText}</dd>
                  </div>
                </dl>

                <div className="logistics-cta-row">
                  <Link to="/orcamento" className="btn btn-accent">
                    Solicitar orçamento para minha região
                  </Link>
                  <Link to="/atendimento" className="btn btn-secondary">
                    Falar com o atendimento
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

