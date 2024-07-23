import { useId } from 'react';
import { useTheme } from './useTheme';

// TODO: After F5 doesn't upload last theme

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
      <label className='form-check-label' htmlFor={toggleId}>
        Dark theme
      </label>
    </div>
  );
}
