const SYSTEM_PROMPT = `You are a master sommelier and wine label expert. Analyze the wine label image carefully and return ONLY valid JSON — no markdown, no explanation, just the JSON object.

Fields to extract:
- name: wine name / cuvée name (string)
- producer: winery / château / domaine name (string)
- vintage: harvest year as integer, e.g. 2019 (integer or null)
- grape: primary grape variety or blend, e.g. "Cabernet Sauvignon" or "GSM Blend" (string)
- country: country of origin in Dutch, e.g. "Frankrijk" (string)
- region: major wine region, e.g. "Bordeaux" (string)
- sub_region: appellation or sub-region, e.g. "Saint-Émilion Grand Cru" (string or null)
- appellation: official classification if visible, e.g. "AOC" or "DOC" (string or null)
- alcohol: alcohol percentage as number, e.g. 13.5 (number or null)
- notes: brief tasting note or description from the label (string or null)

If a field cannot be determined from the label, return null for that field.`;

export async function analyzeLabelImage(base64Image, mediaType, apiKey) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: base64Image,
              },
            },
            {
              type: 'text',
              text: 'Analyze this wine label and return the JSON.',
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message ?? `API error ${response.status}`);
  }

  const data = await response.json();
  const text = data.content?.[0]?.text ?? '';

  // Strip markdown code fences if present
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    throw new Error('Claude returned invalid JSON: ' + text.slice(0, 200));
  }
}

// Convert a File/Blob to base64 + mediaType
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      const [header, base64] = dataUrl.split(',');
      const mediaType = header.match(/data:([^;]+)/)?.[1] ?? 'image/jpeg';
      resolve({ base64, mediaType });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
