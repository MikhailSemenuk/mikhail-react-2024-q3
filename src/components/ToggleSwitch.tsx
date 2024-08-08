import { useTheme } from '@/hooks/useTheme';
import { useId } from 'react';

export function ToggleSwitch() {
  const toggleId = useId();

  const { darkTheme, toggleTheme } = useTheme();

  return (
    <div className='form-check form-switch'>
      <input
        className='form-check-input'
        type='checkbox'
        role='switch'
        id={toggleId}
        checked={darkTheme}
        onChange={toggleTheme}
      />
      <label className='form-check-label me-2' htmlFor={toggleId}>
        Dark theme
      </label>
    </div>
  );
}
