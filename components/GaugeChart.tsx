import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GaugeChartProps {
  value: number;
  max: number;
  title: string;
  formato?: 'currency' | 'number';
}

export function GaugeChart({ value, max, title, formato = 'currency' }: GaugeChartProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const remainingPercentage = Math.max(100 - percentage, 0);
  
  // Define cores baseadas na performance
  const getColor = () => {
    if (percentage >= 100) return '#10b981'; // Verde - Meta atingida ou superada
    if (percentage >= 80) return '#84cc16';  // Verde claro - Próximo da meta
    if (percentage >= 60) return '#f59e0b';  // Amarelo - Moderado
    return '#ef4444'; // Vermelho - Baixo desempenho
  };

  const formatarValor = (valor: number) => {
    if (formato === 'currency') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        notation: valor >= 1000000 ? 'compact' : 'standard',
        compactDisplay: 'short'
      }).format(valor);
    }
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: valor % 1 !== 0 ? 1 : 0,
      maximumFractionDigits: valor % 1 !== 0 ? 1 : 0
    }).format(valor);
  };

  const data = [
    { name: 'Realizado', value: percentage },
    { name: 'Restante', value: remainingPercentage }
  ];

  // Configurações para meio círculo (gauge)
  const startAngle = 180;
  const endAngle = 0;

  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-6">{title}</h3>
      
      <div className="relative">
        <ResponsiveContainer width={320} height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="85%"
              startAngle={startAngle}
              endAngle={endAngle}
              innerRadius={80}
              outerRadius={140}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={getColor()} />
              <Cell fill="#f1f5f9" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Valor central */}
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
          <div className="text-3xl font-medium text-card-foreground mb-1">
            {percentage.toFixed(1)}%
          </div>
          <div className="text-sm text-muted-foreground text-center">
            <div>{formatarValor(value)}</div>
            <div className="text-xs">de {formatarValor(max)}</div>
          </div>
        </div>
      </div>

      {/* Indicadores de escala melhorados */}
      <div className="flex justify-between w-80 mt-4 text-xs text-muted-foreground">
        <div className="text-center">
          <div className="w-2 h-2 bg-red-500 rounded-full mx-auto mb-1"></div>
          <span>0%</span>
        </div>
        <div className="text-center">
          <div className="w-2 h-2 bg-yellow-500 rounded-full mx-auto mb-1"></div>
          <span>60%</span>
        </div>
        <div className="text-center">
          <div className="w-2 h-2 bg-lime-500 rounded-full mx-auto mb-1"></div>
          <span>80%</span>
        </div>
        <div className="text-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mb-1"></div>
          <span>100%</span>
        </div>
      </div>

      {/* Status textual */}
      <div className="mt-4 text-center">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          percentage >= 100 ? 'bg-green-100 text-green-800' :
          percentage >= 80 ? 'bg-lime-100 text-lime-800' :
          percentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {percentage >= 100 ? '🎯 Meta Superada!' :
           percentage >= 80 ? '📈 Próximo da Meta' :
           percentage >= 60 ? '⚠️ Performance Moderada' :
           '🚨 Atenção Necessária'}
        </div>
      </div>
    </div>
  );
}