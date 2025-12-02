import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { login, getCurrentUser } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { FloatingCVElements } from '@/components/auth/FloatingCVElements';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      return;
    }

    if (!password || password.length < 6) {
      toast({
        title: 'Invalid Password',
        description: 'Password must be at least 6 characters',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = login(email, password);
      
      if (result.success) {
        const user = getCurrentUser();
        
        toast({
          title: 'Login Successful',
          description: 'Welcome back!',
        });
        
        if (user && !user.isActivated) {
          navigate('/activation');
        } else {
          navigate('/');
        }
      } else {
        toast({
          title: 'Login Failed',
          description: result.error,
          variant: 'destructive'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-background via-primary/5 to-secondary/10">
        <Card className="w-full max-w-md p-8 shadow-2xl border-primary/20 backdrop-blur-sm bg-card/95">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">Login to craft your perfect CV</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) validateEmail(e.target.value);
                }}
                onBlur={(e) => validateEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className={`h-11 ${emailError ? 'border-destructive' : 'border-primary/20 focus:border-primary'}`}
              />
              {emailError && (
                <p className="text-sm text-destructive font-medium">{emailError}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="h-11 border-primary/20 focus:border-primary"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all" 
              disabled={isSubmitting || !!emailError || !email || !password}
            >
              {isSubmitting ? 'Logging in...' : 'Login to SyncScore_CV'}
            </Button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-primary/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">New here?</span>
              </div>
            </div>
            
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 border-primary/20 hover:bg-primary/5"
              onClick={() => navigate('/signup')}
            >
              Create New Account
            </Button>
          </form>
        </Card>
      </div>

      {/* Right side - Floating CV elements */}
      <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/5">
        <FloatingCVElements />
      </div>
    </div>
  );
}
