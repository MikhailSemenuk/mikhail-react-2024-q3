'use client';
import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useId } from 'react';

export function ToggleSwitch() {
  const toggleId = useId();
  const { darkTheme, toggleTheme } = useTheme();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const renderSwitch = (disabled = false) => (
    <div className='form-check form-switch'>
      <input
        className='form-check-input'
        type='checkbox'
        role='switch'
        id={toggleId}
        checked={darkTheme}
        onChange={toggleTheme}
        disabled={disabled}
      />
      <label className={`form-check-label me-2${disabled ? ' disabled' : ''}`} htmlFor={toggleId}>
        Dark theme
      </label>
    </div>
  );

  return renderSwitch(!isHydrated);
}
