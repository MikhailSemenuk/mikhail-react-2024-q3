import { getThemeIsDark, saveThemeIsDark } from '@/libs/appLocalStorage';
import whereIAm from '@/libs/whereIAm';
import { useEffect, useId, useState } from 'react';

export function ToggleSwitch() {
  const toggleId = useId();
  const [darkTheme, toggleTheme] = useState(getThemeIsDark());

  const handleToggle = () => {
    toggleTheme((previous) => !previous);
  };

  whereIAm('ToggleSwitch');

  // TODO: Maybe in Next.js exist better way?
  useEffect(() => {
    // setAttribute allows in this task for document.body
    // https://docs.google.com/spreadsheets/d/1zZB-FbbhvkX9SpE14CC1UScAvRS46C5_nqIJ5cD4Elg/edit?gid=2028922094#gid=2028922094&range=D7
    document.body.setAttribute('data-bs-theme', darkTheme ? 'dark' : 'light');
    saveThemeIsDark(darkTheme);
  }, [darkTheme]);

  return (
    <div className='form-check form-switch'>
      <input
        className='form-check-input'
        type='checkbox'
        role='switch'
        id={toggleId}
        checked={darkTheme}
        onChange={handleToggle}
      />
      <label className='form-check-label me-2' htmlFor={toggleId}>
        Dark theme
      </label>
    </div>
  );
}
