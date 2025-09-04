import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Calendar, Save, X } from 'lucide-react';

interface PlanoAcao {
  id?: number;
  ofensa: string;
  causa: string;
  acao: string;
  comoSeraFeito: string;
  responsavel: string;
  dataInicio: string;
  prazo: string;
  status: 'a-iniciar' | 'em-andamento' | 'atrasado' | 'concluido';
}

interface FormularioPlanoAcaoProps {
  plano?: PlanoAcao;
  onSave: (plano: PlanoAcao) => void;
  onCancel: () => void;
}

export function FormularioPlanoAcao({ plano, onSave, onCancel }: FormularioPlanoAcaoProps) {
  const [formData, setFormData] = useState<PlanoAcao>({
    ofensa: plano?.ofensa || '',
    causa: plano?.causa || '',
    acao: plano?.acao || '',
    comoSeraFeito: plano?.comoSeraFeito || '',
    responsavel: plano?.responsavel || '',
    dataInicio: plano?.dataInicio || '',
    prazo: plano?.prazo || '',
    status: plano?.status || 'a-iniciar',
    ...plano
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: keyof PlanoAcao, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.ofensa.trim()) newErrors.ofensa = 'Ofensa é obrigatória';
    if (!formData.causa.trim()) newErrors.causa = 'Causa é obrigatória';
    if (!formData.acao.trim()) newErrors.acao = 'Ação é obrigatória';
    if (!formData.comoSeraFeito.trim()) newErrors.comoSeraFeito = 'Como será feito é obrigatório';
    if (!formData.responsavel.trim()) newErrors.responsavel = 'Responsável é obrigatório';
    if (!formData.dataInicio) newErrors.dataInicio = 'Data de início é obrigatória';
    if (!formData.prazo) newErrors.prazo = 'Prazo é obrigatório';

    // Validar se data de início não é posterior ao prazo
    if (formData.dataInicio && formData.prazo) {
      const dataInicio = new Date(formData.dataInicio);
      const dataPrazo = new Date(formData.prazo);
      if (dataInicio > dataPrazo) {
        newErrors.prazo = 'Prazo deve ser posterior à data de início';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
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

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          {plano?.id ? 'Editar Plano de Ação' : 'Novo Plano de Ação'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Ofensa */}
          <div className="space-y-2">
            <Label htmlFor="ofensa">Ofensa (Desvio do Indicador) *</Label>
            <Textarea
              id="ofensa"
              placeholder="Descreva o desvio identificado no indicador..."
              value={formData.ofensa}
              onChange={(e) => handleChange('ofensa', e.target.value)}
              className={errors.ofensa ? 'border-red-500' : ''}
              rows={3}
            />
            {errors.ofensa && <p className="text-sm text-red-500">{errors.ofensa}</p>}
          </div>

          {/* Causa */}
          <div className="space-y-2">
            <Label htmlFor="causa">Causa *</Label>
            <Textarea
              id="causa"
              placeholder="Identifique a causa raiz do problema..."
              value={formData.causa}
              onChange={(e) => handleChange('causa', e.target.value)}
              className={errors.causa ? 'border-red-500' : ''}
              rows={3}
            />
            {errors.causa && <p className="text-sm text-red-500">{errors.causa}</p>}
          </div>

          {/* Ação */}
          <div className="space-y-2">
            <Label htmlFor="acao">Ação *</Label>
            <Textarea
              id="acao"
              placeholder="Descreva a ação que será executada..."
              value={formData.acao}
              onChange={(e) => handleChange('acao', e.target.value)}
              className={errors.acao ? 'border-red-500' : ''}
              rows={3}
            />
            {errors.acao && <p className="text-sm text-red-500">{errors.acao}</p>}
          </div>

          {/* Como será feito */}
          <div className="space-y-2">
            <Label htmlFor="comoSeraFeito">Como será feito *</Label>
            <Textarea
              id="comoSeraFeito"
              placeholder="Detalhe como a ação será executada, recursos necessários, etapas..."
              value={formData.comoSeraFeito}
              onChange={(e) => handleChange('comoSeraFeito', e.target.value)}
              className={errors.comoSeraFeito ? 'border-red-500' : ''}
              rows={4}
            />
            {errors.comoSeraFeito && <p className="text-sm text-red-500">{errors.comoSeraFeito}</p>}
          </div>

          {/* Grid para campos menores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Responsável */}
            <div className="space-y-2">
              <Label htmlFor="responsavel">Responsável *</Label>
              <Select
                value={formData.responsavel}
                onValueChange={(value) => handleChange('responsavel', value)}
              >
                <SelectTrigger className={errors.responsavel ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Selecione o responsável" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maria-silva">Maria Silva</SelectItem>
                  <SelectItem value="joao-santos">João Santos</SelectItem>
                  <SelectItem value="ana-costa">Ana Costa</SelectItem>
                  <SelectItem value="pedro-oliveira">Pedro Oliveira</SelectItem>
                  <SelectItem value="carlos-rodrigues">Carlos Rodrigues</SelectItem>
                  <SelectItem value="lucia-ferreira">Lúcia Ferreira</SelectItem>
                </SelectContent>
              </Select>
              {errors.responsavel && <p className="text-sm text-red-500">{errors.responsavel}</p>}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleChange('status', value as PlanoAcao['status'])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a-iniciar">A Iniciar</SelectItem>
                  <SelectItem value="em-andamento">Em Andamento</SelectItem>
                  <SelectItem value="atrasado">Atrasado</SelectItem>
                  <SelectItem value="concluido">Concluído</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Data de Início */}
            <div className="space-y-2">
              <Label htmlFor="dataInicio">Data de Início *</Label>
              <Input
                id="dataInicio"
                type="date"
                value={formData.dataInicio}
                onChange={(e) => handleChange('dataInicio', e.target.value)}
                className={errors.dataInicio ? 'border-red-500' : ''}
              />
              {errors.dataInicio && <p className="text-sm text-red-500">{errors.dataInicio}</p>}
            </div>

            {/* Prazo */}
            <div className="space-y-2">
              <Label htmlFor="prazo">Prazo *</Label>
              <Input
                id="prazo"
                type="date"
                value={formData.prazo}
                onChange={(e) => handleChange('prazo', e.target.value)}
                className={errors.prazo ? 'border-red-500' : ''}
              />
              {errors.prazo && <p className="text-sm text-red-500">{errors.prazo}</p>}
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {plano?.id ? 'Atualizar' : 'Salvar'} Plano
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}