import { useState } from 'react';
import { Button } from '../ui/button';
import { Plus, Edit, Eye, CheckCircle } from 'lucide-react';
import { FormularioPlanoAcao } from '../FormularioPlanoAcao';

interface PlanoAcaoData {
  id: number;
  ofensa: string;
  causa: string;
  acao: string;
  comoSeraFeito: string;
  responsavel: string;
  dataInicio: string;
  prazo: string;
  status: 'a-iniciar' | 'em-andamento' | 'atrasado' | 'concluido';
  progresso: number;
}

export function PlanoAcao() {
  const [showForm, setShowForm] = useState(false);
  const [editingPlano, setEditingPlano] = useState<PlanoAcaoData | undefined>();
  const [planos, setPlanos] = useState<PlanoAcaoData[]>([
    {
      id: 1,
      ofensa: 'Receita 8,2% abaixo da meta (R$ 70.000 a menos que o esperado)',
      causa: 'Redução no número de visitas presenciais devido ao período de chuvas e baixa conversão online',
      acao: 'Implementar campanha digital focada e reativar programa de relacionamento',
      comoSeraFeito: 'Desenvolver campanha no Instagram e WhatsApp com ofertas exclusivas, criar programa de cashback para clientes fiéis e implementar sistema de agendamento online para visitas',
      responsavel: 'maria-silva',
      dataInicio: '2024-10-15',
      prazo: '2024-11-15',
      status: 'em-andamento',
      progresso: 65
    },
    {
      id: 2,
      ofensa: 'Número de boletos 15% abaixo da meta (70 boletos a menos)',
      causa: 'Equipe de vendas focando apenas em vendas de alto valor, negligenciando volume',
      acao: 'Reestruturar metas de vendas para equilibrar volume e valor',
      comoSeraFeito: 'Criar sistema de bonificação mista (50% volume + 50% valor), treinar equipe em técnicas de venda consultiva e implementar controle diário de performance',
      responsavel: 'joao-santos',
      dataInicio: '2024-10-01',
      prazo: '2024-10-30',
      status: 'concluido',
      progresso: 100
    },
    {
      id: 3,
      ofensa: 'Boleto médio 28% acima da meta mas com volume baixo',
      causa: 'Foco excessivo em produtos premium sem estratégia para produtos de entrada',
      acao: 'Diversificar portfólio de ofertas e criar estratégia de upsell',
      comoSeraFeito: 'Criar combos de produtos, treinar equipe em técnicas de upsell/cross-sell e desenvolver campanhas segmentadas por perfil de cliente',
      responsavel: 'ana-costa',
      dataInicio: '2024-10-20',
      prazo: '2024-12-20',
      status: 'a-iniciar',
      progresso: 0
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluido':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'em-andamento':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'atrasado':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'a-iniciar':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'a-iniciar': return 'A Iniciar';
      case 'em-andamento': return 'Em Andamento';
      case 'atrasado': return 'Atrasado';
      case 'concluido': return 'Concluído';
      default: return status;
    }
  };

  const getResponsavelNome = (responsavel: string) => {
    const nomes: { [key: string]: string } = {
      'maria-silva': 'Maria Silva',
      'joao-santos': 'João Santos',
      'ana-costa': 'Ana Costa',
      'pedro-oliveira': 'Pedro Oliveira',
      'carlos-rodrigues': 'Carlos Rodrigues',
      'lucia-ferreira': 'Lúcia Ferreira'
    };
    return nomes[responsavel] || responsavel;
  };

  const handleSavePlano = (planoData: any) => {
    if (editingPlano) {
      // Edição
      setPlanos(prev => prev.map(p => 
        p.id === editingPlano.id 
          ? { ...planoData, id: editingPlano.id, progresso: editingPlano.progresso }
          : p
      ));
    } else {
      // Novo plano
      const newPlano = {
        ...planoData,
        id: Math.max(...planos.map(p => p.id)) + 1,
        progresso: planoData.status === 'concluido' ? 100 : 0
      };
      setPlanos(prev => [...prev, newPlano]);
    }
    
    setShowForm(false);
    setEditingPlano(undefined);
  };

  const handleEditPlano = (plano: PlanoAcaoData) => {
    setEditingPlano(plano);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingPlano(undefined);
  };

  const calcularProgressoMedio = () => {
    if (planos.length === 0) return 0;
    return Math.round(planos.reduce((acc, p) => acc + p.progresso, 0) / planos.length);
  };

  // Verificar se há planos atrasados
  const planosAtrasados = planos.filter(p => {
    const hoje = new Date();
    const prazo = new Date(p.prazo);
    return p.status !== 'concluido' && prazo < hoje;
  });

  // Atualizar status de planos atrasados
  useState(() => {
    setPlanos(prev => prev.map(plano => {
      const hoje = new Date();
      const prazo = new Date(plano.prazo);
      if (plano.status !== 'concluido' && prazo < hoje && plano.status !== 'atrasado') {
        return { ...plano, status: 'atrasado' as const };
      }
      return plano;
    }));
  });

  if (showForm) {
    return (
      <div className="space-y-6">
        <FormularioPlanoAcao
          plano={editingPlano}
          onSave={handleSavePlano}
          onCancel={handleCancelForm}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-foreground">Planos de Ação</h1>
          <p className="text-muted-foreground">Gerencie e acompanhe os planos de ação da equipe</p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Novo Plano de Ação
        </Button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">⏱️</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">A Iniciar</p>
              <p className="text-xl font-semibold text-foreground">
                {planos.filter(p => p.status === 'a-iniciar').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">🚀</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Em Andamento</p>
              <p className="text-xl font-semibold text-foreground">
                {planos.filter(p => p.status === 'em-andamento').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">✅</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Concluídos</p>
              <p className="text-xl font-semibold text-foreground">
                {planos.filter(p => p.status === 'concluido').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">📊</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Progresso Médio</p>
              <p className="text-xl font-semibold text-foreground">
                {calcularProgressoMedio()}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerta de planos atrasados */}
      {planosAtrasados.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">!</span>
            </div>
            <h3 className="font-medium text-red-800">Atenção: Planos Atrasados</h3>
          </div>
          <p className="text-sm text-red-700">
            {planosAtrasados.length} plano(s) está(ão) com prazo vencido e precisa(m) de atenção imediata.
          </p>
        </div>
      )}

      {/* Lista de Planos de Ação */}
      <div className="space-y-6">
        {planos.map((plano) => (
          <div key={plano.id} className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-medium text-foreground">Plano de Ação #{plano.id}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(plano.status)}`}>
                    {getStatusLabel(plano.status)}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleEditPlano(plano)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Edit className="h-3 w-3" />
                  Editar
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Coluna Esquerda */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Ofensa (Desvio)</h4>
                  <p className="text-sm text-foreground bg-red-50 p-3 rounded-lg border border-red-100">
                    {plano.ofensa}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Causa</h4>
                  <p className="text-sm text-foreground bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                    {plano.causa}
                  </p>
                </div>
              </div>

              {/* Coluna Direita */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Ação</h4>
                  <p className="text-sm text-foreground bg-blue-50 p-3 rounded-lg border border-blue-100">
                    {plano.acao}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Como será feito</h4>
                  <p className="text-sm text-foreground bg-green-50 p-3 rounded-lg border border-green-100">
                    {plano.comoSeraFeito}
                  </p>
                </div>
              </div>
            </div>

            {/* Informações de Execução */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Responsável</h4>
                <p className="text-sm font-medium text-foreground">{getResponsavelNome(plano.responsavel)}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Data Início</h4>
                <p className="text-sm font-medium text-foreground">
                  {new Date(plano.dataInicio).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Prazo</h4>
                <p className="text-sm font-medium text-foreground">
                  {new Date(plano.prazo).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Progresso</h4>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        plano.status === 'concluido' ? 'bg-green-500' :
                        plano.status === 'atrasado' ? 'bg-red-500' :
                        'bg-blue-500'
                      }`}
                      style={{ width: `${plano.progresso}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-foreground">{plano.progresso}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mensagem quando não há planos */}
      {planos.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-medium text-foreground mb-2">Nenhum plano de ação criado</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Comece criando seu primeiro plano de ação para gerenciar desvios e melhorias.
          </p>
          <Button onClick={() => setShowForm(true)}>
            Criar Primeiro Plano
          </Button>
        </div>
      )}
    </div>
  );
}