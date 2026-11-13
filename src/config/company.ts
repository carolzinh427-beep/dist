export interface MunicipalityCoverage {
  id: string;
  name: string;
  zoneLabel: string;
  summary: string;
  routeSchedule: string;
  minimumOrder: string;
  freightCondition: string;
}

export interface BusinessSegment {
  id: string;
  name: string;
  summary: string;
  needs: string[];
  recommendedCategories: string[];
}

export interface CompanyConfig {
  name: string;
  shortName: string;
  slogan: string;
  regionalTagline: string;
  location: {
    city: string;
    state: string;
    stateCode: string;
    regionName: string;
    fullAddress: string | null;
  };
  coverageAreas: string[];
  targetAudience: string;
  operationModel: string;
  businessHours: {
    weekdays: string;
    saturday: string;
    summary: string;
  };
  contacts: {
    phone: string | null;
    whatsappNumber: string | null;
    email: string | null;
    isSubmissionServiceConfigured: boolean;
  };
  deliveryConfig: {
    defaultStatusText: string;
    minimumOrder: string | null;
    freightPolicy: string | null;
    deliveryTimeframe: string | null;
    routeDays: string | null;
    pickupPolicy: string | null;
  };
  paymentConfig: {
    statusText: string;
    notes: string;
  };
  demoNotice: string;
  colors: {
    primaryGreen: string;
    secondaryGreen: string;
    accentOrange: string;
    warmWhite: string;
    graphite: string;
  };
}

export const COMPANY_CONFIG: CompanyConfig = {
  name: 'Vértice Distribuidora',
  shortName: 'Vértice',
  slogan: 'Seu negócio abastecido para ir mais longe',
  regionalTagline: 'Distribuição para empresas no Espírito Santo',
  location: {
    city: 'Serra',
    state: 'Espírito Santo',
    stateCode: 'ES',
    regionName: 'Grande Vitória',
    // Deixar null até a configuração comercial real para não publicar endereço fictício
    fullAddress: null,
  },
  coverageAreas: ['Serra', 'Vitória', 'Vila Velha', 'Cariacica', 'Viana'],
  targetAudience: 'Comerciantes e compradores empresariais',
  operationModel: 'Catálogo de produtos e solicitação de orçamento',
  businessHours: {
    weekdays: 'Segunda a sexta, das 8h às 18h',
    saturday: 'Sábado, das 8h às 12h',
    summary: 'Segunda a sexta, das 8h às 18h, e sábado, das 8h às 12h',
  },
  contacts: {
    // Campos preparados para configuração antes da publicação comercial
    phone: null,
    whatsappNumber: null,
    email: null,
    isSubmissionServiceConfigured: false,
  },
  deliveryConfig: {
    defaultStatusText: 'Condições de entrega sob consulta',
    minimumOrder: null,
    freightPolicy: null,
    deliveryTimeframe: null,
    routeDays: null,
    pickupPolicy: null,
  },
  paymentConfig: {
    statusText: 'Condições de pagamento a confirmar com a equipe comercial',
    notes:
      'Modalidades, prazos e faturamento são definidos durante o retorno do orçamento conforme o perfil do pedido',
  },
  demoNotice:
    'Projeto demonstrativo com empresa, marcas de catálogo e informações operacionais meramente ilustrativas',
  colors: {
    primaryGreen: '#123D32',
    secondaryGreen: '#205B49',
    accentOrange: '#F47B35',
    warmWhite: '#F7F8F4',
    graphite: '#202923',
  },
};

export const MUNICIPALITIES_COVERAGE: MunicipalityCoverage[] = [
  {
    id: 'serra',
    name: 'Serra',
    zoneLabel: 'Eixo Norte e Polos Empresariais',
    summary:
      'Município sede da operação demonstrativa, com atendimento voltado para comércios de bairro, supermercados, restaurantes, indústrias e condomínios',
    routeSchedule: COMPANY_CONFIG.deliveryConfig.routeDays ?? 'Condições de entrega sob consulta',
    minimumOrder: COMPANY_CONFIG.deliveryConfig.minimumOrder ?? 'Condições de entrega sob consulta',
    freightCondition: COMPANY_CONFIG.deliveryConfig.freightPolicy ?? 'Condições de entrega sob consulta',
  },
  {
    id: 'vitoria',
    name: 'Vitória',
    zoneLabel: 'Capital, Região Central e Orla',
    summary:
      'Atendimento planejado para bares, restaurantes, lanchonetes, escritórios, clínicas e hotéis distribuídos pelos bairros da capital',
    routeSchedule: COMPANY_CONFIG.deliveryConfig.routeDays ?? 'Condições de entrega sob consulta',
    minimumOrder: COMPANY_CONFIG.deliveryConfig.minimumOrder ?? 'Condições de entrega sob consulta',
    freightCondition: COMPANY_CONFIG.deliveryConfig.freightPolicy ?? 'Condições de entrega sob consulta',
  },
  {
    id: 'vila-velha',
    name: 'Vila Velha',
    zoneLabel: 'Eixo Sul Metropolitano e Comércio Costeiro',
    summary:
      'Cobertura voltada para padarias, mercados, condomínios residenciais e estabelecimentos de alimentação em toda a cidade',
    routeSchedule: COMPANY_CONFIG.deliveryConfig.routeDays ?? 'Condições de entrega sob consulta',
    minimumOrder: COMPANY_CONFIG.deliveryConfig.minimumOrder ?? 'Condições de entrega sob consulta',
    freightCondition: COMPANY_CONFIG.deliveryConfig.freightPolicy ?? 'Condições de entrega sob consulta',
  },
  {
    id: 'cariacica',
    name: 'Cariacica',
    zoneLabel: 'Eixo Oeste e Corredores Comerciais',
    summary:
      'Abastecimento direcionado a mercearias, atacarejos locais, cozinhas industriais e pequenos negócios de serviços',
    routeSchedule: COMPANY_CONFIG.deliveryConfig.routeDays ?? 'Condições de entrega sob consulta',
    minimumOrder: COMPANY_CONFIG.deliveryConfig.minimumOrder ?? 'Condições de entrega sob consulta',
    freightCondition: COMPANY_CONFIG.deliveryConfig.freightPolicy ?? 'Condições de entrega sob consulta',
  },
  {
    id: 'viana',
    name: 'Viana',
    zoneLabel: 'Corredor Logístico e Serviços',
    summary:
      'Atendimento voltado para refeitórios corporativos, comércios locais, apoios operacionais e empresas instaladas no município',
    routeSchedule: COMPANY_CONFIG.deliveryConfig.routeDays ?? 'Condições de entrega sob consulta',
    minimumOrder: COMPANY_CONFIG.deliveryConfig.minimumOrder ?? 'Condições de entrega sob consulta',
    freightCondition: COMPANY_CONFIG.deliveryConfig.freightPolicy ?? 'Condições de entrega sob consulta',
  },
];

