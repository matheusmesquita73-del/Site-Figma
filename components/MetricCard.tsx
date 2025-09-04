import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  comparison?: {
    type: 'increase' | 'decrease' | 'neutral';
    value: string;
    label: string;
  };
  subtitle?: string;
}

export function MetricCard({ title, value, comparison, subtitle }: MetricCardProps) {
  const getComparisonIcon = () => {
    if (!comparison) return null;
    
    switch (comparison.type) {
      case 'increase':
        return <ArrowUp className="h-3 w-3" />;
      case 'decrease':
        return <ArrowDown className="h-3 w-3" />;
      default:
        return <Minus className="h-3 w-3" />;
    }
  };

  const getComparisonVariant = () => {
    if (!comparison) return 'secondary';
    
    switch (comparison.type) {
      case 'increase':
        return 'default';
      case 'decrease':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-semibold">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          {comparison && (
            <Badge variant={getComparisonVariant()} className="flex items-center gap-1 text-xs">
              {getComparisonIcon()}
              {comparison.value} {comparison.label}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}