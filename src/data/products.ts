export type CategorySlug =
  | 'bebidas-nao-alcoolicas'
  | 'cervejas-e-bebidas-alcoolicas'
  | 'alimentos-e-mercearia'
  | 'produtos-de-limpeza'
  | 'higiene-profissional'
  | 'descartaveis-e-embalagens';

export type CommercialUnit = 'Fardo' | 'Caixa' | 'Pacote' | 'Unidade';

export type PackagingType =
  | 'Garrafa PET'
  | 'Garrafa de vidro'
  | 'Lata de alumínio'
  | 'Pacote plástico'
  | 'Pacote a vácuo'
  | 'Frasco plástico'
  | 'Galão plástico'
  | 'Rolo institucional'
  | 'Maço interfolhado'
  | 'Manga plástica'
  | 'Pacote reforçado';

export type VisualKind =
  | 'water-still'
  | 'water-sparkling'
  | 'soda-cola'
  | 'grape-juice'
  | 'beer-pilsen'
  | 'beer-lager'
  | 'rice-bale'
  | 'beans-bale'
  | 'sugar-bale'
  | 'coffee-box'
  | 'oil-box'
  | 'detergent-box'
  | 'disinfectant-box'
  | 'bleach-box'
  | 'liquid-soap-gallon'
  | 'multipurpose-cleaner'
  | 'toilet-paper-bale'
  | 'paper-towel-pack'
  | 'disposable-cups'
  | 'trash-bags';

export interface CategoryInfo {
  slug: CategorySlug;
  name: string;
  shortDescription: string;
  fullDescription: string;
  typicalBuyers: string;
  packagingFocus: string;
  accentTone: string;
}

export interface ProductItem {
  code: string;
  slug: string;
  name: string;
  imageUrl: string;
  categorySlug: CategorySlug;
  categoryName: string;
  brand: string;
  isFictionalBrand: boolean;
  unitContent: string;
  packQuantityDescription: string;
  unitsPerPack: number;
  commercialUnit: CommercialUnit;
  packagingType: PackagingType;
  shortDescription: string;
  storageNote: string;
  isAlcoholic: boolean;
  relevanceRank: number;
  featuredOnHome: boolean;
  visualKind: VisualKind;
}

export interface CommercialUnitGuide {
  unit: CommercialUnit;
  title: string;
  explanation: string;
  example: string;
}

