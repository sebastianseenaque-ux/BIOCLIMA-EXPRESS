import React from 'react';

interface LandingScreenProps {
  onStart: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onStart }) => {
  return (
    <main className="flex-grow">
      {/* HeroSection */}
      <div className="relative flex items-center justify-center text-center px-4 py-20 sm:py-32 lg:py-40">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover opacity-5 dark:opacity-[0.03]" 
            alt="Abstract white architectural lines" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGyrbVomTRytXyCWT9O2HzY579FlOv2VS6TN3EIgoHguKf2ewBHu0faz1PPLK5AOqL_kfo_LWkOj5PMY0b98TYipj0iA8pV_CmVgtapcbg1cHTEHvh1YAoDWrrrsQIPcl3mLzcA_rr6LJ4YBNIoDo3BQPt2-vhDC5HssDSzPz8DTP2QnGf7v5L0MJSuMxNqHRbhmZ8zQwsbrMsm3JiUNvpcBQIvZZLPuEF7byblqTu3FVVgtyGeeaZYbbhRgZMZbYalf_0qMHQyA4"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-light via-background-light/80 to-transparent dark:from-background-dark dark:via-background-dark/80"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-gray-900 dark:text-white">
            BioClima Express
          </h1>
          <h2 className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Recomendaciones bioclimáticas inmediatas para tu proyecto
          </h2>
          <button 
            onClick={onStart}
            className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark transition-transform hover:scale-105"
          >
            <span className="truncate">Comenzar Análisis</span>
          </button>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-background-dark border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">¿Cómo funciona?</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Obtén recomendaciones en tres simples pasos.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-6 bg-background-light dark:bg-gray-800/50 rounded-xl">
              <div className="flex items-center justify-center h-16 w-16 mb-6 rounded-full bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-4xl">place</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">1. Define la Ubicación</h3>
              <p className="text-gray-600 dark:text-gray-400">Ingresa la dirección o coordenadas de tu proyecto para analizar los datos climáticos locales.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-background-light dark:bg-gray-800/50 rounded-xl">
              <div className="flex items-center justify-center h-16 w-16 mb-6 rounded-full bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-4xl">analytics</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">2. Procesamos los Datos</h3>
              <p className="text-gray-600 dark:text-gray-400">Nuestro algoritmo cruza la información climática con estrategias de diseño bioclimático probadas.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-background-light dark:bg-gray-800/50 rounded-xl">
              <div className="flex items-center justify-center h-16 w-16 mb-6 rounded-full bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-4xl">lightbulb</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">3. Obtén Recomendaciones</h3>
              <p className="text-gray-600 dark:text-gray-400">Recibe un reporte claro con estrategias sobre orientación, materiales y diseño para tu proyecto.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-background-dark text-center">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-6">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <a className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors" href="#">Privacy Policy</a>
              <a className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors" href="#">Terms of Service</a>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 BioClima Express. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
};