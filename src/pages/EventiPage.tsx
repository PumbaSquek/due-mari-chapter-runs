import { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const EventiPage = () => {
  const [filtroTipo, setFiltroTipo] = useState('tutti');
  const [searchTerm, setSearchTerm] = useState('');

  const eventi = [
    {
      id: 1,
      titolo: "Run delle Due Coste",
      descrizione: "Un percorso mozzafiato che collega il Tirreno allo Ionio attraverso le montagne calabresi.",
      data: "2024-03-15",
      ora: "09:00",
      luogo: "Tropea - Pizzo",
      partecipanti: 25,
      maxPartecipanti: 30,
      tipo: "Run",
      difficolta: "Media",
      km: 180,
      immagine: "/api/placeholder/400/250"
    },
    {
      id: 2,
      titolo: "Raduno di Primavera",
      descrizione: "Il tradizionale raduno primaverile con benedizione delle moto e pranzo sociale.",
      data: "2024-04-20",
      ora: "10:00",
      luogo: "Cosenza, Villa Comunale",
      partecipanti: 40,
      maxPartecipanti: 50,
      tipo: "Raduno",
      difficolta: "Facile",
      km: 0,
      immagine: "/api/placeholder/400/250"
    },
    {
      id: 3,
      titolo: "Benedizione delle Moto",
      descrizione: "Evento spirituale con benedizione delle motociclette presso il santuario storico.",
      data: "2024-05-01",
      ora: "11:00",
      luogo: "Santuario di Capo Colonna, Crotone",
      partecipanti: 60,
      maxPartecipanti: 80,
      tipo: "Evento Speciale",
      difficolta: "Facile",
      km: 120,
      immagine: "/api/placeholder/400/250"
    },
    {
      id: 4,
      titolo: "Tour della Sila",
      descrizione: "Esplorazione della Sila Grande con sosta nei borghi storici e degustazione prodotti locali.",
      data: "2024-06-15",
      ora: "08:30",
      luogo: "Camigliatello Silano",
      partecipanti: 20,
      maxPartecipanti: 25,
      tipo: "Run",
      difficolta: "Difficile",
      km: 250,
      immagine: "/api/placeholder/400/250"
    },
    {
      id: 5,
      titolo: "Notte Bianca delle Harley",
      descrizione: "Evento notturno con parata illuminata attraverso il centro storico di Reggio Calabria.",
      data: "2024-07-20",
      ora: "20:00",
      luogo: "Reggio Calabria, Lungomare",
      partecipanti: 35,
      maxPartecipanti: 40,
      tipo: "Evento Speciale",
      difficolta: "Facile",
      km: 50,
      immagine: "/api/placeholder/400/250"
    },
    {
      id: 6,
      titolo: "Run dell'Aspromonte",
      descrizione: "Percorso panoramico attraverso l'Aspromonte con vista sullo Stretto di Messina.",
      data: "2024-08-25",
      ora: "09:00",
      luogo: "Gambarie - Santo Stefano",
      partecipanti: 18,
      maxPartecipanti: 22,
      tipo: "Run",
      difficolta: "Difficile",
      km: 200,
      immagine: "/api/placeholder/400/250"
    }
  ];

  const getTipoBadgeVariant = (tipo: string) => {
    switch (tipo) {
      case 'Run': return 'default';
      case 'Raduno': return 'secondary';
      case 'Evento Speciale': return 'outline';
      default: return 'default';
    }
  };

  const getDifficoltaColor = (difficolta: string) => {
    switch (difficolta) {
      case 'Facile': return 'text-green-500';
      case 'Media': return 'text-yellow-500';
      case 'Difficile': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const eventiFiltrati = eventi.filter(evento => {
    const matchTipo = filtroTipo === 'tutti' || evento.tipo === filtroTipo;
    const matchSearch = evento.titolo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       evento.luogo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchTipo && matchSearch;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-oswald font-bold text-foreground mb-4">
            Eventi e Raduni
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Scopri tutti i nostri eventi, run e raduni programmati. 
            Unisciti a noi per vivere l'emozione della strada!
          </p>
        </div>

        {/* Filtri */}
        <div className="mb-8 bg-card rounded-lg p-6 border border-primary/20">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Filter className="text-primary" size={20} />
              <span className="font-medium text-foreground">Filtri:</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Cerca eventi o luoghi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Tipo evento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tutti">Tutti i tipi</SelectItem>
                  <SelectItem value="Run">Run</SelectItem>
                  <SelectItem value="Raduno">Raduno</SelectItem>
                  <SelectItem value="Evento Speciale">Evento Speciale</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Lista Eventi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {eventiFiltrati.map((evento) => (
            <Card key={evento.id} className="bg-card border-primary/20 hover:shadow-glow transition-smooth group overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-secondary to-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 left-4">
                  <Badge 
                    variant={getTipoBadgeVariant(evento.tipo)}
                    className="bg-primary/90 text-primary-foreground border-primary/30 backdrop-blur-sm"
                  >
                    {evento.tipo}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 bg-black/70 rounded-lg px-3 py-1 backdrop-blur-sm">
                  <div className="text-white text-sm font-medium">
                    {new Date(evento.data).toLocaleDateString('it-IT', { 
                      day: 'numeric', 
                      month: 'short' 
                    })}
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-oswald font-semibold text-foreground mb-2 group-hover:text-primary transition-smooth">
                  {evento.titolo}
                </h3>
                
                <p className="text-muted-foreground mb-4 text-sm">
                  {evento.descrizione}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar size={16} className="text-primary" />
                      <span>{new Date(evento.data).toLocaleDateString('it-IT')}</span>
                      <Clock size={16} className="text-primary ml-2" />
                      <span>{evento.ora}</span>
                    </div>
                    <span className={`text-sm font-medium ${getDifficoltaColor(evento.difficolta)}`}>
                      {evento.difficolta}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin size={16} className="text-primary" />
                    <span className="text-muted-foreground">{evento.luogo}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm">
                      <Users size={16} className="text-primary" />
                      <span className="text-muted-foreground">
                        {evento.partecipanti}/{evento.maxPartecipanti} partecipanti
                      </span>
                    </div>
                    {evento.km > 0 && (
                      <span className="text-sm text-muted-foreground">
                        {evento.km} km
                      </span>
                    )}
                  </div>

                  <div className="w-full bg-secondary rounded-full h-2 mt-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-smooth"
                      style={{ width: `${(evento.partecipanti / evento.maxPartecipanti) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button className="flex-1 btn-harley" size="sm">
                    Dettagli
                  </Button>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" size="sm">
                    Partecipa
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {eventiFiltrati.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏍️</div>
            <h3 className="text-xl font-oswald font-semibold text-foreground mb-2">
              Nessun evento trovato
            </h3>
            <p className="text-muted-foreground">
              Prova a modificare i filtri di ricerca
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventiPage;