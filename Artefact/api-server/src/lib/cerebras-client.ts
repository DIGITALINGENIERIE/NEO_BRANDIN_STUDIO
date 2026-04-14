/**
 * Cerebras API Client — Rotation intelligente sur 6 clés API
 *
 * Logique de rotation: chaque appel de génération utilise la clé suivante
 * dans la séquence circulaire (1→2→3→4→5→6→1→...) pour contourner
 * les limites de taux (cooldown) par clé.
 */

import OpenAI from "openai";

export const CEREBRAS_MODEL = "llama-3.3-70b";
const CEREBRAS_BASE_URL = "https://api.cerebras.ai/v1";

// ─── Chargement des clés depuis les variables d'environnement ─────────────────

function loadKeys(): string[] {
  const keys: string[] = [];
  for (let i = 1; i <= 6; i++) {
    const key = process.env[`CEREBRAS_API_KEY_${i}`];
    if (key) keys.push(key);
  }
  if (keys.length === 0) {
    throw new Error(
      "Aucune clé API Cerebras trouvée. Vérifie les secrets CEREBRAS_API_KEY_1 à CEREBRAS_API_KEY_6."
    );
  }
  return keys;
}

// ─── Pool de clients (un par clé) ────────────────────────────────────────────

let clientPool: OpenAI[] | null = null;
let rotationIndex = 0;

function getClientPool(): OpenAI[] {
  if (!clientPool) {
    const keys = loadKeys();
    clientPool = keys.map(
      (apiKey) =>
        new OpenAI({
          apiKey,
          baseURL: CEREBRAS_BASE_URL,
        })
    );
  }
  return clientPool;
}

/**
 * Retourne le prochain client Cerebras dans la rotation circulaire.
 * Chaque appel avance l'index d'une position.
 */
export function getNextCerebrasClient(): OpenAI {
  const pool = getClientPool();
  const client = pool[rotationIndex % pool.length];
  rotationIndex = (rotationIndex + 1) % pool.length;
  return client;
}

/**
 * Proxy compatible avec l'interface OpenAI standard.
 * Chaque accès à une propriété (ex: .chat) déclenche la rotation vers la clé suivante.
 * Utilisation identique à l'objet `openai` standard.
 */
export const cerebrasAI = new Proxy({} as OpenAI, {
  get(_target, prop) {
    const client = getNextCerebrasClient();
    const value = client[prop as keyof OpenAI];
    return typeof value === "function" ? value.bind(client) : value;
  },
});
