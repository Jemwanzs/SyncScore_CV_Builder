import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { activateUser, getCurrentUser, renewAccess } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle } from 'lucide-react';

export default function Activation() {
  const [activationCode, setActivationCode] = useState('');
  const [newMpesaCode, setNewMpesaCode] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = getCurrentUser();

  const handleActivation = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = activateUser(activationCode);
    
    if (result.success) {
      toast({
        title: 'Account Activated!',
        description: 'You now have 3 downloads available',
      });
      navigate('/');
    } else {
      toast({
        title: 'Activation Failed',
        description: result.error,
        variant: 'destructive'
      });
    }
  };


  const handleRenewalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMpesaCode.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter your MPESA code',
        variant: 'destructive'
      });
      return;
    }
    
    const result = renewAccess(newMpesaCode);
    
    if (result.success) {
      toast({
        title: 'Renewal Submitted!',
        description: 'Your payment is under review. Please call 0798993404 for activation.',
      });
      setNewMpesaCode('');
    } else {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive'
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
        <Card className="w-full max-w-md p-8 text-center border-primary/20">
          <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Not Logged In</h1>
          <p className="text-muted-foreground mb-4">Login to activate your A/c</p>
          <Button onClick={() => navigate('/login')}>Go to Login</Button>
        </Card>
      </div>
    );
  }

  if (user.isActivated) {
    // If user has exhausted downloads, show renewal option
    if (user.downloadsRemaining <= 0) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
          <Card className="w-full max-w-md p-8 border-primary/20">
            <h1 className="text-3xl font-bold mb-2 text-primary">Renew Access</h1>
            <p className="text-muted-foreground mb-6">
              Downloads exhausted! Pay again to continue.
            </p>
            
            <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <h3 className="font-semibold mb-2">Payment Instructions:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Send <strong>KSH 250</strong> to MPESA number: <strong className="text-primary">0798993404</strong></li>
                <li>Account Name: <strong>James Sammy</strong></li>
                <li>Call <strong>0798993404</strong> for email activation</li>
                <li>Enter your MPESA payment code below</li>
              </ol>
            </div>
            
            <form onSubmit={handleRenewalSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mpesa">MPESA Payment Code</Label>
                <Input
                  id="mpesa"
                  type="text"
                  value={newMpesaCode}
                  onChange={(e) => setNewMpesaCode(e.target.value.toUpperCase())}
                  required
                  placeholder="e.g., QGT4M8XYZ"
                  className="font-mono"
                />
              </div>
              
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Submit & Request Activation
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate('/')}
              >
                Back to CV Builder
              </Button>
            </form>
          </Card>
        </div>
      );
    }
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
        <Card className="w-full max-w-md p-8 text-center border-primary/20">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Already Activated</h1>
          <p className="text-muted-foreground mb-4">Your account is active!</p>
          <Button onClick={() => navigate('/')}>Back to CV Builder</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Navigation Bar */}
      <nav className="bg-[hsl(var(--primary))] border-b border-border/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary-foreground">SyncScore_Cv</h1>
            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => navigate('/')}
              >
                Back to CV Builder
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Secondary Toolbar */}
      <div className="bg-card/50 backdrop-blur-sm border-b border-border/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide">Account Activation</span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              User: <strong>{user.email}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center p-8 min-h-[calc(100vh-180px)]">
        <Card className="w-full max-w-md p-8 border-primary/20 shadow-xl">
          <h1 className="text-3xl font-bold mb-2 text-primary">Activate Account</h1>
          <p className="text-muted-foreground mb-6">
            Enter activation code issued by your admin
          </p>
        
        {user.mpesaCode && (
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Your MPESA Payment Code:</p>
            <p className="font-mono font-semibold">{user.mpesaCode}</p>
          </div>
        )}
        
        <form onSubmit={handleActivation} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Activation Code</Label>
            <Input
              id="code"
              type="text"
              value={activationCode}
              onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
              required
              placeholder="XXXXXX"
              className="text-center text-lg tracking-widest font-mono"
            />
          </div>
          
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Activate Account
          </Button>
        </form>
        </Card>
      </div>
    </div>
  );
}
