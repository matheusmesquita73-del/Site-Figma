interface MetricasDetalhadasProps {
  meta: number;
  real: number;
  formato?: 'currency' | 'number';
}

export function MetricasDetalhadas({ meta, real, formato = 'currency' }: MetricasDetalhadasProps) {
  const desvioValor = real - meta;
  const desvioPercentual = ((desvioValor / meta) * 100);
  
  const formatarValor = (valor: number) => {
    if (formato === 'currency') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(valor);
    }
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: valor % 1 !== 0 ? 1 : 0,
      maximumFractionDigits: valor % 1 !== 0 ? 1 : 0
    }).format(valor);
  };

  const formatarDesvioValor = (valor: number) => {
    if (formato === 'currency') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        signDisplay: 'always'
      }).format(valor);
    }
    const formatted = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: valor % 1 !== 0 ? 1 : 0,
      maximumFractionDigits: valor % 1 !== 0 ? 1 : 0,
      signDisplay: 'always'
    }).format(valor);
    return formatted;
  };

  const corDesvio = desvioValor >= 0 ? 'text-green-600' : 'text-red-600';
  const fundoDesvio = desvioValor >= 0 ? 'bg-green-50' : 'bg-red-50';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Meta */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">Meta</h4>
        <p className="text-2xl font-medium text-card-foreground">
          {formatarValor(meta)}
        </p>
      </div>

      {/* Real */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">Real</h4>
        <p className="text-2xl font-medium text-card-foreground">
          {formatarValor(real)}
        </p>
      </div>

      {/* % Desvio */}
      <div className={`${fundoDesvio} border border-border rounded-lg p-4`}>
        <h4 className="text-sm font-medium text-muted-foreground mb-2">% Desvio</h4>
        <p className={`text-2xl font-medium ${corDesvio}`}>
          {desvioPercentual >= 0 ? '+' : ''}{desvioPercentual.toFixed(1)}%
        </p>
      </div>

      {/* R$ Desvio */}
      <div className={`${fundoDesvio} border border-border rounded-lg p-4`}>
        <h4 className="text-sm font-medium text-muted-foreground mb-2">
          {formato === 'currency' ? 'R$ Desvio' : 'Desvio'}
        </h4>
        <p className={`text-2xl font-medium ${corDesvio}`}>
          {formatarDesvioValor(desvioValor)}
        </p>
      </div>
    </div>
  );
}