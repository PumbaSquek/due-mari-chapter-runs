import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCheck, UserX, Clock, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface PendingRegistration {
  id: string;
  first_name: string;
  last_name: string;
  codice_fiscale: string;
  status: string;
  created_at: string;
  notes?: string;
}

const AdminDashboard = () => {
  const [pendingRegistrations, setPendingRegistrations] = useState<PendingRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  
  const { toast } = useToast();
  const { isAdmin, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (!isAdmin) {
      navigate('/');
      return;
    }
    
    fetchPendingRegistrations();
  }, [user, isAdmin, navigate]);

  const fetchPendingRegistrations = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('pending_registrations' as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPendingRegistrations(data as any || []);
    } catch (error: any) {
      toast({
        title: "Errore",
        description: "Errore nel caricamento delle registrazioni",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (registrationId: string) => {
    try {
      setProcessingId(registrationId);
      
      const { error } = await (supabase as any).rpc('approve_registration', {
        registration_id: registrationId
      });

      if (error) throw error;

      toast({
        title: "Registrazione approvata",
        description: "L'utente è stato registrato con successo"
      });

      fetchPendingRegistrations();
    } catch (error: any) {
      toast({
        title: "Errore",
        description: error.message || "Errore nell'approvazione della registrazione",
        variant: "destructive"
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (registrationId: string) => {
    try {
      setProcessingId(registrationId);
      
      const { error } = await (supabase as any).rpc('reject_registration', {
        registration_id: registrationId,
        rejection_notes: 'Rifiutata dall\'amministratore'
      });

      if (error) throw error;

      toast({
        title: "Registrazione rifiutata",
        description: "La richiesta è stata rifiutata"
      });

      fetchPendingRegistrations();
    } catch (error: any) {
      toast({
        title: "Errore",
        description: error.message || "Errore nel rifiuto della registrazione",
        variant: "destructive"
      });
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600"><Clock className="w-3 h-3 mr-1" />In Attesa</Badge>;
      case 'approved':
        return <Badge variant="outline" className="text-green-600 border-green-600"><UserCheck className="w-3 h-3 mr-1" />Approvata</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-600"><UserX className="w-3 h-3 mr-1" />Rifiutata</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const pendingCount = pendingRegistrations.filter(r => r.status === 'pending').length;
  const approvedCount = pendingRegistrations.filter(r => r.status === 'approved').length;
  const rejectedCount = pendingRegistrations.filter(r => r.status === 'rejected').length;

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-oswald font-bold">Dashboard Amministratore</h1>
          <p className="text-muted-foreground">Gestione registrazioni membri Due Mari Chapter</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/')}>
          Torna alla Home
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Richieste in Attesa</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registrazioni Approvate</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registrazioni Rifiutate</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">In Attesa ({pendingCount})</TabsTrigger>
          <TabsTrigger value="processed">Elaborate ({approvedCount + rejectedCount})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4">
          {isLoading ? (
            <Card>
              <CardContent className="p-6">
                <div className="text-center">Caricamento...</div>
              </CardContent>
            </Card>
          ) : pendingRegistrations.filter(r => r.status === 'pending').length === 0 ? (
            <Card>
              <CardContent className="p-6">
                <div className="text-center text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nessuna richiesta di registrazione in attesa</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            pendingRegistrations
              .filter(r => r.status === 'pending')
              .map((registration) => (
                <Card key={registration.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {registration.first_name} {registration.last_name}
                        </CardTitle>
                        <CardDescription>
                          Codice Fiscale: {registration.codice_fiscale}
                        </CardDescription>
                      </div>
                      {getStatusBadge(registration.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Richiesta del: {formatDate(registration.created_at)}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 border-green-600 hover:bg-green-50"
                          onClick={() => handleApprove(registration.id)}
                          disabled={processingId === registration.id}
                        >
                          <UserCheck className="w-4 h-4 mr-1" />
                          Approva
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-600 hover:bg-red-50"
                          onClick={() => handleReject(registration.id)}
                          disabled={processingId === registration.id}
                        >
                          <UserX className="w-4 h-4 mr-1" />
                          Rifiuta
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>
        
        <TabsContent value="processed" className="space-y-4">
          {pendingRegistrations
            .filter(r => r.status !== 'pending')
            .map((registration) => (
              <Card key={registration.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {registration.first_name} {registration.last_name}
                      </CardTitle>
                      <CardDescription>
                        Codice Fiscale: {registration.codice_fiscale}
                      </CardDescription>
                    </div>
                    {getStatusBadge(registration.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Richiesta del: {formatDate(registration.created_at)}
                  </div>
                  {registration.notes && (
                    <div className="mt-2 text-sm">
                      <strong>Note:</strong> {registration.notes}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;