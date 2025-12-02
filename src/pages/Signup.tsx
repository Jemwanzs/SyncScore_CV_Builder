import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { signup } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { FloatingCVElements } from '@/components/auth/FloatingCVElements';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [mpesaCode, setMpesaCode] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
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

  const validatePassword = (pwd: string) => {
    if (!pwd) {
      setPasswordError('Password is required');
      return false;
    }
    if (pwd.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = (pwd: string) => {
    if (!pwd) {
      setConfirmPasswordError('Please confirm your password');
      return false;
    }
    if (pwd !== password) {
      setConfirmPasswordError('Passwords do not match');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
    
    if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      toast({
        title: 'Validation Error',
        description: 'Please fix all errors before continuing',
        variant: 'destructive'
      });
      return;
    }
    
    setShowPayment(true);
  };

  const handlePaymentSubmit = async () => {
    if (!mpesaCode.trim() || mpesaCode.length < 8) {
      toast({
        title: 'Invalid MPESA Code',
        description: 'Please enter a valid MPESA payment code (at least 8 characters)',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await signup(email, password, mpesaCode);
      
      if (result.success) {
        toast({
          title: 'Payment Submitted Successfully!',
          description: 'Your MPESA code has been sent to the admin. You will receive an activation code via email after verification.',
          duration: 6000,
        });
        
        navigate('/activation');
      } else {
        toast({
          title: 'Signup Failed',
          description: result.error,
          variant: 'destructive'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showPayment) {
    return (
      <div className="min-h-screen flex">
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-background via-primary/5 to-secondary/10">
          <Card className="w-full max-w-md p-8 shadow-2xl border-primary/20 backdrop-blur-sm bg-card/95">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                MPESA Payment
              </h1>
              <p className="text-muted-foreground">Activate by completing your payment!</p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 p-6 rounded-xl shadow-lg">
                <p className="text-sm font-bold mb-4 text-primary">Payment Instructions:</p>
                <ol className="space-y-3 text-sm">
                  <li className="flex gap-2 items-start">
                    <span className="font-bold text-primary flex-shrink-0">1.</span>
                    <span>Send <strong className="text-primary">KSH 250</strong> via MPESA to:</span>
                  </li>
                  <li className="pl-5 bg-white/50 p-3 rounded-lg">
                    <p className="font-bold text-base">James Sammy</p>
                    <p className="font-bold text-2xl text-primary">0798993404</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="font-bold text-primary flex-shrink-0">2.</span>
                    <span>Call <strong>0798993404</strong> for email activation</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="font-bold text-primary flex-shrink-0">3.</span>
                    <span>Enter MPESA payment code</span>
                  </li>
                </ol>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mpesaCode" className="text-sm font-semibold">MPESA Payment Code</Label>
                <Input
                  id="mpesaCode"
                  type="text"
                  value={mpesaCode}
                  onChange={(e) => setMpesaCode(e.target.value.toUpperCase())}
                  placeholder="e.g., QA12BC3D4E"
                  className="text-center text-lg tracking-wider font-mono h-12 border-primary/20 focus:border-primary"
                  maxLength={10}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Enter MPESA confirmation code you
                </p>
              </div>

              <Button 
                onClick={handlePaymentSubmit} 
                className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                disabled={isSubmitting || !mpesaCode.trim() || mpesaCode.length < 8}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Payment Code'}
              </Button>
            </div>
          </Card>
        </div>

        <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/5">
          <FloatingCVElements />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-background via-primary/5 to-secondary/10">
        <Card className="w-full max-w-md p-8 shadow-2xl border-primary/20 backdrop-blur-sm bg-card/95">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-muted-foreground">Start crafting your professional CV now</p>
          </div>
          
          <form onSubmit={handleSignup} className="space-y-5">
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
            <Label htmlFor="password" className="text-sm font-semibold">
              Password <span className="text-xs italic text-gray-500">(min. 6 characters)</span>
            </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) validatePassword(e.target.value);
                  if (confirmPassword && confirmPasswordError) {
                    setConfirmPasswordError(e.target.value !== confirmPassword ? 'Passwords do not match' : '');
                  }
                }}
                onBlur={(e) => validatePassword(e.target.value)}
                required
                placeholder="••••••••"
                className={`h-11 ${passwordError ? 'border-destructive' : 'border-primary/20 focus:border-primary'}`}
              />
              {passwordError && (
                <p className="text-sm text-destructive font-medium">{passwordError}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-semibold">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (confirmPasswordError) validateConfirmPassword(e.target.value);
                }}
                onBlur={(e) => validateConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
                className={`h-11 ${confirmPasswordError ? 'border-destructive' : 'border-primary/20 focus:border-primary'}`}
              />
              {confirmPasswordError && (
                <p className="text-sm text-destructive font-medium">{confirmPasswordError}</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              disabled={!!emailError || !!passwordError || !!confirmPasswordError || !email || !password || !confirmPassword}
            >
              Continue to Payment
            </Button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-primary/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Already registered?</span>
              </div>
            </div>
            
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 border-primary/20 hover:bg-primary/5"
              onClick={() => navigate('/login')}
            >
              Login to Existing Account
            </Button>
          </form>
        </Card>
      </div>

      <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/5">
        <FloatingCVElements />
      </div>
    </div>
  );
}