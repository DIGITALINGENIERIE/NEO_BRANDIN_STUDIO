import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  ChevronDown, ChevronUp, Sparkles, RotateCcw, Check, AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useBrand, BrandBrief, BRIEF_DEFAULTS } from "@/context/brand-context";

// ─── Helpers ───────────────────────────────────────────────────────────────────

const SECTORS = [
  { value: "bijou",        label: "Bijouterie / Accessoires" },
  { value: "luxe",         label: "Luxe / Premium" },
  { value: "cosmétique",   label: "Cosmétique / Beauté" },
  { value: "mode",         label: "Mode / Prêt-à-porter" },
  { value: "tech",         label: "Tech / Électronique" },
  { value: "fitness",      label: "Sport / Fitness" },
  { value: "décoration",   label: "Décoration / Maison" },
  { value: "maroquinerie", label: "Maroquinerie / Sacs" },
];

const TONES = [
  { value: "luxe",          label: "Luxe & Prestige" },
  { value: "premium",       label: "Premium & Élégant" },
  { value: "moderne",       label: "Moderne & Dynamique" },
  { value: "minimaliste",   label: "Minimaliste & Épuré" },
  { value: "chaleureux",    label: "Chaleureux & Bienveillant" },
  { value: "professionnel", label: "Professionnel & Sérieux" },
  { value: "streetwear",    label: "Streetwear & Audacieux" },
  { value: "écologique",    label: "Écologique & Engagé" },
];

const AUDIENCES = [
  { value: "femmes-25-45",  label: "Femmes 25-45 ans" },
  { value: "hommes-25-45",  label: "Hommes 25-45 ans" },
  { value: "mixte-25-45",   label: "Mixte 25-45 ans" },
  { value: "jeunes-18-30",  label: "Jeunes 18-30 ans" },
  { value: "csp-plus",      label: "CSP+ / Cadres" },
  { value: "managers",      label: "Managers / Entrepreneurs" },
  { value: "sportifs",      label: "Sportifs / Actifs" },
  { value: "parents",       label: "Parents / Familles" },
];

function selectCls() {
  return "flex h-10 w-full appearance-none rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary";
}

// Sections du panneau brief
const SECTIONS = [
  {
    key: "identity",
    label: "Identité",
    color: "text-amber-400",
    dot: "bg-amber-400",
    fields: ["brand_name", "sector", "tone", "values"],
  },
  {
    key: "product",
    label: "Produit",
    color: "text-violet-400",
    dot: "bg-violet-400",
    fields: ["product_name", "product_description", "product_features", "product_colors", "product_materials", "benefits", "target_audience", "unique_feature"],
  },
  {
    key: "commerce",
    label: "Commerce",
    color: "text-green-400",
    dot: "bg-green-400",
    fields: ["price", "old_price", "discount", "promo_code", "checkout_url", "shipping_info", "free_shipping"],
  },
  {
    key: "sav",
    label: "SAV",
    color: "text-orange-400",
    dot: "bg-orange-400",
    fields: ["warranty", "delivery_days", "express_delivery_days", "express_price", "return_days", "support_email", "unique_feature", "best_seller_1", "best_seller_2"],
  },
  {
    key: "visual",
    label: "Visuel",
    color: "text-pink-400",
    dot: "bg-pink-400",
    fields: ["primary_color", "heading_font", "body_font"],
  },
  {
    key: "performance",
    label: "Performance",
    color: "text-blue-400",
    dot: "bg-blue-400",
    fields: ["ca_target", "basket_target", "conv_target", "roas_target", "target_cpa", "margin_percent"],
  },
] as const;

// ─── Field renderers ───────────────────────────────────────────────────────────

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-[11px] text-muted-foreground uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}

