# Configuration Resend + Infomaniak + Vercel

Ce document décrit comment connecter Resend au domaine `funkyselfie.ch` hébergé sur Infomaniak, pour que les devis soient envoyés automatiquement à `hello@funkyselfie.ch`.

---

## Étape 1 — Obtenir ta clé API Resend

1. Connecte-toi sur [resend.com](https://resend.com)
2. Dans le menu à gauche, clique sur **API Keys**
3. Clique sur **Create API Key**
4. Donne-lui un nom (ex. `funkyselfie-prod`), laisse les permissions sur "Full access"
5. Copie la clé affichée — elle commence par `re_` et ne sera visible qu'une seule fois

---

## Étape 2 — Ajouter et vérifier le domaine dans Resend

1. Dans Resend, menu à gauche → **Domains**
2. Clique sur **Add Domain**
3. Saisis `funkyselfie.ch` et sélectionne la région **EU (Frankfurt)** (recommandé pour la Suisse)
4. Resend affiche une liste d'enregistrements DNS à ajouter — garde cette page ouverte

Tu vas recevoir 3 types d'enregistrements à configurer :

| Type  | Nom (Host)               | Valeur (Value)                        |
|-------|--------------------------|---------------------------------------|
| MX    | `send.funkyselfie.ch`    | `feedback-smtp.eu-east-1.amazonses.com` |
| TXT   | `resend._domainkey.funkyselfie.ch` | `p=MIGfMA0G...` (clé DKIM longue) |
| TXT   | `funkyselfie.ch`         | `v=spf1 include:amazonses.com ~all`   |

> Les valeurs exactes sont générées par Resend pour ton compte — utilise celles affichées sur leur interface, pas celles de ce tableau.

---

## Étape 3 — Ajouter les enregistrements DNS sur Infomaniak

1. Connecte-toi sur [manager.infomaniak.com](https://manager.infomaniak.com)
2. Dans le menu, va dans **Domaines** → clique sur `funkyselfie.ch`
3. Clique sur **Gérer** puis sur **Zone DNS**
4. Pour chaque enregistrement fourni par Resend, clique sur **Ajouter une entrée** et remplis les champs :

### Enregistrement MX

- **Type** : `MX`
- **Sous-domaine** : `send` (Infomaniak complète automatiquement avec `.funkyselfie.ch`)
- **Valeur** : la valeur MX fournie par Resend
- **Priorité** : `10`
- **TTL** : laisser la valeur par défaut

### Enregistrement DKIM (TXT)

- **Type** : `TXT`
- **Sous-domaine** : `resend._domainkey` (Infomaniak complète automatiquement)
- **Valeur** : colle la longue chaîne `p=MIGfMA0G...` fournie par Resend
- **TTL** : laisser la valeur par défaut

### Enregistrement SPF (TXT)

- **Type** : `TXT`
- **Sous-domaine** : laisser vide (ou `@` selon l'interface) — cela correspond au domaine racine
- **Valeur** : `v=spf1 include:amazonses.com ~all`
- **TTL** : laisser la valeur par défaut

> Si un enregistrement SPF existe déjà sur le domaine racine (ex. pour Google Workspace ou un autre service), ne crée pas une deuxième entrée TXT. Ajoute simplement `include:amazonses.com` à l'intérieur de la valeur existante, avant le `~all` final.

5. Sauvegarde chaque entrée

---

## Étape 4 — Vérifier la propagation DNS

La propagation DNS peut prendre entre **5 minutes et 48 heures**. En pratique avec Infomaniak, c'est souvent moins de 30 minutes.

1. Retourne sur Resend → **Domains**
2. Clique sur `funkyselfie.ch`
3. Clique sur **Verify DNS Records**
4. Quand les 3 enregistrements affichent une coche verte, le domaine est actif

Pour vérifier manuellement depuis un terminal :

```bash
# Vérifier le DKIM
dig TXT resend._domainkey.funkyselfie.ch

# Vérifier le SPF
dig TXT funkyselfie.ch
```

---

## Étape 5 — Ajouter la clé API dans les variables d'environnement

### En local

Crée un fichier `.env.local` à la racine du projet (s'il n'existe pas) :

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
```

Ce fichier est déjà ignoré par git (`.gitignore`). Ne jamais committer cette clé.

### Sur Vercel

1. Va sur [vercel.com](https://vercel.com) → ton projet `funky-selfie-vercel`
2. **Settings** → **Environment Variables**
3. Clique sur **Add**
4. Remplis :
   - **Key** : `RESEND_API_KEY`
   - **Value** : `re_xxxxxxxxxxxxxxxx`
   - **Environments** : coche Production, Preview et Development
5. Clique sur **Save**
6. **Redéploie le projet** pour que la variable soit prise en compte (Deployments → clic sur les 3 points → Redeploy)

---

## Étape 6 — Tester l'envoi

Une fois le domaine vérifié et la clé en place :

1. Lance le serveur local : `npm run dev`
2. Va sur le configurateur, choisis une formule, remplis le formulaire et envoie
3. Vérifie que `hello@funkyselfie.ch` reçoit bien l'email avec le sujet **"Nouvelle demande de devis FunkySelfie"**

En cas d'erreur, consulte Resend → **Emails** pour voir les logs d'envoi et le statut de chaque email.

---

## Récapitulatif

| Élément              | Valeur                          |
|----------------------|---------------------------------|
| Domaine expéditeur   | `devis@funkyselfie.ch`          |
| Destinataire         | `hello@funkyselfie.ch`          |
| Variable d'env       | `RESEND_API_KEY`                |
| Route API            | `src/app/api/send-quote/route.ts` |
| Région Resend        | EU (Frankfurt)                  |
