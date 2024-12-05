import React, { useState } from 'react';

const OceanHumanComparison = () => {
  const [selectedSystem, setSelectedSystem] = useState(null);

  const systemComparisons = {
    heart: {
      human: "Circulatory System",
      ocean: "Marine Currents",
      description: "Just as the heart pumps blood, ocean currents distribute heat, nutrients, and regulate global climate."
    },
    lungs: {
      human: "Respiratory System", 
      ocean: "Photosynthetic Processes",
      description: "Oceans, through phytoplankton, produce over 50% of Earth's oxygen, similar to lungs' gas exchange."
    },
    brain: {
      human: "Nervous System",
      ocean: "Ecosystem Communication",
      description: "Ocean ecosystems communicate and respond to changes, much like neural networks in the brain."
    },
    stomach: {
      human: "Digestive System",
      ocean: "Carbon Absorption",
      description: "Oceans absorb and process carbon dioxide, functioning like a global digestive system."
    },
    kidney: {
      human: "Filtration System",
      ocean: "Water Salinity Regulation",
      description: "Oceans regulate salt and mineral content, similar to kidneys filtering human body fluids."
    }
  };

  const renderIcon = (key) => {
    const iconStyles = "w-12 h-12 mx-auto mb-2 text-blue-600";
    switch(key) {
      case 'heart':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={iconStyles} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        );
      case 'lungs':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={iconStyles} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 22c-3 0-7-4-7-9V6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7c0 5-4 9-7 9z"/>
          </svg>
        );
      case 'brain':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={iconStyles} fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 4a2 2 0 1 1 4 0v2H8V4zm8 0a2 2 0 1 1 4 0v2h-4V4zm-8 14a2 2 0 1 1-4 0v-2h4v2zm8 0a2 2 0 1 1-4 0v-2h4v2z"/>
          </svg>
        );
      case 'stomach':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={iconStyles} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2c-4.4 0-8 3.6-8 8v4c0 4.4 3.6 8 8 8s8-3.6 8-8v-4c0-4.4-3.6-8-8-8z"/>
          </svg>
        );
      case 'kidney':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={iconStyles} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 11c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
        Ocean: A Living Body
      </h1>
      <div className="grid grid-cols-5 gap-4">
        {Object.entries(systemComparisons).map(([key, system]) => (
          <div 
            key={key} 
            onClick={() => setSelectedSystem(key)}
            className={`
              p-4 rounded-lg cursor-pointer transition-all 
              ${selectedSystem === key 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-blue-800 hover:bg-blue-100'}
            `}
          >
            {renderIcon(key)}
            <h2 className="text-center font-semibold">{system.human}</h2>
          </div>
        ))}
      </div>
      
      {selectedSystem && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-blue-800">
            {systemComparisons[selectedSystem].human} vs Ocean
          </h3>
          <p className="text-gray-700">
            {systemComparisons[selectedSystem].description}
          </p>
        </div>
      )}
    </div>
  );
};

export default OceanHumanComparison;