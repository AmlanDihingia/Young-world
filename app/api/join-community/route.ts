import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, whatsapp, age, city, country, reason, communityName, communitySlug } = body;

    if (!name || !email || !whatsapp || !age || !city || !country || !reason || !communityName) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 });
    }

    const supabase = await createClient();

    // 1. Attempt to store in Supabase table
    try {
      const { error: dbError } = await supabase
        .from('community_join_requests')
        .insert({
          community_name: communityName,
          community_slug: communitySlug,
          full_name: name,
          email: email,
          whatsapp_number: whatsapp,
          age: String(age),
          city: city,
          country: country,
          reason: reason,
        });

      if (dbError) {
        console.warn('Note: Could not insert into community_join_requests table:', dbError.message);
      }
    } catch (dbErr) {
      console.warn('Database insert warning:', dbErr);
    }

    // 2. Send notification email via Resend if configured
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Young World <noreply@youngworld.life>',
          to: 'admin@youngworld.life',
          subject: `New Join Request for ${communityName}: ${name}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
              <h2 style="color: #c49232; margin-bottom: 8px;">New Community Membership Request</h2>
              <p>Someone submitted a request to join <strong>${communityName}</strong>.</p>
              
              <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 150px;">Name:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${name}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">WhatsApp:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><a href="https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}">${whatsapp}</a></td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Age:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${age}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Location:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${city}, ${country}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; vertical-align: top;">Why Join:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${reason}</td></tr>
              </table>
            </div>
          `,
        });
      } catch (emailErr) {
        console.warn('Email notification warning:', emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Join community error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
