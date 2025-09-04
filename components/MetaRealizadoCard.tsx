import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Target, TrendingUp, AlertTriangle } from 'lucide-react';

interface MetaRealizadoData {
  categoria: string;
  meta: number;
  realizado: number;
  desvio: number;
  desvioPercentual: number;
}

export function MetaRealizadoCard() {
  const data: MetaRealizadoData[] = [
    {
      categoria: 'Vendas Mensais',
      meta: 150000,
      realizado: 142350,
      desvio: -7650,
      desvioPercentual: -5.1
    },
    {
      categoria: 'Novos Clientes',
      meta: 50,
      realizado: 62,
      desvio: 12,
      desvioPercentual: 24.0
    },
    {
      categoria: 'Projetos Fechados',
      meta: 25,
      realizado: 28,
      desvio: 3,
      desvioPercentual: 12.0
    },
    {
      categoria: 'Margem de Lucro (%)',
      meta: 30.0,
      realizado: 28.5,
      desvio: -1.5,
      desvioPercentual: -5.0
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatNumber = (value: number, isPercentage = false) => {
    if (isPercentage) {
      return `${value.toFixed(1)}%`;
    }
    return value.toLocaleString('pt-BR');
  };

  const formatValue = (value: number, categoria: string) => {
    if (categoria.includes('R$') || categoria.includes('Vendas')) {
      return formatCurrency(value);
    }
    if (categoria.includes('%') || categoria.includes('Margem')) {
      return formatNumber(value, true);
    }
    return formatNumber(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Meta vs Realizado vs Desvio (R$)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.map((item, index) => {
          const progressPercentage = (item.realizado / item.meta) * 100;
          const isPositiveDeviation = item.desvio >= 0;
          
          return (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">{item.categoria}</h4>
                <div className="flex items-center gap-2">
                  {isPositiveDeviation ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${
                    isPositiveDeviation ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isPositiveDeviation ? '+' : ''}{formatNumber(item.desvioPercentual, true)}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Meta</span>
                  <p className="font-medium">{formatValue(item.meta, item.categoria)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Realizado</span>
                  <p className="font-medium">{formatValue(item.realizado, item.categoria)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Desvio</span>
                  <p className={`font-medium ${
                    isPositiveDeviation ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isPositiveDeviation ? '+' : ''}{formatValue(Math.abs(item.desvio), item.categoria)}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progresso da Meta</span>
                  <span>{Math.min(progressPercentage, 100).toFixed(1)}%</span>
                </div>
                <Progress 
                  value={Math.min(progressPercentage, 100)} 
                  className="h-2"
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}