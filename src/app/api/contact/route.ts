import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();
    
    // Here you would typically integrate with an email service like SendGrid, Mailgun, etc.
    console.log('Contact form submission:', { name, email, message });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: 'Error processing contact form' }, { status: 500 });
  }
} 