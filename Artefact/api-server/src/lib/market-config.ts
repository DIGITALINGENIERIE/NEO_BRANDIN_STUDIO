// ─── Market Configuration — Universal Market Adapter ─────────────────────────
// Maps any market/country to its local currency, logistics norms, payment methods,
// and economic context so every AI prompt is adapted to the right geography.

export interface MarketConfig {
  market: string;
  country: string;
  region: string;
  currency_code: string;
  currency_symbol: string;
  currency_name: string;
  rate_vs_eur: number;
  delivery_local_days: string;
  delivery_international_days: string;
  express_available: boolean;
  payment_methods: string[];
  platforms: string[];
  price_sensitivity: "low" | "medium" | "high";
  consumer_protection: string;
  logistics_context: string;
  market_context: string;
  language_note: string;
}

const MARKET_CONFIGS: Record<string, MarketConfig> = {
  // ── Afrique de l'Ouest ─────────────────────────────────────────────────────
  "cote-divoire": {
    market: "cote-divoire",
    country: "Côte d'Ivoire",
    region: "Afrique de l'Ouest",
    currency_code: "XOF",
    currency_symbol: "FCFA",
    currency_name: "Franc CFA Ouest-Africain",
    rate_vs_eur: 655.957,
    delivery_local_days: "2-4 jours ouvrés (Abidjan), 5-8 jours (reste du pays)",
    delivery_international_days: "7-14 jours ouvrés",
    express_available: true,
    payment_methods: ["Wave", "Orange Money", "MTN Money", "Moov Money", "virement bancaire", "paiement à la livraison"],
    platforms: ["Instagram", "TikTok", "WhatsApp", "Facebook"],
    price_sensitivity: "medium",
    consumer_protection: "Droit OHADA — délai de rétractation 7 jours recommandé pour l'e-commerce",
    logistics_context: "Livraison locale fiable à Abidjan. Inter-villes variable. Partenaires: Colissimo CI, TangaExpress, Jumia Logistics.",
    market_context: "Marché dynamique avec forte adoption du mobile money. TikTok et Instagram très actifs. WhatsApp Commerce en croissance.",
    language_note: "Français ivoirien — ton chaleureux, expressions locales appréciées",
  },
  "senegal": {
    market: "senegal",
    country: "Sénégal",
    region: "Afrique de l'Ouest",
    currency_code: "XOF",
    currency_symbol: "FCFA",
    currency_name: "Franc CFA Ouest-Africain",
    rate_vs_eur: 655.957,
    delivery_local_days: "2-4 jours ouvrés (Dakar), 5-8 jours (régions)",
    delivery_international_days: "7-14 jours ouvrés",
    express_available: true,
    payment_methods: ["Wave", "Orange Money", "Free Money", "virement bancaire", "paiement à la livraison"],
    platforms: ["Instagram", "TikTok", "WhatsApp", "Facebook"],
    price_sensitivity: "medium",
    consumer_protection: "Code de la Consommation sénégalais — délai légal 7 jours",
    logistics_context: "Livraison Dakar rapide. Régions plus lentes. DHL/Chronopost disponibles pour l'international.",
    market_context: "Économie en croissance. E-commerce en plein essor. Wave très populaire pour les paiements.",
    language_note: "Français avec ton dynamique et bienveillant",
  },
  "maroc": {
    market: "maroc",
    country: "Maroc",
    region: "Afrique du Nord",
    currency_code: "MAD",
    currency_symbol: "DH",
    currency_name: "Dirham marocain",
    rate_vs_eur: 10.8,
    delivery_local_days: "2-4 jours ouvrés (Casablanca/Rabat), 4-7 jours (autres villes)",
    delivery_international_days: "5-10 jours ouvrés",
    express_available: true,
    payment_methods: ["CMI", "carte bancaire (Visa/Mastercard)", "virement", "paiement à la livraison", "PayPal"],
    platforms: ["Instagram", "TikTok", "Facebook", "YouTube", "Pinterest"],
    price_sensitivity: "medium",
    consumer_protection: "Loi 31-08 sur la protection du consommateur — rétractation 7 jours",
    logistics_context: "Infrastructure logistique développée. Amana Express, Aramex, DHL bien implantés. Livraison à la livraison (COD) très répandue.",
    market_context: "Marché e-commerce mature. Consommateurs exigeants. Forte culture du luxe accessible. Casablanca hub économique.",
    language_note: "Français ou arabe — ton professionnel, références locales appréciées",
  },
  "nigeria": {
    market: "nigeria",
    country: "Nigeria",
    region: "Afrique de l'Ouest",
    currency_code: "NGN",
    currency_symbol: "₦",
    currency_name: "Naira nigérian",
    rate_vs_eur: 1720,
    delivery_local_days: "2-5 jours ouvrés (Lagos/Abuja), 5-10 jours (autres États)",
    delivery_international_days: "7-14 jours ouvrés",
    express_available: true,
    payment_methods: ["Flutterwave", "Paystack", "carte bancaire", "Bank Transfer", "POS à la livraison"],
    platforms: ["Instagram", "TikTok", "Twitter/X", "WhatsApp", "Facebook"],
    price_sensitivity: "high",
    consumer_protection: "Consumer Protection Council (CPC) — 7 jours recommandé",
    logistics_context: "Lagos est le hub logistique principal. GIG Logistics, Sendbox, DHL Express disponibles.",
    market_context: "Plus grand marché d'Afrique. Très forte culture lifestyle & fashion. Influenceurs très actifs. TikTok & Instagram essentiels.",
    language_note: "Anglais nigérian — ton énergique, direct, aspirationnel",
  },

  // ── Europe ──────────────────────────────────────────────────────────────────
  "france": {
    market: "france",
    country: "France",
    region: "Europe Occidentale",
    currency_code: "EUR",
    currency_symbol: "€",
    currency_name: "Euro",
    rate_vs_eur: 1,
    delivery_local_days: "2-3 jours ouvrés",
    delivery_international_days: "5-7 jours ouvrés (UE), 7-14 jours hors UE",
    express_available: true,
    payment_methods: ["Carte bancaire (CB/Visa/Mastercard)", "PayPal", "Apple Pay", "Google Pay", "virement SEPA", "Klarna/Alma"],
    platforms: ["Instagram", "TikTok", "Pinterest", "Facebook", "YouTube", "LinkedIn"],
    price_sensitivity: "low",
    consumer_protection: "Directive UE sur les droits des consommateurs — rétractation légale 14 jours, conformité 2 ans",
    logistics_context: "La Poste (Colissimo), Chronopost, UPS, DHL, Mondial Relay. Livraison en point relais très populaire.",
    market_context: "Marché mature et exigeant. Fort focus sur le luxe, le made-in-France et l'authenticité. ROAS moyen 2.5-4x.",
    language_note: "Français standard — ton élégant, précis, conformité UE obligatoire",
  },
  "belgique": {
    market: "belgique",
    country: "Belgique",
    region: "Europe Occidentale",
    currency_code: "EUR",
    currency_symbol: "€",
    currency_name: "Euro",
    rate_vs_eur: 1,
    delivery_local_days: "1-3 jours ouvrés",
    delivery_international_days: "3-5 jours ouvrés (UE)",
    express_available: true,
    payment_methods: ["Bancontact", "Carte bancaire", "PayPal", "Apple Pay", "virement SEPA"],
    platforms: ["Instagram", "Facebook", "TikTok", "Pinterest"],
    price_sensitivity: "low",
    consumer_protection: "Directive UE — rétractation 14 jours, garantie légale 2 ans",
    logistics_context: "bpost, DHL, UPS bien implantés. Point relais PostNL/Bpost populaires.",
    market_context: "Marché bilingue (français/néerlandais). Consommateurs prudents mais fidèles. E-commerce mature.",
    language_note: "Français belge — ton professionnel et bienveillant",
  },
  "suisse": {
    market: "suisse",
    country: "Suisse",
    region: "Europe Occidentale",
    currency_code: "CHF",
    currency_symbol: "CHF",
    currency_name: "Franc suisse",
    rate_vs_eur: 0.96,
    delivery_local_days: "1-3 jours ouvrés",
    delivery_international_days: "3-7 jours ouvrés",
    express_available: true,
    payment_methods: ["Twint", "Carte bancaire", "PostFinance", "PayPal", "Apple Pay"],
    platforms: ["Instagram", "LinkedIn", "Facebook", "TikTok"],
    price_sensitivity: "low",
    consumer_protection: "LCC suisse — rétractation 14 jours, haute exigence qualité",
    logistics_context: "Swiss Post, DHL, UPS. Excellente infrastructure. TVA à 8.1% à ajouter hors UE.",
    market_context: "Marché ultra-premium. Consommateurs à fort pouvoir d'achat. Qualité et fiabilité sont non-négociables.",
    language_note: "Français suisse — ton neutre, précis, qualité irréprochable",
  },
  "allemagne": {
    market: "allemagne",
    country: "Allemagne",
    region: "Europe Centrale",
    currency_code: "EUR",
    currency_symbol: "€",
    currency_name: "Euro",
    rate_vs_eur: 1,
    delivery_local_days: "1-3 jours ouvrés",
    delivery_international_days: "3-5 jours ouvrés (UE)",
    express_available: true,
    payment_methods: ["SEPA Lastschrift", "PayPal", "Klarna", "carte bancaire", "Sofort"],
    platforms: ["Instagram", "Pinterest", "YouTube", "TikTok", "Facebook"],
    price_sensitivity: "low",
    consumer_protection: "BGB allemand — rétractation 14 jours obligatoire, conformité stricte",
    logistics_context: "DHL, Hermes, DPD, UPS. Retours très fréquents (culture du retour très développée).",
    market_context: "Plus grand marché e-commerce européen. Consommateurs analytiques, qualité > prix. ROAS moyen 3-5x.",
    language_note: "Allemand — ton professionnel, factuel, précis (ou français si ciblé franco-allemand)",
  },

  // ── Amérique du Nord ────────────────────────────────────────────────────────
  "usa": {
    market: "usa",
    country: "États-Unis",
    region: "Amérique du Nord",
    currency_code: "USD",
    currency_symbol: "$",
    currency_name: "Dollar américain",
    rate_vs_eur: 1.08,
    delivery_local_days: "2-5 jours ouvrés (contiguous US)",
    delivery_international_days: "7-14 jours ouvrés",
    express_available: true,
    payment_methods: ["Stripe", "PayPal", "Apple Pay", "Google Pay", "Shop Pay", "Klarna", "Afterpay"],
    platforms: ["Instagram", "TikTok", "Pinterest", "YouTube", "Facebook", "Snapchat"],
    price_sensitivity: "low",
    consumer_protection: "FTC regulations — politique de retour standard 30 jours recommandée",
    logistics_context: "USPS, UPS, FedEx, ShipBob. Free shipping est un standard attendu à partir de 50-100$.",
    market_context: "Plus grand marché e-commerce mondial. Shopify dominant. Influenceurs très actifs. Black Friday/Cyber Monday essentiels.",
    language_note: "Anglais américain — ton direct, aspirationnel, focus sur les bénéfices (benefits-driven)",
  },
  "canada": {
    market: "canada",
    country: "Canada",
    region: "Amérique du Nord",
    currency_code: "CAD",
    currency_symbol: "CA$",
    currency_name: "Dollar canadien",
    rate_vs_eur: 1.46,
    delivery_local_days: "2-5 jours ouvrés",
    delivery_international_days: "7-14 jours ouvrés",
    express_available: true,
    payment_methods: ["Interac", "Stripe", "PayPal", "carte bancaire", "Apple Pay"],
    platforms: ["Instagram", "TikTok", "Pinterest", "Facebook", "YouTube"],
    price_sensitivity: "low",
    consumer_protection: "Loi sur la protection du consommateur — retour 14-30 jours selon province",
    logistics_context: "Canada Post, UPS, FedEx, Purolator. Livraison Quebec plus lente vers l'Ouest.",
    market_context: "Marché bilingue (anglais/français au Québec). Consommateurs sensibles à l'éthique et au développement durable.",
    language_note: "Anglais (ou français québécois) — ton bienveillant, inclusif",
  },

  // ── Moyen-Orient ────────────────────────────────────────────────────────────
  "emirats": {
    market: "emirats",
    country: "Émirats Arabes Unis",
    region: "Moyen-Orient",
    currency_code: "AED",
    currency_symbol: "AED",
    currency_name: "Dirham des Émirats",
    rate_vs_eur: 3.97,
    delivery_local_days: "1-3 jours ouvrés (Dubai/Abu Dhabi)",
    delivery_international_days: "5-10 jours ouvrés",
    express_available: true,
    payment_methods: ["Stripe", "carte bancaire", "Apple Pay", "COD (paiement à la livraison)", "tabby", "Tamara"],
    platforms: ["Instagram", "TikTok", "Snapchat", "YouTube", "LinkedIn"],
    price_sensitivity: "low",
    consumer_protection: "Loi UAE sur la protection du consommateur — 7 à 30 jours selon le produit",
    logistics_context: "Aramex, DHL, Fetchr très actifs. Livraison le jour même disponible à Dubai.",
    market_context: "Marché ultra-premium. Forte demande pour le luxe. Dubai Shopping Festival un événement clé. VAT 5%.",
    language_note: "Anglais ou arabe (selon cible) — ton luxe, exclusif, prestige",
  },

  // ── Asie ────────────────────────────────────────────────────────────────────
  "royaume-uni": {
    market: "royaume-uni",
    country: "Royaume-Uni",
    region: "Europe",
    currency_code: "GBP",
    currency_symbol: "£",
    currency_name: "Livre sterling",
    rate_vs_eur: 0.85,
    delivery_local_days: "1-3 jours ouvrés",
    delivery_international_days: "5-10 jours ouvrés",
    express_available: true,
    payment_methods: ["carte bancaire", "PayPal", "Apple Pay", "Klarna", "Clearpay", "Shop Pay"],
    platforms: ["Instagram", "TikTok", "Pinterest", "YouTube", "Facebook"],
    price_sensitivity: "low",
    consumer_protection: "UK Consumer Rights Act 2015 — rétractation 14 jours, conformité 6 ans",
    logistics_context: "Royal Mail, DHL, Hermes/Evri, DPD. Post-Brexit: droits de douane applicables depuis UE.",
    market_context: "Marché mature. Fashion très fort. Forte culture du cashback et des promotions. ROAS moyen 2.5-4x.",
    language_note: "Anglais britannique — ton poli, élégant, understatement apprécié",
  },
};

