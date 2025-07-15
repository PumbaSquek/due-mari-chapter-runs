import { useState } from 'react';
import { Menu, X, Calendar, Users, Camera, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

          {/* Login Button */}
          <div className="hidden md:block">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Login
            </Button>
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
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Login
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;