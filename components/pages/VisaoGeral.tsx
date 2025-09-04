import { FilterBar } from '../FilterBar';
import { IndicadorCard } from '../IndicadorCard';
import { StatusPlanoAcaoChart } from '../StatusPlanoAcaoChart';
import { TabelaIndicadoresIAF } from '../TabelaIndicadoresIAF';

const indicadores = [
  {
    nome: 'Receita',
    valorRealizado: 920000,
    meta: 850000,
    formato: 'currency' as const
  },
  {
    nome: 'Boletos',
    valorRealizado: 380,
    meta: 450,
    formato: 'number' as const
  },
  {
    nome: 'Boleto Médio',
    valorRealizado: 2420,
    meta: 1890,
    formato: 'currency' as const
  },
  {
    nome: 'Itens',
    valorRealizado: 980,
    meta: 1200,
    formato: 'number' as const
  },
  {
    nome: 'Itens por Boleto',
    valorRealizado: 2.6,
    meta: 2.7,
    formato: 'number' as const
  },
  {
    nome: 'Preço Médio',
    valorRealizado: 940,
    meta: 700,
    formato: 'currency' as const
  }
];

interface VisaoGeralProps {
  onNavigate: (page: string, indicador?: string) => void;
}

export function VisaoGeral({ onNavigate }: VisaoGeralProps) {
  // Mapa para converter nomes dos indicadores para IDs usados no filtro
  const indicadorMap: { [key: string]: string } = {
    'Receita': 'receita',
    'Boletos': 'boletos',
    'Boleto Médio': 'boleto-medio',
    'Itens': 'itens',
    'Itens por Boleto': 'itens-por-boleto',
    'Preço Médio': 'preco-medio'
  };

  const handleVerDetalhes = (indicadorNome?: string) => {
    if (indicadorNome && indicadorMap[indicadorNome]) {
      onNavigate('indicadores', indicadorMap[indicadorNome]);
    } else {
      onNavigate('indicadores');
    }
  };

  const handleAtualizar = () => {
    onNavigate('plano-acao');
  };

  const handlePlanoAcao = (indicador: string) => {
    console.log(`Navegando para Plano de Ação do indicador: ${indicador}`);
    onNavigate('plano-acao');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-medium mb-2 text-foreground">
          Dashboard de Vendas
        </h1>
        <p className="text-muted-foreground">
          Acompanhe seus resultados e metas em tempo real
        </p>
      </div>

      {/* Filter Bar */}
      <FilterBar />

      {/* Carrossel de Cards de Indicadores */}
      <div>
        <h2 className="text-xl font-medium mb-4 text-foreground">
          Indicadores Principais
        </h2>
        <div className="overflow-x-auto">
          <div className="flex gap-6 pb-4 min-w-max">
            {indicadores.map((indicador, index) => (
              <IndicadorCard
                key={index}
                nome={indicador.nome}
                valorRealizado={indicador.valorRealizado}
                meta={indicador.meta}
                formato={indicador.formato}
                onVerDetalhes={() => handleVerDetalhes(indicador.nome)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard de Status de Plano de Ação - Layout Ampliado */}
      <div>
        <h2 className="text-xl font-medium mb-4 text-foreground">
          Planos de Ação
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gráfico de Status - Ocupa 2 colunas */}
          <div className="lg:col-span-2">
            <StatusPlanoAcaoChart onAtualizar={handleAtualizar} />
          </div>
          
          {/* Cards de Métricas Adicionais - Ocupa 1 coluna */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-foreground">Meta Mensal</h3>
                <span className="text-2xl">🎯</span>
              </div>
              <p className="text-2xl font-semibold text-foreground mb-1">85%</p>
              <p className="text-sm text-muted-foreground">de conclusão esperada</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-foreground">Prazo Médio</h3>
                <span className="text-2xl">⏰</span>
              </div>
              <p className="text-2xl font-semibold text-foreground mb-1">12</p>
              <p className="text-sm text-muted-foreground">dias para conclusão</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-foreground">Eficiência</h3>
                <span className="text-2xl">⚡</span>
              </div>
              <p className="text-2xl font-semibold text-foreground mb-1">92%</p>
              <p className="text-sm text-muted-foreground">dos prazos cumpridos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Indicadores IAF */}
      <div>
        <TabelaIndicadoresIAF onPlanoAcao={handlePlanoAcao} />
      </div>
    </div>
  );
}