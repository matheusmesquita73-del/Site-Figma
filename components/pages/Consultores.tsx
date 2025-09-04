export function Consultores() {
  const consultores = [
    {
      id: 1,
      nome: 'Maria Silva',
      vendas: 'R$ 45.680,00',
      metas: '95%',
      clientes: 23,
      conversao: '28.5%',
      status: 'Ativo',
      foto: '👩‍💼'
    },
    {
      id: 2,
      nome: 'João Santos',
      vendas: 'R$ 38.920,00',
      metas: '87%',
      clientes: 19,
      conversao: '24.2%',
      status: 'Ativo',
      foto: '👨‍💼'
    },
    {
      id: 3,
      nome: 'Ana Costa',
      vendas: 'R$ 42.150,00',
      metas: '91%',
      clientes: 21,
      conversao: '26.8%',
      status: 'Ativo',
      foto: '👩‍💼'
    },
    {
      id: 4,
      nome: 'Pedro Oliveira',
      vendas: 'R$ 35.600,00',
      metas: '78%',
      clientes: 16,
      conversao: '22.1%',
      status: 'Em treinamento',
      foto: '👨‍💼'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-foreground">Consultores</h1>
          <p className="text-muted-foreground">Gerencie a performance da equipe de vendas</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
          Adicionar Consultor
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-sm">👥</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Consultores</p>
              <p className="text-xl font-semibold text-foreground">4</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">🎯</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Média de Metas</p>
              <p className="text-xl font-semibold text-foreground">87.8%</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">💰</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Vendas Totais</p>
              <p className="text-xl font-semibold text-foreground">R$ 162.350</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">📈</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Conversão Média</p>
              <p className="text-xl font-semibold text-foreground">25.4%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Consultores List */}
      <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-medium text-foreground">Lista de Consultores</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">Consultor</th>
                <th className="text-left p-4 font-medium text-foreground">Vendas</th>
                <th className="text-left p-4 font-medium text-foreground">Metas</th>
                <th className="text-left p-4 font-medium text-foreground">Clientes</th>
                <th className="text-left p-4 font-medium text-foreground">Conversão</th>
                <th className="text-left p-4 font-medium text-foreground">Status</th>
                <th className="text-left p-4 font-medium text-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {consultores.map((consultor) => (
                <tr key={consultor.id} className="border-b border-border hover:bg-muted/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{consultor.foto}</span>
                      <div>
                        <p className="font-medium text-foreground">{consultor.nome}</p>
                        <p className="text-sm text-muted-foreground">Consultor de Vendas</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-foreground">{consultor.vendas}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{consultor.metas}</span>
                      <div className="w-16 h-2 bg-muted rounded-full">
                        <div 
                          className="h-2 bg-primary rounded-full" 
                          style={{ width: consultor.metas }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-foreground">{consultor.clientes}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-foreground">{consultor.conversao}</p>
                  </td>
                  <td className="p-4">
                    <span 
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        consultor.status === 'Ativo' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {consultor.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="text-primary hover:underline text-sm">
                        Ver Detalhes
                      </button>
                      <button className="text-muted-foreground hover:text-foreground text-sm">
                        Editar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4 text-foreground">Top Performers</h3>
          <div className="space-y-4">
            {consultores
              .sort((a, b) => parseFloat(b.metas) - parseFloat(a.metas))
              .map((consultor, index) => (
                <div key={consultor.id} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-full">
                    <span className="text-sm font-medium text-foreground">{index + 1}</span>
                  </div>
                  <span className="text-lg">{consultor.foto}</span>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{consultor.nome}</p>
                    <p className="text-sm text-muted-foreground">{consultor.metas} da meta</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{consultor.vendas}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4 text-foreground">Análise de Performance</h3>
          <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Gráfico de performance será exibido aqui</p>
          </div>
        </div>
      </div>
    </div>
  );
}