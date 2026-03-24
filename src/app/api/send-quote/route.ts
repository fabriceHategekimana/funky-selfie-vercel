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
Nom: ${data.nom}

Envoyé depuis funkyselfie.ch`;

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "devis@funkyselfie.ch",
        to: ["hello@funkyselfie.ch"],
        subject: "Nouvelle demande de devis FunkySelfie",
        text,
      }),
    });
  }

  return NextResponse.json({ ok: true });
}
