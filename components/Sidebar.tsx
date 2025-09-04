import { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Target, 
  TreePine, 
  LayoutDashboard,
  Menu,
  X 
} from 'lucide-react';

interface SidebarProps {
  activeItem: string;
  onItemChange: (item: string) => void;
}

export function Sidebar({ activeItem, onItemChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      id: 'visao-geral',
      label: 'Visão Geral',
      icon: LayoutDashboard
    },
    {
      id: 'indicadores',
      label: 'Indicadores',
      icon: BarChart3
    },
    {
      id: 'consultores',
      label: 'Consultores',
      icon: Users
    },
    {
      id: 'plano-acao',
      label: 'Plano de Ação',
      icon: Target
    },
    {
      id: 'arvore-indicadores',
      label: 'Árvore de Indicadores',
      icon: TreePine
    }
  ];

  const handleItemClick = (itemId: string) => {
    onItemChange(itemId);
    setIsOpen(false); // Close mobile menu
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-6 left-6 z-50 p-2 bg-sidebar border border-sidebar-border rounded-md shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen w-64 bg-sidebar border-r border-sidebar-border z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto lg:h-screen
      `}>
        <div className="flex flex-col h-screen">
          {/* Header */}
          <div className="p-4 border-b border-sidebar-border">
            <h2 className="text-lg font-medium text-sidebar-foreground">
              Dashboard de Vendas
            </h2>
            <p className="text-sm text-sidebar-accent-foreground mt-1">
              Sistema de Gestão
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleItemClick(item.id)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-colors
                        ${isActive 
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                        }
                      `}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-sidebar-border">
            <div className="flex items-center gap-3 p-3 rounded-md bg-sidebar-accent">
              <div className="w-8 h-8 bg-sidebar-primary rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-sidebar-primary-foreground">
                  U
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-accent-foreground truncate">
                  Usuário Admin
                </p>
                <p className="text-xs text-sidebar-accent-foreground opacity-70">
                  admin@empresa.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}