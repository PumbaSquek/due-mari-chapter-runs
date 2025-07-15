import { MapPin, Mail, Phone, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo e descrizione */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-harley-gradient rounded-lg flex items-center justify-center shadow-glow">
                <span className="text-lg font-bold text-primary-foreground">D</span>
              </div>
              <div>
                <h3 className="text-lg font-oswald font-bold text-primary">Due Mari Chapter</h3>
                <p className="text-sm text-muted-foreground">Harley Davidson</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              Il Chapter motociclistico Harley Davidson della Calabria, unendo la passione per i motori 
              e la fratellanza della strada tra i due mari.
            </p>
          </div>

          {/* Contatti */}
          <div className="space-y-4">
            <h4 className="text-lg font-oswald font-semibold text-foreground">Contatti</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin size={18} className="text-primary" />
                <span>Calabria, Italia</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail size={18} className="text-primary" />
                <span>info@duemarihapter.it</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone size={18} className="text-primary" />
                <span>+39 XXX XXX XXXX</span>
              </div>
            </div>
          </div>

          {/* Social e Link */}
          <div className="space-y-4">
            <h4 className="text-lg font-oswald font-semibold text-foreground">Seguici</h4>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary transition-smooth hover:shadow-glow"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary transition-smooth hover:shadow-glow"
              >
                <Instagram size={20} />
              </a>
            </div>
            <div className="pt-4">
              <p className="text-sm text-muted-foreground">
                "La strada è la nostra chiesa, <br />
                la Harley è la nostra preghiera"
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Due Mari Chapter. Tutti i diritti riservati. 
            <span className="text-primary ml-2">Ride Free, Live Hard</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;