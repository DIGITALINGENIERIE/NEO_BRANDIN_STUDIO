import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface BrandBrief {
  // Identité (partagée par tous les modules)
  brand_name: string;
  sector: string;
  tone: string;
  values: string;

  // Produit (modules 02-09)
  product_name: string;
  product_description: string;
  product_features: string;
  product_colors: string;
  product_materials: string;
  benefits: string;
  target_audience: string;
  unique_feature: string;

  // Commerce (modules 04, 06, 07, 08, 09)
  price: string;
  old_price: string;
  discount: string;
  promo_code: string;
  product_price: string;
  margin_percent: string;
  shipping_info: string;
  free_shipping: string;
  checkout_url: string;
  stock: string;

  // SAV (module 08)
  delivery_days: string;
  express_delivery_days: string;
  express_price: string;
  return_days: string;
  warranty: string;
  support_email: string;
  best_seller_1: string;
  best_seller_2: string;

  // Visuel (modules 04, 07)
  primary_color: string;
  heading_font: string;
  body_font: string;

  // Performance (module 10)
  ca_target: string;
  basket_target: string;
  conv_target: string;
  roas_target: string;
  target_cpa: string;

  // Stratégie avancée (amélioration qualité prompts)
  target_demographic: string;
  competitors: string;
  forbidden_keywords: string;
}

export type BriefField = keyof BrandBrief;

export const BRIEF_DEFAULTS: BrandBrief = {
  brand_name: "",
  sector: "luxe",
  tone: "luxe",
  values: "",
  product_name: "",
  product_description: "",
  product_features: "",
  product_colors: "",
  product_materials: "",
  benefits: "",
  target_audience: "femmes-25-45",
  unique_feature: "",
  price: "",
  old_price: "",
  discount: "20",
  promo_code: "",
  product_price: "",
  margin_percent: "65",
  shipping_info: "Livraison offerte dès 100€",
  free_shipping: "100",
  checkout_url: "",
  stock: "50",
  delivery_days: "3",
  express_delivery_days: "1",
  express_price: "9.90",
  return_days: "30",
  warranty: "2",
  support_email: "",
  best_seller_1: "",
  best_seller_2: "",
  primary_color: "#D4AF37",
  heading_font: "Playfair Display",
  body_font: "Montserrat",
  ca_target: "",
  basket_target: "",
  conv_target: "",
  roas_target: "",
  target_cpa: "",
  target_demographic: "",
  competitors: "",
  forbidden_keywords: "",
};

// Champs "importants" dont la complétude est mesurée
export const COMPLETION_FIELDS: BriefField[] = [
  "brand_name", "sector", "tone", "values",
  "product_name", "product_description", "product_features", "benefits",
  "price", "discount",
];

// ─── Context ───────────────────────────────────────────────────────────────────

interface BrandContextValue {
  brief: BrandBrief;
  updateBrief: (patch: Partial<BrandBrief>) => void;
  resetBrief: () => void;
  completionPct: number;
  filledCount: number;
}

const BrandContext = createContext<BrandContextValue | null>(null);

const STORAGE_KEY = "roboneo_brand_brief_v1";

function loadFromStorage(): BrandBrief {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...BRIEF_DEFAULTS };
    return { ...BRIEF_DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return { ...BRIEF_DEFAULTS };
  }
}

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [brief, setBrief] = useState<BrandBrief>(loadFromStorage);

  const updateBrief = useCallback((patch: Partial<BrandBrief>) => {
    setBrief((prev) => {
      const next = { ...prev };
      for (const [k, v] of Object.entries(patch)) {
        if (v !== undefined && v !== null && String(v).trim() !== "") {
          (next as any)[k] = String(v);
        }
      }
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const resetBrief = useCallback(() => {
    const fresh = { ...BRIEF_DEFAULTS };
    setBrief(fresh);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }, []);

  const filledCount = COMPLETION_FIELDS.filter((f) => brief[f] && String(brief[f]).trim() !== "").length;
  const completionPct = Math.round((filledCount / COMPLETION_FIELDS.length) * 100);

  return (
    <BrandContext.Provider value={{ brief, updateBrief, resetBrief, completionPct, filledCount }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand(): BrandContextValue {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error("useBrand must be used inside BrandProvider");
  return ctx;
}
