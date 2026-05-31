import React, { useState, useRef, useEffect } from 'react';

const COUNTRIES = [
  { code: 'BR', flag: '🇧🇷', name: 'Brasil', ddi: '+55', mask: '(##) #####-####' },
  { code: 'PT', flag: '🇵🇹', name: 'Portugal', ddi: '+351', mask: '### ### ###' },
  { code: 'US', flag: '🇺🇸', name: 'EUA', ddi: '+1', mask: '(###) ###-####' },
  { code: 'ES', flag: '🇪🇸', name: 'Espanha', ddi: '+34', mask: '### ### ###' },
  { code: 'AR', flag: '🇦🇷', name: 'Argentina', ddi: '+54', mask: '## ####-####' },
  { code: 'MX', flag: '🇲🇽', name: 'México', ddi: '+52', mask: '## #### ####' },
  { code: 'CO', flag: '🇨🇴', name: 'Colômbia', ddi: '+57', mask: '### ### ####' },
  { code: 'CL', flag: '🇨🇱', name: 'Chile', ddi: '+56', mask: '# #### ####' },
  { code: 'PE', flag: '🇵🇪', name: 'Peru', ddi: '+51', mask: '### ### ###' },
  { code: 'UY', flag: '🇺🇾', name: 'Uruguai', ddi: '+598', mask: '## ### ####' },
  { code: 'DE', flag: '🇩🇪', name: 'Alemanha', ddi: '+49', mask: '#### #######' },
  { code: 'IT', flag: '🇮🇹', name: 'Itália', ddi: '+39', mask: '### ### ####' },
  { code: 'FR', flag: '🇫🇷', name: 'França', ddi: '+33', mask: '# ## ## ## ##' },
  { code: 'GB', flag: '🇬🇧', name: 'Reino Unido', ddi: '+44', mask: '#### ######' },
  { code: 'JP', flag: '🇯🇵', name: 'Japão', ddi: '+81', mask: '### #### ####' },
  { code: 'AO', flag: '🇦🇴', name: 'Angola', ddi: '+244', mask: '### ### ###' },
  { code: 'MZ', flag: '🇲🇿', name: 'Moçambique', ddi: '+258', mask: '## ### ####' },
  { code: 'CV', flag: '🇨🇻', name: 'Cabo Verde', ddi: '+238', mask: '### ## ##' },
];

function applyMask(value: string, mask: string): string {
  const digits = value.replace(/\D/g, '');
  let result = '';
  let di = 0;
  for (let i = 0; i < mask.length && di < digits.length; i++) {
    if (mask[i] === '#') {
      result += digits[di];
      di++;
    } else {
      result += mask[i];
    }
  }
  return result;
}

interface PhoneInputProps {
  value: string;
  onChange: (fullPhone: string) => void;
  countryCode?: string;
  onCountryChange?: (code: string) => void;
  accentColor?: string;
  required?: boolean;
}

export default function PhoneInput({
  value,
  onChange,
  countryCode = 'BR',
  onCountryChange,
  accentColor = '#22C55E',
  required = false,
}: PhoneInputProps) {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState(countryCode);
  const ref = useRef<HTMLDivElement>(null);

  const selected = COUNTRIES.find(c => c.code === country) || COUNTRIES[0];

  // Strip DDI from stored value to get local part
  const localValue = value.replace(new RegExp(`^\\+?${selected.ddi.replace('+', '')}\\s*`), '').trim();
  const maskedValue = applyMask(localValue, selected.mask);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSelect = (code: string) => {
    setCountry(code);
    setOpen(false);
    const c = COUNTRIES.find(x => x.code === code) || COUNTRIES[0];
    // Rebuild full phone with new DDI
    const fullPhone = localValue ? `${c.ddi} ${localValue}` : '';
    onChange(fullPhone);
    onCountryChange?.(code);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const c = COUNTRIES.find(x => x.code === country) || COUNTRIES[0];
    const fullPhone = raw ? `${c.ddi} ${raw}` : '';
    onChange(fullPhone);
  };

  return (
    <div className="relative" ref={ref}>
      <label className="text-gray-300 text-sm font-semibold block mb-1 flex items-center gap-1.5">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="inline">
          <path d="M3 5.5C3 14.06 9.94 21 18.5 21c.83 0 1.5-.67 1.5-1.5v-2.81c0-.76-.57-1.39-1.32-1.49l-2.69-.34a1.5 1.5 0 0 0-1.56.77l-.56 1.12a11.04 11.04 0 0 1-5.04-5.04l1.12-.56a1.5 1.5 0 0 0 .77-1.56l-.34-2.69A1.5 1.5 0 0 0 8.81 3H6.5C5.67 3 5 3.67 5 4.5 5 4.83 5 5.16 5.03 5.5" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        WhatsApp {required && '*'}
      </label>
      <div className="flex gap-0">
        {/* DDI Dropdown */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1 bg-black/80 border border-white/20 border-r-0 rounded-l-xl px-3 py-3 text-white hover:bg-white/5 transition-colors flex-shrink-0"
          style={{ minWidth: '80px' }}
        >
          <span className="text-lg">{selected.flag}</span>
          <span className="text-sm text-gray-300">{selected.ddi}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" className={`ml-0.5 transition-transform ${open ? 'rotate-180' : ''}`}>
            <path d="M3 4.5L6 7.5L9 4.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Phone Input */}
        <input
          type="tel"
          placeholder={selected.mask.replace(/#/g, '0')}
          value={maskedValue}
          onChange={handleInput}
          className="w-full bg-black/80 border border-white/20 rounded-r-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none"
          style={{ borderColor: undefined, '--tw-ring-color': accentColor } as React.CSSProperties}
          onFocus={(e) => { e.currentTarget.style.borderColor = accentColor; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = ''; }}
          required={required}
        />
      </div>

      {/* Dropdown list */}
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-[#1a1a1a] border border-white/20 rounded-xl shadow-2xl z-50 max-h-56 overflow-y-auto w-64">
          {COUNTRIES.map(c => (
            <button
              key={c.code}
              type="button"
              onClick={() => handleSelect(c.code)}
              className={`flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-white/10 transition-colors ${
                c.code === country ? 'bg-white/5' : ''
              }`}
            >
              <span className="text-lg">{c.flag}</span>
              <span className="text-white text-sm flex-1">{c.name}</span>
              <span className="text-gray-400 text-xs">{c.ddi}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
