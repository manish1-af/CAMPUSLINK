import { Home, Search, Users, MessageCircle, BookOpen, User, Bell } from 'lucide-react';
import { Badge } from './ui/badge';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  unreadCount?: number;
}

export function Navbar({ activeTab, onTabChange, unreadCount = 0 }: NavbarProps) {
  const navItems = [
    { id: 'feed', label: 'Feed', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'network', label: 'Network', icon: Users },
    { id: 'chat', label: 'Chat', icon: MessageCircle, badge: unreadCount },
    { id: 'clubs', label: 'Clubs', icon: BookOpen },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-primary/10 shadow-sm animate-slide-in-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="gradient-primary text-white rounded-xl p-2 shadow-lg hover-lift">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-primary text-xl tracking-tight">CampusLink</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'text-primary bg-primary/10 shadow-md scale-105'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary hover:scale-105'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-destructive text-white px-1.5 py-0 min-w-5 h-5 flex items-center justify-center animate-pulse">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>

          <button className="p-2 rounded-xl hover:bg-gray-50 relative transition-all duration-300 hover:scale-110">
            <Bell className="w-5 h-5 text-gray-600" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 backdrop-blur-lg bg-white/90 border-t border-primary/10 flex items-center justify-around py-2 px-2 shadow-2xl z-50">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'text-primary bg-primary/10 scale-110' 
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-destructive text-white px-1.5 py-0 min-w-5 h-5 flex items-center justify-center animate-pulse">
                    {item.badge}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
