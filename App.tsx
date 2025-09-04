import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { VisaoGeral } from './components/pages/VisaoGeral';
import { Indicadores } from './components/pages/Indicadores';
import { Consultores } from './components/pages/Consultores';
import { PlanoAcao } from './components/pages/PlanoAcao';
import { ArvoreIndicadores } from './components/pages/ArvoreIndicadores';

export default function App() {
  const [activeItem, setActiveItem] = useState('visao-geral');
  const [selectedIndicador, setSelectedIndicador] = useState<string | null>(null);

  const handleNavigate = (page: string, indicador?: string) => {
    setActiveItem(page);
    if (indicador) {
      setSelectedIndicador(indicador);
    } else if (page !== 'indicadores') {
      setSelectedIndicador(null);
    }
  };

  const renderCurrentPage = () => {
    switch (activeItem) {
      case 'visao-geral':
        return <VisaoGeral onNavigate={handleNavigate} />;
      case 'indicadores':
        return <Indicadores selectedIndicador={selectedIndicador} />;
      case 'consultores':
        return <Consultores />;
      case 'plano-acao':
        return <PlanoAcao />;
      case 'arvore-indicadores':
        return <ArvoreIndicadores />;
      default:
        return <VisaoGeral onNavigate={handleNavigate} />;
    }
  };

  const getPageTitle = () => {
    switch (activeItem) {
      case 'visao-geral':
        return { title: 'Dashboard de Vendas', subtitle: 'Acompanhe seus resultados e metas em tempo real' };
      case 'indicadores':
        return { title: 'Indicadores', subtitle: 'Acompanhe os principais indicadores de performance' };
      case 'consultores':
        return { title: 'Consultores', subtitle: 'Gerencie a performance da equipe de vendas' };
      case 'plano-acao':
        return { title: 'Planos de Ação', subtitle: 'Gerencie e acompanhe os planos de ação da equipe' };
      case 'arvore-indicadores':
        return { title: 'Árvore de Indicadores', subtitle: 'Visualize a hierarquia e decomposição dos indicadores' };
      default:
        return { title: 'Dashboard de Vendas', subtitle: 'Acompanhe seus resultados e metas em tempo real' };
    }
  };

  const pageInfo = getPageTitle();

  return (
    <div className="h-screen bg-background flex">
      <Sidebar activeItem={activeItem} onItemChange={(item) => handleNavigate(item)} />
      
      {/* Main Content */}
      <div className="flex-1 h-screen overflow-y-auto">
        <div className="p-6">
          {/* Header only for non-visao-geral pages */}
          {activeItem !== 'visao-geral' && (
            <div className="mb-6 pt-12 lg:pt-0">
              <h1 className="text-3xl font-medium mb-2 text-foreground">
                {pageInfo.title}
              </h1>
              <p className="text-muted-foreground">
                {pageInfo.subtitle}
              </p>
            </div>
          )}
          
          {/* Page Content */}
          <div className={activeItem === 'visao-geral' ? 'pt-12 lg:pt-0' : ''}>
            {renderCurrentPage()}
          </div>
        </div>
      </div>
    </div>
  );
}