// Traductions FR / EN / DE — portées telles quelles depuis le prototype
// funkyselfie-final-v9.html (objet `const t`). Anglais en orthographe britannique,
// allemand en termes suisses alémaniques (validés par Déborah).

export type Lang = "fr" | "en" | "de";

export type Translation = {
  promoBanner: string;
  heroBadge: string;
  heroTitle: string; // contient du HTML (<em>)
  heroSub: string;
  heroBtn1: string;
  heroBtn2: string;
  trust1: string;
  trust2: string;
  trust3: string;
  trust4: string;
  formulesLabel: string;
  formulesTitle: string;
  formulesPromo: string; // contient le placeholder {pct}
  formulesSub: string; // sous-titre neutre (promo inactive)
  formuleFrom: string;
  formulePop: string;
  basicName: string;
  basicTag: string;
  premiumName: string;
  premiumTag: string;
  prestigeName: string;
  prestigeTag: string;
  chooseBtn: string;
  commentLabel: string;
  commentTitle: string;
  commentSub: string;
  s1t: string; s1d: string;
  s2t: string; s2d: string;
  s3t: string; s3d: string;
  s4t: string; s4d: string;
  s5t: string; s5d: string;
  s6t: string; s6d: string;
  printsLabel: string;
  printsTitle: string;
  printsSub: string;
  pourquoiLabel: string;
  pourquoiTitle: string;
  b1t: string; b1d: string;
  b2: string;
  b3t: string; b3d: string;
  b4t: string; b4d: string;
  b5: string;
  b6t: string; b6d: string;
  eventsLabel: string;
  eventsTitle: string;
  contactLabel: string;
  contactTitle: string;
  contactSub: string;
  contactNote: string;
  contactBtn: string;
  footerBtn1: string;
  footerBtn2: string;
  cookieText: string; // contient du HTML (<a>)
  cookieAccept: string;
  cookieRefuse: string;
  navLink1: string;
  navLink2: string;
  navLink3: string;
  navLink4: string;
  reserveBtn: string;
  featLabel: string;
  featTitle: string;
  features: { t: string; d: string }[];
  faqLabel: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
  eventCards: { tag: string; desc: string }[];
};

