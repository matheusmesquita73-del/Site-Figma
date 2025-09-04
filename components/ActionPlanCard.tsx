import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Clock, Play, CheckCircle } from 'lucide-react';

interface ActionPlan {
  id: string;
  title: string;
  description: string;
  status: 'não iniciado' | 'em andamento' | 'finalizado';
  progress: number;
  dueDate: string;
  assignedTo: string;
}

interface ActionPlanCardProps {
  actionPlans: ActionPlan[];
}

const statusConfig = {
  'não iniciado': {
    icon: Clock,
    variant: 'secondary' as const,
    color: 'text-muted-foreground'
  },
  'em andamento': {
    icon: Play,
    variant: 'default' as const,
    color: 'text-blue-600'
  },
  'finalizado': {
    icon: CheckCircle,
    variant: 'default' as const,
    color: 'text-green-600'
  }
};

export function ActionPlanCard({ actionPlans }: ActionPlanCardProps) {
  const statusCounts = actionPlans.reduce((acc, plan) => {
    acc[plan.status] = (acc[plan.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Planos de Ação</span>
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              {statusCounts['não iniciado'] || 0} Não iniciado
            </Badge>
            <Badge variant="default" className="text-xs">
              <Play className="h-3 w-3 mr-1" />
              {statusCounts['em andamento'] || 0} Em andamento
            </Badge>
            <Badge variant="default" className="text-xs">
              <CheckCircle className="h-3 w-3 mr-1" />
              {statusCounts['finalizado'] || 0} Finalizado
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {actionPlans.map((plan) => {
          const config = statusConfig[plan.status];
          const Icon = config.icon;
          
          return (
            <div key={plan.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{plan.title}</h4>
                <Badge variant={config.variant} className="text-xs">
                  <Icon className="h-3 w-3 mr-1" />
                  {plan.status}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                {plan.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progresso: {plan.progress}%</span>
                  <span>Prazo: {plan.dueDate}</span>
                </div>
                <Progress value={plan.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Responsável: {plan.assignedTo}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}