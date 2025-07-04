// Update the import path below to the correct location of your firebase-admin initialization file
import { db } from "@/lib/firebase-admin-init";
// If the file does not exist, create it or adjust the path as needed.

export async function GET() {
  // Lista todas as regras
  const snapshot = await db.collection("availability_rules").get();
  const rules = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return new Response(JSON.stringify(rules), { status: 200 });
}

export async function POST(request: Request) {
  // Adiciona ou atualiza uma regra
  const { date, available, horariosDisponiveis } = await request.json();
  await db.collection("availability_rules").doc(date).set({
    date,
    available,
    horariosDisponiveis: horariosDisponiveis || [],
  });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function DELETE(request: Request) {
  // Remove uma regra
  const { date } = await request.json();
  await db.collection("availability_rules").doc(date).delete();
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}