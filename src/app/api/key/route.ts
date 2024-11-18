import { pinata } from '@/lib/pinata';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET() {
  try {
    const uuid = crypto.randomUUID();
    const keyData = await pinata.keys.create({
      keyName: uuid.toString(),
      permissions: {
        admin: true,
      },
      maxUses: 1,
    });
    return NextResponse.json(keyData, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { text: 'Error creating API Key:' },
      { status: 500 }
    );
  }
}
