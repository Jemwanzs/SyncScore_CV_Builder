import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SignupNotificationRequest {
  userEmail: string;
  mpesaCode: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userEmail, mpesaCode }: SignupNotificationRequest = await req.json();

    console.log("Processing signup notification for:", userEmail);

    // Initialize Supabase client with service role key for admin operations
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Store payment information in database
    const { data: codeData, error: dbError } = await supabase
      .from("activation_codes")
      .insert({
        user_email: userEmail,
        activation_code: "JMS3056!",
        mpesa_code: mpesaCode,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Failed to store payment record: ${dbError.message}`);
    }

    console.log("Payment record stored successfully:", codeData.id);

    // Send email notification to admin
    const emailResponse = await resend.emails.send({
      from: "CV Builder <onboarding@resend.dev>",
      to: ["jms1kenya@gmail.com"],
      subject: "New User Signup - Payment Verification Required",
      html: `
        <h2>New User Signup Notification</h2>
        <p>A new user has signed up and requires payment verification.</p>
        
        <h3>User Details:</h3>
        <ul>
          <li><strong>Email:</strong> ${userEmail}</li>
          <li><strong>MPESA Code:</strong> ${mpesaCode}</li>
          <li><strong>Signup Time:</strong> ${new Date().toLocaleString()}</li>
        </ul>
        
        <h3>Activation Code to Share:</h3>
        <p style="font-size: 20px; font-weight: bold; color: #2563eb; background: #f3f4f6; padding: 15px; border-radius: 5px;">
          JMS3056!
        </p>
        
        <p><strong>Instructions:</strong></p>
        <ol>
          <li>Verify the MPESA payment of KSH 500 from ${userEmail}</li>
          <li>Call the user at 0798993404 to confirm their payment</li>
          <li>Provide them with the activation code: <strong>JMS3056!</strong></li>
        </ol>
        
        <hr style="margin: 20px 0;" />
        <p style="color: #6b7280; font-size: 12px;">
          This is an automated notification from CV Builder. Do not reply to this email.
        </p>
      `,
    });

    console.log("Admin notification email sent:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Payment submitted for verification",
        recordId: codeData.id 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in notify-admin-signup function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
