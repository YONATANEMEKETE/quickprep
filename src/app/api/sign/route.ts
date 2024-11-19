import { pinata } from '@/lib/pinata';
import { type NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const url = pinata.gateways.createSignedURL({
      cid: data.cid,
      expires: 60,
    });
    console.log(url);
    return NextResponse.json(url, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { text: 'Error creating API Key:' },
      { status: 500 }
    );
  }
}
