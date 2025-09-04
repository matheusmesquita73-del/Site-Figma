export function ArvoreIndicadores() {
  const indicadores = {
    receita: {
      title: 'Receita Total',
      value: 'R$ 142.350,00',
      change: '+12.5%',
      children: {
        vendasDiretas: {
          title: 'Vendas Diretas',
          value: 'R$ 95.200,00',
          change: '+15.2%',
          children: {
            lojaFisica: {
              title: 'Loja Física',
              value: 'R$ 68.400,00',
              change: '+8.3%'
            },
            online: {
              title: 'Online',
              value: 'R$ 26.800,00',
              change: '+35.7%'
            }
          }
        },
        parcerias: {
          title: 'Parcerias',
          value: 'R$ 47.150,00',
          change: '+7.8%',
          children: {
            revendedores: {
              title: 'Revendedores',
              value: 'R$ 32.100,00',
              change: '+12.1%'
            },
            afiliados: {
              title: 'Afiliados',
              value: 'R$ 15.050,00',
              change: '-2.3%'
            }
          }
        }
      }
    }
  };

  const renderIndicador = (indicador: any, level = 0) => {
    const hasChildren = indicador.children && Object.keys(indicador.children).length > 0;
    
    return (
      <div className={`${level > 0 ? 'ml-8' : ''}`}>
        <div className={`
          bg-card border border-border rounded-lg p-4 shadow-sm mb-4
          ${level === 0 ? 'border-2 border-primary' : ''}
          ${level === 1 ? 'border-blue-200' : ''}
          ${level === 2 ? 'border-gray-200' : ''}
        `}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              {level > 0 && (
                <div className="w-6 h-0.5 bg-border"></div>
              )}
              <h3 className={`font-medium text-foreground ${
                level === 0 ? 'text-lg' : 
                level === 1 ? 'text-base' : 'text-sm'
              }`}>
                {indicador.title}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className={`
                px-2 py-1 rounded text-xs font-medium
                ${indicador.change.startsWith('+') 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
                }
              `}>
                {indicador.change}
              </span>
            </div>
          </div>
          
          <p className={`font-semibold text-foreground ${
            level === 0 ? 'text-2xl' :
            level === 1 ? 'text-xl' : 'text-lg'
          }`}>
            {indicador.value}
          </p>
          
          {hasChildren && (
            <div className="mt-4">
              {Object.entries(indicador.children).map(([key, child]) => (
                <div key={key}>
                  {renderIndicador(child, level + 1)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-foreground">Árvore de Indicadores</h1>
          <p className="text-muted-foreground">Visualize a hierarquia e decomposição dos indicadores</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
            Expandir Todos
          </button>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
            Adicionar Indicador
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
        <h3 className="font-medium text-foreground mb-3">Legenda</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-primary rounded"></div>
            <span className="text-sm text-muted-foreground">Indicador Principal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border border-blue-200 rounded"></div>
            <span className="text-sm text-muted-foreground">Indicador Secundário</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border border-gray-200 rounded"></div>
            <span className="text-sm text-muted-foreground">Indicador Terciário</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-2 bg-green-100 rounded"></div>
            <span className="text-sm text-muted-foreground">Variação Positiva</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-2 bg-red-100 rounded"></div>
            <span className="text-sm text-muted-foreground">Variação Negativa</span>
          </div>
        </div>
      </div>

      {/* Árvore de Indicadores */}
      <div className="space-y-6">
        {renderIndicador(indicadores.receita)}
      </div>

      {/* Análise Detalhada */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4 text-foreground">Análise de Contribuição</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium text-foreground">Vendas Diretas</p>
                <p className="text-sm text-muted-foreground">Contribuição para receita total</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">66.9%</p>
                <div className="w-16 h-2 bg-muted rounded-full mt-1">
                  <div className="w-11 h-2 bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium text-foreground">Parcerias</p>
                <p className="text-sm text-muted-foreground">Contribuição para receita total</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">33.1%</p>
                <div className="w-16 h-2 bg-muted rounded-full mt-1">
                  <div className="w-5 h-2 bg-blue-600 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium text-foreground">Canal Online</p>
                <p className="text-sm text-muted-foreground">Maior crescimento mensal</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">+35.7%</p>
                <p className="text-xs text-muted-foreground">vs mês anterior</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4 text-foreground">Insights e Recomendações</h3>
          <div className="space-y-4">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✅</span>
                <div>
                  <p className="text-sm font-medium text-green-800">Oportunidade Identificada</p>
                  <p className="text-xs text-green-700 mt-1">
                    Canal online apresenta maior crescimento. Considere aumentar investimento em marketing digital.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-2">
                <span className="text-yellow-600 mt-0.5">⚠️</span>
                <div>
                  <p className="text-sm font-medium text-yellow-800">Atenção Necessária</p>
                  <p className="text-xs text-yellow-700 mt-1">
                    Canal de afiliados com queda de 2.3%. Revisar estratégia de parcerias.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">💡</span>
                <div>
                  <p className="text-sm font-medium text-blue-800">Sugestão</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Equilibrar dependência entre canais físico e digital para reduzir riscos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mapa de Correlações */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-4 text-foreground">Mapa de Correlações</h3>
        <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Matriz de correlação entre indicadores será exibida aqui</p>
        </div>
      </div>
    </div>
  );
}