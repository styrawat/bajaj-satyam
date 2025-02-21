import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { data } = await req.json();

    if (!Array.isArray(data)) {
      return NextResponse.json({ is_success: false, message: "Invalid input" }, { status: 400 });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestAlphabet = alphabets.sort().slice(-1);

    return NextResponse.json({
      is_success: true,
      user_id: "Satyam_Kumar_Rawat_10122002",
      email: "satyamrawat636@gmail.com",
      roll_number: "22BCS14274",
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet
    });
  } catch (error) {
    return NextResponse.json({ is_success: false, message: "Server Error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ operation_code: 1 });
}
