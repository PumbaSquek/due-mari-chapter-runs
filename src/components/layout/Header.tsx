import { useState } from 'react';
import { Menu, X, Calendar, Users, Camera, Home, LogOut, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();

  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/eventi', label: 'Eventi', icon: Calendar },
    { to: '/membri', label: 'Membri', icon: Users },
    { to: '/galleria', label: 'Galleria', icon: Camera },
  ];

  return (
    <header className="bg-card/90 backdrop-blur-lg border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-harley-gradient rounded-lg flex items-center justify-center shadow-glow">
              <span className="text-xl font-bold text-primary-foreground">D</span>
            </div>
            <div>
              <h1 className="text-xl font-oswald font-bold text-primary">Due Mari Chapter</h1>
              <p className="text-sm text-muted-foreground">Harley Davidson • Calabria</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth font-medium ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-glow'
                      : 'text-foreground hover:text-primary hover:bg-secondary/50'
                  }`
                }
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* User Menu / Login Button */}
          <div className="hidden md:block">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.user_metadata?.first_name || user.email}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                      {isAdmin && (
                        <p className="text-xs leading-none text-primary font-medium">
                          Amministratore
                        </p>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profilo</span>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Dashboard Admin</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Disconnetti</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavLink to="/auth">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Login
                </Button>
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-glow'
                        : 'text-foreground hover:bg-secondary/50'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              ))}
              <div className="pt-4 border-t border-border">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-4 py-2 text-sm">
                      <p className="font-medium">{user.user_metadata?.first_name || user.email}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      {isAdmin && (
                        <p className="text-xs text-primary font-medium">Amministratore</p>
                      )}
                    </div>
                    <Button onClick={signOut} variant="outline" className="w-full">
                      <LogOut className="mr-2 h-4 w-4" />
                      Disconnetti
                    </Button>
                  </div>
                ) : (
                  <NavLink to="/auth">
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      Login
                    </Button>
                  </NavLink>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;