export const COMMERCIAL_UNIT_GUIDE: CommercialUnitGuide[] = [
  {
    unit: 'Fardo',
    title: 'Fardo fechado',
    explanation:
      'Conjunto de unidades agrupadas em filme plástico termoencolhível ou capa protetora para transporte e empilhamento',
    example: 'Água mineral 500 ml em fardo com 12 unidades ou arroz 5 kg em fardo com 6 pacotes',
  },
  {
    unit: 'Caixa',
    title: 'Caixa de embarque',
    explanation:
      'Embalagem coletiva de papelão ondulado que protege frascos, latas, pacotes a vácuo ou garrafas durante a movimentação',
    example: 'Óleo de soja 900 ml em caixa com 20 unidades ou detergente 500 ml em caixa com 24 unidades',
  },
  {
    unit: 'Pacote',
    title: 'Pacote institucional',
    explanation:
      'Agrupamento compacto de itens descartáveis ou papéis prontos para abastecimento direto de dispensers e áreas de apoio',
    example: 'Copo descartável 200 ml em pacote com 100 unidades ou papel toalha interfolhado',
  },
  {
    unit: 'Unidade',
    title: 'Unidade de alto volume',
    explanation:
      'Item comercializado individualmente quando o próprio recipiente já concentra grande volume de uso profissional',
    example: 'Sabonete líquido em galão de 5 L comercializado por unidade',
  },
];

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: 'bebidas-nao-alcoolicas',
    name: 'Bebidas não alcoólicas',
    shortDescription: 'Águas minerais, refrigerantes e sucos em fardos e caixas para geladeira, balcão e mesa',
    fullDescription:
      'Linha voltada para lanchonetes, restaurantes, mercados, padarias e recepções corporativas que buscam reposição organizada de bebidas sem álcool em embalagens individuais e familiares',
    typicalBuyers: 'Restaurantes, lanchonetes, mercados, padarias e escritórios',
    packagingFocus: 'Fardos termoselados e caixas de embarque',
    accentTone: '#1B5E4A',
  },
  {
    slug: 'cervejas-e-bebidas-alcoolicas',
    name: 'Cervejas e bebidas alcoólicas',
    shortDescription: 'Cervejas em lata e garrafa para atendimento em bares, restaurantes, eventos e mercados',
    fullDescription:
      'Opções de giro comercial para estabelecimentos com serviço de salão, balcão ou revenda refrigerada, comercializadas exclusivamente para maiores de 18 anos',
    typicalBuyers: 'Bares, restaurantes, mercados e conveniências',
    packagingFocus: 'Caixas e fardos com 12 unidades',
    accentTone: '#8C4A19',
  },
  {
    slug: 'alimentos-e-mercearia',
    name: 'Alimentos e mercearia',
    shortDescription: 'Arroz, feijão, açúcar, café e óleo de soja em fardos e caixas para revenda ou cozinha',
    fullDescription:
      'Itens essenciais de mercearia seca selecionados para abastecer gôndolas de mercados de bairro, cozinhas profissionais, refeitórios e copas empresariais',
    typicalBuyers: 'Mercados, restaurantes, padarias, refeitórios e escritórios',
    packagingFocus: 'Fardos de grãos e caixas coletivas',
    accentTone: '#205B49',
  },
  {
    slug: 'produtos-de-limpeza',
    name: 'Produtos de limpeza',
    shortDescription: 'Detergentes, desinfetantes, água sanitária e limpadores para rotina operacional e revenda',
    fullDescription:
      'Soluções para higienização de pisos, cozinhas, áreas comuns de condomínios e reposição de prateleira em comércios locais',
    typicalBuyers: 'Condomínios, restaurantes, mercados, escolas e empresas de conservação',
    packagingFocus: 'Caixas fechadas com frascos de 500 ml a 2 L',
    accentTone: '#123D32',
  },
  {
    slug: 'higiene-profissional',
    name: 'Higiene profissional',
    shortDescription: 'Sabonete líquido em galão, papel higiênico institucional e papel toalha interfolhado',
    fullDescription:
      'Suprimentos dimensionados para banheiros de alto fluxo, clínicas, escritórios, restaurantes e áreas comuns que utilizam dispensers padronizados',
    typicalBuyers: 'Escritórios, clínicas, condomínios, restaurantes e comércios',
    packagingFocus: 'Galões de 5 L, fardos e pacotes institucionais',
    accentTone: '#2B6CB0',
  },
  {
    slug: 'descartaveis-e-embalagens',
    name: 'Descartáveis e embalagens',
    shortDescription: 'Copos descartáveis e sacos para resíduos de alta capacidade para apoio diário',
    fullDescription:
      'Itens de apoio operacional para copas, recepções, lanchonetes, condomínios e serviços de limpeza urbana ou predial',
    typicalBuyers: 'Condomínios, escritórios, bares, lanchonetes e comércios em geral',
    packagingFocus: 'Pacotes com 100 unidades',
    accentTone: '#4A5568',
  },
];

