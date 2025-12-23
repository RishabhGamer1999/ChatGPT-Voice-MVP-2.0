import React from 'react';
import { DATA_MODEL } from '../constants';

interface CaptionsProps {
  text: string;
  isVisible: boolean;
  confidence?: number;
}

const Captions: React.FC<CaptionsProps> = ({ text, isVisible, confidence = 1.0 }) => {
  if (!isVisible || !text) return null;

  const { settings, typography, confidenceIndicator } = DATA_MODEL.captionSystem;
  
  // Split text into words to simulate confidence checking on specific words
  const words = text.split(' ');

  return (
    <div 
        className="absolute w-full flex justify-center pointer-events-none z-10 transition-all duration-300"
        style={{ top: '50%', transform: `translateY(${settings.position.offsetY})` }}
    >
      <div 
        style={{
            maxWidth: settings.container.maxWidth,
            padding: settings.container.padding,
            borderRadius: settings.container.borderRadius,
            backgroundColor: settings.container.backgroundColor,
            backdropFilter: settings.container.backdropFilter,
        }}
      >
        <p style={{
            fontFamily: typography.fontFamily,
            fontSize: typography.fontSize,
            fontWeight: typography.fontWeight,
            lineHeight: typography.lineHeight,
            color: typography.color,
            textAlign: typography.textAlign as any,
            margin: 0
        }}>
            {words.map((word, index) => {
                // Simulate low confidence on longer words if overall confidence is slightly low
                // This is a simulation logic to match the "MVP" requirement without real STT
                const isLowConfidence = confidence < 0.95 && word.length > 5 && index % 3 === 0;

                const style = isLowConfidence ? {
                    textDecoration: confidenceIndicator.lowConfidenceStyle.textDecoration,
                    color: confidenceIndicator.lowConfidenceStyle.color,
                    cursor: 'help'
                } : {};

                return (
                    <span key={index} style={style} title={isLowConfidence ? confidenceIndicator.tooltip : undefined}>
                        {word}{' '}
                    </span>
                );
            })}
        </p>
      </div>
    </div>
  );
};

export default Captions;
