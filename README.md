# Neo Branding Studio

> Générateur de prompts IA chirurgicaux pour l'écosystème RoboNeo.com

---

## Présentation

**Neo Branding Studio** est une application web React qui génère des prompts créatifs ultra-précis, prêts à coller directement dans [RoboNeo.com](https://roboneo.com) pour créer tous les assets d'une marque.

L'utilisateur remplit un brief client, et l'IA (GPT-5.2 via Replit) génère les prompts en streaming temps réel, section par section.

---

## Modules disponibles

| # | Module | Prompts | Statut |
|---|--------|---------|--------|
| 01 | **Brand Identity** — Logo, Palette, Typographie, Charte graphique | 4 | ✅ Disponible |
| 02 | **Visual Content** — Photos produit, Lifestyle, Détail, Before/After, Try-On, Carrousel | 19 | ✅ Disponible |
| 03 | Video Content — Reels, TikTok, YouTube Shorts | — | 🔒 Bientôt |
| 04 | Product Pages — Fiches produit, descriptions IA | — | 🔒 Bientôt |
| 05 | Copywriting — Accroches, slogans, taglines | — | 🔒 Bientôt |
| 06 | Analytics Reports — Rapports visuels, dashboards | — | 🔒 Bientôt |
| 07 | Email Campaigns — Newsletters, séquences email | — | 🔒 Bientôt |
| 08 | Social Media — Posts, stories, stratégie contenu | — | 🔒 Bientôt |
| 09 | Web & Landing — Pages de vente, hero sections | — | 🔒 Bientôt |
| 10 | Influencer Kit — Media kit, pitch decks créateurs | — | 🔒 Bientôt |

---

## Stack technique

| Couche | Techno |
|--------|--------|
| Frontend | React + Vite + TypeScript |
| UI | shadcn/ui + Tailwind CSS + Framer Motion |
| Backend | Express.js (Node) |
| IA | GPT-5.2 via Replit AI Integrations |
| Streaming | Server-Sent Events (SSE) |
| Monorepo | pnpm workspaces |

---

## Architecture

```
workspace/
├── artifacts/
│   ├── roboneo-generator/          # App React frontend
│   │   └── src/
│   │       ├── pages/
│   │       │   ├── home.tsx        # Hub navigation (10 modules)
│   │       │   ├── module-01.tsx   # Brand Identity
│   │       │   └── module-02.tsx   # Visual Content
│   │       └── lib/
│   │           └── prompt-generator.ts  # Génération locale (fallback)
│   └── api-server/                 # Backend Express
│       └── src/routes/openai/
│           ├── enhance-prompts.ts         # Route Module 01
│           └── enhance-prompts-visual.ts  # Route Module 02
└── lib/
    └── api-spec/openapi.yaml       # Spec OpenAPI
```

---

## Fonctionnement

### Module 01 — Brand Identity

**Brief requis :** nom de marque, secteur, ton, valeurs, style logo (optionnel)

**Sections générées :**
- `MOD-01.1` Logo Generator — style auto-détecté selon le secteur
- `MOD-01.2` Palette Generator — couleurs primaire/secondaire/accent + WCAG
- `MOD-01.3` Typography System — fontes Google Fonts + CSS
- `MOD-01.4` Brand Guidelines — 10 règles avec Do's/Don'ts

### Module 02 — Visual Content

**Brief requis :** marque, secteur, type produit, nom produit, couleurs, matériaux, audience cible

**Sections générées (19 prompts au total) :**
- `MOD-02.1` Photos Produit — 5 angles auto selon le type produit
- `MOD-02.2` Photos Lifestyle — 3 formats (feed 1:1, Pinterest 4:5, Story 9:16)
- `MOD-02.3` Détail & Texture — 2 matériaux en macro
- `MOD-02.4` Before/After — scénario auto (skin/body/hair/object)
- `MOD-02.5` Virtual Try-On — 2 modèles adaptés à l'audience
- `MOD-02.6` Carrousel — 5 slides, style auto (luxe/storytelling/éducation/problème-solution)

---

## Auto-détection intelligente

| Paramètre | Logique |
|-----------|---------|
| Style logo | Bijou → luxe, Streetwear → street, Tech → tech... |
| Angles produit | Bijou: face/profil/3-4/macro/dessus — Sac: face/profil/dessus/intérieur/fermeture... |
| Style carrousel | Bijou/Luxe → luxe, Cosmétique → problème-solution, Mode → storytelling, Tech → éducation |
| Scénario Before/After | Cosmétique/Skincare → skin, Fitness → body, Bijou → object |
| Profils Try-On | Auto selon l'audience cible (femmes 18-25, 25-45, 35-50, hommes 25-40, mixte) |

---

## Export

Chaque module permet d'exporter les prompts générés en :
- **JSON** — structure complète avec métadonnées, agents, paramètres
- **TXT** — format lisible prêt à copier dans RoboNeo

---

## Streaming temps réel

Les prompts sont générés via SSE (Server-Sent Events). Les événements du flux :

```
section_start → key, label, agent
chunk         → key, content (texte partiel)
section_done  → key, label, agent, data (JSON parsé), rawContent
done          → fin du flux
```

---

## Démarrage local

```bash
pnpm install
pnpm --filter @workspace/api-server run dev
pnpm --filter @workspace/roboneo-generator run dev
```

Variables d'environnement requises (Replit AI Integrations) :
- `AI_INTEGRATIONS_OPENAI_BASE_URL`
- `AI_INTEGRATIONS_OPENAI_API_KEY`
