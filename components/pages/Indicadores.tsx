import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '../ui/button';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { GaugeChart } from '../GaugeChart';
import { MetricasDetalhadas } from '../MetricasDetalhadas';
import { FilterBarIndicadores } from '../FilterBarIndicadores';

// Dados base para diferentes indicadores
const indicadoresData = {
  receita: {
    nome: 'Receita',
    formato: 'currency' as const,
    dadosMensais: [
      { mes: 'Jan', meta: 850000, real: 920000 },
      { mes: 'Fev', meta: 850000, real: 780000 },
      { mes: 'Mar', meta: 850000, real: 950000 },
      { mes: 'Abr', meta: 850000, real: 820000 },
      { mes: 'Mai', meta: 850000, real: 890000 },
      { mes: 'Jun', meta: 850000, real: 920000 }
    ],
    dadosAcumulados: [
      { mes: 'Jan', meta: 850000, real: 920000 },
      { mes: 'Fev', meta: 1700000, real: 1700000 },
      { mes: 'Mar', meta: 2550000, real: 2650000 },
      { mes: 'Abr', meta: 3400000, real: 3470000 },
      { mes: 'Mai', meta: 4250000, real: 4360000 },
      { mes: 'Jun', meta: 5100000, real: 5280000 }
    ]
  },
  boletos: {
    nome: 'Boletos',
    formato: 'number' as const,
    dadosMensais: [
      { mes: 'Jan', meta: 450, real: 380 },
      { mes: 'Fev', meta: 450, real: 420 },
      { mes: 'Mar', meta: 450, real: 480 },
      { mes: 'Abr', meta: 450, real: 390 },
      { mes: 'Mai', meta: 450, real: 440 },
      { mes: 'Jun', meta: 450, real: 380 }
    ],
    dadosAcumulados: [
      { mes: 'Jan', meta: 450, real: 380 },
      { mes: 'Fev', meta: 900, real: 800 },
      { mes: 'Mar', meta: 1350, real: 1280 },
      { mes: 'Abr', meta: 1800, real: 1670 },
      { mes: 'Mai', meta: 2250, real: 2110 },
      { mes: 'Jun', meta: 2700, real: 2490 }
    ]
  },
  'boleto-medio': {
    nome: 'Boleto Médio',
    formato: 'currency' as const,
    dadosMensais: [
      { mes: 'Jan', meta: 1890, real: 2420 },
      { mes: 'Fev', meta: 1890, real: 1860 },
      { mes: 'Mar', meta: 1890, real: 1980 },
      { mes: 'Abr', meta: 1890, real: 2100 },
      { mes: 'Mai', meta: 1890, real: 2020 },
      { mes: 'Jun', meta: 1890, real: 2420 }
    ],
    dadosAcumulados: [
      { mes: 'Jan', meta: 1890, real: 2420 },
      { mes: 'Fev', meta: 1890, real: 2125 },
      { mes: 'Mar', meta: 1890, real: 2070 },
      { mes: 'Abr', meta: 1890, real: 2078 },
      { mes: 'Mai', meta: 1890, real: 2067 },
      { mes: 'Jun', meta: 1890, real: 2121 }
    ]
  },
  itens: {
    nome: 'Itens',
    formato: 'number' as const,
    dadosMensais: [
      { mes: 'Jan', meta: 1200, real: 980 },
      { mes: 'Fev', meta: 1200, real: 1100 },
      { mes: 'Mar', meta: 1200, real: 1250 },
      { mes: 'Abr', meta: 1200, real: 1020 },
      { mes: 'Mai', meta: 1200, real: 1150 },
      { mes: 'Jun', meta: 1200, real: 980 }
    ],
    dadosAcumulados: [
      { mes: 'Jan', meta: 1200, real: 980 },
      { mes: 'Fev', meta: 2400, real: 2080 },
      { mes: 'Mar', meta: 3600, real: 3330 },
      { mes: 'Abr', meta: 4800, real: 4350 },
      { mes: 'Mai', meta: 6000, real: 5500 },
      { mes: 'Jun', meta: 7200, real: 6480 }
    ]
  },
  'itens-por-boleto': {
    nome: 'Itens por Boleto',
    formato: 'number' as const,
    dadosMensais: [
      { mes: 'Jan', meta: 2.7, real: 2.6 },
      { mes: 'Fev', meta: 2.7, real: 2.6 },
      { mes: 'Mar', meta: 2.7, real: 2.6 },
      { mes: 'Abr', meta: 2.7, real: 2.6 },
      { mes: 'Mai', meta: 2.7, real: 2.6 },
      { mes: 'Jun', meta: 2.7, real: 2.6 }
    ],
    dadosAcumulados: [
      { mes: 'Jan', meta: 2.7, real: 2.6 },
      { mes: 'Fev', meta: 2.7, real: 2.6 },
      { mes: 'Mar', meta: 2.7, real: 2.6 },
      { mes: 'Abr', meta: 2.7, real: 2.6 },
      { mes: 'Mai', meta: 2.7, real: 2.6 },
      { mes: 'Jun', meta: 2.7, real: 2.6 }
    ]
  },
  'preco-medio': {
    nome: 'Preço Médio',
    formato: 'currency' as const,
    dadosMensais: [
      { mes: 'Jan', meta: 700, real: 940 },
      { mes: 'Fev', meta: 700, real: 710 },
      { mes: 'Mar', meta: 700, real: 760 },
      { mes: 'Abr', meta: 700, real: 800 },
      { mes: 'Mai', meta: 700, real: 780 },
      { mes: 'Jun', meta: 700, real: 940 }
    ],
    dadosAcumulados: [
      { mes: 'Jan', meta: 700, real: 940 },
      { mes: 'Fev', meta: 700, real: 825 },
      { mes: 'Mar', meta: 700, real: 803 },
      { mes: 'Abr', meta: 700, real: 802 },
      { mes: 'Mai', meta: 700, real: 798 },
      { mes: 'Jun', meta: 700, real: 815 }
    ]
  }
};