// ─── Default (generic international) ─────────────────────────────────────────
const DEFAULT_CONFIG: MarketConfig = {
  market: "international",
  country: "International",
  region: "Global",
  currency_code: "EUR",
  currency_symbol: "€",
  currency_name: "Euro",
  rate_vs_eur: 1,
  delivery_local_days: "3-7 jours ouvrés selon le pays",
  delivery_international_days: "7-21 jours ouvrés",
  express_available: true,
  payment_methods: ["carte bancaire (Visa/Mastercard)", "PayPal", "Apple Pay", "Google Pay"],
  platforms: ["Instagram", "TikTok", "Facebook", "YouTube"],
  price_sensitivity: "medium",
  consumer_protection: "Adaptez les délais de rétractation selon la législation locale du client",
  logistics_context: "DHL, UPS, FedEx disponibles pour la livraison internationale.",
  market_context: "Marché international — adapter les références culturelles et le contenu selon la cible finale.",
  language_note: "Français ou anglais selon la cible — ton universel et professionnel",
};

// ─── Main export ──────────────────────────────────────────────────────────────

export function getMarketConfig(market: string | undefined): MarketConfig {
  if (!market) return DEFAULT_CONFIG;
  return MARKET_CONFIGS[market.toLowerCase()] ?? DEFAULT_CONFIG;
}