function IdentitySection({ form }: { form: any }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <FieldRow label="Nom de la marque *">
        <Input {...form.register("brand_name")} placeholder="ex: LUXEOR" className="bg-black/20 h-9 text-sm" />
      </FieldRow>
      <FieldRow label="Secteur *">
        <select {...form.register("sector")} className={selectCls()}>
          {SECTORS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </FieldRow>
      <FieldRow label="Ton de communication">
        <select {...form.register("tone")} className={selectCls()}>
          {TONES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </FieldRow>
      <FieldRow label="Valeurs de marque">
        <Input {...form.register("values")} placeholder="ex: excellence, prestige, authenticité" className="bg-black/20 h-9 text-sm" />
      </FieldRow>
    </div>
  );
}

function ProductSection({ form }: { form: any }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <FieldRow label="Nom du produit phare">
        <Input {...form.register("product_name")} placeholder="ex: Montre Élégance Or Rose" className="bg-black/20 h-9 text-sm" />
      </FieldRow>
      <FieldRow label="Audience cible">
        <select {...form.register("target_audience")} className={selectCls()}>
          {AUDIENCES.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
        </select>
      </FieldRow>
      <div className="sm:col-span-2">
        <FieldRow label="Description du produit">
          <Input {...form.register("product_description")} placeholder="ex: Montre automatique or rose 18k, verre saphir, bracelet cuir Hermès..." className="bg-black/20 h-9 text-sm" />
        </FieldRow>
      </div>
      <FieldRow label="Caractéristiques clés">
        <Input {...form.register("product_features")} placeholder="ex: or 18k, verre saphir, étanche 50m" className="bg-black/20 h-9 text-sm" />
      </FieldRow>
      <FieldRow label="Bénéfices client">
        <Input {...form.register("benefits")} placeholder="ex: élégance, précision, durabilité" className="bg-black/20 h-9 text-sm" />
      </FieldRow>
      <FieldRow label="Couleurs produit">
        <Input {...form.register("product_colors")} placeholder="ex: or rose, noir, blanc ivoire" className="bg-black/20 h-9 text-sm" />
      </FieldRow>
      <FieldRow label="Matériaux">
        <Input {...form.register("product_materials")} placeholder="ex: acier inoxydable, verre saphir, cuir" className="bg-black/20 h-9 text-sm" />
      </FieldRow>
    </div>
  );
}

function CommerceSection({ form }: { form: any }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <FieldRow label="Prix de vente (€)">
        <Input {...form.register("price")} type="number" placeholder="299" className="bg-black/20 h-9 text-sm" />
      </FieldRow>
      <FieldRow label="Réduction (%)">
        <Input {...form.register("discount")} type="number" placeholder="20" className="bg-black/20 h-9 text-sm" />
      </FieldRow>
      <FieldRow label="Code promo">
        <Input {...form.register("promo_code")} placeholder="ex: LUXEOR20" className="bg-black/20 h-9 text-sm" />
      </FieldRow>
      <FieldRow label="Livraison offerte dès (€)">
        <Input {...form.register("free_shipping")} type="number" placeholder="100" className="bg-black/20 h-9 text-sm" />
      </FieldRow>
      <div className="col-span-2">
        <FieldRow label="Info livraison">
          <Input {...form.register("shipping_info")} placeholder="ex: Livraison offerte dès 100€ · Retours 30 jours" className="bg-black/20 h-9 text-sm" />
        </FieldRow>
      </div>
    </div>
  );
}

function VisualSection({ form }: { form: any }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <FieldRow label="Couleur principale">
        <div className="flex gap-2">
          <input type="color" {...form.register("primary_color")} className="w-10 h-9 rounded cursor-pointer border border-white/10 bg-transparent flex-shrink-0" />
          <Input {...form.register("primary_color")} className="bg-black/20 h-9 text-sm font-mono" />
        </div>
      </FieldRow>
      <FieldRow label="Police titres">
        <Input {...form.register("heading_font")} placeholder="Playfair Display" className="bg-black/20 h-9 text-sm" />
      </FieldRow>
      <FieldRow label="Police texte">
        <Input {...form.register("body_font")} placeholder="Montserrat" className="bg-black/20 h-9 text-sm" />
      </FieldRow>
    </div>
  );
}

