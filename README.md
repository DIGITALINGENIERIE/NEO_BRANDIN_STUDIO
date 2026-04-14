# Neo Branding Studio

> Générateur de prompts IA chirurgicaux pour l'écosystème RoboNeo.com

---

## Présentation

**Neo Branding Studio** est une application web React qui génère des prompts créatifs ultra-précis, prêts à coller directement dans [RoboNeo.com](https://roboneo.com) pour créer tous les assets d'une marque.

L'utilisateur remplit un brief client, et l'IA (Cerebras + GPT-5.2 + Claude Sonnet) génère les prompts en **streaming temps réel**, section par section. Un système de débat GPT vs Claude évalue et améliore chaque prompt à la demande.

---

## Modules disponibles

| # | Module | Sections | Statut |
|---|--------|----------|--------|
| 01 | **Brand Identity** — Logo, Palette, Typographie, Charte graphique (10 règles) | 4 | ✅ Disponible |
| 02 | **Visual Content** — Photos produit, Lifestyle, Détail, Before/After, Try-On, Carrousel | 6 | ✅ Disponible |
| 03 | **Video Content** — Scripts 15s/30s/60s, TikTok, YouTube, Teaser animé, Miniatures, Voix off | 6 | ✅ Disponible |
| 04 | **Ad Creatives** — Meta Ads, Google Display (6 formats), TikTok Ads, Carousel, Ad Copy, Performance Predictor | 6 | ✅ Disponible |
| 05 | **Brand Sound** — Jingle, Musiques de fond 15s/30s/60s, Sound Effects, Voix Off, Beat Sync | 5 | ✅ Disponible |
| 06 | **Copy & Content** — Fiche produit, Captions, Hashtags, Emails (3), Avis clients (10) | 5 | ✅ Disponible |
| 07 | **Launch Ready** — Landing page HTML, Guide d'utilisation, Calendrier 30 jours | 3 | ✅ Disponible |
| 08 | **Chatbot Script** — FAQ (20 Q/R), Objections (8 scripts), Commentaires négatifs (5) | 3 | ✅ Disponible |
| 09 | **Upsell & Cross-sell Kit** — Cross-sell (3), Bundles (3), Copy upsell, Emails post-achat | 4 | ✅ Disponible |
| 10 | **Performance Tracker** — Dashboard KPIs, Guide Scaling/Stop, Analyse hebdo | 4 | ✅ Disponible |

---

## Stack technique

| Couche | Techno |
|--------|--------|
| Frontend | React + Vite + TypeScript |
| UI | shadcn/ui + Tailwind CSS + Framer Motion |
| Backend | Express.js 5 (Node 20) |
| IA — Génération | Cerebras (streaming SSE principal) |
| IA — Review qualité | GPT-5.2 + Claude Sonnet (débat contradictoire) |
| Streaming | Server-Sent Events (SSE) |
| Monorepo | pnpm workspaces |
| Build backend | esbuild (ESM bundle) |
| Validation | Zod v4 + React Hook Form |

---

## Architecture

```
workspace/
├── Artefact/
│   ├── roboneo-generator/          # App React frontend (Vite, port 5000)
│   │   └── src/pages/
│   │       ├── home.tsx              # Hub navigation (10 modules)
│   │       ├── module-01.tsx         # Brand Identity
│   │       ├── module-02.tsx         # Visual Content
│   │       ├── module-03.tsx         # Video Content
│   │       ├── module-04.tsx         # Ad Creatives
│   │       ├── module-05.tsx         # Brand Sound
│   │       ├── module-06.tsx         # Copy & Content
│   │       ├── module-07.tsx         # Launch Ready
│   │       ├── module-08.tsx         # Chatbot Script
│   │       ├── module-09.tsx         # Upsell & Cross-sell Kit
│   │       └── module-10.tsx         # Performance Tracker
│   └── api-server/                 # Backend Express (port 3000)
│       └── src/routes/openai/
│           ├── enhance-prompts.ts              # Module 01
│           ├── enhance-prompts-visual.ts       # Module 02
│           ├── enhance-prompts-video.ts        # Module 03
│           ├── enhance-prompts-ads.ts          # Module 04
│           ├── enhance-prompts-sound.ts        # Module 05
│           ├── enhance-prompts-copy.ts         # Module 06
│           ├── enhance-prompts-launch.ts       # Module 07
│           ├── enhance-prompts-chatbot.ts      # Module 08
│           ├── enhance-prompts-upsell.ts       # Module 09
│           ├── enhance-prompts-performance.ts  # Module 10
│           └── review-prompt.ts               # Review GPT vs Claude
└── lib/
    └── db/src/schema/              # Schéma Drizzle (conversations, messages)
```

---

## Fonctionnement des modules

### Module 01 — Brand Identity

**Brief requis :** nom de marque, secteur, ton, valeurs, style logo (optionnel)

**Sections générées :**
- `MOD-01.1` Logo Generator — style auto-détecté selon le secteur, PNG 4000×4000px (pas SVG)
- `MOD-01.2` Palette Generator — couleurs primaire/secondaire/accent + WCAG, températures en K majuscule
- `MOD-01.3` Typography System — fontes Google Fonts + CSS
- `MOD-01.4` Brand Guidelines — 10 règles (contenu textuel structuré, pas PDF binaire)

---

### Module 02 — Visual Content

**Brief requis :** marque, secteur, type produit, nom produit, couleurs, matériaux, audience cible

**Sections générées :**
- `MOD-02.1` Photos Produit — 5 angles auto selon le type produit
- `MOD-02.2` Photos Lifestyle — 3 formats (feed 1:1, Pinterest 4:5, Story 9:16)
- `MOD-02.3` Détail & Texture — 2 matériaux en macro
- `MOD-02.4` Before/After — scénario auto (skin/body/hair/object)
- `MOD-02.5` Virtual Try-On — 2 modèles adaptés à l'audience cible
- `MOD-02.6` Carrousel — 5 slides, style auto (luxe/storytelling/éducation/problème-solution)

**Règle anti-biais :** les sujets humains générés correspondent EXACTEMENT à la cible déclarée (ethnie, couleur de peau, style culturel). Aucune ethnie imposée par défaut.

---

### Module 03 — Video Content

**Brief requis :** marque, secteur, produit, valeurs, audience, couleurs, URL e-commerce

**Sections générées :**
- `MOD-03.1` Scripts vidéo — 3 durées (15s, 30s, 60s) avec shot-list détaillée
- `MOD-03.2` Short Videos — TikTok/Reels avec hook 0-3s, arc narratif
- `MOD-03.3` Long Video — YouTube avec structure complète
- `MOD-03.4` Teaser Animé — 3 formats : vertical 9:16 (15s), horizontal 16:9 (15s), **boucle 5s seamless** (ambient loop pour fond de site web et Stories)
- `MOD-03.5` Miniatures — 3 variantes A/B/C. Note : le fond visuel est généré par l'IA, tout texte overlay (AVANT/APRÈS, titres) doit être ajouté en post-production (Canva/Photoshop)
- `MOD-03.6` Voix Off — scripts 15s/30s/60s + paramètres ElevenLabs (`eleven_multilingual_v2`)

**Voix ElevenLabs — modèle `eleven_multilingual_v2` obligatoire :**

| Secteur | Voix | Note |
|---------|------|------|
| Bijou, Luxe, Maroquinerie, Montres | Charlotte | Multilingue, élégante, accent neutre |
| Cosmétique, Skincare, Mode | Josephine | Voix française native, chaleureuse |
| Fitness, Sport, Streetwear, Tech, Gadgets | Thomas | Voix masculine française |

---

### Module 04 — Ad Creatives

**Brief requis :** marque, secteur, produit, bénéfices, audience, couleurs, code promo, remise, stock

**Sections générées :**
- `MOD-04.1` Meta Ads — 4 formats (Feed Image 1080×1080, Feed Vidéo, Stories 9:16, Reels 9:16)
- `MOD-04.2` Google Display — 6 formats (728×90, 300×250, 336×280, 320×100, 300×600, 970×250)
- `MOD-04.3` TikTok Ads — shot-list structuré + **prompt narratif direct** (copiable dans Runway/Pika/Kling) + hashtags + direction musicale
- `MOD-04.4` Carousel Ads — 5 slides, **ratio 1:1 carré (1080×1080px)**, narrative Hook→Problème→Solution→Preuve→CTA
- `MOD-04.5` Ad Copy — 4 variantes par plateforme (Meta Feed, Meta Stories, Google Display, TikTok)
- `MOD-04.6` Performance Predictor — CTR/CPC/ROAS prédictifs, plan A/B testing, quick wins

**Règle anti-biais :** le sujet humain dans chaque visuel correspond à la cible déclarée dans le brief.

---

### Module 05 — Brand Sound

**Brief requis :** marque, secteur, ton, valeurs, audience cible. Options : nettoyage UGC, séparation vocale.

**Sections générées :**
- `MOD-05.1` Jingle — brief créatif + prompt technique Suno/Udio + 3 variations (10s/3s/1s notification)
- `MOD-05.2` Musiques de fond — 3 durées (15s TikTok, 30s Meta Ads, 60s YouTube) avec points de sync montage. Instruments nommés avec leur rôle exact (ex: *kora en lead mélodique, balafon en contrechant rythmique, nappe piano Rhodes en harmonie*)
- `MOD-05.3` Sound Effects — 6 effets sur mesure (clic UI, notification, succès, whoosh, sweep, impact logo)
- `MOD-05.4` Voix Off — recommandation ElevenLabs francophone (`eleven_multilingual_v2`) + script 30s + directions artistiques
- `MOD-05.5` Beat Sync & Audio Processing — synchronisation vidéo/musique + nettoyage UGC + séparation stems + mastering multi-plateforme

**Instruments précis :** les prompts nomment toujours les instruments avec leur rôle (style world/afro: Kora, Balafon, Djembé, Ngoni, Talking drum ; latins: Conga, Bongos, Güiro ; orientaux: Oud, Qanun, Darbuka).

---

### Module 06 — Copy & Content

**Brief requis :** marque, secteur, produit, ton, valeurs, audience, remise, code promo

**Sections générées :**
- `MOD-06.1` Fiche Produit — 4 titres (SEO, bénéfice, storytelling, édition limitée) + description 120-150 mots + bullet points + FAQ (5 Q/R)
- `MOD-06.2` Captions — Instagram feed/story, TikTok, Pinterest, Facebook
- `MOD-06.3` Hashtags — Instagram (15), TikTok (8), Pinterest (20). Format CamelCase, sans espace, sans accent, max 25 caractères, sans doublons
- `MOD-06.4` Séquence Emails — lancement, panier abandonné, fidélité (ton gratitude : "Merci pour votre fidélité")
- `MOD-06.5` Avis Clients — 10 avis authentiques, prénoms adaptés à la cible, formules naturelles, sans fautes de genre ni de sens

**Qualité française :** règles strictes contre les erreurs typiques de l'IA (accords de genre, faux-sens : "J'use", "m'aveugle", "mon peau").

---

### Module 07 — Launch Ready

**Brief requis :** marque, produit, prix, couleur principale, typographies

**Sections générées :**
- Landing page HTML complète prête au déploiement
- Guide d'utilisation du produit
- Calendrier de lancement 30 jours (contenu + canal + objectif par jour)

---

### Module 08 — Chatbot Script

**Brief requis :** marque, produit, secteur, garantie, délai de livraison

**Sections générées :**
- FAQ — 20 questions/réponses optimisées conversion
- Scripts objections — 8 scénarios (prix, délai, qualité, concurrence...)
- Gestion commentaires négatifs — 5 réponses types

---

### Module 09 — Upsell & Cross-sell Kit

**Brief requis :** marque, secteur, produit principal, prix, marge

**Sections générées :**
- Cross-sell — 3 recommandations produits complémentaires
- Bundles — 3 offres packagées avec justification valeur
- Copy upsell — 4 contextes (panier, post-achat, email, SMS)
- Emails post-achat — 3 emails (J+1, J+7, J+30)

---

### Module 10 — Performance Tracker

**Brief requis :** marque, secteur, objectifs CA/panier/taux de conv/ROAS/CPA

**Sections générées :**
- Dashboard Google Sheets — structure KPIs + formules
- KPIs par plateforme (Meta, TikTok, Google, Email)
- Guide Scaling/Stop — règles de décision basées sur les données
- Analyse hebdomadaire — template de rapport récurrent

---

## Système de revue GPT vs Claude

Chaque prompt généré peut être amélioré à la demande via le bouton "Améliorer avec GPT & Claude" :

1. GPT-5.2 et Claude Sonnet analysent le prompt en parallèle
2. Chacun attribue un score sur 10 et propose des améliorations
3. L'agent avec le **score le plus bas** (le plus exigeant) gagne et fournit la version finale
4. Le prompt affiché est remplacé par la version raffinée
5. Le badge vainqueur (⚡ GPT ou 🧠 Claude) et les scores s'affichent dans la carte

---

## Auto-détection intelligente

| Paramètre | Logique |
|-----------|---------|
| Style logo | Bijou → luxe, Streetwear → street, Tech → tech, Fitness → dynamique... |
| Angles produit | Bijou: face/profil/3-4/macro/dessus — Sac: face/profil/dessus/intérieur/fermeture... |
| Style carrousel | Bijou/Luxe → luxe, Cosmétique → problème-solution, Mode → storytelling, Tech → éducation |
| Scénario Before/After | Cosmétique/Skincare → skin, Fitness → body, Bijou → object |
| Style sonore jingle | Bijou → orchestral harpe/cordes/piano, Tech → électronique synthé, Fitness → EDM, Streetwear → hip-hop |
| Voix ElevenLabs | Luxe/Bijou → Charlotte (multilingue élégante), Cosmétique/Mode → Josephine (française native), Fitness/Tech → Thomas (français masculin) |
| Teaser style | Cosmétique/Skincare → cinematic, Luxe → luxe, Tech → glitch, Fitness → kinetic, Décoration → minimal |
| Type miniature | Cosmétique/Skincare → before_after, Tech → review, Gadgets → unboxing, autres → product_focus |

---

## Streaming temps réel

Les prompts sont générés via SSE (Server-Sent Events). Les événements du flux :

```
section_start → key, label, agent
chunk         → key, content (texte partiel)
section_done  → key, label, agent, data (JSON parsé), rawContent
section_error → key, error
done          → fin du flux
```

---

## Export

Chaque module permet d'exporter les prompts générés en :
- **JSON** — structure complète avec métadonnées, agents, paramètres
- **TXT** — format lisible prêt à copier dans RoboNeo

---

## API Routes

Toutes les routes sont montées sous `/api` :

| Route | Module |
|-------|--------|
| `GET /api/healthz` | — |
| `POST /api/openai/enhance-prompts` | 01 Brand Identity |
| `POST /api/openai/enhance-prompts-visual` | 02 Visual Content |
| `POST /api/openai/enhance-prompts-video` | 03 Video Content |
| `POST /api/openai/enhance-prompts-ads` | 04 Ad Creatives |
| `POST /api/openai/enhance-prompts-sound` | 05 Brand Sound |
| `POST /api/openai/enhance-prompts-copy` | 06 Copy & Content |
| `POST /api/openai/enhance-prompts-launch` | 07 Launch Ready |
| `POST /api/openai/enhance-prompts-chatbot` | 08 Chatbot Script |
| `POST /api/openai/enhance-prompts-upsell` | 09 Upsell Kit |
| `POST /api/openai/enhance-prompts-performance` | 10 Performance Tracker |
| `POST /api/openai/review-prompt` | Review GPT vs Claude (on-demand) |

---

## Démarrage local

```bash
pnpm install
```

```bash
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/api-server run dev
PORT=5000 BASE_PATH=/ pnpm --filter @workspace/roboneo-generator run dev
```

Variables d'environnement requises (Replit AI Integrations) :
- `AI_INTEGRATIONS_OPENAI_BASE_URL`
- `AI_INTEGRATIONS_OPENAI_API_KEY`
- `AI_INTEGRATIONS_ANTHROPIC_BASE_URL`
- `AI_INTEGRATIONS_ANTHROPIC_API_KEY`
- `DATABASE_URL`

---

## Version

**v2.1.0** — 10/10 modules disponibles — Complete Brand Universe

Corrections récentes :
- Voix ElevenLabs remplacées par des voix francophones + `eleven_multilingual_v2` (Modules 03, 05)
- Instruments audio nommés avec rôle précis dans tous les prompts Suno/Udio (Module 05)
- Teaser cinematic enrichi + variante boucle 5s seamless (Module 03)
- Note post-production pour les overlays texte miniatures (Module 03)
- Règle anti-biais représentation des personnes — sujets correspondant à la cible déclarée (Modules 02, 04)
- Prompt narratif TikTok copiable directement dans Runway/Pika/Kling (Module 04)
- Carrousel format 1:1 (1080×1080px) explicitement requis (Module 04)
- Règles qualité française dans Module 06 (grammaire, faux-sens, hashtags CamelCase)