export function buildMarketContext(config: MarketConfig): string {
  return `
CONTEXTE MARCHÉ — ${config.country} (${config.region}):
- Devise locale: ${config.currency_symbol} (${config.currency_code}) — utiliser EXCLUSIVEMENT cette devise pour tous les prix
- Livraison locale: ${config.delivery_local_days}
- Livraison internationale: ${config.delivery_international_days}
- Modes de paiement locaux: ${config.payment_methods.join(", ")}
- Plateformes prioritaires: ${config.platforms.join(", ")}
- Contexte logistique: ${config.logistics_context}
- Contexte marché: ${config.market_context}
- Protection consommateur: ${config.consumer_protection}
- Note linguistique: ${config.language_note}

⚠️ RÈGLE ABSOLUE DEVISE: Tous les montants doivent être en ${config.currency_symbol}. Ne JAMAIS afficher une autre devise sans mention explicite du taux de conversion. Si tu dois mentionner un prix en euros pour référence, ajoute toujours "(≈ X ${config.currency_symbol})" après.`.trim();
}

export function convertPrice(priceEur: number, config: MarketConfig): string {
  const converted = Math.round(priceEur * config.rate_vs_eur);
  if (config.currency_code === "EUR") return `${priceEur}${config.currency_symbol}`;
  if (config.currency_code === "XOF") {
    return `${converted.toLocaleString("fr-FR")} ${config.currency_symbol}`;
  }
  return `${converted.toLocaleString("fr-FR")} ${config.currency_symbol}`;
}
