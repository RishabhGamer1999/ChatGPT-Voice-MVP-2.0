import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Check } from 'lucide-react';

interface SessionFeedbackProps {
    onComplete: () => void;
}

const FeedbackOptions = [
    "It misheard me",
    "Audio issues",
    "I didn't like the responses",
    "It couldn't hear me",
    "It interrupted me",
    "Other"
];

const SessionFeedback: React.FC<SessionFeedbackProps> = ({ onComplete }) => {
    const [step, setStep] = useState<'rating' | 'details'>('rating');
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleRating = (isPositive: boolean) => {
        if (isPositive) {
            // Positive feedback immediately closes the flow
            onComplete(); 
        } else {
            // Negative feedback opens the detailed form
            setStep('details');
        }
    };

    const toggleOption = (option: string) => {
        setSelectedOptions(prev => 
            prev.includes(option) 
                ? prev.filter(o => o !== option)
                : [...prev, option]
        );
    };

    // Step 1: Thumbs Up / Down Prompt
    if (step === 'rating') {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animation-fade-in">
                 {/* Backdrop */}
                 <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onComplete}></div>
                 
                 <div className="relative bg-[#171717] rounded-3xl p-8 w-full max-w-sm text-center border border-[#2F2F2F] shadow-2xl transform transition-all">
                    <h3 className="text-white text-xl font-semibold mb-8">How was the conversation?</h3>
                    <div className="flex justify-center gap-8">
                        <button 
                            onClick={() => handleRating(true)}
                            className="group flex flex-col items-center gap-3 transition-transform active:scale-90 focus:outline-none"
                        >
                            <div className="w-16 h-16 rounded-full bg-[#2F2F2F] flex items-center justify-center group-hover:bg-[#3F3F3F] transition-colors border border-transparent group-hover:border-gray-500">
                                <ThumbsUp className="text-white group-hover:scale-110 transition-transform" size={28} />
                            </div>
                        </button>
                        <button 
                             onClick={() => handleRating(false)}
                             className="group flex flex-col items-center gap-3 transition-transform active:scale-90 focus:outline-none"
                        >
                            <div className="w-16 h-16 rounded-full bg-[#2F2F2F] flex items-center justify-center group-hover:bg-[#3F3F3F] transition-colors border border-transparent group-hover:border-gray-500">
                                <ThumbsDown className="text-white group-hover:scale-110 transition-transform" size={28} />
                            </div>
                        </button>
                    </div>
                    <button onClick={onComplete} className="mt-8 text-gray-500 text-sm font-medium hover:text-white transition-colors cursor-pointer">Skip</button>
                 </div>
            </div>
        )
    }

    // Step 2: Detailed Feedback Form (Matches Reference Image)
    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:px-4 animation-fade-in">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onComplete}></div>

            <div className="relative bg-[#546575] sm:rounded-2xl rounded-t-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-slide-up">
                 {/* Drag handle visual */}
                 <div className="flex justify-center pt-3 pb-1">
                     <div className="w-10 h-1 bg-white/30 rounded-full"></div>
                 </div>

                 <div className="px-6 py-4 overflow-y-auto custom-scrollbar">
                     <h2 className="text-xl font-bold text-white text-center mb-1">What went wrong?</h2>
                     <p className="text-gray-300 text-center text-sm mb-6">Select all that apply</p>

                     <div className="flex flex-col gap-3">
                        {FeedbackOptions.map((option) => {
                            const isSelected = selectedOptions.includes(option);
                            return (
                                <button 
                                    key={option}
                                    onClick={() => toggleOption(option)}
                                    className={`
                                        flex items-center justify-between px-4 py-4 rounded-md text-left transition-all
                                        ${isSelected ? 'bg-white/20' : 'bg-white/10 hover:bg-white/15'}
                                    `}
                                >
                                    <span className="text-white font-medium text-sm">{option}</span>
                                    <div className={`
                                        w-6 h-6 rounded border flex items-center justify-center transition-colors
                                        ${isSelected ? 'bg-white border-white' : 'border-gray-400 bg-transparent'}
                                    `}>
                                        {isSelected && <Check className="text-[#546575]" size={16} strokeWidth={3} />}
                                    </div>
                                </button>
                            )
                        })}
                     </div>
                     
                     <div className="mt-6 mb-2">
                        <p className="text-xs text-white/50 text-center leading-relaxed px-4">
                            Submitting feedback will include this full conversation to help improve ChatGPT, even if 'Improve the model for everyone' is turned off. 
                            <span className="underline ml-1">Learn more</span>
                        </p>
                     </div>
                 </div>

                 <div className="p-6 bg-[#546575] border-t border-white/10">
                     <button 
                        onClick={onComplete}
                        className="w-full bg-white/80 hover:bg-white text-[#1a202c] font-bold py-3 rounded-full transition-colors shadow-lg active:scale-[0.98]"
                     >
                        Submit feedback
                     </button>
                 </div>
            </div>
        </div>
    );
}

export default SessionFeedback;