import { useRef, useEffect } from 'react';

/**
 * OtpInput – 6 individual digit boxes with auto-advance and paste support.
 * Props: value (string[6]), onChange (newValue: string) => void
 */
const OtpInput = ({ value, onChange, disabled = false }) => {
  const inputsRef = useRef([]);

  const digits = Array.from({ length: 6 }, (_, i) => value[i] || '');

  const focusNext = (index) => {
    if (index < 5) inputsRef.current[index + 1]?.focus();
  };
  const focusPrev = (index) => {
    if (index > 0) inputsRef.current[index - 1]?.focus();
  };

  const handleChange = (e, index) => {
    const char = e.target.value.replace(/\D/g, '').slice(-1);
    const newDigits = [...digits];
    newDigits[index] = char;
    onChange(newDigits.join(''));
    if (char) focusNext(index);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        const newDigits = [...digits];
        newDigits[index] = '';
        onChange(newDigits.join(''));
      } else {
        focusPrev(index);
      }
    } else if (e.key === 'ArrowLeft') {
      focusPrev(index);
    } else if (e.key === 'ArrowRight') {
      focusNext(index);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    onChange(pasted.padEnd(6, '').slice(0, 6));
    const nextIndex = Math.min(pasted.length, 5);
    inputsRef.current[nextIndex]?.focus();
  };

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  return (
    <div className="flex gap-3 justify-center">
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          disabled={disabled}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          className="w-11 h-12 text-center text-xl font-bold border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white disabled:opacity-50"
        />
      ))}
    </div>
  );
};

export default OtpInput;