export const PRODUCTS: ProductItem[] = [
  {
    code: 'VRT 101',
    imageUrl: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&w=800&q=80',
    slug: 'agua-mineral-sem-gas-500ml',
    name: 'Água mineral sem gás 500 ml',
    categorySlug: 'bebidas-nao-alcoolicas',
    categoryName: 'Bebidas não alcoólicas',
    brand: 'Fonte do Cricaré (Marca demonstrativa)',
    isFictionalBrand: true,
    unitContent: '500 ml por garrafa',
    packQuantityDescription: 'Fardo com 12 unidades',
    unitsPerPack: 12,
    commercialUnit: 'Fardo',
    packagingType: 'Garrafa PET',
    shortDescription:
      'Água mineral natural sem gás acondicionada em garrafas PET individuais de 500 ml agrupadas em fardo plástico com 12 unidades para geladeira e balcão',
    storageNote: 'Conservar em local coberto, seco, ventilado e protegido da incidência solar direta',
    isAlcoholic: false,
    relevanceRank: 1,
    featuredOnHome: true,
    visualKind: 'water-still',
  },
  {
    code: 'VRT 102',
    imageUrl: 'https://images.unsplash.com/photo-1559839914-17aae19cec71?auto=format&fit=crop&w=800&q=80',
    slug: 'agua-mineral-com-gas-500ml',
    name: 'Água mineral com gás 500 ml',
    categorySlug: 'bebidas-nao-alcoolicas',
    categoryName: 'Bebidas não alcoólicas',
    brand: 'Fonte do Cricaré (Marca demonstrativa)',
    isFictionalBrand: true,
    unitContent: '500 ml por garrafa',
    packQuantityDescription: 'Fardo com 12 unidades',
    unitsPerPack: 12,
    commercialUnit: 'Fardo',
    packagingType: 'Garrafa PET',
    shortDescription:
      'Água mineral gaseificada em garrafas PET de 500 ml fornecida em fardo com 12 unidades para atendimento em restaurantes, lanchonetes e cafeterias',
    storageNote: 'Manter ao abrigo do calor e empilhar respeitando o limite indicado na embalagem coletiva',
    isAlcoholic: false,
    relevanceRank: 2,
    featuredOnHome: false,
    visualKind: 'water-sparkling',
  },
  {
    code: 'VRT 103',
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    slug: 'refrigerante-sabor-cola-2l',
    name: 'Refrigerante sabor cola 2 L',
    categorySlug: 'bebidas-nao-alcoolicas',
    categoryName: 'Bebidas não alcoólicas',
    brand: 'Atlântico Bebidas (Marca demonstrativa)',
    isFictionalBrand: true,
    unitContent: '2 L por garrafa',
    packQuantityDescription: 'Fardo com 6 unidades',
    unitsPerPack: 6,
    commercialUnit: 'Fardo',
    packagingType: 'Garrafa PET',
    shortDescription:
      'Refrigerante carbonatado sabor cola em garrafa familiar de 2 L agrupado em fardo com 6 unidades para mercados, pizzarias, lanchonetes e entregas',
    storageNote: 'Armazenar em ambiente fresco e arejado, distante de produtos químicos ou odores fortes',
    isAlcoholic: false,
    relevanceRank: 3,
    featuredOnHome: true,
    visualKind: 'soda-cola',
  },
  {
    code: 'VRT 104',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    slug: 'suco-de-uva-integral-1l',
    name: 'Suco de uva integral 1 L',
    categorySlug: 'bebidas-nao-alcoolicas',
    categoryName: 'Bebidas não alcoólicas',
    brand: 'Pomar da Serra (Marca demonstrativa)',
    isFictionalBrand: true,
    unitContent: '1 L por garrafa',
    packQuantityDescription: 'Caixa com 6 unidades',
    unitsPerPack: 6,
    commercialUnit: 'Caixa',
    packagingType: 'Garrafa de vidro',
    shortDescription:
      'Suco de uva integral sem adição de açúcares em garrafas de 1 L protegidas em caixa de papelão com divisórias internas para 6 unidades',
    storageNote: 'Manusear com cuidado por conter recipientes de vidro e manter em local seco',
    isAlcoholic: false,
    relevanceRank: 4,
    featuredOnHome: false,
    visualKind: 'grape-juice',
  },
  {
    code: 'VRT 201',
    imageUrl: 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?auto=format&fit=crop&w=800&q=80',
    slug: 'cerveja-pilsen-350ml',
    name: 'Cerveja pilsen 350 ml',
    categorySlug: 'cervejas-e-bebidas-alcoolicas',
    categoryName: 'Cervejas e bebidas alcoólicas',
    brand: 'Brisa Malte (Marca demonstrativa)',
    isFictionalBrand: true,
    unitContent: '350 ml por lata',
    packQuantityDescription: 'Caixa com 12 unidades',
    unitsPerPack: 12,
    commercialUnit: 'Caixa',
    packagingType: 'Lata de alumínio',
    shortDescription:
      'Cerveja clara estilo pilsen em latas de alumínio de 350 ml acondicionadas em caixa fechada com 12 unidades para bares, restaurantes e mercados',
    storageNote: 'Proteger do sol e do calor excessivo e evitar impactos nas latas durante o transporte',
    isAlcoholic: true,
    relevanceRank: 5,
    featuredOnHome: true,
    visualKind: 'beer-pilsen',
  },
  {
    code: 'VRT 202',
    imageUrl: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=800&q=80',
    slug: 'cerveja-puro-malte-garrafa-600ml',
    name: 'Cerveja puro malte 600 ml',
    categorySlug: 'cervejas-e-bebidas-alcoolicas',
    categoryName: 'Cervejas e bebidas alcoólicas',
    brand: 'Brisa Malte (Marca demonstrativa)',
    isFictionalBrand: true,
    unitContent: '600 ml por garrafa',
    packQuantityDescription: 'Caixa com 12 unidades',
    unitsPerPack: 12,
    commercialUnit: 'Caixa',
    packagingType: 'Garrafa de vidro',
    shortDescription:
      'Cerveja puro malte em garrafa de 600 ml voltada para serviço de mesa em bares, restaurantes e churrascarias, fornecida em caixa com 12 unidades',
    storageNote: 'Manter as caixas em superfície plana e respeitar o empilhamento máximo recomendado',
    isAlcoholic: true,
    relevanceRank: 6,
    featuredOnHome: false,
    visualKind: 'beer-lager',
  },
  {
    code: 'VRT 301',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    slug: 'arroz-branco-5kg',
    name: 'Arroz branco 5 kg',
    categorySlug: 'alimentos-e-mercearia',
    categoryName: 'Alimentos e mercearia',
    brand: 'Campos do Vale (Marca demonstrativa)',
    isFictionalBrand: true,
    unitContent: '5 kg por pacote',
    packQuantityDescription: 'Fardo com 6 unidades',
    unitsPerPack: 6,
    commercialUnit: 'Fardo',
    packagingType: 'Pacote plástico',
    shortDescription:
      'Arroz branco longo fino tipo 1 em pacotes de 5 kg reunidos em fardo coletivo com 6 unidades totalizando 30 kg por volume comercializado',
    storageNote: 'Armazenar sobre estrados ou prateleiras ventiladas, afastado do piso e de paredes úmidas',
    isAlcoholic: false,
    relevanceRank: 7,
    featuredOnHome: true,
    visualKind: 'rice-bale',
  },
  {
    code: 'VRT 302',
    imageUrl: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=800&q=80',
    slug: 'feijao-carioca-1kg',
    name: 'Feijão carioca 1 kg',
    categorySlug: 'alimentos-e-mercearia',
    categoryName: 'Alimentos e mercearia',
    brand: 'Campos do Vale (Marca demonstrativa)',
    isFictionalBrand: true,
    unitContent: '1 kg por pacote',
    packQuantityDescription: 'Fardo com 10 unidades',
    unitsPerPack: 10,
    commercialUnit: 'Fardo',
    packagingType: 'Pacote plástico',
    shortDescription:
      'Feijão carioca tipo 1 selecionado em pacotes individuais de 1 kg fornecidos em fardo fechado com 10 unidades para mercearias e cozinhas',
    storageNote: 'Conservar em ambiente seco e arejado para preservação dos grãos',
    isAlcoholic: false,
    relevanceRank: 8,
    featuredOnHome: false,
    visualKind: 'beans-bale',
  },
  {
    code: 'VRT 303',
    imageUrl: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=800&q=80',
    slug: 'acucar-cristal-1kg',
    name: 'Açúcar cristal 1 kg',
    categorySlug: 'alimentos-e-mercearia',
    categoryName: 'Alimentos e mercearia',
    brand: 'Doce Litoral (Marca demonstrativa)',
    isFictionalBrand: true,
    unitContent: '1 kg por pacote',
    packQuantityDescription: 'Fardo com 10 unidades',
    unitsPerPack: 10,
    commercialUnit: 'Fardo',
    packagingType: 'Pacote plástico',
    shortDescription:
      'Açúcar cristal em pacotes de 1 kg agrupados em fardo com 10 unidades para abastecimento de padarias, confeitarias, mercados e copas',
    storageNote: 'Proteger da umidade para evitar empedramento do produto',
    isAlcoholic: false,
    relevanceRank: 9,
    featuredOnHome: false,
    visualKind: 'sugar-bale',
  },
  {
    code: 'VRT 304',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    slug: 'cafe-torrado-e-moido-500g',
    name: 'Café torrado e moído 500 g',
    categorySlug: 'alimentos-e-mercearia',
    categoryName: 'Alimentos e mercearia',
    brand: 'Torra Capixaba (Marca demonstrativa)',
    isFictionalBrand: true,
    unitContent: '500 g por pacote',
    packQuantityDescription: 'Caixa com 10 unidades',
    unitsPerPack: 10,
    commercialUnit: 'Caixa',
    packagingType: 'Pacote a vácuo',
    shortDescription:
      'Café torrado e moído tradicional embalado a vácuo em pacotes de 500 g e fornecido em caixa coletiva com 10 unidades para empresas e varejo',
    storageNote: 'Manter em local fresco e seco e preservar a embalagem fechada até o uso',
    isAlcoholic: false,
    relevanceRank: 10,
    featuredOnHome: true,
    visualKind: 'coffee-box',
  },
  {
    code: 'VRT 305',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    slug: 'oleo-de-soja-900ml',
    name: 'Óleo de soja 900 ml',
    categorySlug: 'alimentos-e-mercearia',
    categoryName: 'Alimentos e mercearia',
    brand: 'Campos do Vale (Marca demonstrativa)',
    isFictionalBrand: true,
    unitContent: '900 ml por garrafa',
    packQuantityDescription: 'Caixa com 20 unidades',
    unitsPerPack: 20,
    commercialUnit: 'Caixa',
    packagingType: 'Garrafa PET',
    shortDescription:
      'Óleo de soja refinado em garrafas PET de 900 ml acondicionadas em caixa de embarque com 20 unidades para cozinhas profissionais e supermercados',
    storageNote: 'Conservar ao abrigo da luz e longe de fontes de calor na despensa ou estoque',
    isAlcoholic: false,
    relevanceRank: 11,
    featuredOnHome: false,
    visualKind: 'oil-box',
  },
  {
    code: 'VRT 401',
    imageUrl: 'https://images.unsplash.com/photo-1585670210693-e7fdd16b142e?auto=format&fit=crop&w=800&q=80',
    slug: 'detergente-neutro-500ml',
    name: 'Detergente neutro 500 ml',
    categorySlug: 'produtos-de-limpeza',
    categoryName: 'Produtos de limpeza',
    brand: 'Limpex Pro (Marca demonstrativa)',
    isFictionalBrand: true,
    unitContent: '500 ml por frasco',
    packQuantityDescription: 'Caixa com 24 unidades',
    unitsPerPack: 24,
    commercialUnit: 'Caixa',
    packagingType: 'Frasco plástico',
    shortDescription:
      'Detergente líquido neutro em frascos dosadores de 500 ml fornecidos em caixa com 24 unidades para uso em copas, cozinhas e revenda em mercados',
    storageNote: 'Armazenar em setor exclusivo para produtos de limpeza, separado de alimentos e bebidas',
    isAlcoholic: false,
    relevanceRank: 12,
    featuredOnHome: true,
    visualKind: 'detergent-box',
  },
  {
    code: 'VRT 402',
    imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80',
    slug: 'desinfetante-2l',
    name: 'Desinfetante 2 L',
    categorySlug: 'produtos-de-limpeza',
    categoryName: 'Produtos de limpeza',
    brand: 'Limpex Pro (Marca demonstrativa)',
    isFictionalBrand: true,
    unitContent: '2 L por garrafa',
    packQuantityDescription: 'Caixa com 6 unidades',
    unitsPerPack: 6,
    commercialUnit: 'Caixa',
    packagingType: 'Frasco plástico',
    shortDescription:
      'Desinfetante líquido para uso geral em embalagens de 2 L acondicionadas em caixa com 6 unidades para limpeza de pisos, vestiários e áreas comuns',
    storageNote: 'Manter os frascos na posição vertical dentro da caixa original e longe do alcance de crianças',
    isAlcoholic: false,
    relevanceRank: 13,
    featuredOnHome: false,
    visualKind: 'disinfectant-box',
  },
  {
    code: 'VRT 403',
    imageUrl: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?auto=format&fit=crop&w=800&q=80',
    slug: 'agua-sanitaria-1l',
    name: 'Água sanitária 1 L',
    categorySlug: 'produtos-de-limpeza',
    categoryName: 'Produtos de limpeza',
    brand: 'Limpex Pro (Marca demonstrativa)',
    isFictionalBrand: true,
    unitContent: '1 L por frasco',
    packQuantityDescription: 'Caixa com 12 unidades',
    unitsPerPack: 12,
    commercialUnit: 'Caixa',
    packagingType: 'Frasco plástico',
    shortDescription:
      'Água sanitária em frascos opacos de 1 L fornecidos em caixa fechada com 12 unidades para rotina de higienização predial, comercial e doméstica',
    storageNote: 'Conservar em local ventilado, protegido do sol e isolado de produtos alimentícios',
    isAlcoholic: false,
    relevanceRank: 14,
    featuredOnHome: false,
    visualKind: 'bleach-box',
  },
  {
    code: 'VRT 404',
    imageUrl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=800&q=80',
    slug: 'limpador-multiuso-500ml',
    name: 'Limpador multiuso 500 ml',
    categorySlug: 'produtos-de-limpeza',
    categoryName: 'Produtos de limpeza',
    brand: 'Limpex Pro (Marca demonstrativa)',
    isFictionalBrand: true,
    unitContent: '500 ml por frasco',
    packQuantityDescription: 'Caixa com 12 unidades',
    unitsPerPack: 12,
    commercialUnit: 'Caixa',
    packagingType: 'Frasco plástico',
    shortDescription:
      'Limpador líquido multiuso em frascos de 500 ml para bancadas, mesas e superfícies laváveis, comercializado em caixa com 12 unidades',
    storageNote: 'Manter as embalagens fechadas e armazenadas em local seco e identificado',
    isAlcoholic: false,
    relevanceRank: 15,
    featuredOnHome: false,
    visualKind: 'multipurpose-cleaner',
  },
  {
    code: 'VRT 501',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    slug: 'sabonete-liquido-5l',
    name: 'Sabonete líquido 5 L',
    categorySlug: 'higiene-profissional',
    categoryName: 'Higiene profissional',
    brand: 'Alva Institucional (Marca demonstrativa)',
    isFictionalBrand: true,
    unitContent: '5 L por galão',
    packQuantityDescription: 'Unidade individual de 5 L',
    unitsPerPack: 1,
    commercialUnit: 'Unidade',
    packagingType: 'Galão plástico',
    shortDescription:
      'Sabonete líquido neutro em galão de 5 L destinado ao reabastecimento de saboneteiras e dispensers em banheiros comerciais, clínicas e escritórios',
    storageNote: 'Manter o galão lacrado até o momento da reposição nos reservatórios',
    isAlcoholic: false,
    relevanceRank: 16,
    featuredOnHome: true,
    visualKind: 'liquid-soap-gallon',
  },
  {
    code: 'VRT 502',
    imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80',
    slug: 'papel-higienico-institucional',
    name: 'Papel higiênico institucional',
    categorySlug: 'higiene-profissional',
    categoryName: 'Higiene profissional',
    brand: 'Alva Institucional (Marca demonstrativa)',
    isFictionalBrand: true,
    unitContent: 'Rolo de 300 m',
    packQuantityDescription: 'Fardo demonstrativo com 8 rolos',
    unitsPerPack: 8,
    commercialUnit: 'Fardo',
    packagingType: 'Rolo institucional',
    shortDescription:
      'Papel higiênico branco em rolo institucional para suporte de alto fluxo em sanitários de empresas, restaurantes, condomínios e centros comerciais',
    storageNote: 'Armazenar sobre paletes ou prateleiras secas, protegido de respingos e umidade',
    isAlcoholic: false,
    relevanceRank: 17,
    featuredOnHome: false,
    visualKind: 'toilet-paper-bale',
  },
  {
    code: 'VRT 503',
    imageUrl: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=80',
    slug: 'papel-toalha-interfolhado',
    name: 'Papel toalha interfolhado',
    categorySlug: 'higiene-profissional',
    categoryName: 'Higiene profissional',
    brand: 'Alva Institucional (Marca demonstrativa)',
    isFictionalBrand: true,
    unitContent: 'Folhas interfolhadas duas dobras',
    packQuantityDescription: 'Pacote demonstrativo com 1000 folhas',
    unitsPerPack: 1,
    commercialUnit: 'Pacote',
    packagingType: 'Maço interfolhado',
    shortDescription:
      'Papel toalha interfolhado branco para secagem de mãos em dispensers de parede, indicado para lavabos, consultórios, cozinhas e escritórios',
    storageNote: 'Conservar na embalagem protetora original até o abastecimento do dispenser',
    isAlcoholic: false,
    relevanceRank: 18,
    featuredOnHome: false,
    visualKind: 'paper-towel-pack',
  },
  {
    code: 'VRT 601',
    imageUrl: 'https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?auto=format&fit=crop&w=800&q=80',
    slug: 'copo-descartavel-200ml',
    name: 'Copo descartável 200 ml',
    categorySlug: 'descartaveis-e-embalagens',
    categoryName: 'Descartáveis e embalagens',
    brand: 'PackSul Descartáveis (Marca demonstrativa)',
    isFictionalBrand: true,
    unitContent: 'Capacidade de 200 ml por copo',
    packQuantityDescription: 'Pacote com 100 unidades',
    unitsPerPack: 100,
    commercialUnit: 'Pacote',
    packagingType: 'Manga plástica',
    shortDescription:
      'Copo plástico descartável de 200 ml para água, suco e refrigerante em recepções, escritórios, lanchonetes e áreas de atendimento, em pacote com 100 unidades',
    storageNote: 'Manter distante de fontes de calor para evitar deformação dos copos plásticos',
    isAlcoholic: false,
    relevanceRank: 19,
    featuredOnHome: true,
    visualKind: 'disposable-cups',
  },
  {
    code: 'VRT 602',
    imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=800&q=80',
    slug: 'saco-para-lixo-100l',
    name: 'Saco para lixo 100 L',
    categorySlug: 'descartaveis-e-embalagens',
    categoryName: 'Descartáveis e embalagens',
    brand: 'PackSul Descartáveis (Marca demonstrativa)',
    isFictionalBrand: true,
    unitContent: 'Capacidade nominal de 100 L',
    packQuantityDescription: 'Pacote com 100 unidades',
    unitsPerPack: 100,
    commercialUnit: 'Pacote',
    packagingType: 'Pacote reforçado',
    shortDescription:
      'Saco plástico preto para acondicionamento de resíduos em lixeiras e coletores de 100 L de condomínios, restaurantes, mercados e comércios',
    storageNote: 'Armazenar em local coberto e respeitar o limite de peso e volume sem objetos perfurantes',
    isAlcoholic: false,
    relevanceRank: 20,
    featuredOnHome: false,
    visualKind: 'trash-bags',
  },
];