function PerformanceSection({ form }: { form: any }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {[
        { name: "ca_target",     label: "CA mensuel cible (€)", placeholder: "10000" },
        { name: "basket_target", label: "Panier moyen cible (€)", placeholder: "150" },
        { name: "conv_target",   label: "Taux conv. cible (%)", placeholder: "2.5" },
        { name: "roas_target",   label: "ROAS cible (x)", placeholder: "3.0" },
        { name: "target_cpa",    label: "CPA cible (€)", placeholder: "15" },
        { name: "margin_percent",label: "Marge brute (%)", placeholder: "65" },
      ].map((f) => (
        <FieldRow key={f.name} label={f.label}>
          <Input {...form.register(f.name)} type="number" step="any" placeholder={f.placeholder} className="bg-black/20 h-9 text-sm" />
        </FieldRow>
      ))}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function BrandBriefPanel() {
  const { brief, updateBrief, resetBrief, completionPct, filledCount } = useBrand();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("identity");
  const [saved, setSaved] = useState(false);

  const form = useForm<BrandBrief>({
    defaultValues: brief,
  });

  // Sync form when brief changes externally (e.g. from a module)
  React.useEffect(() => {
    form.reset(brief);
  }, [brief]);

  const onSave = form.handleSubmit((values) => {
    updateBrief(values);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  });

  const isComplete = completionPct >= 80;

  return (
    <div className="mb-6 rounded-2xl border border-white/8 bg-card/40 backdrop-blur-sm overflow-hidden">
      {/* Header (always visible) */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-white/3 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground leading-tight">
              Brief Global de Marque
            </p>
            <p className="text-[11px] text-muted-foreground">
              {brief.brand_name
                ? `${brief.brand_name} · ${SECTORS.find(s => s.value === brief.sector)?.label ?? brief.sector}`
                : "Remplissez une fois, tous les modules s'adaptent automatiquement"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Completion indicator */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-24 h-1.5 rounded-full bg-white/8 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPct}%` }}
                transition={{ duration: 0.5 }}
                className={`h-full rounded-full ${isComplete ? "bg-green-400" : "bg-primary"}`}
              />
            </div>
            <span className={`text-xs font-mono ${isComplete ? "text-green-400" : "text-muted-foreground"}`}>
              {completionPct}%
            </span>
          </div>
          {isComplete ? (
            <span className="flex items-center gap-1 text-[11px] text-green-400 bg-green-400/10 border border-green-400/20 rounded-full px-2 py-0.5">
              <Check className="w-3 h-3" />Brief complet
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-full px-2 py-0.5">
              <AlertCircle className="w-3 h-3" />{filledCount}/10
            </span>
          )}
          {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </div>
      </button>

      {/* Expandable body */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/5">
              {/* Section tabs */}
              <div className="flex gap-0.5 px-5 pt-4 pb-2 overflow-x-auto scrollbar-none">
                {SECTIONS.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setActiveSection(s.key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                      activeSection === s.key
                        ? "bg-white/10 text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${activeSection === s.key ? s.dot : "bg-white/20"}`} />
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Section content */}
              <div className="px-5 pb-5 pt-2">
                {activeSection === "identity"    && <IdentitySection    form={form} />}
                {activeSection === "product"     && <ProductSection     form={form} />}
                {activeSection === "commerce"    && <CommerceSection    form={form} />}
                {activeSection === "visual"      && <VisualSection      form={form} />}
                {activeSection === "performance" && <PerformanceSection form={form} />}
              </div>

              {/* Footer actions */}
              <div className="flex items-center justify-between gap-3 px-5 pb-4 pt-1 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => { resetBrief(); form.reset({ ...BRIEF_DEFAULTS }); }}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Réinitialiser
                </button>
                <div className="flex items-center gap-3">
                  {saved && (
                    <motion.span
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1 text-xs text-green-400"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Sauvegardé !
                    </motion.span>
                  )}
                  <Button size="sm" onClick={onSave} className="h-8 px-4 text-xs gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    Appliquer à tous les modules
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
