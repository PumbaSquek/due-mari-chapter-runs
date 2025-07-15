import { useState } from 'react';
import { Search, Calendar, MapPin, Users, Filter, Grid, List } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const GalleriaPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('tutte');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const albums = [
    {
      id: 1,
      titolo: "Run delle Due Coste 2024",
      descrizione: "Percorso mozzafiato da Tropea a Pizzo attraverso le montagne calabresi",
      data: "2024-03-15",
      luogo: "Tropea - Pizzo",
      categoria: "Run",
      partecipanti: 25,
      foto: 45,
      copertina: "/api/placeholder/400/300",
      highlights: ["Panorami mozzafiato", "Sosta a Pizzo", "Tramonto sul Tirreno"]
    },
    {
      id: 2,
      titolo: "Raduno di Primavera 2024",
      descrizione: "Il tradizionale raduno primaverile con benedizione delle moto",
      data: "2024-04-20",
      luogo: "Cosenza",
      categoria: "Raduno",
      partecipanti: 40,
      foto: 67,
      copertina: "/api/placeholder/400/300",
      highlights: ["Benedizione moto", "Pranzo sociale", "Esposizione Harley"]
    },
    {
      id: 3,
      titolo: "Tour della Sila 2023",
      descrizione: "Esplorazione della Sila Grande con i suoi paesaggi incontaminati",
      data: "2023-06-15",
      luogo: "Camigliatello Silano",
      categoria: "Run",
      partecipanti: 20,
      foto: 38,
      copertina: "/api/placeholder/400/300",
      highlights: ["Laghi silani", "Borghi storici", "Prodotti locali"]
    },
    {
      id: 4,
      titolo: "Benedizione delle Moto 2024",
      descrizione: "Momento spirituale presso il santuario di Capo Colonna",
      data: "2024-05-01",
      luogo: "Crotone",
      categoria: "Evento Speciale",
      partecipanti: 60,
      foto: 52,
      copertina: "/api/placeholder/400/300",
      highlights: ["Cerimonia religiosa", "Vista mare", "Unione spirituale"]
    },
    {
      id: 5,
      titolo: "Notte Bianca delle Harley 2023",
      descrizione: "Parata notturna illuminata attraverso Reggio Calabria",
      data: "2023-07-20",
      luogo: "Reggio Calabria",
      categoria: "Evento Speciale",
      partecipanti: 35,
      foto: 41,
      copertina: "/api/placeholder/400/300",
      highlights: ["Parata illuminata", "Lungomare", "Spettacolo notturno"]
    },
    {
      id: 6,
      titolo: "Run dell'Aspromonte 2023",
      descrizione: "Percorso panoramico con vista sullo Stretto di Messina",
      data: "2023-08-25",
      luogo: "Gambarie",
      categoria: "Run",
      partecipanti: 18,
      foto: 33,
      copertina: "/api/placeholder/400/300",
      highlights: ["Stretto di Messina", "Montagne", "Curve panoramiche"]
    },
    {
      id: 7,
      titolo: "Raduno Fondazione Chapter",
      descrizione: "Il primo raduno ufficiale del Due Mari Chapter nel 2018",
      data: "2018-09-15",
      luogo: "Reggio Calabria",
      categoria: "Storico",
      partecipanti: 12,
      foto: 28,
      copertina: "/api/placeholder/400/300",
      highlights: ["Primo raduno", "Fondazione", "Momento storico"]
    },
    {
      id: 8,
      titolo: "Meeting Interchapter 2023",
      descrizione: "Incontro con altri chapter del Sud Italia",
      data: "2023-10-14",
      luogo: "Lamezia Terme",
      categoria: "Meeting",
      partecipanti: 80,
      foto: 74,
      copertina: "/api/placeholder/400/300",
      highlights: ["Fraternità", "Scambio culturale", "Harley unite"]
    }
  ];

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'Run': return 'bg-primary/20 text-primary border-primary/30';
      case 'Raduno': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Evento Speciale': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Storico': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Meeting': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const albumsFiltrati = albums.filter(album => {
    const matchCategoria = filtroCategoria === 'tutte' || album.categoria === filtroCategoria;
    const matchSearch = album.titolo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       album.luogo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       album.descrizione.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategoria && matchSearch;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-oswald font-bold text-foreground mb-4">
            Galleria Fotografica
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Rivivi i momenti più belli del Due Mari Chapter attraverso le nostre foto. 
            Ogni immagine racconta una storia di passione e fratellanza.
          </p>
        </div>

        {/* Statistiche */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-secondary to-card border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-oswald font-bold text-primary mb-1">
                {albums.length}
              </div>
              <div className="text-sm text-muted-foreground">Album</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-secondary to-card border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-oswald font-bold text-primary mb-1">
                {albums.reduce((acc, album) => acc + album.foto, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Foto Totali</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-secondary to-card border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-oswald font-bold text-primary mb-1">
                {new Date().getFullYear() - 2018}
              </div>
              <div className="text-sm text-muted-foreground">Anni Documentati</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-secondary to-card border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-oswald font-bold text-primary mb-1">
                {albums.reduce((acc, album) => acc + album.partecipanti, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Partecipazioni</div>
            </CardContent>
          </Card>
        </div>

        {/* Controlli */}
        <div className="mb-8 bg-card rounded-lg p-6 border border-primary/20">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Cerca album, luoghi o eventi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tutte">Tutte le categorie</SelectItem>
                  <SelectItem value="Run">Run</SelectItem>
                  <SelectItem value="Raduno">Raduno</SelectItem>
                  <SelectItem value="Evento Speciale">Eventi Speciali</SelectItem>
                  <SelectItem value="Storico">Storici</SelectItem>
                  <SelectItem value="Meeting">Meeting</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-primary text-primary-foreground' : ''}
              >
                <Grid size={18} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-primary text-primary-foreground' : ''}
              >
                <List size={18} />
              </Button>
            </div>
          </div>
        </div>

        {/* Albums Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albumsFiltrati.map((album) => (
              <Card key={album.id} className="bg-card border-primary/20 hover:shadow-glow transition-smooth group overflow-hidden cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-secondary to-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-smooth"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className={getCategoriaColor(album.categoria)}>
                      {album.categoria}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/70 rounded-lg px-2 py-1 backdrop-blur-sm">
                    <span className="text-white text-sm font-medium">{album.foto} foto</span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-sm opacity-90">
                      {new Date(album.data).toLocaleDateString('it-IT')}
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-oswald font-semibold text-foreground mb-2 group-hover:text-primary transition-smooth">
                    {album.titolo}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 text-sm">
                    {album.descrizione}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin size={14} className="text-primary" />
                      <span className="text-muted-foreground">{album.luogo}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Users size={14} className="text-primary" />
                      <span className="text-muted-foreground">{album.partecipanti} partecipanti</span>
                    </div>
                  </div>

                  {album.highlights.length > 0 && (
                    <div className="mb-4">
                      <div className="text-xs text-muted-foreground mb-2">Highlights:</div>
                      <div className="flex flex-wrap gap-1">
                        {album.highlights.slice(0, 2).map((highlight, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-primary/30 text-primary">
                            {highlight}
                          </Badge>
                        ))}
                        {album.highlights.length > 2 && (
                          <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                            +{album.highlights.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <Button className="w-full btn-harley" size="sm">
                    Visualizza Album
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {albumsFiltrati.map((album) => (
              <Card key={album.id} className="bg-card border-primary/20 hover:shadow-glow transition-smooth group overflow-hidden cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-64 aspect-video bg-gradient-to-br from-secondary to-muted rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-smooth"></div>
                      <div className="absolute top-2 left-2">
                        <Badge className={`${getCategoriaColor(album.categoria)} text-xs`}>
                          {album.categoria}
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2 bg-black/70 rounded px-2 py-1 backdrop-blur-sm">
                        <span className="text-white text-xs">{album.foto} foto</span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-2xl font-oswald font-semibold text-foreground group-hover:text-primary transition-smooth">
                          {album.titolo}
                        </h3>
                        <div className="text-sm text-muted-foreground">
                          {new Date(album.data).toLocaleDateString('it-IT')}
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">
                        {album.descrizione}
                      </p>

                      <div className="flex flex-wrap gap-4 mb-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin size={16} className="text-primary" />
                          <span className="text-muted-foreground">{album.luogo}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users size={16} className="text-primary" />
                          <span className="text-muted-foreground">{album.partecipanti} partecipanti</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar size={16} className="text-primary" />
                          <span className="text-muted-foreground">{album.foto} foto</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {album.highlights.map((highlight, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-primary/30 text-primary">
                            {highlight}
                          </Badge>
                        ))}
                      </div>

                      <Button className="btn-harley">
                        Visualizza Album
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {albumsFiltrati.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-xl font-oswald font-semibold text-foreground mb-2">
              Nessun album trovato
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

export default GalleriaPage;