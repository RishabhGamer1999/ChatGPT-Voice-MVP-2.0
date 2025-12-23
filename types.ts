export interface ButtonConfig {
    id: string;
    label: string;
    fullLabel?: string;
    size: { width: string; height: string };
    colors: { default: string; hover: string; active: string; paused?: string };
    icon: string | { listening: string; paused: string };
    position: { location: string; offsetX?: string; offsetY?: string };
    tooltip?: any;
    states?: any;
  }
  
  export interface VisualStateConfig {
    name: string;
    visualizer: {
      type: string;
      colors: { primary: string; secondary: string; glow?: string };
      bars?: { count: number; width: string; gap: string; borderRadius: string };
      line?: { height: string; width: string; opacity: number; borderRadius: string };
    };
    background: { color: string; overlay: string };
  }

  export interface TranscriptTurn {
    id: string;
    type: string;
    spoken: string;
    displayed: string;
    confidence: number;
    response: string;
  }
  
  export interface AppDataModel {
    metadata: any;
    uiConfig: {
      buttons: {
        ccButton: any;
        pauseButton: any;
        endButton: any;
        exitButton: any;
      };
      visualStates: {
        active: VisualStateConfig;
        paused: VisualStateConfig;
      };
    };
    captionSystem: {
      settings: any;
      typography: any;
      confidenceIndicator: {
        showThreshold: number;
        lowConfidenceStyle: { textDecoration: string; color: string };
        tooltip: string;
      };
    };
    // Deprecated but kept for type safety if needed, preferring conversations below
    sampleTranscripts: Array<TranscriptTurn>;
    conversations: Array<{
        id: string;
        category: string;
        turns: Array<TranscriptTurn>;
    }>;
    privacyIndicators: {
        activeListening: any;
        pausedPrivate: any;
        toastNotifications: any;
    };
    trustSignals: Array<{
        id: string;
        trigger: string;
        message: string;
        icon: string;
        type: string;
    }>;
  }