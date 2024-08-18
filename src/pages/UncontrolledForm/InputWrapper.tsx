import classNames from 'classnames';
import { useId, useState, ChangeEvent } from 'react';
import { FormItem, stringFormItem } from '../../types';
import ProgressPasswordStrength from '../../components/ProgressPasswordStrength';

interface InputWrapperProps<K extends keyof FormItem> {
  name: K;
  label: string;
  type: 'text' | 'email' | 'password' | 'checkbox' | 'number' | 'select' | 'file';
  invalidFeedback: stringFormItem;
  options?: { value: string; label: string }[];
  datalistOptions?: string[];
  onFileChange?: (file: FileList | undefined) => void;
}

const InputWrapper = <K extends keyof FormItem>({
  name,
  label,
  type,
  invalidFeedback,
  options,
  datalistOptions,
  onFileChange,
}: InputWrapperProps<K>) => {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files || undefined;
    if (onFileChange) {
      onFileChange(files);
    }
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const classNameInput = classNames({
    'form-check-input': type === 'checkbox',
    'me-2': type === 'checkbox',
    'form-control': type !== 'checkbox',
    'is-invalid': invalidFeedback[name].length > 0,
  });

  let inputElement: JSX.Element;

  if (type === 'select' && options) {
    inputElement = (
      <select className={classNameInput} id={id} name={name}>
        <option value=''>Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  } else if (type === 'password') {
    inputElement = (
      <>
        <input
          type={showPassword ? 'text' : 'password'}
          className={classNameInput}
          id={id}
          name={name}
          onChange={handlePasswordChange}
        />
        <button type='button' onClick={togglePasswordVisibility} className='btn btn-outline-secondary ms-2'>
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </>
    );
  } else if (type === 'file') {
    inputElement = <input type='file' className={classNameInput} id={id} name={name} onChange={handleFileChange} />;
  } else if (type === 'text' && datalistOptions) {
    inputElement = (
      <>
        <input type='text' className={classNameInput} id={id} name={name} list={`${id}-datalist`} />
        <datalist id={`${id}-datalist`}>
          {datalistOptions.map((option) => (
            <option key={option} value={option} />
          ))}
        </datalist>
      </>
    );
  } else if (type === 'checkbox') {
    inputElement = (
      <div className='checkbox-wrapper'>
        <input type='checkbox' className={classNameInput} id={id} name={name} />
        <label htmlFor={id} className='form-check-label'>
          {label}
        </label>
        <div className='invalid-feedback'>{invalidFeedback[name]}</div>
      </div>
    );
  } else {
    inputElement = <input type={type} className={classNameInput} id={id} name={name} />;
  }

  return (
    <div className='mb-3'>
      {type !== 'checkbox' && (
        <label htmlFor={id} className='form-label'>
          {label}
        </label>
      )}
      {(name === 'password' || name === 'repeatPassword') && <ProgressPasswordStrength password={password} />}
      <div className='input-group has-validation'>
        {inputElement}
        <div className='invalid-feedback'>{invalidFeedback[name]}</div>
      </div>
    </div>
  );
};

export default InputWrapper;
