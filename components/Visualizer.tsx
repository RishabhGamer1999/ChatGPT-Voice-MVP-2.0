import React from 'react';
import { DATA_MODEL } from '../constants';

interface VisualizerProps {
  state: 'listening' | 'paused' | 'processing' | 'idle' | 'ended';
}

const Visualizer: React.FC<VisualizerProps> = ({ state }) => {
  const activeConfig = DATA_MODEL.uiConfig.visualStates.active;

  // Render a static circle for paused state
  if (state === 'paused' || state === 'idle' || state === 'ended') {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div
          style={{
            height: '100px',
            width: '100px',
            backgroundColor: '#333333',
            borderRadius: '50%',
            transition: 'all 0.4s ease-out'
          }}
        />
      </div>
    );
  }

  // Active Blob Animation
  // We use the 'blob-pulse' keyframe defined in index.html
  const isProcessing = state === 'processing';
  
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="relative">
            {/* Core Blob */}
            <div 
                style={{
                    width: '300px',
                    height: '300px',
                    backgroundColor: activeConfig.visualizer.colors.primary,
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                    animation: isProcessing 
                        ? 'blob-pulse 4s infinite ease-in-out' // Slower when thinking
                        : 'blob-pulse 2s infinite ease-in-out', // Faster when listening
                    opacity: isProcessing ? 0.7 : 0.9,
                    transition: 'all 0.5s ease'
                }}
            />
            
            {/* Inner sharper blob for texture */}
            <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                    width: '180px',
                    height: '180px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    filter: 'blur(20px)',
                    animation: isProcessing 
                        ? 'blob-pulse 4s infinite ease-in-out reverse' 
                        : 'blob-pulse 2.5s infinite ease-in-out reverse',
                    opacity: 1
                }}
            />
        </div>
    </div>
  );
};

export default Visualizer;