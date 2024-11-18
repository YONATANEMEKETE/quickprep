import { pinata } from '@/lib/pinata';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const url = pinata.gateways.createSignedURL({
      cid: data.cid,
      expires: 5000,
    });
    return NextResponse.json(url, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { text: 'Error creating API Key:' },
      { status: 500 }
    );
  }
}
