export interface ProjectData {
  location: string;
  orientation: string;
  usage: string;
}

export enum RecommendationCategory {
  VENTILATION = 'Ventilation',
  SHADING = 'Shading',
  MATERIAL = 'Material'
}

export interface Recommendation {
  category: RecommendationCategory;
  title: string;
  description: string;
}

export type AppView = 'landing' | 'form' | 'results';