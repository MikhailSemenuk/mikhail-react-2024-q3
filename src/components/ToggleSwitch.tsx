import { useId } from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  handleClick: () => void;
}

export function ToggleSwitch({ checked, handleClick }: ToggleSwitchProps) {
  const toggleId = useId();

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id={toggleId}
        checked={checked}
        onChange={handleClick}
      />
      <label className="form-check-label" htmlFor={toggleId}>
        Dark mode
      </label>
    </div>
  );
}
