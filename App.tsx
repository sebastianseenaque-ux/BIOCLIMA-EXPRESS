import React, { useState } from 'react';
import { Header } from './components/Header';
import { LandingScreen } from './components/LandingScreen';
import { FormScreen } from './components/FormScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { AppView, ProjectData, Recommendation } from './types';
import { generateRecommendations } from './services/geminiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = () => {
    setCurrentView('form');
  };

  const handleFormSubmit = async (data: ProjectData) => {
    setIsLoading(true);
    try {
      const results = await generateRecommendations(data);
      setRecommendations(results);
      setCurrentView('results');
    } catch (error) {
      console.error("Failed to generate recommendations:", error);
      alert("Hubo un error al generar las recomendaciones. Por favor intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setRecommendations([]);
    setCurrentView('form');
  };

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    if (view === 'landing') {
        setRecommendations([]);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark">
      <div className="layout-container flex h-full grow flex-col">
        <Header currentView={currentView} onNavigate={handleNavigate} />
        
        {currentView === 'landing' && <LandingScreen onStart={handleStart} />}
        
        {currentView === 'form' && (
          <FormScreen onSubmit={handleFormSubmit} isLoading={isLoading} />
        )}
        
        {currentView === 'results' && (
          <ResultsScreen recommendations={recommendations} onReset={handleReset} />
        )}
      </div>
    </div>
  );
};

export default App;