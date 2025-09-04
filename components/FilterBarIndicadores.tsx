import { useState } from 'react';
import { Calendar, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';

interface FilterBarIndicadoresProps {
  selectedIndicador: string;
  onIndicadorChange: (value: string) => void;
}

export function FilterBarIndicadores({ selectedIndicador, onIndicadorChange }: FilterBarIndicadoresProps) {
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [erro, setErro] = useState('');

  // Função para calcular data padrão (últimos 30 dias)
  const getDataPadrao = () => {
    const hoje = new Date();
    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(hoje.getDate() - 30);
    
    return {
      inicio: trintaDiasAtras.toISOString().split('T')[0],
      fim: hoje.toISOString().split('T')[0]
    };
  };

  // Inicializar com valores padrão se estiverem vazios
  const datasPadrao = getDataPadrao();
  const dataInicioValor = dataInicio || datasPadrao.inicio;
  const dataFimValor = dataFim || datasPadrao.fim;

  const validarPeriodo = (inicio: string, fim: string) => {
    if (!inicio || !fim) return '';
    
    const dataInicioObj = new Date(inicio);
    const dataFimObj = new Date(fim);
    
    // Verificar se data início é posterior à data fim
    if (dataInicioObj > dataFimObj) {
      return 'Data inicial deve ser anterior à data final';
    }
    
    // Verificar se o período excede 1 ano (365 dias)
    const diffTime = Math.abs(dataFimObj.getTime() - dataInicioObj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 365) {
      return 'O período não pode exceder 1 ano (365 dias)';
    }
    
    return '';
  };

  const handleDataInicioChange = (value: string) => {
    setDataInicio(value);
    const novoErro = validarPeriodo(value, dataFimValor);
    setErro(novoErro);
  };

  const handleDataFimChange = (value: string) => {
    setDataFim(value);
    const novoErro = validarPeriodo(dataInicioValor, value);
    setErro(novoErro);
  };

  const aplicarPeriodoRapido = (dias: number) => {
    const hoje = new Date();
    const dataInicial = new Date();
    dataInicial.setDate(hoje.getDate() - dias);
    
    const inicioFormatado = dataInicial.toISOString().split('T')[0];
    const fimFormatado = hoje.toISOString().split('T')[0];
    
    setDataInicio(inicioFormatado);
    setDataFim(fimFormatado);
    setErro('');
  };

  return (
    <Card className="p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        {/* Filtro de Indicador */}
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Indicador:</span>
          <Select value={selectedIndicador} onValueChange={onIndicadorChange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Selecione indicador" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="receita">Receita</SelectItem>
              <SelectItem value="boletos">Boletos</SelectItem>
              <SelectItem value="boleto-medio">Boleto Médio</SelectItem>
              <SelectItem value="itens">Itens</SelectItem>
              <SelectItem value="itens-por-boleto">Itens por Boleto</SelectItem>
              <SelectItem value="preco-medio">Preço Médio</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filtros Rápidos de Período */}
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Período:</span>
          <div className="flex gap-1">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => aplicarPeriodoRapido(7)}
              className="text-xs"
            >
              7 dias
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => aplicarPeriodoRapido(30)}
              className="text-xs"
            >
              30 dias
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => aplicarPeriodoRapido(90)}
              className="text-xs"
            >
              90 dias
            </Button>
          </div>
        </div>

        {/* Data Inicial */}
        <div className="flex items-center gap-2">
          <Label htmlFor="dataInicio" className="text-sm text-muted-foreground">De:</Label>
          <Input
            id="dataInicio"
            type="date"
            value={dataInicioValor}
            onChange={(e) => handleDataInicioChange(e.target.value)}
            className="w-[140px]"
          />
        </div>

        {/* Data Final */}
        <div className="flex items-center gap-2">
          <Label htmlFor="dataFim" className="text-sm text-muted-foreground">Até:</Label>
          <Input
            id="dataFim"
            type="date"
            value={dataFimValor}
            onChange={(e) => handleDataFimChange(e.target.value)}
            className="w-[140px]"
          />
        </div>
        
        {/* Filtro de Loja */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Loja:</span>
          <Select defaultValue="todas">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Selecione a loja" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as lojas</SelectItem>
              <SelectItem value="loja-centro">Loja Centro</SelectItem>
              <SelectItem value="loja-shopping">Loja Shopping</SelectItem>
              <SelectItem value="loja-norte">Loja Norte</SelectItem>
              <SelectItem value="loja-sul">Loja Sul</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Filtro de Consultor */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Consultor:</span>
          <Select defaultValue="todos">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Selecione consultor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="maria-silva">Maria Silva</SelectItem>
              <SelectItem value="joao-santos">João Santos</SelectItem>
              <SelectItem value="ana-costa">Ana Costa</SelectItem>
              <SelectItem value="pedro-oliveira">Pedro Oliveira</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="ml-auto"
          disabled={!!erro}
        >
          Aplicar Filtros
        </Button>
      </div>
      
      {/* Mensagem de erro */}
      {erro && (
        <div className="mt-3 flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-md">
          <AlertCircle className="h-4 w-4" />
          {erro}
        </div>
      )}
    </Card>
  );
}