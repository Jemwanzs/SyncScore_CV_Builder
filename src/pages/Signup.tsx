import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { signup } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';


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
    
    // Validate all fields
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
        <Card className="w-full max-w-md p-8">
          <h1 className="text-3xl font-bold mb-2">MPESA Payment</h1>
          <p className="text-muted-foreground mb-6">
            Complete your payment to activate your account
          </p>
          
          <div className="space-y-6">
            <div className="bg-primary/10 border border-primary/20 p-5 rounded-lg">
              <p className="text-sm font-medium mb-3">Payment Instructions:</p>
              <ol className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="font-bold">1.</span>
                  <span>Send <strong className="text-primary">KSH 200</strong> via MPESA to:</span>
                </li>
                <li className="pl-5">
                  <p className="font-bold text-lg">James Sammy</p>
                  <p className="font-bold text-xl text-primary">0798993404</p>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">2.</span>
                  <span>Call <strong>0798993404</strong> for email activation</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">3.</span>
                  <span>Enter your MPESA payment code below</span>
                </li>
              </ol>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mpesaCode">MPESA Payment Code</Label>
              <Input
                id="mpesaCode"
                type="text"
                value={mpesaCode}
                onChange={(e) => setMpesaCode(e.target.value.toUpperCase())}
                placeholder="e.g., QA12BC3D4E"
                className="text-center text-lg tracking-wider font-mono"
                maxLength={10}
                required
              />
              <p className="text-xs text-muted-foreground">
                Enter the MPESA confirmation code
              </p>
            </div>

            <div className="space-y-2">
              <Button 
                onClick={handlePaymentSubmit} 
                className="w-full"
                disabled={isSubmitting || !mpesaCode.trim() || mpesaCode.length < 8}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Payment Code'}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Your MPESA code will be verified by admin. You'll receive an activation shortly.
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-3xl font-bold mb-2">Create Account</h1>
        <p className="text-muted-foreground mb-6">Sign up to start creating your CV</p>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
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
              className={emailError ? 'border-destructive' : ''}
            />
            {emailError && (
              <p className="text-sm text-destructive">{emailError}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password (min. 6 characters)</Label>
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
              className={passwordError ? 'border-destructive' : ''}
            />
            {passwordError && (
              <p className="text-sm text-destructive">{passwordError}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
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
              className={confirmPasswordError ? 'border-destructive' : ''}
            />
            {confirmPasswordError && (
              <p className="text-sm text-destructive">{confirmPasswordError}</p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={!!emailError || !!passwordError || !!confirmPasswordError || !email || !password || !confirmPassword}
          >
            Continue to Payment
          </Button>
          
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Button
              variant="link"
              className="p-0 h-auto"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </p>
          <p className="text-center text-sm text-muted-foreground">
            Call +254798993404
          </p>
        </form>
      </Card>
    </div>
  );
}
