import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Button } from './ui/button';

const data = [
  { name: 'Não Iniciado', value: 12, color: '#ef4444' },
  { name: 'Em Andamento', value: 8, color: '#f59e0b' },
  { name: 'Finalizado', value: 15, color: '#10b981' }
];

interface StatusPlanoAcaoChartProps {
  onAtualizar: () => void;
}

export function StatusPlanoAcaoChart({ onAtualizar }: StatusPlanoAcaoChartProps) {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const percentage = ((value / total) * 100).toFixed(0);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-medium"
      >
        {`${percentage}%`}
      </text>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm h-full">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium text-card-foreground">
          Status do Plano de Ação
        </h3>
        <Button onClick={onAtualizar} variant="outline" size="sm">
          Atualizar
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico */}
        <div className="flex items-center justify-center">
          <div className="h-64 w-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    `${value} itens`, 
                    name
                  ]}
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detalhes dos Status */}
        <div className="flex flex-col justify-center space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-muted/30">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full border border-white/20"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-card-foreground">{item.name}</span>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold text-card-foreground">{item.value}</p>
                <p className="text-sm text-muted-foreground">
                  {((item.value / total) * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          ))}
          
          {/* Total */}
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center justify-between bg-primary/5 p-3 rounded-lg">
              <span className="font-medium text-card-foreground">Total de Planos</span>
              <span className="text-2xl font-semibold text-primary">{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}