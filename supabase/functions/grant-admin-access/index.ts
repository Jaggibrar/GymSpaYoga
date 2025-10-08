import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get current user (caller)
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user: caller } } = await supabase.auth.getUser(token);

    if (!caller) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // SECURITY: Check if caller is already a super admin
    const { data: callerPerms } = await supabase
      .from('admin_permissions')
      .select('permissions')
      .eq('user_id', caller.id)
      .maybeSingle();

    if (!callerPerms || !callerPerms.permissions?.includes('super_admin')) {
      console.error('Unauthorized admin grant attempt by:', caller.email);
      return new Response(JSON.stringify({ error: 'Forbidden: Only super admins can grant admin access' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Get target user email from request body
    const { targetEmail } = await req.json();
    
    if (!targetEmail) {
      return new Response(JSON.stringify({ error: 'Target email is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Find target user by email
    const { data: { users }, error: userError } = await supabase.auth.admin.listUsers();
    const targetUser = users?.find(u => u.email === targetEmail);

    if (!targetUser) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Grant admin access to target user
    const { data, error } = await supabase
      .from('admin_permissions')
      .insert({
        user_id: targetUser.id,
        role: 'super_admin',
        permissions: ['view_dashboard', 'manage_listings', 'manage_users', 'manage_payments', 'manage_content', 'view_analytics', 'super_admin']
      })
      .select()
      .single();

    if (error) {
      // If user already has permissions, update them
      const { data: updateData, error: updateError } = await supabase
        .from('admin_permissions')
        .update({
          role: 'super_admin',
          permissions: ['view_dashboard', 'manage_listings', 'manage_users', 'manage_payments', 'manage_content', 'view_analytics', 'super_admin']
        })
        .eq('user_id', targetUser.id)
        .select()
        .single();

      if (updateError) {
        console.error('Error granting admin access:', updateError);
        return new Response(JSON.stringify({ error: updateError.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Log the admin grant
      await supabase.rpc('log_admin_action', {
        p_event_type: 'admin_granted',
        p_event_data: { granted_to: targetUser.email, granted_by: caller.email }
      });

      return new Response(JSON.stringify({ 
        success: true, 
        message: `Admin permissions updated for ${targetEmail}`,
        data: updateData 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Log the admin grant
    await supabase.rpc('log_admin_action', {
      p_event_type: 'admin_granted',
      p_event_data: { granted_to: targetUser.email, granted_by: caller.email }
    });

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Admin access granted to ${targetEmail}`,
      data 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});