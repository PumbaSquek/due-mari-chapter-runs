import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AuthPage = () => {
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [codiceFiscale, setCodiceFiscale] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);
  
  const { signIn, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !isLoading) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { error } = await signIn(loginIdentifier, loginPassword);
    
    if (!error) {
      navigate('/');
    }
    
    setIsSubmitting(false);
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('pending_registrations' as any)
        .insert({
          first_name: firstName,
          last_name: lastName,
          codice_fiscale: codiceFiscale.toUpperCase()
        });
      
      if (error) {
        toast({
          title: "Errore durante la registrazione",
          description: error.message,
          variant: "destructive"
        });
      } else {
        setRegistrationSubmitted(true);
        toast({
          title: "Richiesta inviata!",
          description: "La tua richiesta di registrazione è stata inviata. Riceverai una conferma quando sarà approvata dall'amministratore."
        });
      }
    } catch (error: any) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore imprevisto",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="w-full max-w-md space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Torna alla Home
        </Button>

        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-harley-gradient rounded-xl mx-auto flex items-center justify-center shadow-glow">
            <span className="text-2xl font-bold text-primary-foreground">D</span>
          </div>
          <h1 className="text-2xl font-oswald font-bold text-primary">Due Mari Chapter</h1>
          <p className="text-muted-foreground">Harley Davidson • Calabria</p>
        </div>

        <Card className="shadow-metal border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-oswald">Accesso Riservato</CardTitle>
            <CardDescription>
              Accedi al tuo account o registrati per unirti al chapter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Accedi</TabsTrigger>
                <TabsTrigger value="signup">Registrati</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-identifier">Codice Fiscale / Username Admin</Label>
                    <Input
                      id="login-identifier"
                      type="text"
                      placeholder="Inserisci il tuo codice fiscale o 'admin'"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full btn-harley"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Accesso in corso...
                      </>
                    ) : (
                      'Accedi'
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                {registrationSubmitted ? (
                  <div className="text-center space-y-4">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Richiesta Inviata!</h3>
                      <p className="text-muted-foreground">
                        La tua richiesta di registrazione è stata inviata con successo. 
                        Un amministratore la esaminerà e riceverai una conferma quando sarà approvata.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setRegistrationSubmitted(false);
                        setFirstName('');
                        setLastName('');
                        setCodiceFiscale('');
                      }}
                    >
                      Invia un'altra richiesta
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleRegistration} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">Nome *</Label>
                        <Input
                          id="first-name"
                          placeholder="Mario"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Cognome *</Label>
                        <Input
                          id="last-name"
                          placeholder="Rossi"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="codice-fiscale">Codice Fiscale *</Label>
                      <Input
                        id="codice-fiscale"
                        placeholder="RSSMRA80A01H501Z"
                        value={codiceFiscale}
                        onChange={(e) => setCodiceFiscale(e.target.value.toUpperCase())}
                        maxLength={16}
                        required
                        disabled={isSubmitting}
                        className="uppercase"
                      />
                      <p className="text-xs text-muted-foreground">
                        Il codice fiscale verrà utilizzato per identificarti nel sistema
                      </p>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
                      <p className="font-medium mb-1">⚠️ Importante:</p>
                      <p>
                        La registrazione richiede l'approvazione dell'amministratore. 
                        Riceverai una notifica quando la tua richiesta sarà esaminata.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full btn-harley"
                      disabled={isSubmitting || !firstName || !lastName || !codiceFiscale}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Invio richiesta...
                        </>
                      ) : (
                        'Invia Richiesta di Registrazione'
                      )}
                    </Button>
                  </form>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;