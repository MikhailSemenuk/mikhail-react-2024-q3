import classNames from 'classnames';
import { useId } from 'react';
import { FormItem, stringFormItem } from '../types';

interface InputWrapperProps<K extends keyof FormItem> {
  name: K;
  label: string;
  type: 'text' | 'email' | 'password' | 'checkbox';
  invalidFeedback: stringFormItem;
}

const InputWrapper = <K extends keyof FormItem>({
  name,
  label,
  type = 'text',
  invalidFeedback,
}: InputWrapperProps<K>) => {
  const id = useId();

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
        <input type={type} className={classNameInput} id={id} name={name} />
        <div className='invalid-feedback'>{invalidFeedback[name]}</div>
      </div>
    </div>
  );
};

export default InputWrapper;
