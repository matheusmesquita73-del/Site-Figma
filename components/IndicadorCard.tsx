import { Button } from './ui/button';

interface IndicadorCardProps {
  nome: string;
  valorRealizado: number;
  meta: number;
  formato?: 'currency' | 'number' | 'percentage';
  onVerDetalhes: () => void;
}

export function IndicadorCard({ nome, valorRealizado, meta, formato = 'currency', onVerDetalhes }: IndicadorCardProps) {
  const desvioAbsoluto = valorRealizado - meta;
  const desvioPercentual = ((desvioAbsoluto / meta) * 100);
  
  const formatarValor = (valor: number) => {
    switch (formato) {
      case 'currency':
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(valor);
      case 'percentage':
        return `${valor.toFixed(1)}%`;
      case 'number':
        return new Intl.NumberFormat('pt-BR').format(valor);
      default:
        return valor.toString();
    }
  };

  const formatarDesvio = (valor: number) => {
    if (formato === 'currency') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        signDisplay: 'always'
      }).format(valor);
    }
    return valor >= 0 ? `+${valor.toFixed(1)}` : valor.toFixed(1);
  };

  const corDesvio = desvioAbsoluto >= 0 ? 'text-green-600' : 'text-red-600';
  const corFundoDesvio = desvioAbsoluto >= 0 ? 'bg-green-50' : 'bg-red-50';

  return (
    <div className="min-w-80 bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h3 className="text-lg font-medium text-card-foreground">{nome}</h3>
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Realizado</p>
            <p className="text-2xl font-medium text-card-foreground">
              {formatarValor(valorRealizado)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Meta</p>
            <p className="text-2xl font-medium text-card-foreground">
              {formatarValor(meta)}
            </p>
          </div>
        </div>

        {/* Desvios */}
        <div className={`${corFundoDesvio} rounded-lg p-3`}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Desvio</p>
              <p className={`text-lg font-medium ${corDesvio}`}>
                {formatarDesvio(desvioAbsoluto)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-muted-foreground">%</p>
              <p className={`text-lg font-medium ${corDesvio}`}>
                {desvioPercentual >= 0 ? '+' : ''}{desvioPercentual.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* Botão */}
        <Button 
          onClick={onVerDetalhes}
          variant="outline" 
          className="w-full"
        >
          Ver Detalhes
        </Button>
      </div>
    </div>
  );
}