export const translations: Record<Lang, Translation> = {
  fr: {
    promoBanner: "🎉 OFFRE DU MOIS — {pct}% DE RÉDUCTION SUR TOUTES LES FORMULES",
    heroBadge: "Disponible partout en Suisse",
    heroTitle: "Faites de votre événement, <em>celui dont tout le monde parle !</em>",
    heroSub: "Location de photobooth en Suisse. Livré, installé, géré de A à Z. Vos invités repartent avec leurs photos.",
    heroBtn1: "Voir les formules →",
    heroBtn2: "▶ Comment ça marche",
    trust1: "Devis sous 48h", trust2: "Sans engagement", trust3: "Pick-up gratuit", trust4: "100% personnalisable",
    formulesLabel: "Nos formules",
    formulesTitle: "Une formule pour chaque événement",
    formulesPromo: "{pct}% de réduction appliqués ce mois-ci.",
    formulesSub: "Votre total est calculé en temps réel.",
    formuleFrom: "À partir de",
    formulePop: "POPULAIRE",
    basicName: "Basic", basicTag: "L'essentiel pour une belle soirée.",
    premiumName: "Premium", premiumTag: "Votre marque sur chaque photo.",
    prestigeName: "Prestige", prestigeTag: "Tout sur mesure. Zéro compromis.",
    chooseBtn: "Choisir",
    commentLabel: "Comment ça marche",
    commentTitle: "Simple. Rapide. Sans stress.",
    commentSub: "De la réservation au jour J, on vous accompagne à chaque étape.",
    s1t: "Choisissez votre formule", s1d: "Basic, Premium ou Prestige",
    s2t: "Personnalisez", s2d: "Options et format photo. Prix en temps réel.",
    s3t: "Indiquez votre date", s3d: "3 champs seulement. Rapide.",
    s4t: "Recevez votre devis", s4d: "Sous 48h. Prix ferme, sans surprise.",
    s5t: "Confirmez", s5d: "Acompte 50% pour bloquer votre date.",
    s6t: "Jour J", s6d: "On arrive, on installe. Vous profitez.",
    printsLabel: "Vos souvenirs",
    printsTitle: "Ne partez pas les mains vides",
    printsSub: "Une impression instantanée en quelques secondes.",
    pourquoiLabel: "Pourquoi FunkySelfie",
    pourquoiTitle: "On s'occupe de tout",
    b1t: "Zéro effort de votre côté", b1d: "Livraison, installation et reprise.",
    b2: "Devis garanti",
    b3t: "Votre image, sur chaque photo", b3d: "Logo, couleurs, cadre personnalisé.",
    b4t: "Partagé en un clic", b4d: "Impression instantanée, QR Code, AirDrop ou email.",
    b5: "Sur mesure, de A à Z",
    b6t: "Toute la Suisse", b6d: "Pick-up gratuit à Bienne ou livraison partout en Suisse.",
    eventsLabel: "Pour tous vos événements",
    eventsTitle: "Un photobooth pour chaque occasion",
    contactLabel: "Une question ?",
    contactTitle: "Nous sommes là pour vous",
    contactSub: "Écrivez-nous. Nous répondons sous 48h, sans engagement.",
    contactNote: "Réponse sous 48h · Devis gratuit · Aucun engagement",
    contactBtn: "Envoyer un message",
    footerBtn1: "Voir les formules →",
    footerBtn2: "✉ hello@funkyselfie.ch",
    cookieText: '🍪 Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre <a href="/privacy">politique de confidentialité</a>.',
    cookieAccept: "Accepter", cookieRefuse: "Refuser",
    navLink1: "Formules", navLink2: "Pourquoi nous", navLink3: "Comment ça marche", navLink4: "Contact",
    reserveBtn: "Réserver →",
    featLabel: "Notre photobooth",
    featTitle: "Le Funky",
    features: [
      { t: "Une caméra qui ne rate rien", d: "Notre photobooth est équipé d'un appareil photo reflex professionnel et d'un flash puissant. Même dans les salles sombres, chaque visage ressort net, lumineux et naturel." },
      { t: "Des impressions de qualité studio", d: "Notre imprimante professionnelle produit des tirages sublimation haute définition, résistants à l'eau et aux rayures. Une qualité digne des grands photographes, en quelques secondes." },
      { t: "Partage digital instantané", d: "QR Code, AirDrop ou email. Vos invités reçoivent leur photo sur smartphone en un clic." },
      { t: "Galerie cloud privée", d: "Toutes les photos sont sauvegardées et accessibles en ligne. Partagez le lien à vos invités après l'événement." },
    ],
    faqLabel: "FAQ",
    faqTitle: "Les questions qu'on nous pose souvent",
    faqs: [
      { q: "Combien de temps faut-il pour installer le photobooth ?", a: "On arrive 30 à 45 minutes avant le début de votre événement. L'installation est rapide et discrète — quand vos invités arrivent, tout est prêt." },
      { q: "Que se passe-t-il si je dois annuler ou changer de date ?", a: "Pas de panique. Un changement de date est possible sans frais si vous nous prévenez plus de 14 jours avant. En cas d'annulation, l'acompte de 50% est retenu mais le reste vous est remboursé intégralement." },
      { q: "Le déplacement est-il inclus dans le prix ?", a: "Le pick-up gratuit est disponible à Bienne. Pour une livraison sur site, un forfait de CHF 1.00/km A/R depuis Bienne est appliqué — sans surprise, calculé à l'avance dans votre devis." },
      { q: "Peut-on mettre notre logo sur les photos ?", a: "Oui, dès la formule Premium. Votre logo apparaît sur chaque impression et dans la galerie digitale. Envoyez-nous simplement votre fichier et on s'occupe de tout." },
    ],
    eventCards: [
      { tag: "Baby Shower", desc: "Naissances & célébrations" },
      { tag: "Anniversaire", desc: "Fêtes d'enfants" },
      { tag: "Mariage", desc: "Cérémonie & réception" },
      { tag: "Fête privée", desc: "Soirées entre amis" },
      { tag: "Team Building", desc: "Cohésion d'équipe" },
      { tag: "Corporate", desc: "Soirées d'entreprise" },
      { tag: "Club & Soirée", desc: "Ambiance nocturne" },
      { tag: "Bar & Lounge", desc: "Événements festifs" },
      { tag: "Lancement Produit", desc: "Événements professionnels" },
    ],
  },
  en: {
    promoBanner: "🎉 MONTHLY OFFER — {pct}% OFF ALL PACKAGES",
    heroBadge: "Available across Switzerland",
    heroTitle: "Make your event <em>the one everyone talks about!</em>",
    heroSub: "Photobooth hire in Switzerland. Delivered, installed and managed from start to finish. Your guests leave with their photos in hand.",
    heroBtn1: "View packages →",
    heroBtn2: "▶ How it works",
    trust1: "Quote within 48h", trust2: "No commitment", trust3: "Free pick-up", trust4: "100% customisable",
    formulesLabel: "Our packages",
    formulesTitle: "A package for every event",
    formulesPromo: "{pct}% discount applied this month.",
    formulesSub: "Your total is calculated in real time.",
    formuleFrom: "From",
    formulePop: "POPULAR",
    basicName: "Basic", basicTag: "Everything you need for a brilliant evening.",
    premiumName: "Premium", premiumTag: "Your brand on every single photo.",
    prestigeName: "Prestige", prestigeTag: "Fully bespoke. Absolutely no compromise.",
    chooseBtn: "Choose",
    commentLabel: "How it works",
    commentTitle: "Simple. Straightforward. Stress-free.",
    commentSub: "From your first enquiry to the big day, we take care of every detail.",
    s1t: "Choose your package", s1d: "Basic, Premium or Prestige",
    s2t: "Personalise", s2d: "Photo options and format. Pricing updated live.",
    s3t: "Set your date", s3d: "Just 3 fields. That's it.",
    s4t: "Receive your quote", s4d: "Within 48h. Fixed price, no hidden costs.",
    s5t: "Confirm", s5d: "50% deposit to secure your date.",
    s6t: "The big day", s6d: "We arrive, we set up. You sit back and enjoy.",
    printsLabel: "Your memories",
    printsTitle: "Don't leave empty-handed",
    printsSub: "An instant print in your hands within seconds.",
    pourquoiLabel: "Why FunkySelfie",
    pourquoiTitle: "We handle absolutely everything",
    b1t: "No effort required from you", b1d: "Delivery, installation and collection.",
    b2: "Quote guaranteed",
    b3t: "Your brand on every photo", b3d: "Logo, colours and a custom frame.",
    b4t: "Shared in one tap", b4d: "Instant print, QR code, AirDrop or email.",
    b5: "Fully bespoke, from start to finish",
    b6t: "Across all of Switzerland", b6d: "Free pick-up in Biel or delivered to your venue anywhere in Switzerland.",
    eventsLabel: "For every kind of event",
    eventsTitle: "A photobooth for every occasion",
    contactLabel: "Got a question?",
    contactTitle: "We've got you covered",
    contactSub: "Drop us a message. We'll get back to you within 48 hours, no strings attached.",
    contactNote: "Reply within 48h · Free quote · No commitment",
    contactBtn: "Send us a message",
    footerBtn1: "View packages →",
    footerBtn2: "✉ hello@funkyselfie.ch",
    cookieText: '🍪 We use cookies to improve your experience on our site. By continuing to browse, you agree to our <a href="/privacy">privacy policy</a>.',
    cookieAccept: "Accept", cookieRefuse: "Decline",
    navLink1: "Packages", navLink2: "Why us", navLink3: "How it works", navLink4: "Contact",
    reserveBtn: "Book now →",
    featLabel: "Our photobooth",
    featTitle: "The Funky",
    features: [
      { t: "A camera that misses nothing", d: "Our photobooth is fitted with a professional DSLR and a powerful flash. Even in dark venues, every face comes out sharp, bright and natural." },
      { t: "Studio-quality prints", d: "Our professional printer produces high-definition dye-sublimation prints, water and scratch resistant. Photographer-grade quality, in seconds." },
      { t: "Instant digital sharing", d: "QR code, AirDrop or email. Guests receive their photo on their phone in one tap." },
      { t: "Private cloud gallery", d: "All photos are saved and accessible online. Share the link with your guests after the event." },
    ],
    faqLabel: "FAQ",
    faqTitle: "Questions we get asked a lot",
    faqs: [
      { q: "How long does it take to set up the photobooth?", a: "We arrive 30 to 45 minutes before your event starts. Installation is quick and discreet — by the time your guests arrive, everything is ready." },
      { q: "What if I need to cancel or change the date?", a: "No need to worry. A date change is possible free of charge with more than 14 days' notice. In case of cancellation, the 50% deposit is retained but the remainder is fully refunded." },
      { q: "Is travel included in the price?", a: "Free pick-up is available in Biel. For on-site delivery, a fee of CHF 1.00/km return from Biel applies — no surprises, calculated upfront in your quote." },
      { q: "Can we put our logo on the photos?", a: "Yes, from the Premium package onwards. Your logo appears on every print and in the digital gallery. Simply send us your file and we take care of the rest." },
    ],
    eventCards: [
      { tag: "Baby Shower", desc: "Births & celebrations" },
      { tag: "Birthday", desc: "Children's parties" },
      { tag: "Wedding", desc: "Ceremony & reception" },
      { tag: "Private party", desc: "Evenings with friends" },
      { tag: "Team Building", desc: "Team bonding" },
      { tag: "Corporate", desc: "Corporate events" },
      { tag: "Club & Night out", desc: "Night out vibes" },
      { tag: "Bar & Lounge", desc: "Festive events" },
      { tag: "Product Launch", desc: "Professional events" },
    ],
  },
  de: {
    promoBanner: "🎉 MONATSANGEBOT — {pct}% RABATT AUF ALLE PAKETE",
    heroBadge: "In der ganzen Schweiz verfügbar",
    heroTitle: "Machen Sie Ihr Event <em>zu dem, über das alle sprechen!</em>",
    heroSub: "Photobooth-Vermietung in der Schweiz. Geliefert, installiert und von A bis Z betreut. Ihre Gäste gehen mit ihren Fotos nach Hause.",
    heroBtn1: "Pakete ansehen →",
    heroBtn2: "▶ So funktioniert es",
    trust1: "Offerte in 48h", trust2: "Unverbindlich", trust3: "Kostenlose Abholung", trust4: "100% individuell",
    formulesLabel: "Unsere Pakete",
    formulesTitle: "Ein Paket für jeden Anlass",
    formulesPromo: "{pct}% Rabatt – nur diesen Monat.",
    formulesSub: "Ihr Gesamtpreis wird in Echtzeit berechnet.",
    formuleFrom: "Ab",
    formulePop: "BELIEBT",
    basicName: "Basic", basicTag: "Das Wesentliche für einen gelungenen Abend.",
    premiumName: "Premium", premiumTag: "Ihre Marke auf jedem Foto.",
    prestigeName: "Prestige", prestigeTag: "Alles massgeschneidert. Ohne Kompromisse.",
    chooseBtn: "Auswählen",
    commentLabel: "So funktioniert es",
    commentTitle: "Einfach. Schnell. Stressfrei.",
    commentSub: "Von der Buchung bis zum grossen Tag sind wir an Ihrer Seite.",
    s1t: "Paket auswählen", s1d: "Basic, Premium oder Prestige",
    s2t: "Personalisieren", s2d: "Optionen und Fotoformat wählen. Preis in Echtzeit.",
    s3t: "Datum angeben", s3d: "Nur 3 Felder. Dauert eine Minute.",
    s4t: "Offerte erhalten", s4d: "Innert 48h. Fester Preis, keine versteckten Kosten.",
    s5t: "Bestätigen", s5d: "50% Anzahlung zur Reservierung Ihres Datums.",
    s6t: "Der grosse Tag", s6d: "Wir kommen, bauen alles auf. Sie geniessen.",
    printsLabel: "Ihre Erinnerungen",
    printsTitle: "Nehmen Sie eine Erinnerung mit nach Hause",
    printsSub: "Ein Sofortdruck in wenigen Sekunden.",
    pourquoiLabel: "Warum FunkySelfie",
    pourquoiTitle: "Wir kümmern uns um alles",
    b1t: "Kein Aufwand für Sie", b1d: "Lieferung, Aufbau und Abbau.",
    b2: "Offerte garantiert",
    b3t: "Ihr Brand auf jedem Foto", b3d: "Logo, Farben und ein personalisierter Rahmen.",
    b4t: "Mit einem Klick geteilt", b4d: "Sofortdruck, QR-Code, AirDrop oder E-Mail.",
    b5: "Massgeschneidert, von A bis Z",
    b6t: "Ganze Schweiz", b6d: "Kostenlose Abholung in Biel oder Lieferung direkt an Ihren Veranstaltungsort.",
    eventsLabel: "Für jeden Anlass",
    eventsTitle: "Ein Photobooth für jeden Anlass",
    contactLabel: "Eine Frage?",
    contactTitle: "Wir sind gerne für Sie da",
    contactSub: "Schreiben Sie uns. Wir antworten innert 48 Stunden – unverbindlich.",
    contactNote: "Antwort innert 48h · Kostenlose Offerte · Unverbindlich",
    contactBtn: "Nachricht senden",
    footerBtn1: "Pakete ansehen →",
    footerBtn2: "✉ hello@funkyselfie.ch",
    cookieText: '🍪 Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. Mit der weiteren Nutzung stimmen Sie unserer <a href="/privacy">Datenschutzerklärung</a> zu.',
    cookieAccept: "Annehmen", cookieRefuse: "Ablehnen",
    navLink1: "Pakete", navLink2: "Warum wir", navLink3: "So funktioniert es", navLink4: "Kontakt",
    reserveBtn: "Buchen →",
    featLabel: "Unser Photobooth",
    featTitle: "Der Funky",
    features: [
      { t: "Eine Kamera, die nichts verpasst", d: "Unser Photobooth ist mit einer professionellen Spiegelreflexkamera und einem leistungsstarken Blitz ausgestattet. Selbst in dunklen Räumen kommt jedes Gesicht scharf, hell und natürlich heraus." },
      { t: "Drucke in Studioqualität", d: "Unser professioneller Drucker produziert hochauflösende Dye-Sublimations-Ausdrucke, wasser- und kratzfest. Fotografenqualität — in wenigen Sekunden." },
      { t: "Sofortiges digitales Teilen", d: "QR-Code, AirDrop oder E-Mail. Gäste erhalten ihr Foto mit einem Klick auf dem Smartphone." },
      { t: "Private Cloud-Galerie", d: "Alle Fotos werden gespeichert und sind online abrufbar. Teilen Sie den Link nach dem Anlass mit Ihren Gästen." },
    ],
    faqLabel: "FAQ",
    faqTitle: "Häufig gestellte Fragen",
    faqs: [
      { q: "Wie lange dauert der Aufbau des Photobooths?", a: "Wir kommen 30 bis 45 Minuten vor Beginn Ihres Events. Der Aufbau ist schnell und diskret — wenn Ihre Gäste eintreffen, ist alles bereit." },
      { q: "Was passiert, wenn ich absagen oder das Datum ändern muss?", a: "Kein Problem. Eine Datumsänderung ist kostenlos möglich, wenn Sie uns mehr als 14 Tage im Voraus informieren. Bei einer Absage wird die Anzahlung von 50% einbehalten, der Rest wird vollständig zurückerstattet." },
      { q: "Sind die Fahrtkosten im Preis inbegriffen?", a: "Die kostenlose Abholung ist in Biel möglich. Für eine Lieferung vor Ort wird eine Pauschale von CHF 1.00/km Hin- und Rückfahrt ab Biel berechnet — ohne Überraschungen, vorab im Angebot berechnet." },
      { q: "Können wir unser Logo auf die Fotos drucken?", a: "Ja, ab dem Premium-Paket. Ihr Logo erscheint auf jedem Ausdruck und in der digitalen Galerie. Schicken Sie uns einfach Ihre Datei — wir kümmern uns um alles." },
    ],
    eventCards: [
      { tag: "Baby Shower", desc: "Neugeborene & Feste" },
      { tag: "Geburtstagsfeier", desc: "Kindergeburtstage" },
      { tag: "Hochzeit", desc: "Zeremonie & Empfang" },
      { tag: "Private Feier", desc: "Abende mit Freunden" },
      { tag: "Team Building", desc: "Teamgeist stärken" },
      { tag: "Corporate", desc: "Firmenanlässe" },
      { tag: "Club & Nightlife", desc: "Nachtleben" },
      { tag: "Bar & Lounge", desc: "Festliche Anlässe" },
      { tag: "Produktlancierung", desc: "Professionelle Anlässe" },
    ],
  },
};
