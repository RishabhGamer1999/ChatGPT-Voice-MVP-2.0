import React from 'react';
import { DATA_MODEL } from '../constants';

interface PrivacyBadgeProps {
  status: 'listening' | 'paused' | 'processing' | 'idle' | 'ended';
}

const PrivacyBadge: React.FC<PrivacyBadgeProps> = ({ status }) => {
  return (
    <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
        <div className="flex items-center gap-2 text-white">
            <span className="font-semibold text-lg">ChatGPT</span>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <span className="text-gray-400 font-medium text-sm">Advanced Voice</span>
        </div>
    </div>
  );
};

export default PrivacyBadge;