export const BUSINESS_SEGMENTS: BusinessSegment[] = [
  {
    id: 'mercados',
    name: 'Mercados e mercearias',
    summary: 'Reposição de itens de giro contínuo em fardos e caixas fechadas para prateleira',
    needs: [
      'Giro constante de arroz, feijão, açúcar, café e óleo em fardos padronizados',
      'Bebidas em embalagens familiares e individuais para geladeira e gôndola',
      'Linha de limpeza doméstica em caixas fechadas para revenda direta',
    ],
    recommendedCategories: ['alimentos-e-mercearia', 'bebidas-nao-alcoolicas', 'produtos-de-limpeza'],
  },
  {
    id: 'bares',
    name: 'Bares e casas noturnas',
    summary: 'Bebidas geladas, descartáveis de apoio e insumos de higienização para salão e balcão',
    needs: [
      'Cervejas, águas com e sem gás e refrigerantes para atendimento de salão',
      'Copos descartáveis, guardanapos e sacos para resíduos de alto volume',
      'Desinfetantes e detergentes para limpeza diária de áreas operacionais',
    ],
    recommendedCategories: ['cervejas-e-bebidas-alcoolicas', 'bebidas-nao-alcoolicas', 'descartaveis-e-embalagens'],
  },
  {
    id: 'restaurantes',
    name: 'Restaurantes e cozinhas',
    summary: 'Insumos secos de cozinha, bebidas de acompanhamento e limpeza de rotina alimentar',
    needs: [
      'Grãos, óleos e condimentos básicos em embalagens para preparo diário',
      'Águas, sucos e refrigerantes para serviço de mesa e entregas',
      'Detergentes neutros, papel toalha interfolhado e sacos reforçados para cozinha',
    ],
    recommendedCategories: ['alimentos-e-mercearia', 'bebidas-nao-alcoolicas', 'higiene-profissional'],
  },
  {
    id: 'lanchonetes',
    name: 'Lanchonetes e padarias',
    summary: 'Bebidas de balcão, embalagens para viagem e itens de reposição frequente',
    needs: [
      'Bebidas em lata, garrafas individuais e sucos prontos para consumo rápido',
      'Descartáveis práticos para atendimento no balcão e retirada',
      'Produtos de higiene para sanitários e áreas de manipulação',
    ],
    recommendedCategories: ['bebidas-nao-alcoolicas', 'descartaveis-e-embalagens', 'higiene-profissional'],
  },
  {
    id: 'escritorios',
    name: 'Escritórios e clínicas',
    summary: 'Suprimentos de copa, recepção e higiene institucional em pedido único',
    needs: [
      'Café torrado e moído, açúcar, água mineral e copos descartáveis para recepção',
      'Papel toalha interfolhado, papel higiênico institucional e sabonete líquido',
      'Desinfetantes e panos de limpeza para manutenção das salas',
    ],
    recommendedCategories: ['higiene-profissional', 'alimentos-e-mercearia', 'descartaveis-e-embalagens'],
  },
  {
    id: 'condominios',
    name: 'Condomínios e conservação',
    summary: 'Produtos de limpeza em volume, sacos para resíduos e higiene de áreas comuns',
    needs: [
      'Água sanitária, desinfetantes e detergentes em caixas e galões econômicos',
      'Sacos para lixo de 100 L e insumos para portarias, salões e vestiários',
      'Papéis institucionais e sabonete líquido para reposição de dispensers',
    ],
    recommendedCategories: ['produtos-de-limpeza', 'higiene-profissional', 'descartaveis-e-embalagens'],
  },
];

