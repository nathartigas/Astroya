import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const scriptUrl = "https://script.google.com/macros/s/AKfycbxaZppD3aW2CLNCnRZesZvpqJogGHxqvxmcSNO8Ipp5M65rThEP82n4zun35fN1KBZ-/exec";

    // Envie todos os dados recebidos para o Apps Script
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body.data),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Erro ao processar consultoria:', error);
    return NextResponse.json({ message: 'Erro interno no servidor' }, { status: 500 });
  }
}