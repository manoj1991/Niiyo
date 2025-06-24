import { NextRequest, NextResponse } from 'next/server';

let fakeData = {
  name: "John Doe",
  bio: "Developer",
  email: "john@example.com",
  phone: "1234567890",
  location: "Earth"
};

export async function GET() {
  return NextResponse.json(fakeData);
}


export async function PUT(req: NextRequest) {
  const updated = await req.json();
  fakeData = updated;
  return NextResponse.json({ success: true });
}
