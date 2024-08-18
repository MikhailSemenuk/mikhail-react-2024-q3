import classNames from 'classnames';
import { useId, useState } from 'react';
import { FormItem, stringFormItem } from '../types';

interface InputWrapperProps<K extends keyof FormItem> {
  name: K;
  label: string;
  type: 'text' | 'email' | 'password' | 'checkbox';
  invalidFeedback: stringFormItem;
}

const InputWrapper = <K extends keyof FormItem>({ name, label, type, invalidFeedback }: InputWrapperProps<K>) => {
  const id = useId();
  const [showPassword, setShowPassword] = useState(true); // TODO: during debug

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const classNameInput = classNames({
    'form-check-input': type === 'checkbox',
    'form-control': type !== 'checkbox',
    'is-invalid': invalidFeedback[name].length > 0,
  });

  return (
    <div className='mb-3'>
      <label htmlFor={id} className='form-label'>
        {label}
      </label>
      <div className='input-group has-validation'>
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          className={classNameInput}
          id={id}
          name={name}
        />
        {type === 'password' && (
          <button type='button' onClick={togglePasswordVisibility} className='btn btn-outline-secondary ms-2'>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        )}
        <div className='invalid-feedback'>{invalidFeedback[name]}</div>
      </div>
    </div>
  );
};

export default InputWrapper;
