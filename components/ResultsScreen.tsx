import React from 'react';
import { Recommendation, RecommendationCategory } from '../types';

interface ResultsScreenProps {
  recommendations: Recommendation[];
  onReset: () => void;
}

const getIconForCategory = (category: RecommendationCategory) => {
  switch (category) {
    case RecommendationCategory.VENTILATION:
      return 'air';
    case RecommendationCategory.SHADING:
      return 'wb_sunny';
    case RecommendationCategory.MATERIAL:
      return 'foundation';
    default:
      return 'info';
  }
};

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ recommendations, onReset }) => {
  return (
    <div className="px-4 sm:px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <main className="flex flex-col gap-8 p-4">
          <div className="flex flex-wrap justify-between gap-3 pt-4">
            <div className="flex min-w-72 flex-col gap-2">
              <p className="text-slate-900 dark:text-slate-100 text-4xl font-black leading-tight tracking-[-0.033em]">
                Resultados Bioclimáticos
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                Análisis y Recomendaciones
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-6 rounded-xl bg-white dark:bg-slate-900 shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.2)] p-6 sm:p-8">
            
            {recommendations.map((rec, index) => (
              <div 
                key={index} 
                className={`flex flex-col sm:flex-row items-start gap-4 sm:gap-6 ${index !== recommendations.length - 1 ? 'border-b border-slate-200 dark:border-slate-800 pb-6' : ''}`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-3xl">{getIconForCategory(rec.category)}</span>
                </div>
                <div className="flex w-full min-w-0 flex-col gap-1">
                  <p className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em]">
                    {rec.title}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal">
                    {rec.description}
                  </p>
                </div>
              </div>
            ))}
            
          </div>
          
          <div className="mt-4">
            <button 
              onClick={onReset}
              className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-5 py-4 text-base font-semibold text-white transition-colors hover:bg-primary/90"
            >
              Nuevo análisis
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};