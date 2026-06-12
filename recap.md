# FunkySelfie — Récap de mise en ligne

État : **le brief est implémenté à 100 % côté code** (build + lint verts). Il ne reste que des éléments de configuration externes, listés ci-dessous.

---

## 1. Variables d'environnement Vercel

À configurer dans **Vercel → Project Settings → Environment Variables** (les `NEXT_PUBLIC_*` sont exposées au navigateur, les autres sont secrètes côté serveur).

| Variable | Valeur | Requis pour | Statut |
|---|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `ljtxweti` | CMS (déjà en place) | ✅ existe |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | CMS | ✅ existe |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2026-03-30` | CMS | ✅ existe |
| `SANITY_API_READ_TOKEN` | *(token de lecture Sanity)* | Live queries + lecture Promo | ✅ existe |
| `RESEND_API_KEY` | *(clé fournie par Déborah)* | **Envoi des devis (configurateur)** | ⚠️ à fournir |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Google Analytics 4 | ⚠️ à fournir (optionnel) |

**Notes :**
- Sans `RESEND_API_KEY` (+ domaine vérifié, voir §2), le formulaire du configurateur affiche une erreur à l'envoi. **Le site peut être en ligne sans GA4, mais le configurateur doit pouvoir envoyer.**
- Sans `NEXT_PUBLIC_GA_ID`, aucun tracking n'est chargé (le bandeau cookie reste fonctionnel). Dès que la variable est ajoutée, GA4 se charge **uniquement après acceptation** des cookies (conforme LPD).
- `NEXT_PUBLIC_SITE_URL` (mentionnée dans le brief) **n'est pas utilisée** : l'URL canonique `https://www.funkyselfie.ch` est codée en dur dans `layout.tsx`, `JsonLd.tsx`, `robots.ts`, `sitemap.ts`. Inutile de l'ajouter (ou la changer nécessite une édition de code).

---

## 2. Actions externes à faire (Déborah)

- [ ] **Resend** : créer la clé API → `RESEND_API_KEY`, et **vérifier le domaine `funkyselfie.ch`** dans Resend (sinon l'envoi depuis `devis@funkyselfie.ch` est refusé). Emails : récap interne → `hello@funkyselfie.ch`, confirmation → client.
- [ ] **Google Analytics 4** : créer la propriété sur analytics.google.com, récupérer le Measurement ID (`G-XXXXXXXXXX`) → `NEXT_PUBLIC_GA_ID`.
- [ ] **Google Search Console** : soumettre `https://www.funkyselfie.ch/sitemap.xml`.
- [ ] **Réseaux sociaux** : remplacer les URLs placeholder dans `src/components/Footer.tsx` (Instagram / TikTok / LinkedIn) par les vraies adresses.
- [ ] **Sanity Studio** (`/studio`) : corriger le titre Hero (« ?? » → « ! »).
- [ ] **Sanity Studio** : créer/configurer le document **Promo** (voir §3).
- [ ] **Tests multi-devices** (§9 du brief) : iPhone Safari, Android Chrome, iPad, Desktop Chrome/Safari/Firefox.

---

## 3. Piloter la promo (sans développeur)

Tout se passe dans **`/studio` → Promo** :

- **Promo activée** : interrupteur on/off.
- **Pourcentage** : ex. 10, 20, 25.
- **Date de début / fin** (optionnelles) : la promo s'active et s'éteint automatiquement à ces dates.
- **Libellé** : note interne (ex. « Offre de Noël »).

**Exemples :**
- *-10 % pendant une semaine* → activée=on, %=10, début=lundi, fin=dimanche. À la fin, tout revient au prix plein automatiquement.
- *-25 % pour Noël, préparée à l'avance* → activée=on, %=25, début=20 déc., fin=26 déc.
- *Couper la promo* → interrupteur sur off.

La remise s'applique automatiquement à la **bannière**, aux **cartes Formules** (prix barré + prix remisé + badge) et au **configurateur** (formule + options).

> ⚠️ **Important :** tant que le document Promo n'est pas créé, une remise **-20 % par défaut** reste affichée (= comportement actuel préservé). Un changement (manuel ou par date) se reflète sur le site **dans les ~30 minutes** (revalidation). Pour un effet immédiat, redéployer depuis Vercel.

---

## 4. Récap des sections livrées

| Section du brief | État |
|---|---|
| §1 Intégration prototype (10 sections, ordre figé) | ✅ |
| §2 Configurateur de réservation + remise | ✅ |
| §3 Corrections urgentes (textes, URL, © 2026) | ✅ (« ?? » Hero → à corriger dans Sanity) |
| §4 Sélecteur de langue FR / EN / DE | ✅ |
| §5 SEO (metas, JSON-LD, robots, canonical, og-image) | ✅ |
| §6 GA4 conditionnel + cookies LPD + /privacy | ✅ |
| §7 Performances (next/image, images < 200 Ko, polices locales) | ✅ |
| Système de promo configurable | ✅ (bonus) |

**Multilingue :** tout le site est traduit FR / EN / DE, y compris le configurateur. Le choix de langue est mémorisé (localStorage), site mono-URL.

**Commandes utiles :**
```bash
npm run dev     # prévisualiser sur http://localhost:3000
npm run build   # build de production (+ vérif TypeScript)
npm run lint    # ESLint
```
