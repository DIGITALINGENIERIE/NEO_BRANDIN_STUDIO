import { Router, type IRouter } from "express";
import { generatePersonaVariants, type EnhancedBrief } from "../../lib/prompt-utils";
import * as zod from "zod";

const router: IRouter = Router();

const PersonaVariantsBody = zod.object({
  base_prompt: zod.string().min(10),
  brand_name: zod.string().min(1),
  sector: zod.string().min(1),
  tone: zod.string().min(1),
  values: zod.array(zod.string()).default([]),
  target_demographic: zod.string().nullish(),
});

router.post("/openai/persona-variants", async (req, res) => {
  const parsed = PersonaVariantsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body", details: parsed.error.errors });
    return;
  }

  const { base_prompt, brand_name, sector, tone, values, target_demographic } = parsed.data;

  const brief: EnhancedBrief = {
    brand_name,
    sector,
    tone,
    values,
    target_demographic: target_demographic ?? undefined,
  };

  try {
    const variants = await generatePersonaVariants(base_prompt, brief);
    res.json({ variants });
  } catch (err) {
    req.log.error({ err }, "Error generating persona variants");
    res.status(500).json({ error: "Erreur lors de la génération des variantes personas" });
  }
});

export default router;
