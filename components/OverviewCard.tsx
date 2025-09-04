import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown, Target, DollarSign } from 'lucide-react';

export function OverviewCard() {
  const metrics = [
    {
      title: 'Receita Total',
      value: 'R$ 142.350,00',
      change: '+12.5%',
      trend: 'up' as const,
      description: 'vs mês anterior'
    },
    {
      title: 'Projetos Ativos',
      value: '28',
      change: '+3',
      trend: 'up' as const,
      description: 'novos este mês'
    },
    {
      title: 'Taxa de Conversão',
      value: '24.8%',
      change: '-2.1%',
      trend: 'down' as const,
      description: 'vs mês anterior'
    },
    {
      title: 'Ticket Médio',
      value: 'R$ 5.084,00',
      change: '+8.2%',
      trend: 'up' as const,
      description: 'vs mês anterior'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Visão Geral - Resultados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{metric.title}</span>
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
              </div>
              
              <p className="text-xl font-semibold mb-1">{metric.value}</p>
              
              <div className="flex items-center gap-2">
                <Badge 
                  variant={metric.trend === 'up' ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {metric.change}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {metric.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}