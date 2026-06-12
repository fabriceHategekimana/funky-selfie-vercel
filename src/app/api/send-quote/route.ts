import { NextRequest, NextResponse } from "next/server";

const FROM = "devis@funkyselfie.ch";
const TO = "hello@funkyselfie.ch";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const internalText = `Formule: ${data.formule}
Options: ${data.options}
Format: ${data.format}
Message photo: ${data.message}
Remise: ${data.remise ?? "—"}
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

  const send = (payload: Record<string, unknown>) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

  // Email 1 — récapitulatif interne vers hello@funkyselfie.ch
  const res = await send({
    from: FROM,
    to: [TO],
    reply_to: data.email || undefined,
    subject: "Nouvelle demande de devis FunkySelfie",
    text: internalText,
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("[send-quote] Erreur Resend", res.status, body);
    return NextResponse.json({ ok: false, error: body }, { status: 500 });
  }

  // Email 2 — confirmation au client (best-effort, n'échoue pas la requête)
  if (data.email) {
    try {
      const confirmText = `Bonjour${data.nom ? " " + data.nom : ""},

Merci pour votre demande de devis FunkySelfie ! Voici le récapitulatif :

Formule: ${data.formule}
Options: ${data.options}
Format: ${data.format}
Total estimé: ${data.total}
Date de l'événement: ${data.date}
Région: ${data.region}

Nous revenons vers vous sous 48h avec votre devis complet et ferme.

À très bientôt,
L'équipe FunkySelfie
hello@funkyselfie.ch · funkyselfie.ch`;

      const confirm = await send({
        from: FROM,
        to: [data.email],
        subject: "Votre demande FunkySelfie a bien été reçue",
        text: confirmText,
      });
      if (!confirm.ok) {
        console.warn("[send-quote] Email de confirmation client non envoyé", confirm.status);
      }
    } catch (err) {
      console.warn("[send-quote] Email de confirmation client en erreur", err);
    }
  }

  return NextResponse.json({ ok: true });
}
