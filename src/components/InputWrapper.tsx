import classNames from 'classnames';
import { useId, useState } from 'react';
import { FormItem, stringFormItem } from '../types';

interface InputWrapperProps<K extends keyof FormItem> {
  name: K;
  label: string;
  type: 'text' | 'email' | 'password' | 'checkbox' | 'number' | 'select';
  invalidFeedback: stringFormItem;
  options?: { value: string; label: string }[];
}

const InputWrapper = <K extends keyof FormItem>({
  name,
  label,
  type,
  invalidFeedback,
  options,
}: InputWrapperProps<K>) => {
  const id = useId();
  const [showPassword, setShowPassword] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const classNameInput = classNames({
    'form-check-input': type === 'checkbox',
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
        <input type={showPassword ? 'text' : 'password'} className={classNameInput} id={id} name={name} />
        <button type='button' onClick={togglePasswordVisibility} className='btn btn-outline-secondary ms-2'>
          {showPassword ? 'Hide' : 'Show'}
        </button>
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
