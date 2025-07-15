import { Calendar, Users, Camera, ArrowRight, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-bikes.jpg';

const HomePage = () => {
  const prossimieventi = [
    {
      id: 1,
      titolo: "Run delle Due Coste",
      data: "2024-03-15",
      luogo: "Tropea - Pizzo",
      partecipanti: 25,
      tipo: "Run"
    },
    {
      id: 2,
      titolo: "Raduno di Primavera",
      data: "2024-04-20",
      luogo: "Cosenza",
      partecipanti: 40,
      tipo: "Raduno"
    },
    {
      id: 3,
      titolo: "Benedizione delle Moto",
      data: "2024-05-01",
      luogo: "Santuario di Capo Colonna",
      partecipanti: 60,
      tipo: "Evento Speciale"
    }
  ];

  const statistiche = [
    { numero: "45", label: "Membri Attivi", icon: Users },
    { numero: "12", label: "Eventi 2024", icon: Calendar },
    { numero: "500+", label: "Foto Archiviate", icon: Camera },
    { numero: "15K", label: "Km Percorsi", icon: MapPin }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
            Calabria • Harley Davidson Chapter
          </Badge>
          <h1 className="text-5xl md:text-7xl font-oswald font-bold text-white mb-6">
            DUE MARI<br />
            <span className="text-primary">CHAPTER</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Tra il Tirreno e lo Ionio, cavalchiamo la libertà su due ruote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-harley text-lg px-8">
              Scopri i Nostri Eventi
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black text-lg px-8">
              Guarda la Galleria
            </Button>
          </div>
        </div>
      </section>

      {/* Statistiche */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statistiche.map((stat, index) => (
              <Card key={index} className="bg-secondary/50 border-primary/20 hover:shadow-glow transition-smooth">
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-oswald font-bold text-foreground mb-1">
                    {stat.numero}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Prossimi Eventi */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-oswald font-bold text-foreground mb-4">
              Prossimi Eventi
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Non perdere i nostri prossimi raduni e run attraverso le bellezze della Calabria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {prossimieventi.map((evento) => (
              <Card key={evento.id} className="bg-card border-primary/20 hover:shadow-glow transition-smooth group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge 
                      variant={evento.tipo === 'Run' ? 'default' : evento.tipo === 'Raduno' ? 'secondary' : 'outline'}
                      className="bg-primary/20 text-primary border-primary/30"
                    >
                      {evento.tipo}
                    </Badge>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        {new Date(evento.data).toLocaleDateString('it-IT', { 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-oswald font-semibold text-foreground mb-3 group-hover:text-primary transition-smooth">
                    {evento.titolo}
                  </h3>
                  
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} className="text-primary" />
                      <span className="text-sm">{evento.luogo}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users size={16} className="text-primary" />
                      <span className="text-sm">{evento.partecipanti} partecipanti previsti</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/eventi">
              <Button size="lg" className="btn-harley">
                Vedi Tutti gli Eventi
                <Calendar className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-secondary to-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-oswald font-bold text-foreground mb-6">
            Unisciti alla Famiglia
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Se possiedi una Harley Davidson e condividi la nostra passione per la strada, 
            contattaci per far parte del Due Mari Chapter
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-harley">
              Contattaci
            </Button>
            <Link to="/membri">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Conosci i Membri
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;