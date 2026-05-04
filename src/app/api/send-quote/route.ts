import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const text = `Formule: ${data.formule}
Options: ${data.options}
Format: ${data.format}
Message photo: ${data.message}
Total estimé: ${data.total}
Date de l'événement: ${data.date}
Région: ${data.region}
Nom: ${data.nom || "—"}
Email: ${data.email}
Téléphone: ${data.telephone || "—"}

Envoyé depuis funkyselfie.ch`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[send-quote] RESEND_API_KEY non définie — email non envoyé");
    return NextResponse.json({ ok: false, error: "Configuration manquante" }, { status: 500 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "devis@funkyselfie.ch",
      to: ["hello@funkyselfy.ch"],
      subject: "Nouvelle demande de devis FunkySelfie",
      text,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("[send-quote] Erreur Resend", res.status, body);
    return NextResponse.json({ ok: false, error: body }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