interface IndicadoresProps {
  selectedIndicador?: string | null;
}

export function Indicadores({ selectedIndicador: initialIndicador }: IndicadoresProps) {
  const [periodo, setPeriodo] = useState<'mensal' | 'acumulado'>('mensal');
  const [selectedIndicador, setSelectedIndicador] = useState(initialIndicador || 'receita');
  
  const indicadorSelecionado = indicadoresData[selectedIndicador as keyof typeof indicadoresData];
  const dados = periodo === 'mensal' ? indicadorSelecionado.dadosMensais : indicadorSelecionado.dadosAcumulados;
  const dadosAtuais = dados[dados.length - 1]; // Último período

  const handleTracarPlano = () => {
    alert('Redirecionando para criação de plano de ação...');
  };

  const handleVerConsultor = () => {
    alert('Redirecionando para tela de consultores...');
  };

  const handleBater = () => {
    alert('Função "Bater" ativada...');
  };

  const formatarTooltipValue = (value: number, name: string) => {
    if (indicadorSelecionado.formato === 'currency') {
      return [
        new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value),
        name === 'meta' ? 'Meta' : 'Real'
      ];
    }
    return [
      new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: value % 1 !== 0 ? 1 : 0,
        maximumFractionDigits: value % 1 !== 0 ? 1 : 0
      }).format(value),
      name === 'meta' ? 'Meta' : 'Real'
    ];
  };

  const formatarTickValue = (value: number) => {
    if (indicadorSelecionado.formato === 'currency') {
      return new Intl.NumberFormat('pt-BR', {
        notation: 'compact',
        compactDisplay: 'short'
      }).format(value);
    }
    return new Intl.NumberFormat('pt-BR', {
      notation: value >= 1000 ? 'compact' : 'standard',
      compactDisplay: 'short'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <FilterBarIndicadores 
        selectedIndicador={selectedIndicador}
        onIndicadorChange={setSelectedIndicador}
      />

      {/* Toggle Mensal/Acumulado */}
      <div className="flex justify-center">
        <Tabs 
          value={periodo} 
          onValueChange={(value) => setPeriodo(value as 'mensal' | 'acumulado')}
          className="w-auto"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mensal">Mensal</TabsTrigger>
            <TabsTrigger value="acumulado">Acumulado</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Layout Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lado Esquerdo */}
        <div className="space-y-6">
          {/* Gráfico Gauge */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <GaugeChart
              value={dadosAtuais.real}
              max={dadosAtuais.meta}
              title={`${indicadorSelecionado.nome} - Desempenho Atual`}
              formato={indicadorSelecionado.formato}
            />
          </div>

          {/* Métricas Detalhadas */}
          <div className="space-y-4">
            <MetricasDetalhadas
              meta={dadosAtuais.meta}
              real={dadosAtuais.real}
              formato={indicadorSelecionado.formato}
            />
          </div>

          {/* Botão Traçar Plano de Ação */}
          <div className="flex justify-center">
            <Button 
              onClick={handleTracarPlano}
              size="lg"
              className="w-full max-w-sm bg-primary hover:bg-primary/90"
            >
              Traçar plano de ação
            </Button>
          </div>
        </div>

        {/* Lado Direito */}
        <div className="space-y-6">
          {/* Gráfico de Colunas */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <h3 className="mb-4">
              {indicadorSelecionado.nome} - Meta vs Real - {periodo === 'mensal' ? 'Mensal' : 'Acumulado'}
            </h3>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dados} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis 
                    dataKey="mes" 
                    stroke="var(--muted-foreground)"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="var(--muted-foreground)"
                    tick={{ fontSize: 12 }}
                    tickFormatter={formatarTickValue}
                  />
                  <Tooltip
                    formatter={formatarTooltipValue}
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="meta" 
                    fill="#94a3b8" 
                    name="meta"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="real" 
                    fill="#3b82f6" 
                    name="real"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={handleVerConsultor}
              variant="outline"
              size="lg"
              className="w-full"
            >
              Ver consultor
            </Button>
            <Button 
              onClick={handleBater}
              variant="secondary"
              size="lg"
              className="w-full"
            >
              Bater
            </Button>
          </div>
        </div>
      </div>

      {/* Informações Adicionais */}
      <div className="bg-muted/30 rounded-lg p-4">
        <p className="text-sm text-muted-foreground text-center">
          <strong>Indicador:</strong> {indicadorSelecionado.nome} • 
          <strong> Período:</strong> {periodo === 'mensal' ? 'Visão Mensal' : 'Visão Acumulada'} • 
          <strong> Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
        </p>
      </div>
    </div>
  );
}