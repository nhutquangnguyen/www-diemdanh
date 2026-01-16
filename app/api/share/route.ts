import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { nanoid } from 'nanoid';
import QRCode from 'qrcode';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { staff, shifts, schedule, weekStart } = body;

    // Create Supabase client with service role key (bypasses RLS for server-side operations)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Validate input
    if (!staff || !shifts || !schedule || !weekStart) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate short ID (URL-safe, 8 characters)
    const shareId = nanoid(8);

    // Calculate expiration date (14 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 14);

    // Prepare schedule data to store
    const scheduleData = {
      staff: staff.map((s: any) => ({
        id: s.id,
        display_name: s.display_name
      })),
      shifts: shifts.map((s: any) => ({
        id: s.id,
        name: s.name,
        start_time: s.start_time,
        end_time: s.end_time,
        color: s.color
      })),
      assignments: schedule.assignments,
      stats: schedule.stats,
      warnings: schedule.warnings,
      staffHours: schedule.staffHours,
      staffShiftCount: schedule.staffShiftCount,
      weekStart
    };

    // Insert into database
    const { data, error } = await supabase
      .from('shared_schedules')
      .insert([
        {
          id: shareId,
          schedule_data: scheduleData,
          expires_at: expiresAt.toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create shared schedule' },
        { status: 500 }
      );
    }

    // Generate share URL
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001').trim();
    const shareUrl = `${siteUrl}/s/${shareId}`;

    // Generate QR code
    const qrCodeDataUrl = await QRCode.toDataURL(shareUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: '#1e40af', // Blue
        light: '#ffffff'
      }
    });

    return NextResponse.json({
      shareId,
      url: shareUrl,
      qrCode: qrCodeDataUrl,
      expiresAt: expiresAt.toISOString()
    });

  } catch (error) {
    console.error('Error creating shared schedule:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
