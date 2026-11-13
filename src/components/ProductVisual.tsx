import React from 'react';
import { CategorySlug, ProductItem } from '../data/products';

interface ProductVisualProps {
  product: ProductItem;
  size?: 'card' | 'detail';
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  product,
  size = 'card',
}) => {
  const width = size === 'detail' ? 420 : 280;
  const height = size === 'detail' ? 340 : 220;

  const renderIllustration = () => {
    switch (product.visualKind) {
      case 'water-still':
      case 'water-sparkling': {
        const tone = product.visualKind === 'water-still' ? '#1E6B7B' : '#123D32';
        const label = product.visualKind === 'water-still' ? 'SEM GÁS 500 ML' : 'COM GÁS 500 ML';
        return (
          <g>
            {/* Base do fardo */}
            <rect x="48" y="54" width="184" height="118" rx="10" fill="#E6EFEA" stroke="#123D32" strokeWidth="2" />
            {/* Garrafas internas visíveis no fardo */}
            {[64, 96, 128, 160, 192].map((x, idx) => (
              <g key={idx}>
                <rect x={x} y="42" width="14" height="10" rx="2" fill={tone} />
                <rect x={x - 4} y="54" width="22" height="112" rx="6" fill="#F7F8F4" stroke={tone} strokeWidth="1.6" />
                <rect x={x - 3} y="90" width="20" height="32" fill={tone} />
              </g>
            ))}
            {/* Faixa termoencolhível do fardo */}
            <rect x="44" y="118" width="192" height="34" rx="4" fill={tone} />
            <text x="140" y="138" textAnchor="middle" fill="#F7F8F4" fontSize="11" fontWeight="700" fontFamily="Barlow, sans-serif">
              FARDO 12 UNIDADES {label}
            </text>
          </g>
        );
      }

      case 'soda-cola':
        return (
          <g>
            <rect x="54" y="48" width="172" height="126" rx="10" fill="#ECEAE4" stroke="#202923" strokeWidth="2" />
            {[72, 112, 152, 192].map((x, idx) => (
              <g key={idx}>
                <rect x={x - 5} y="36" width="14" height="10" rx="2" fill="#B83B2B" />
                <rect x={x - 12} y="48" width="28" height="120" rx="9" fill="#2A1E1B" stroke="#202923" strokeWidth="1.5" />
                <rect x={x - 11} y="88" width="26" height="34" fill="#B83B2B" />
              </g>
            ))}
            <rect x="50" y="124" width="180" height="32" rx="4" fill="#123D32" />
            <text x="140" y="144" textAnchor="middle" fill="#F7F8F4" fontSize="11" fontWeight="700" fontFamily="Barlow, sans-serif">
              FARDO 6 GARRAFAS PET 2 L
            </text>
          </g>
        );

      case 'grape-juice':
        return (
          <g>
            {/* Caixa coletiva de papelão */}
            <rect x="48" y="64" width="184" height="110" rx="6" fill="#D8CBB8" stroke="#202923" strokeWidth="2" />
            <path d="M48 86H232" stroke="#8C7A65" strokeWidth="2" />
            {[74, 118, 162, 202].map((x, idx) => (
              <g key={idx}>
                <rect x={x - 8} y="38" width="16" height="26" rx="3" fill="#4A2545" stroke="#202923" strokeWidth="1.5" />
                <rect x={x - 5} y="30" width="10" height="8" rx="2" fill="#123D32" />
              </g>
            ))}
            <rect x="64" y="102" width="152" height="52" rx="4" fill="#4A2545" />
            <text x="140" y="125" textAnchor="middle" fill="#F7F8F4" fontSize="11" fontWeight="700" fontFamily="Barlow, sans-serif">
              SUCO INTEGRAL 1 L
            </text>
            <text x="140" y="142" textAnchor="middle" fill="#E2D9E0" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif">
              CAIXA COM 6 UNIDADES
            </text>
          </g>
        );

      case 'beer-pilsen':
      case 'beer-lager': {
        const isBottle = product.visualKind === 'beer-lager';
        return (
          <g>
            <rect x="46" y="60" width="188" height="114" rx="6" fill="#DFC9A6" stroke="#202923" strokeWidth="2" />
            <rect x="46" y="60" width="188" height="28" rx="4" fill="#123D32" />
            <text x="140" y="78" textAnchor="middle" fill="#F7F8F4" fontSize="11" fontWeight="700" fontFamily="Barlow, sans-serif">
              {isBottle ? 'CAIXA 12 GARRAFAS 600 ML' : 'CAIXA 12 LATAS 350 ML'}
            </text>
            {[72, 106, 140, 174, 208].map((x, idx) => (
              <rect
                key={idx}
                x={x - 11}
                y="98"
                width="22"
                height="62"
                rx="4"
                fill={isBottle ? '#5C3A21' : '#D99B26'}
                stroke="#202923"
                strokeWidth="1.5"
              />
            ))}
          </g>
        );
      }

      case 'rice-bale':
      case 'beans-bale':
      case 'sugar-bale': {
        const tone =
          product.visualKind === 'rice-bale'
            ? '#123D32'
            : product.visualKind === 'beans-bale'
            ? '#6B4226'
            : '#205B49';
        const label =
          product.visualKind === 'rice-bale'
            ? 'ARROZ BRANCO 6 X 5 KG'
            : product.visualKind === 'beans-bale'
            ? 'FEIJÃO CARIOCA 10 X 1 KG'
            : 'AÇÚCAR CRISTAL 10 X 1 KG';
        return (
          <g>
            <rect x="44" y="48" width="192" height="124" rx="10" fill="#EFECE6" stroke="#202923" strokeWidth="2" />
            <g stroke="#CBD5CE" strokeWidth="1.5">
              <rect x="56" y="58" width="52" height="46" rx="4" fill="#F7F8F4" />
              <rect x="114" y="58" width="52" height="46" rx="4" fill="#F7F8F4" />
              <rect x="172" y="58" width="52" height="46" rx="4" fill="#F7F8F4" />
              <rect x="56" y="110" width="52" height="46" rx="4" fill="#F7F8F4" />
              <rect x="114" y="110" width="52" height="46" rx="4" fill="#F7F8F4" />
              <rect x="172" y="110" width="52" height="46" rx="4" fill="#F7F8F4" />
            </g>
            <rect x="44" y="92" width="192" height="36" fill={tone} />
            <text x="140" y="114" textAnchor="middle" fill="#F7F8F4" fontSize="11" fontWeight="700" fontFamily="Barlow, sans-serif">
              {label}
            </text>
          </g>
        );
      }

      case 'coffee-box':
        return (
          <g>
            <rect x="48" y="54" width="184" height="118" rx="6" fill="#D5C4AD" stroke="#202923" strokeWidth="2" />
            <rect x="48" y="54" width="184" height="28" fill="#3B2314" />
            <text x="140" y="72" textAnchor="middle" fill="#F7F8F4" fontSize="11" fontWeight="700" fontFamily="Barlow, sans-serif">
              CAIXA 10 PACOTES A VÁCUO 500 G
            </text>
            {[68, 104, 140, 176, 212].map((x, idx) => (
              <rect key={idx} x={x - 12} y="94" width="24" height="64" rx="2" fill="#59341E" stroke="#202923" strokeWidth="1.5" />
            ))}
          </g>
        );

      case 'oil-box':
        return (
          <g>
            <rect x="46" y="56" width="188" height="116" rx="6" fill="#E3D5BD" stroke="#202923" strokeWidth="2" />
            <rect x="62" y="88" width="156" height="64" rx="4" fill="#123D32" />
            <text x="140" y="116" textAnchor="middle" fill="#F7F8F4" fontSize="11" fontWeight="700" fontFamily="Barlow, sans-serif">
              ÓLEO DE SOJA 900 ML
            </text>
            <text x="140" y="135" textAnchor="middle" fill="#F47B35" fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif">
              CAIXA COM 20 UNIDADES
            </text>
          </g>
        );

      case 'detergent-box':
      case 'disinfectant-box':
      case 'bleach-box':
      case 'multipurpose-cleaner': {
        const label =
          product.visualKind === 'detergent-box'
            ? 'DETERGENTE 24 X 500 ML'
            : product.visualKind === 'disinfectant-box'
            ? 'DESINFETANTE 6 X 2 L'
            : product.visualKind === 'bleach-box'
            ? 'ÁGUA SANITÁRIA 12 X 1 L'
            : 'MULTIUSO 12 X 500 ML';
        return (
          <g>
            <rect x="48" y="62" width="184" height="110" rx="6" fill="#E2E8E4" stroke="#123D32" strokeWidth="2" />
            {[74, 118, 162, 206].map((x, idx) => (
              <g key={idx}>
                <rect x={x - 12} y="42" width="24" height="22" rx="4" fill="#205B49" />
                <rect x={x - 6} y="34" width="12" height="8" rx="2" fill="#F47B35" />
              </g>
            ))}
            <rect x="64" y="88" width="152" height="62" rx="4" fill="#123D32" />
            <text x="140" y="116" textAnchor="middle" fill="#F7F8F4" fontSize="11" fontWeight="700" fontFamily="Barlow, sans-serif">
              {label}
            </text>
            <text x="140" y="134" textAnchor="middle" fill="#CBD5CE" fontSize="9.5" fontWeight="600" fontFamily="Inter, sans-serif">
              LINHA DE LIMPEZA PROFISSIONAL
            </text>
          </g>
        );
      }

      case 'liquid-soap-gallon':
        return (
          <g>
            {/* Galão de 5 Litros */}
            <rect x="88" y="46" width="104" height="130" rx="14" fill="#F7F8F4" stroke="#123D32" strokeWidth="2.5" />
            <rect x="108" y="30" width="28" height="16" rx="3" fill="#F47B35" />
            <path d="M144 46V36H172V64H156" stroke="#123D32" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="100" y="84" width="80" height="64" rx="6" fill="#123D32" />
            <text x="140" y="112" textAnchor="middle" fill="#F7F8F4" fontSize="11" fontWeight="700" fontFamily="Barlow, sans-serif">
              GALÃO 5 L
            </text>
            <text x="140" y="130" textAnchor="middle" fill="#CBD5CE" fontSize="9.5" fontWeight="600" fontFamily="Inter, sans-serif">
              SABONETE LÍQUIDO
            </text>
          </g>
        );

      case 'toilet-paper-bale':
      case 'paper-towel-pack': {
        const isRoll = product.visualKind === 'toilet-paper-bale';
        return (
          <g>
            <rect x="48" y="48" width="184" height="122" rx="10" fill="#F7F8F4" stroke="#205B49" strokeWidth="2" />
            {isRoll ? (
              <g>
                {[88, 140, 192].map((cx, idx) => (
                  <g key={idx}>
                    <circle cx={cx} cy="92" r="22" fill="#EFECE6" stroke="#123D32" strokeWidth="2" />
                    <circle cx={cx} cy="92" r="7" fill="#D5C4AD" />
                  </g>
                ))}
              </g>
            ) : (
              <g>
                <rect x="68" y="64" width="144" height="48" rx="4" fill="#E6EFEA" stroke="#123D32" strokeWidth="1.8" />
                <path d="M68 80H212M68 96H212" stroke="#205B49" strokeWidth="1.5" />
              </g>
            )}
            <rect x="48" y="128" width="184" height="32" fill="#205B49" />
            <text x="140" y="148" textAnchor="middle" fill="#F7F8F4" fontSize="11" fontWeight="700" fontFamily="Barlow, sans-serif">
              {isRoll ? 'FARDO PAPEL INSTITUCIONAL' : 'PACOTE INTERFOLHADO 1000 FOLHAS'}
            </text>
          </g>
        );
      }

      case 'disposable-cups':
      case 'trash-bags': {
        const isCups = product.visualKind === 'disposable-cups';
        return (
          <g>
            {isCups ? (
              <g>
                <rect x="52" y="60" width="176" height="54" rx="24" fill="#E6EFEA" stroke="#123D32" strokeWidth="2" />
                {[74, 98, 122, 146, 170, 194].map((x, idx) => (
                  <path key={idx} d={`M${x} 66V108`} stroke="#205B49" strokeWidth="2" />
                ))}
                <rect x="64" y="124" width="152" height="36" rx="4" fill="#123D32" />
                <text x="140" y="146" textAnchor="middle" fill="#F7F8F4" fontSize="11" fontWeight="700" fontFamily="Barlow, sans-serif">
                  PACOTE 100 COPOS 200 ML
                </text>
              </g>
            ) : (
              <g>
                <rect x="56" y="48" width="168" height="122" rx="8" fill="#202923" stroke="#123D32" strokeWidth="2" />
                <rect x="56" y="96" width="168" height="44" fill="#F47B35" />
                <text x="140" y="122" textAnchor="middle" fill="#202923" fontSize="11" fontWeight="800" fontFamily="Barlow, sans-serif">
                  PACOTE 100 SACOS 100 L
                </text>
              </g>
            )}
          </g>
        );
      }
    }
  };

  return (
    <div
      className={`product-visual-container ${size === 'detail' ? 'product-visual-detail' : ''}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 280 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`Representação da embalagem de ${product.name} em ${product.packQuantityDescription}`}
        className="product-visual-svg"
      >
        <rect width="280" height="200" rx="8" fill="#F1F3EE" />
        {/* Grade sutil de fundo técnico */}
        <path d="M0 168H280" stroke="#DDE2DA" strokeWidth="1.5" />
        {renderIllustration()}
      </svg>
    </div>
  );
};

export const CategoryVisual: React.FC<{ slug: CategorySlug }> = ({ slug }) => {
  return (
    <svg
      width="120"
      height="88"
      viewBox="0 0 120 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="category-visual-svg"
    >
      <rect width="120" height="88" rx="6" fill="#E9ECE5" />
      {slug === 'bebidas-nao-alcoolicas' && (
        <g>
          <rect x="28" y="20" width="22" height="52" rx="5" fill="#123D32" />
          <rect x="56" y="26" width="20" height="46" rx="4" fill="#205B49" />
          <rect x="82" y="32" width="16" height="40" rx="3" fill="#F47B35" />
        </g>
      )}
      {slug === 'cervejas-e-bebidas-alcoolicas' && (
        <g>
          <rect x="24" y="28" width="72" height="44" rx="4" fill="#123D32" />
          <rect x="34" y="16" width="14" height="16" rx="2" fill="#F47B35" />
          <rect x="53" y="16" width="14" height="16" rx="2" fill="#F47B35" />
          <rect x="72" y="16" width="14" height="16" rx="2" fill="#F47B35" />
        </g>
      )}
      {slug === 'alimentos-e-mercearia' && (
        <g>
          <rect x="22" y="24" width="76" height="48" rx="5" fill="#205B49" />
          <rect x="30" y="32" width="26" height="32" rx="3" fill="#F7F8F4" />
          <rect x="64" y="32" width="26" height="32" rx="3" fill="#F47B35" />
        </g>
      )}
      {slug === 'produtos-de-limpeza' && (
        <g>
          <rect x="34" y="24" width="22" height="48" rx="5" fill="#123D32" />
          <rect x="40" y="14" width="10" height="10" rx="2" fill="#F47B35" />
          <rect x="64" y="30" width="24" height="42" rx="5" fill="#205B49" />
        </g>
      )}
      {slug === 'higiene-profissional' && (
        <g>
          <circle cx="44" cy="46" r="18" fill="#123D32" />
          <circle cx="44" cy="46" r="6" fill="#F7F8F4" />
          <rect x="70" y="24" width="26" height="44" rx="5" fill="#205B49" />
        </g>
      )}
      {slug === 'descartaveis-e-embalagens' && (
        <g>
          <path d="M32 24H58L54 68H36L32 24Z" fill="#123D32" />
          <rect x="66" y="28" width="26" height="40" rx="3" fill="#F47B35" />
        </g>
      )}
    </svg>
  );
};

