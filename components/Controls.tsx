import React from 'react';
import { Mic, Pause, X, AlignJustify } from 'lucide-react';
import { DATA_MODEL } from '../constants';

interface ControlsProps {
  sessionState: 'listening' | 'paused' | 'processing' | 'idle' | 'ended';
  isCCEnabled: boolean;
  onToggleCC: () => void;
  onTogglePause: () => void;
  onEndSession: () => void; // Used for saving
  onExit: () => void;
}

const Controls: React.FC<ControlsProps> = ({ 
  sessionState, 
  isCCEnabled, 
  onToggleCC, 
  onTogglePause, 
  onExit 
}) => {
  const { ccButton, pauseButton, exitButton } = DATA_MODEL.uiConfig.buttons;

  const isPaused = sessionState === 'paused';
  // Note: ChatGPT's UI shows a pause icon when it is listening (allowing you to pause), 
  // and a mic icon (or similar) when it is paused (allowing you to resume/speak).
  // When the state is LISTENING, we show the PAUSE icon.
  // When the state is PAUSED, we show the MIC icon (to resume).

  // --- Styles for CC Button ---
  const ccState = isCCEnabled ? ccButton.states.on : ccButton.states.off;
  const ccStyle = {
    backgroundColor: ccState.backgroundColor,
    color: ccState.textColor,
    width: ccButton.size.width,
    height: ccButton.size.height,
    left: ccButton.position.offsetX,
    bottom: ccButton.position.offsetY,
  };

  // --- Styles for Center Action Button ---
  const pauseStyle = {
    backgroundColor: pauseButton.colors.default,
    width: pauseButton.size.width,
    height: pauseButton.size.height,
    bottom: '32px', 
  };

  // --- Styles for Exit Button ---
  const exitStyle = {
    backgroundColor: exitButton.colors.default,
    color: "#EF4444", // Red color for X
    width: exitButton.size.width,
    height: exitButton.size.height,
    right: exitButton.position.offsetX,
    bottom: exitButton.position.offsetY, // Exit is now at bottom right in Voice Mode
  };

  return (
    <>
      {/* Left: CC Button */}
      <button
        onClick={onToggleCC}
        className="absolute rounded-full flex items-center justify-center hover:opacity-80 transition-all z-20 cursor-pointer"
        style={ccStyle}
      >
        <span className="font-semibold text-sm">cc</span>
      </button>

      {/* Center: Main Action (Pause/Resume) */}
      {/* Added pointer-events-none to container so it doesn't block the CC button which sits underneath in stacking order */}
      <div className="absolute left-0 right-0 flex justify-center z-20 pointer-events-none" style={{ bottom: '32px' }}>
        <button
          onClick={onTogglePause}
          className="rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all pointer-events-auto cursor-pointer"
          style={pauseStyle}
        >
          {/* If Paused, show Mic (to resume). If Listening, show Pause (to stop). */}
          {isPaused ? (
             <Mic size={32} color="#000000" />
          ) : (
             <Pause size={32} color="#000000" fill="#000000" />
          )}
        </button>
      </div>

      {/* Right: Exit Button */}
      <button 
        onClick={onExit}
        className="absolute rounded-full flex items-center justify-center hover:opacity-80 transition-all z-20 cursor-pointer"
        style={exitStyle}
      >
        <X size={24} color="#EF4444" />
      </button>
    </>
  );
};

export default Controls;