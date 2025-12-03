import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ProjectData, Recommendation, RecommendationCategory } from "../types";

const apiKey = process.env.API_KEY || '';

// Fallback data in case API fails or key is missing for demo purposes
const MOCK_RECOMMENDATIONS: Recommendation[] = [
  {
    category: RecommendationCategory.VENTILATION,
    title: "Estrategia de Ventilación Cruzada",
    description: "Se recomienda ubicar ventanas operables en las fachadas norte y sur para aprovechar los vientos dominantes y generar corrientes de aire naturales que refresquen el espacio interior."
  },
  {
    category: RecommendationCategory.SHADING,
    title: "Protección Solar Pasiva",
    description: "Implementar aleros de 60cm en la fachada sur y lamas verticales en la fachada oeste para bloquear la radiación solar directa en las horas pico, manteniendo la iluminación natural."
  },
  {
    category: RecommendationCategory.MATERIAL,
    title: "Inercia Térmica",
    description: "Utilizar muros de bloque de hormigón relleno o piedra en la envolvente para retardar la transferencia de calor, estabilizando la temperatura interior durante el día."
  }
];

export const generateRecommendations = async (data: ProjectData): Promise<Recommendation[]> => {
  if (!apiKey) {
    console.warn("API Key missing, returning mock data.");
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return MOCK_RECOMMENDATIONS;
  }

  const ai = new GoogleGenAI({ apiKey });

  const schema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        category: {
          type: Type.STRING,
          enum: [
            RecommendationCategory.VENTILATION,
            RecommendationCategory.SHADING,
            RecommendationCategory.MATERIAL
          ],
          description: "The category of the bioclimatic strategy."
        },
        title: {
          type: Type.STRING,
          description: "A short, punchy title for the recommendation."
        },
        description: {
          type: Type.STRING,
          description: "A detailed but concise explanation of the strategy (2-3 sentences)."
        }
      },
      required: ["category", "title", "description"]
    }
  };

  const prompt = `
    Act as an expert bioclimatic architect.
    Generate 3 specific design recommendations for a project with the following details:
    - Location: ${data.location}
    - Land Orientation: ${data.orientation}
    - Usage: ${data.usage}

    Please provide exactly one recommendation for each of these categories:
    1. Ventilation (Airflow strategies)
    2. Shading (Solar control)
    3. Material (Thermal mass/Insulation)

    The response must be in Spanish.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.7,
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    const recommendations = JSON.parse(text) as Recommendation[];
    return recommendations;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return MOCK_RECOMMENDATIONS;
  }
};