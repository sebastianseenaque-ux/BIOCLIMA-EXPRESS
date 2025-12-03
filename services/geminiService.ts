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
          description: "The category of the bioclimatic strategy. Must be one of: 'Ventilation', 'Shading', 'Material'."
        },
        title: {
          type: Type.STRING,
          description: "A short, punchy title for the recommendation in Spanish."
        },
        description: {
          type: Type.STRING,
          description: "A detailed but concise explanation of the strategy (2-3 sentences) in Spanish."
        }
      },
      required: ["category", "title", "description"]
    }
  };

  const prompt = `
    Analiza el siguiente proyecto y genera recomendaciones bioclimáticas específicas:
    - Ubicación/Clima: ${data.location}
    - Orientación del terreno: ${data.orientation}
    - Uso del espacio: ${data.usage}

    Genera exactamente 3 recomendaciones, una para cada categoría:
    1. Ventilación (Estrategias de flujo de aire natural)
    2. Sombreamiento (Control solar pasivo)
    3. Material (Inercia térmica o aislamiento según clima)

    REGLAS:
    - El campo 'category' debe ser EXACTAMENTE uno de los valores en Inglés: 'Ventilation', 'Shading', 'Material'.
    - El 'title' y 'description' deben estar en Español.
    - Las recomendaciones deben ser técnicas pero accesibles.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "Eres un arquitecto experto en diseño bioclimático y sostenibilidad. Tu objetivo es dar consejos prácticos y de alto impacto.",
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