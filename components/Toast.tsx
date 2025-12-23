import React from 'react';
import { ShieldCheck, Lock, Download, Mic, Globe } from 'lucide-react';
import { DATA_MODEL } from '../constants';

interface ToastProps {
  messageId: string | null;
}

const Toast: React.FC<ToastProps> = ({ messageId }) => {
  if (!messageId) return null;

  const trustSignal = DATA_MODEL.trustSignals.find(t => t.id === messageId);
  if (!trustSignal) return null;

  const { toastNotifications } = DATA_MODEL.privacyIndicators;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield-check': return <ShieldCheck size={20} className="text-blue-400" />;
      case 'lock': return <Lock size={20} className="text-green-400" />;
      case 'download': return <Download size={20} className="text-green-400" />;
      case 'mic': return <Mic size={20} className="text-blue-400" />;
      case 'globe': return <Globe size={20} className="text-purple-400" />;
      default: return <ShieldCheck size={20} />;
    }
  };

  return (
    <div 
        className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-xl shadow-2xl animate-bounce"
        style={{ 
            backgroundColor: '#1A202C', 
            border: '1px solid #2D3748',
            animationDuration: '0.5s',
            animationIterationCount: 1 
        }}
    >
        {getIcon(trustSignal.icon)}
        <span className="text-sm font-medium text-white">{trustSignal.message}</span>
    </div>
  );
};

export default Toast;
