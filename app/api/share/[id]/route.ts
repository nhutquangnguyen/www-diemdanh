import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create Supabase client with service role key
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: shareId } = await params;

    // Fetch shared schedule from database
    const { data, error } = await supabase
      .from('shared_schedules')
      .select('*')
      .eq('id', shareId)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Schedule not found' },
        { status: 404 }
      );
    }

    // Check if expired
    const expiresAt = new Date(data.expires_at);
    if (expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'Schedule has expired' },
        { status: 410 } // 410 Gone
      );
    }

    // Increment view count
    await supabase
      .from('shared_schedules')
      .update({
        view_count: (data.view_count || 0) + 1,
        last_viewed_at: new Date().toISOString()
      })
      .eq('id', shareId);

    // Return schedule data
    return NextResponse.json({
      scheduleData: data.schedule_data,
      viewCount: (data.view_count || 0) + 1,
      createdAt: data.created_at,
      expiresAt: data.expires_at
    });

  } catch (error) {
    console.error('Error fetching shared schedule:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
