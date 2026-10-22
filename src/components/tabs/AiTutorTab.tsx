import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Copy, 
  Check, 
  Bookmark, 
  HelpCircle, 
  ShieldAlert, 
  RotateCcw,
  BookOpen,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  followUps?: string[];
  saved?: boolean;
}

export const AiTutorTab: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'ai',
      text: 'What would you like to learn today?\n\nI am your **StudiRad AI Radiography Specialist**. I can help you clarify complex imaging physics, review skeletal positioning protocols, prepare for clinical viva exams, and understand acute scan artifacts.',
      timestamp: 'Just now',
      followUps: [
        'Explain CT image reconstruction (Filtered Back Projection vs Iterative)',
        'What are the key radiographic signs of a tension pneumothorax?',
        'How does increasing kVp affect digital radiographic contrast?',
      ],
    },
  ]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Generate accurate, structured clinical radiography responses
    setTimeout(() => {
      const lower = query.toLowerCase();
      let aiResponse = '';
      let followUps: string[] = [];

      if (lower.includes('ct') && lower.includes('reconstruction')) {
        aiResponse = `### CT Image Reconstruction: Core Principles\n\n1. **Filtered Back Projection (FBP)**:\n   - Historical gold standard using Fourier slice theorem.\n   - High spatial resolution but amplifies high-frequency noise at lower radiation doses.\n\n2. **Iterative Reconstruction (IR & MBIR)**:\n   - Recursively compares simulated forward-projected data with raw detector measurements.\n   - **Clinical Advantage**: Reduces image noise by 30%–60%, allowing significant patient dose reduction while preserving low-contrast diagnostic detail.\n\n3. **Deep Learning Reconstruction (DLR)**:\n   - Deep convolutional neural networks trained on high-dose ground-truth data, providing instant noise suppression without the "plastic/waxy" appearance of older IR engines.`;
        followUps = [
          'How do iterative reconstruction algorithms reduce streak artifact?',
          'What is the difference between Hounsfield units of air, water, and bone?',
        ];
      } else if (lower.includes('pneumothorax')) {
        aiResponse = `### Tension Pneumothorax: Critical Radiographic Signs\n\n⚠️ *Clinical Emergency*: Diagnosis is primarily clinical, but when imaged:\n\n- **Visceral Pleural Line**: Crisp hair-thin radiopaque line with absence of peripheral lung markings.\n- **Mediastinal & Tracheal Shift**: Progressive displacement of the trachea and cardiac silhouette *contralateral* (away from the affected side).\n- **Depression of Hemidiaphragm**: Flattening or inversion of the ipsilateral diaphragm.\n- **Deep Sulcus Sign**: Exceptionally deep, lucent costophrenic angle visible on supine trauma radiographs.`;
        followUps = [
          'How do you differentiate a skin fold from a true pneumothorax?',
          'What are the emergency needle decompression landmarks?',
        ];
      } else if (lower.includes('kvp') || lower.includes('mas') || lower.includes('contrast')) {
        aiResponse = `### kVp vs mAs: Digital Radiographic Principles\n\n- **kVp (Kilovoltage Peak)** determines beam **quality** (penetrating power). Higher kVp increases Compton scatter relative to photoelectric absorption, reducing subject contrast.\n- **mAs (Milliampere-Seconds)** governs beam **quantity** (total number of photons). Quantum mottle (noise) is reduced by sufficient mAs.\n\n💡 **Radiation Safety Rule**: Modern digital systems decouple density from exposure. Always use the highest acceptable kVp and lowest mAs to keep patient dose as low as reasonably achievable (**ALARA**).`;
        followUps = [
          'What causes dose creep in digital radiography?',
          'How do anti-scatter grids impact patient dose?',
        ];
      } else {
        aiResponse = `### Clinical Radiography Overview: "${query}"\n\n- **Key Imaging Principle**: Evaluate anatomical alignment, spatial resolution, and signal-to-noise ratio in accordance with accredited HCPC/ISRRT protocol standards.\n- **Patient Safety & ALARA**: Ensure collimation is tight to anatomical borders and check appropriate Diagnostic Reference Levels (DRLs).\n- **Diagnostic Pitfall**: Always review orthogonal projections (two views 90° apart) before clearing orthopedic fractures.`;
        followUps = [
          'Explain this in simpler terms',
          'Generate 2 practice quiz questions on this topic',
        ];
      }

      const aiMsg: ChatMessage = {
        id: 'ai_' + Date.now(),
        sender: 'ai',
        text: aiResponse,
        timestamp: 'Just now',
        followUps,
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSave = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, saved: !m.saved } : m))
    );
  };

  const handleQuickAction = (actionType: string) => {
    switch (actionType) {
      case 'simple':
        handleSendMessage('Explain radiographic positioning principles in very simple terms for a beginner student.');
        break;
      case 'quiz':
        handleSendMessage('Generate 2 practice radiography questions with clinical explanations.');
        break;
      case 'positioning':
        handleSendMessage('Explain positioning protocols for suspected cervical spine trauma.');
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex-1 w-full bg-[#F8FAFC] dark:bg-[#0B0F17] flex flex-col justify-between text-left text-slate-900 dark:text-slate-100 overflow-hidden">
      {/* Header Banner */}
      <div className="px-4 py-2.5 bg-white dark:bg-[#121824] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#002147] to-[#0A3060] text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4 text-[#FF7F32]" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>StudiRad AI Radiography Tutor</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </h2>
            <span className="text-[10px] text-slate-400">Trained on clinical imaging standards</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMessages(messages.slice(0, 1))}
            className="text-[11px] font-semibold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center gap-1"
            title="Reset conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Quick Action Chips Bar */}
      <div className="px-4 py-2 bg-slate-50/80 dark:bg-[#161F30]/80 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
        <button
          onClick={() => handleQuickAction('simple')}
          className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#002147] dark:text-blue-300 border border-blue-200 dark:border-blue-900/50 text-[11px] font-semibold whitespace-nowrap hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
        >
          💡 Explain in simple terms
        </button>
        <button
          onClick={() => handleQuickAction('quiz')}
          className="px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-900/50 text-[11px] font-semibold whitespace-nowrap hover:bg-purple-100 dark:hover:bg-purple-900/60 transition-colors"
        >
          ❓ Practice questions
        </button>
        <button
          onClick={() => handleQuickAction('positioning')}
          className="px-2.5 py-1 rounded-full bg-orange-50 dark:bg-orange-950/40 text-[#FF7F32] dark:text-orange-300 border border-orange-200 dark:border-orange-900/50 text-[11px] font-semibold whitespace-nowrap hover:bg-orange-100 dark:hover:bg-orange-900/60 transition-colors"
        >
          🦴 Positioning guide
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            {/* Sender lockup */}
            <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] font-bold text-slate-400">
              {msg.sender === 'ai' ? (
                <>
                  <Bot className="w-3 h-3 text-[#FF7F32]" />
                  <span>StudiRad AI</span>
                </>
              ) : (
                <>
                  <span>You</span>
                  <User className="w-3 h-3 text-[#002147] dark:text-[#38BDF8]" />
                </>
              )}
            </div>

            {/* Message Bubble */}
            <div
              className={`p-3.5 rounded-2xl max-w-[90%] text-xs shadow-2xs leading-relaxed whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'bg-[#002147] dark:bg-[#1A365D] text-white rounded-br-xs'
                  : 'bg-white dark:bg-[#121824] border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-xs'
              }`}
            >
              {msg.text}

              {/* AI Message Action Buttons */}
              {msg.sender === 'ai' && (
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="hover:text-slate-700 dark:hover:text-slate-200 flex items-center gap-1 transition-colors"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <span>·</span>
                    <button
                      onClick={() => handleSave(msg.id)}
                      className={`flex items-center gap-1 transition-colors ${
                        msg.saved ? 'text-[#FF7F32] font-semibold' : 'hover:text-slate-700 dark:hover:text-slate-200'
                      }`}
                    >
                      <Bookmark className={`w-3 h-3 ${msg.saved ? 'fill-[#FF7F32]' : ''}`} />
                      <span>{msg.saved ? 'Saved' : 'Save'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Follow-up suggestions */}
            {msg.followUps && msg.followUps.length > 0 && (
              <div className="mt-2 space-y-1 w-full max-w-[90%] pl-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Related follow-up:
                </span>
                {msg.followUps.map((fu, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(fu)}
                    className="w-full text-left p-2 rounded-xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 hover:border-[#002147] dark:hover:border-[#38BDF8] text-[11px] text-slate-700 dark:text-slate-200 flex items-center justify-between group transition-colors shadow-2xs"
                  >
                    <span>{fu}</span>
                    <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-[#FF7F32] transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Box Bottom Bar */}
      <div className="p-3 bg-white dark:bg-[#121824] border-t border-slate-200/90 dark:border-slate-800 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about scan protocols, anatomy, radiation physics..."
            className="flex-1 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-[#1A2234] border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002147] dark:focus:ring-[#38BDF8] focus:bg-white dark:focus:bg-[#121824] transition-all"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-xl bg-[#002147] hover:bg-[#001733] text-white flex items-center justify-center disabled:opacity-40 shadow-xs transition-all shrink-0 active:scale-95"
          >
            <Send className="w-4 h-4 text-[#FF7F32]" />
          </button>
        </form>
        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 px-1">
          <span>StudiRad AI is an academic revision tool. Verify clinically.</span>
        </div>
      </div>
    </div>
  );
};
