
// app/api/admin/availability/route.ts
import { db } from '@/lib/firebase-admin-init';
import { revalidatePath } from 'next/cache';

// ... rest of the code remains the same ...

export async function GET() {
  // Lista todas as regras
  const snapshot = await db.collection("availability_rules").get();
  const rules = snapshot.docs.map(doc => {
    const data = doc.data();
    const ruleValue = data.rule;
    let available = true;
    let horariosDisponiveis: string[] = [];

    if (ruleValue === 'UNAVAILABLE') {
      available = false;
      horariosDisponiveis = [];
    } else if (Array.isArray(ruleValue)) {
      available = true;
      horariosDisponiveis = ruleValue;
    }

    return {
      id: doc.id,
      date: doc.id,
      available,
      horariosDisponiveis,
      updatedAt: data.updatedAt,
      updatedBy: data.updatedBy,
    };
  });
  return new Response(JSON.stringify(rules), { status: 200 });
}

export async function POST(request: Request) {
  const { date, available, horariosDisponiveis } = await request.json();
  console.log("POST /api/admin/availability", { date, available, horariosDisponiveis });

  const ruleValue = available ? (horariosDisponiveis || []) : 'UNAVAILABLE';

  await db.collection("availability_rules").doc(date).set({
    rule: ruleValue,
    updatedAt: new Date().toISOString(),
  }, { merge: true });

  console.log("Regra salva no Firestore!");
  revalidatePath('/'); // Invalida o cache da página principal
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function DELETE(request: Request) {
  // Remove uma regra
  const { date } = await request.json();
  await db.collection("availability_rules").doc(date).delete();
  revalidatePath('/'); // Invalida o cache da página principal
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}