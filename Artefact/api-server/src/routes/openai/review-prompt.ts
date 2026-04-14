import { Router, type IRouter } from "express";
import { reviewPromptQuality, type EnhancedBrief } from "../../lib/prompt-utils";

const router: IRouter = Router();

router.post("/openai/review-prompt", async (req, res) => {
  const {
    content,
    section_key,
    brand_name,
    sector,
    tone,
    values,
    target_demographic,
    competitors,
    forbidden_keywords,
    colors,
  } = req.body as Record<string, unknown>;

  if (!content || !section_key || !brand_name) {
    res.status(400).json({ error: "content, section_key et brand_name sont requis." });
    return;
  }

  const brief: EnhancedBrief = {
    brand_name: String(brand_name),
    sector: String(sector ?? ""),
    tone: String(tone ?? ""),
    values: Array.isArray(values) ? values.map(String) : [String(values ?? "")],
    target_demographic: target_demographic ? String(target_demographic) : undefined,
    competitors: competitors ? String(competitors) : undefined,
    forbidden_keywords: forbidden_keywords ? String(forbidden_keywords) : undefined,
    colors: colors ? String(colors) : undefined,
  };

  try {
    const review = await reviewPromptQuality(String(content), brief, String(section_key));
    res.json(review);
  } catch (err) {
    req.log?.error({ err }, "Erreur review-prompt");
    res.status(500).json({ error: "Erreur lors de la review IA." });
  }
});

export default router;
