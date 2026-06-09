import React, { useState, useEffect } from 'react';

const MESSAGES = [
  { from: 'bot' as const, text: 'Oi, tudo bem? 😊', delay: 0 },
  { from: 'bot' as const, text: 'Me conta: qual parte do seu atendimento você quer automatizar?', delay: 1800 },
  { from: 'user' as const, text: 'Quero automatizar o WhatsApp da minha clínica', delay: 4200 },
  { from: 'bot' as const, text: 'Show! Clínica é o nosso forte 🦷', delay: 6200 },
  { from: 'bot' as const, text: 'Quer ver como funciona na prática?', delay: 8200 },
];

const TypingDots = () => (
  <div className="flex gap-1 px-4 py-3">
    <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
    <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
    <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
  </div>
);

export default function SDRPreview() {
  const [visibleMessages, setVisibleMessages] = useState<typeof MESSAGES>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentDelay, setCurrentDelay] = useState(0);

  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];

    MESSAGES.forEach((msg, i) => {
      // Typing indicator before bot messages
      if (msg.from === 'bot') {
        const typingTimer = setTimeout(() => {
          setIsTyping(true);
        }, msg.delay - 600);
        timers.push(typingTimer);
      }

      // Show message
      const showTimer = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages(prev => [...prev, msg]);
      }, msg.delay);
      timers.push(showTimer);
    });

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <div className="max-w-sm mx-auto">
      {/* Phone frame */}
      <div className="bg-[#0d1117] rounded-3xl border border-white/10 overflow-hidden shadow-2xl shadow-green-500/5">
        {/* Header */}
        <div className="bg-[#111820] px-4 py-3 flex items-center gap-3 border-b border-white/5">
          <div className="w-9 h-9 rounded-full bg-green-500/20 flex items-center justify-center">
            <span className="text-green-400 text-sm font-bold">SB</span>
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-semibold">Sistema Britto</p>
            <p className="text-green-400 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              Online agora
            </p>
          </div>
        </div>

        {/* Chat area */}
        <div className="p-4 space-y-3 min-h-[260px]">
          {visibleMessages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} animate-[fadeIn_0.3s_ease-out]`}
              style={{ animation: 'fadeIn 0.3s ease-out' }}
            >
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.from === 'user'
                    ? 'bg-green-600 text-white rounded-br-md'
                    : 'bg-white/10 text-gray-200 rounded-bl-md'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/10 rounded-2xl rounded-bl-md">
                <TypingDots />
              </div>
            </div>
          )}
        </div>

        {/* Input bar (decorative) */}
        <div className="px-4 py-3 bg-[#111820] border-t border-white/5 flex items-center gap-2">
          <div className="flex-1 bg-white/5 rounded-full px-4 py-2 text-gray-500 text-xs">
            Digite sua mensagem...
          </div>
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
