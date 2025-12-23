import React, { useState, useEffect, useRef } from 'react';
import { AlignJustify, PanelLeft, MessageSquarePlus, Image as ImageIcon, FileText, Plus, Mic, AudioLines, Bot } from 'lucide-react';
import { DATA_MODEL } from './constants';
import { TranscriptTurn } from './types';
import Visualizer from './components/Visualizer';
import Controls from './components/Controls';
import Captions from './components/Captions';
import PrivacyBadge from './components/PrivacyBadge';
import Toast from './components/Toast';
import SessionFeedback from './components/SessionFeedback';

type SessionState = 'idle' | 'listening' | 'paused' | 'processing' | 'ended';
interface Message {
    role: 'user' | 'assistant';
    text: string;
}

const App: React.FC = () => {
  const [sessionState, setSessionState] = useState<SessionState>('idle');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCCEnabled, setIsCCEnabled] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [activeTrustSignalId, setActiveTrustSignalId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Conversation Simulation State
  const [activeConversationTurns, setActiveConversationTurns] = useState<TranscriptTurn[]>([]);
  const [transcriptIndex, setTranscriptIndex] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);
  const [confidence, setConfidence] = useState(1.0);
  
  const typingIntervalRef = useRef<number | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  // --- Helper to trigger Trust Signals ---
  const triggerTrustSignal = (triggerName: string) => {
    const signal = DATA_MODEL.trustSignals.find(s => s.trigger === triggerName);
    if (signal) {
      setActiveTrustSignalId(signal.id);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = window.setTimeout(() => {
        setActiveTrustSignalId(null);
      }, DATA_MODEL.privacyIndicators.toastNotifications.duration);
    }
  };

  // --- Typing Simulation Loop (User Speaking) ---
  useEffect(() => {
    if (sessionState !== 'listening' || activeConversationTurns.length === 0) {
      if (typingIntervalRef.current) window.clearInterval(typingIntervalRef.current);
      return;
    }

    const targetTranscript = activeConversationTurns[transcriptIndex];
    if (!targetTranscript) return;

    const words = targetTranscript.spoken.split(' ');

    if (typingIndex < words.length) {
      typingIntervalRef.current = window.setInterval(() => {
        setTypingIndex(prev => {
           const next = prev + 1;
           setCurrentText(words.slice(0, next).join(' '));
           setConfidence(targetTranscript.confidence);
           
           if (next >= words.length) {
             // Finished speaking sentence
             if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
             
             // Commit user message to history
             setMessages(prev => [...prev, { role: 'user', text: targetTranscript.displayed }]);
             
             // Move to processing
             setTimeout(() => setSessionState('processing'), 800);
           }
           return next;
        });
      }, 300); // Speed of talking
    } 

    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, [sessionState, transcriptIndex, typingIndex, activeConversationTurns]);


  // --- Processing -> Listening Loop (AI Thinking & Responding) ---
  useEffect(() => {
    if (sessionState === 'processing') {
      const targetTranscript = activeConversationTurns[transcriptIndex];
      
      // Simulate AI thinking then going back to listening
      const timer = setTimeout(() => {
        if (targetTranscript) {
             // Commit AI response to history
            setMessages(prev => [...prev, { role: 'assistant', text: targetTranscript.response }]);
        }

        setCurrentText('');
        setTypingIndex(0);
        // Loop through the CURRENT conversation turns
        setTranscriptIndex(prev => (prev + 1) % activeConversationTurns.length);
        setSessionState('listening');
      }, 2000); // Time spent "Processing"
      return () => clearTimeout(timer);
    }
  }, [sessionState, transcriptIndex, activeConversationTurns]);


  // --- Handlers ---
  const togglePause = () => {
    if (sessionState === 'listening' || sessionState === 'processing') {
      setSessionState('paused');
      triggerTrustSignal('pause-activated');
    } else if (sessionState === 'paused') {
      setSessionState('listening');
      triggerTrustSignal('resume-activated');
    }
  };

  const startVoiceMode = () => {
      // 1. Reset States
      setSessionState('listening');
      setMessages([]); 
      setTranscriptIndex(0);
      setTypingIndex(0);
      setCurrentText('');
      triggerTrustSignal('session-start');

      // 2. Select a Random Conversation
      const conversations = DATA_MODEL.conversations;
      const randomIdx = Math.floor(Math.random() * conversations.length);
      setActiveConversationTurns(conversations[randomIdx].turns);
  }

  const exitVoiceMode = () => {
    setSessionState('idle');
    setCurrentText("");
    setActiveTrustSignalId(null);
    // Trigger Feedback Flow on exit
    setShowFeedback(true);
  };

  const handleNewChat = () => {
      setMessages([]);
      setIsSidebarOpen(false);
  };

  // --- RENDER IDLE (CHAT INTERFACE) ---
  if (sessionState === 'idle') {
    return (
        <div className="relative w-screen h-screen bg-black text-white flex flex-col font-sans">
            
            {/* Feedback Modal Overlay */}
            {showFeedback && (
                <SessionFeedback onComplete={() => setShowFeedback(false)} />
            )}

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 z-40 transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar Panel */}
            <div className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-[#171717] transform transition-transform duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full p-3">
                    <div className="flex justify-between items-center mb-4 px-2">
                        <button onClick={() => setIsSidebarOpen(false)} className="hover:bg-[#212121] p-2 rounded-md transition-colors">
                            <PanelLeft className="text-gray-400" size={20} />
                        </button>
                    </div>
                    
                    {/* New Chat Button */}
                    <button 
                        onClick={handleNewChat}
                        className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-[#212121] transition-colors text-sm text-white mb-6 group cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-white text-black p-1 rounded-full group-hover:bg-gray-200 transition-colors">
                                <Plus size={14} strokeWidth={3} />
                            </div>
                            <span className="font-medium">New chat</span>
                        </div>
                        <Bot size={16} className="text-gray-500" />
                    </button>

                    {/* History */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <div className="mb-6">
                            <h3 className="text-xs font-medium text-gray-500 px-3 mb-2">Today</h3>
                            {['React Hooks Help', 'Paneer Recipe', 'Debug Python Code'].map((item, i) => (
                                <div key={i} className="px-3 py-2 text-sm text-gray-100 hover:bg-[#212121] rounded-lg cursor-pointer truncate transition-colors">
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xs font-medium text-gray-500 px-3 mb-2">Yesterday</h3>
                            {['Japan Trip Planning', 'Fitness Advice'].map((item, i) => (
                                <div key={i} className="px-3 py-2 text-sm text-gray-100 hover:bg-[#212121] rounded-lg cursor-pointer truncate transition-colors">
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xs font-medium text-gray-500 px-3 mb-2">Previous 7 Days</h3>
                            {['Movie Suggestions', 'Startup MVP Ideas', 'Cricket World Cup', 'Gift Ideas for Mom'].map((item, i) => (
                                <div key={i} className="px-3 py-2 text-sm text-gray-100 hover:bg-[#212121] rounded-lg cursor-pointer truncate transition-colors">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* User Profile */}
                    <div className="mt-auto pt-2 border-t border-[#2F2F2F]">
                        <button className="w-full flex items-center gap-3 px-2 py-3 hover:bg-[#212121] rounded-lg transition-colors cursor-pointer">
                            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-xs font-bold text-white">U</div>
                            <div className="flex flex-col items-start">
                                <span className="text-sm font-medium">User</span>
                                <span className="text-xs text-gray-400">Plus Plan</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>


            {/* Header */}
            <div className="flex justify-between items-center p-4 sticky top-0 bg-black z-10">
                <button onClick={() => setIsSidebarOpen(true)} className="p-1 rounded-md hover:bg-[#212121] transition-colors">
                    <AlignJustify className="text-gray-400 cursor-pointer" />
                </button>
                <div className="flex items-center gap-1 bg-[#212121] px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer hover:bg-[#2f2f2f]">
                    ChatGPT <span className="text-gray-400 text-xs">v4.0</span>
                </div>
                <div className="flex gap-4">
                    <MessageSquarePlus className="text-white cursor-pointer" />
                    <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer">U</div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow flex flex-col overflow-y-auto custom-scrollbar">
                {messages.length === 0 ? (
                    // Empty State
                    <div className="flex-grow flex flex-col items-center justify-center gap-8 px-4">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 text-black">
                            <span className="text-2xl font-bold"></span>
                        </div>
                        <h1 className="text-2xl font-semibold text-center">What can I help with?</h1>
                        
                        <div className="flex gap-2 w-full max-w-sm">
                            <button className="flex-1 bg-[#212121] rounded-xl p-3 flex items-center gap-2 text-sm text-gray-200 hover:bg-[#2f2f2f] transition-colors">
                                <ImageIcon size={16} className="text-green-400" />
                                Create image
                            </button>
                            <button className="flex-1 bg-[#212121] rounded-xl p-3 flex items-center gap-2 text-sm text-gray-200 hover:bg-[#2f2f2f] transition-colors">
                                <FileText size={16} className="text-orange-400" />
                                Summarize text
                            </button>
                        </div>
                    </div>
                ) : (
                    // Chat History State
                    <div className="flex-grow flex flex-col gap-6 p-4 max-w-3xl mx-auto w-full pb-8">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'assistant' && (
                                    <div className="w-8 h-8 bg-[#10a37f] rounded-full flex-shrink-0 flex items-center justify-center mt-1">
                                        <Bot size={18} className="text-white" />
                                    </div>
                                )}
                                <div 
                                    className={`px-4 py-3 rounded-2xl max-w-[85%] text-[15px] leading-relaxed
                                        ${msg.role === 'user' 
                                            ? 'bg-[#2F2F2F] text-white rounded-tr-sm' 
                                            : 'text-white'}`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom Bar */}
            <div className="p-4 mb-2 max-w-3xl mx-auto w-full">
                <div className="bg-[#212121] rounded-full flex items-center p-2 pl-4 gap-3">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-500">
                        <Plus size={20} className="text-white" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Ask ChatGPT" 
                        className="flex-grow bg-transparent outline-none text-white placeholder-gray-400"
                        readOnly
                    />
                     <div className="flex gap-1 pr-1">
                        <Mic size={24} className="text-white opacity-60 p-1 cursor-pointer hover:opacity-100" />
                        <button onClick={startVoiceMode} className="p-2 bg-transparent hover:bg-gray-700 rounded-full transition-colors">
                            <AudioLines size={24} className="text-white" />
                        </button>
                     </div>
                </div>
            </div>
        </div>
    );
  }

  // --- RENDER VOICE MODE (ACTIVE INTERFACE) ---
  return (
    <div 
      className="relative w-screen h-screen overflow-hidden flex flex-col bg-black text-white"
    >
      {/* Trust Signal Toasts */}
      <Toast messageId={activeTrustSignalId} />

      {/* Top Left Header */}
      <PrivacyBadge status={sessionState} />

      {/* Main Visualizer Area */}
      <div className="flex-grow relative flex items-center justify-center">
         <Visualizer state={sessionState} />
         
         {/* Captions Overlay */}
         <Captions 
            text={currentText} 
            isVisible={isCCEnabled && (sessionState === 'listening' || sessionState === 'processing')} 
            confidence={confidence}
         />
      </div>

      {/* Bottom Controls */}
      <Controls 
        sessionState={sessionState}
        isCCEnabled={isCCEnabled}
        onToggleCC={() => setIsCCEnabled(!isCCEnabled)}
        onTogglePause={togglePause}
        onEndSession={() => {}}
        onExit={exitVoiceMode}
      />
    </div>
  );
};

export default App;