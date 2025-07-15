import { useState } from 'react';
import { Search, MapPin, Calendar, Crown, Star, Shield, Bike } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const MembriPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const membri = [
    {
      id: 1,
      nome: "Marco",
      cognome: "Rossi",
      nickname: "Iron Horse",
      ruolo: "Presidente",
      citta: "Reggio Calabria",
      moto: "Street Glide",
      annoUnione: 2018,
      km: 25000,
      avatar: "/api/placeholder/100/100",
      badge: "founder"
    },
    {
      id: 2,
      nome: "Giuseppe",
      cognome: "Bianchi",
      nickname: "Thunder",
      ruolo: "Vice Presidente",
      citta: "Cosenza",
      moto: "Road King",
      annoUnione: 2019,
      km: 22000,
      avatar: "/api/placeholder/100/100",
      badge: "officer"
    },
    {
      id: 3,
      nome: "Antonio",
      cognome: "Verdi",
      nickname: "Rebel",
      ruolo: "Road Captain",
      citta: "Catanzaro",
      moto: "Fat Boy",
      annoUnione: 2020,
      km: 18000,
      avatar: "/api/placeholder/100/100",
      badge: "officer"
    },
    {
      id: 4,
      nome: "Francesco",
      cognome: "Neri",
      nickname: "Rider",
      ruolo: "Segretario",
      citta: "Crotone",
      moto: "Sportster 883",
      annoUnione: 2020,
      km: 15000,
      avatar: "/api/placeholder/100/100",
      badge: "member"
    },
    {
      id: 5,
      nome: "Luigi",
      cognome: "Ferrari",
      nickname: "Eagle",
      ruolo: "Tesoriere",
      citta: "Tropea",
      moto: "Heritage Classic",
      annoUnione: 2021,
      km: 12000,
      avatar: "/api/placeholder/100/100",
      badge: "member"
    },
    {
      id: 6,
      nome: "Salvatore",
      cognome: "Greco",
      nickname: "Storm",
      ruolo: "Membro",
      citta: "Lamezia Terme",
      moto: "Iron 883",
      annoUnione: 2022,
      km: 8000,
      avatar: "/api/placeholder/100/100",
      badge: "member"
    },
    {
      id: 7,
      nome: "Roberto",
      cognome: "Romano",
      nickname: "Wolf",
      ruolo: "Membro",
      citta: "Vibo Valentia",
      moto: "Street Bob",
      annoUnione: 2022,
      km: 9500,
      avatar: "/api/placeholder/100/100",
      badge: "member"
    },
    {
      id: 8,
      nome: "Michele",
      cognome: "Costa",
      nickname: "Phoenix",
      ruolo: "Membro",
      citta: "Paola",
      moto: "Low Rider",
      annoUnione: 2023,
      km: 6000,
      avatar: "/api/placeholder/100/100",
      badge: "new"
    }
  ];

  const getRuoloIcon = (ruolo: string) => {
    switch (ruolo) {
      case 'Presidente': return Crown;
      case 'Vice Presidente': return Star;
      case 'Road Captain': return Shield;
      case 'Segretario': return Star;
      case 'Tesoriere': return Star;
      default: return Bike;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'founder': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'officer': return 'bg-gradient-to-r from-blue-500 to-purple-500';
      case 'new': return 'bg-gradient-to-r from-green-500 to-emerald-500';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const membrifiltrati = membri.filter(membro => {
    const searchLower = searchTerm.toLowerCase();
    return (
      membro.nome.toLowerCase().includes(searchLower) ||
      membro.cognome.toLowerCase().includes(searchLower) ||
      membro.nickname.toLowerCase().includes(searchLower) ||
      membro.citta.toLowerCase().includes(searchLower) ||
      membro.moto.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-oswald font-bold text-foreground mb-4">
            I Nostri Membri
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conosci la famiglia del Due Mari Chapter. Ogni membro porta con sé 
            storie uniche e la passione condivisa per le Harley Davidson.
          </p>
        </div>

        {/* Statistiche Capitolo */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-secondary to-card border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-oswald font-bold text-primary mb-1">
                {membri.length}
              </div>
              <div className="text-sm text-muted-foreground">Membri Totali</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-secondary to-card border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-oswald font-bold text-primary mb-1">
                {new Date().getFullYear() - 2018}
              </div>
              <div className="text-sm text-muted-foreground">Anni di Storia</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-secondary to-card border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-oswald font-bold text-primary mb-1">
                {Math.round(membri.reduce((acc, m) => acc + m.km, 0) / 1000)}K
              </div>
              <div className="text-sm text-muted-foreground">Km Totali</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-secondary to-card border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-oswald font-bold text-primary mb-1">
                5
              </div>
              <div className="text-sm text-muted-foreground">Province</div>
            </CardContent>
          </Card>
        </div>

        {/* Barra di Ricerca */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Cerca membri per nome, nickname, città o moto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card border-primary/20"
            />
          </div>
        </div>

        {/* Griglia Membri */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {membrifiltrati.map((membro) => {
            const RuoloIcon = getRuoloIcon(membro.ruolo);
            return (
              <Card key={membro.id} className="bg-card border-primary/20 hover:shadow-glow transition-smooth group overflow-hidden">
                <CardContent className="p-6">
                  {/* Avatar e Badge */}
                  <div className="relative flex justify-center mb-4">
                    <div className="relative">
                      <Avatar className="w-20 h-20 border-2 border-primary/30">
                        <AvatarImage src={membro.avatar} alt={membro.nome} />
                        <AvatarFallback className="bg-secondary text-foreground font-bold text-lg">
                          {membro.nome[0]}{membro.cognome[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full ${getBadgeColor(membro.badge)} flex items-center justify-center shadow-lg`}>
                        <RuoloIcon size={16} className="text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Info Principale */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-oswald font-bold text-foreground group-hover:text-primary transition-smooth">
                      {membro.nome} {membro.cognome}
                    </h3>
                    <p className="text-primary font-medium">"{membro.nickname}"</p>
                    <Badge variant="outline" className="mt-1 border-primary/30 text-primary">
                      {membro.ruolo}
                    </Badge>
                  </div>

                  {/* Dettagli */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MapPin size={14} className="text-primary" />
                        <span className="text-muted-foreground">{membro.citta}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bike size={14} className="text-primary" />
                        <span className="text-muted-foreground">{membro.moto}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar size={14} className="text-primary" />
                        <span className="text-muted-foreground">Dal {membro.annoUnione}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Km Percorsi:</span>
                        <span className="font-semibold text-primary">{membro.km.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Badge Esperienza */}
                  <div className="mt-4 text-center">
                    {membro.badge === 'founder' && (
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                        🏆 Fondatore
                      </Badge>
                    )}
                    {membro.badge === 'officer' && (
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                        ⭐ Ufficiale
                      </Badge>
                    )}
                    {membro.badge === 'new' && (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                        🆕 Nuovo Membro
                      </Badge>
                    )}
                    {membro.badge === 'member' && (
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        🏍️ Membro Attivo
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {membrifiltrati.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-oswald font-semibold text-foreground mb-2">
              Nessun membro trovato
            </h3>
            <p className="text-muted-foreground">
              Prova a modificare il termine di ricerca
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-secondary to-card rounded-lg p-8">
          <h2 className="text-3xl font-oswald font-bold text-foreground mb-4">
            Vuoi Unirti a Noi?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Se possiedi una Harley Davidson e condividi i nostri valori di fratellanza, 
            rispetto e passione per la strada, saremo felici di conoscerti.
          </p>
          <div className="text-sm text-muted-foreground mb-4">
            "La strada non finisce mai per chi ha il cuore di un motociclista"
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembriPage;