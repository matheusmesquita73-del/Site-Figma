import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

const indicadores = [
  {
    indicador: 'Receita Mensal',
    meta: 850000,
    realizado: 920000,
    desvio: 70000
  },
  {
    indicador: 'Número de Boletos',
    meta: 450,
    realizado: 380,
    desvio: -70
  },
  {
    indicador: 'Boleto Médio',
    meta: 1890,
    realizado: 2420,
    desvio: 530
  },
  {
    indicador: 'Total de Itens',
    meta: 1200,
    realizado: 980,
    desvio: -220
  },
  {
    indicador: 'Itens por Boleto',
    meta: 2.7,
    realizado: 2.6,
    desvio: -0.1
  },
  {
    indicador: 'Preço Médio por Item',
    meta: 700,
    realizado: 940,
    desvio: 240
  }
];

interface TabelaIndicadoresIAFProps {
  onPlanoAcao: (indicador: string) => void;
}

export function TabelaIndicadoresIAF({ onPlanoAcao }: TabelaIndicadoresIAFProps) {
  const formatarValor = (valor: number, tipo: string) => {
    if (tipo.toLowerCase().includes('receita') || tipo.toLowerCase().includes('médio') || tipo.toLowerCase().includes('preço')) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(valor);
    } else if (tipo.toLowerCase().includes('itens por boleto')) {
      return valor.toFixed(1);
    }
    return new Intl.NumberFormat('pt-BR').format(valor);
  };

  const formatarDesvio = (desvio: number, tipo: string) => {
    const sinal = desvio >= 0 ? '+' : '';
    if (tipo.toLowerCase().includes('receita') || tipo.toLowerCase().includes('médio') || tipo.toLowerCase().includes('preço')) {
      return sinal + new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(desvio);
    } else if (tipo.toLowerCase().includes('itens por boleto')) {
      return sinal + desvio.toFixed(1);
    }
    return sinal + new Intl.NumberFormat('pt-BR').format(desvio);
  };

  const getCorDesvio = (desvio: number) => {
    return desvio >= 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-medium text-card-foreground">
          Indicadores IAF
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Acompanhe o desempenho dos principais indicadores
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Indicador</TableHead>
              <TableHead className="text-right">Meta</TableHead>
              <TableHead className="text-right">Realizado</TableHead>
              <TableHead className="text-right">Desvio</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {indicadores.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {item.indicador}
                </TableCell>
                <TableCell className="text-right">
                  {formatarValor(item.meta, item.indicador)}
                </TableCell>
                <TableCell className="text-right">
                  {formatarValor(item.realizado, item.indicador)}
                </TableCell>
                <TableCell className={`text-right ${getCorDesvio(item.desvio)}`}>
                  {formatarDesvio(item.desvio, item.indicador)}
                </TableCell>
                <TableCell className="text-center">
                  {item.desvio < 0 && (
                    <Button
                      onClick={() => onPlanoAcao(item.indicador)}
                      variant="destructive"
                      size="sm"
                    >
                      Plano de Ação
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}