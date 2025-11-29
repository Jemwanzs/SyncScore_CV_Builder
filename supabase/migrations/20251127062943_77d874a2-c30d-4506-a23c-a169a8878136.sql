-- Create activation_codes table to store codes for user activation
CREATE TABLE public.activation_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  activation_code TEXT NOT NULL,
  mpesa_code TEXT,
  is_used BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  used_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.activation_codes ENABLE ROW LEVEL SECURITY;

-- Allow service role to manage all records (for admin operations)
CREATE POLICY "Service role can manage all activation codes"
ON public.activation_codes
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX idx_activation_codes_email ON public.activation_codes(user_email);
CREATE INDEX idx_activation_codes_code ON public.activation_codes(activation_code);