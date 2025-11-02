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
  <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gradient-to-r from-white to-[#308fef] border-b border-blue-200 shadow-md animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-16">

          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="bg-white text-[#308FEF] rounded-xl p-2 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-white font-semibold text-xl tracking-wide drop-shadow-sm">
              CampusLink
            </span>
          </div>

          {/* Navigation Items - Right aligned */}
          <div className="hidden md:flex items-center gap-2 ml-auto pr-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-white/20 text-white shadow-inner scale-105'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white px-1.5 py-0 min-w-5 h-5 flex items-center justify-center animate-bounce-slow">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              );
            })}

            {/* Notification Bell */}
            <button className="p-2 rounded-lg hover:bg-white/20 transition-all duration-300 relative">
              <Bell className="w-5 h-5 text-white" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-ping-slow"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
  <div className="md:hidden fixed bottom-0 left-0 right-0 backdrop-blur-md bg-gradient-to-r from-white to-[#308fef] border-t border-blue-200 flex items-center justify-around py-2 px-3 shadow-inner z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-white/30 text-[#308FEF] font-medium scale-105'
                  : 'text-[#1E4F91] hover:text-[#308FEF]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white px-1.5 py-0 min-w-5 h-5 flex items-center justify-center animate-bounce-slow">
                  {item.badge}
                </Badge>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
