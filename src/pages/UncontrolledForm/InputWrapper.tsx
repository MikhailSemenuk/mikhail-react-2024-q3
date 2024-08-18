import classNames from 'classnames';
import { useId, useState, ChangeEvent } from 'react';
import { FormItem, stringFormItem } from '../../types';

interface InputWrapperProps<K extends keyof FormItem> {
  name: K;
  label: string;
  type: 'text' | 'email' | 'password' | 'checkbox' | 'number' | 'select' | 'file';
  invalidFeedback: stringFormItem;
  options?: { value: string; label: string }[];
  datalistOptions?: string[];
  onFileChange?: (file: File | undefined) => void;
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

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const classNameInput = classNames({
    'form-check-input': type === 'checkbox',
    'form-control': type !== 'checkbox',
    'is-invalid': invalidFeedback[name].length > 0,
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || undefined;
    if (onFileChange) {
      onFileChange(file);
    }
  };

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
        <input type={showPassword ? 'text' : 'password'} className={classNameInput} id={id} name={name} />
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
  } else {
    inputElement = <input type={type} className={classNameInput} id={id} name={name} />;
  }

  return (
    <div className='mb-3'>
      <label htmlFor={id} className='form-label'>
        {label}
      </label>
      <div className='input-group has-validation'>
        {inputElement}
        <div className='invalid-feedback'>{invalidFeedback[name]}</div>
      </div>
    </div>
  );
};

export default InputWrapper;
