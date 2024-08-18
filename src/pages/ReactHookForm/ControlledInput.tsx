import { useState, useId } from 'react';
import classNames from 'classnames';
import { UseFormRegister } from 'react-hook-form';
import { FormItem } from '../../types';
import ProgressPasswordStrength from '../../components/ProgressPasswordStrength';

interface InputWrapperProps<K extends keyof FormItem> {
  name: K;
  label: string;
  type: 'text' | 'email' | 'password' | 'checkbox' | 'number' | 'select' | 'file';
  register: UseFormRegister<FormItem>;
  passwordForIndicator?: string;
  errors?: string;
  options?: { value: string; label: string }[];
  datalistOptions?: string[];
}

const ControlledInput = <K extends keyof FormItem>({
  name,
  label,
  type,
  register,
  errors,
  passwordForIndicator,
  options,
  datalistOptions,
}: InputWrapperProps<K>) => {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const classNameInput = classNames({
    'form-check-input': type === 'checkbox',
    'me-2': type === 'checkbox',
    'form-control': type !== 'checkbox',
    'is-invalid': errors,
  });

  let inputElement: JSX.Element;

  if (type === 'select' && options) {
    inputElement = (
      <select className={classNameInput} id={id} {...register(name)}>
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
        <input type={showPassword ? 'text' : 'password'} className={classNameInput} id={id} {...register(name)} />
        <button type='button' onClick={togglePasswordVisibility} className='btn btn-outline-secondary ms-2'>
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </>
    );
  } else if (type === 'file') {
    inputElement = <input type='file' className={classNameInput} id={id} {...register(name)} />;
  } else if (type === 'text' && datalistOptions) {
    inputElement = (
      <>
        <input type='text' className={classNameInput} id={id} list={`${id}-datalist`} {...register(name)} />
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
        <input type='checkbox' className={classNameInput} id={id} {...register(name)} />
        <label htmlFor={id} className='form-check-label'>
          {label}
        </label>
        <div className='invalid-feedback'>{errors}</div>
      </div>
    );
  } else {
    inputElement = <input type={type} className={classNameInput} id={id} {...register(name)} />;
  }

  return (
    <div className='mb-3'>
      {type !== 'checkbox' && (
        <label htmlFor={id} className='form-label'>
          {label}
        </label>
      )}
      {type === 'password' && <ProgressPasswordStrength password={passwordForIndicator ?? ''} />}
      <div className='input-group has-validation'>
        {inputElement}
        <div className='invalid-feedback'>{errors}</div>
      </div>
    </div>
  );
};

export default ControlledInput;
