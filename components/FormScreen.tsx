import React, { useState } from 'react';
import { ProjectData } from '../types';

interface FormScreenProps {
  onSubmit: (data: ProjectData) => void;
  isLoading: boolean;
}

export const FormScreen: React.FC<FormScreenProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<ProjectData>({
    location: '',
    orientation: '',
    usage: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.location && formData.orientation && formData.usage) {
      onSubmit(formData);
    }
  };

  return (
    <main className="flex flex-1 justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <h1 className="text-gray-900 dark:text-white text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">
              Formulario de Datos de Proyecto
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Completa los siguientes campos para obtener recomendaciones bioclimáticas personalizadas.
            </p>
          </div>
          
          <div className="bg-white dark:bg-background-dark/50 p-6 sm:p-8 lg:p-10 rounded-xl border border-gray-200 dark:border-gray-800 space-y-6">
            <div className="flex flex-col gap-6">
              <label className="flex flex-col w-full">
                <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2">Ciudad o clima</p>
                <input 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark h-12 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-3 text-base font-normal leading-normal" 
                  placeholder="Ej: Madrid, España" 
                />
              </label>
              
              <label className="flex flex-col w-full">
                <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2">Orientación del terreno</p>
                <select 
                  name="orientation"
                  value={formData.orientation}
                  onChange={handleChange}
                  className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark h-12 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-3 text-base font-normal leading-normal appearance-none bg-no-repeat bg-right"
                  style={{
                    backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCmvVfdTQLS2OsLKyLjkn0NYNK202LbwGB6_o3gV4_t4FScxXQwNbRRGq1bv3UEQ_s0HU99l6S-VEUzJXbXO2_KRn0T98D518dRBM1BVqL4t-d0szAa1D6k049f9SxlNeKJ4GwiWGx6yFnufeb3DnvekbqknrxsRGK60cUqp5vdNyozGjgg6E-CcRuVAxGmjj0VQ2FbiX4fF9ZDxQ2LHbB3BDSHu28_yQ30fTUZ2RxMW9Kb9eUbrsPUYFMiUxTbxLfiEcus3Vi2G80')",
                    backgroundPosition: "right 0.5rem center",
                    backgroundSize: "1.5em 1.5em"
                  }}
                >
                  <option disabled value="">Seleccionar orientación</option>
                  <option value="norte">Norte</option>
                  <option value="sur">Sur</option>
                  <option value="este">Este</option>
                  <option value="oeste">Oeste</option>
                  <option value="noreste">Noreste</option>
                  <option value="noroeste">Noroeste</option>
                  <option value="sureste">Sureste</option>
                  <option value="suroeste">Suroeste</option>
                </select>
              </label>
              
              <label className="flex flex-col w-full">
                <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2">Uso del espacio</p>
                <input 
                  name="usage"
                  value={formData.usage}
                  onChange={handleChange}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark h-12 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-3 text-base font-normal leading-normal" 
                  placeholder="Ej: Vivienda unifamiliar, oficinas, etc." 
                />
              </label>
            </div>
            
            <div className="pt-4">
              <button 
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white transition-all duration-200 hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Analizando...' : 'Generar recomendaciones'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};