export interface FaqItem {
  id: string;
  category: 'orcamento' | 'embalagens' | 'entregas' | 'pagamento';
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'orcamento',
    question: 'Como funciona a solicitação de orçamento pelo site?',
    answer:
      'Você navega pelo catálogo, adiciona os produtos desejados com as respectivas quantidades de fardos, caixas, pacotes ou unidades e preenche seus dados básicos de contato na página de orçamento para análise da equipe comercial',
  },
  {
    id: 'faq-2',
    category: 'orcamento',
    question: 'O envio da lista pelo site já conclui a compra ou reserva o estoque?',
    answer:
      'Não, a lista funciona exclusivamente como um pedido de cotação empresarial e está sujeita à confirmação de disponibilidade, condições logísticas e negociação comercial com o atendimento',
  },
  {
    id: 'faq-3',
    category: 'orcamento',
    question: 'Preciso informar CNPJ ou enviar documentos para montar a lista inicial?',
    answer:
      'Não solicitamos CNPJ nem documentos na etapa inicial de montagem do orçamento, pedimos apenas nome, nome da empresa, telefone comercial e município para agilizar o primeiro contato',
  },
  {
    id: 'faq-4',
    category: 'embalagens',
    question: 'Qual é a diferença entre comprar por unidade, pacote, caixa ou fardo?',
    answer:
      'Na distribuição empresarial a maioria dos itens é fornecida em embalagens coletivas fechadas, como fardos termoselados ou caixas de papelão, enquanto itens de alto volume como galões de 5 L são indicados por unidade e descartáveis por pacotes de 100 unidades',
  },
  {
    id: 'faq-5',
    category: 'entregas',
    question: 'Quais municípios da Grande Vitória fazem parte da área ilustrativa de atendimento?',
    answer:
      'O escopo regional demonstrativo contempla Serra, Vitória, Vila Velha, Cariacica e Viana, com roteirização, pedido mínimo e condições de frete informados sob consulta durante o retorno do orçamento',
  },
  {
    id: 'faq-6',
    category: 'pagamento',
    question: 'Quais são as formas e prazos de pagamento disponíveis?',
    answer:
      'As modalidades de pagamento e eventuais prazos de faturamento são confirmados diretamente pela equipe comercial após a revisão dos itens e do volume solicitado no orçamento',
  },
];

